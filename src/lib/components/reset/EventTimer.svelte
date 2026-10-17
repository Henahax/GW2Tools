<script lang="ts">
	import { onDestroy } from 'svelte';
	import Timer from './Timer.svelte';
	import { getResetClock } from './ResetClock.js';
	import { ResetTimer } from '../../../routes/reset/Reset.svelte';
	import { getUTCTimeForStartOfNextDay } from '#lib/helpers/ResetFunctions.js';

	const SOON_TIME_MS = 5 * 60 * 1000;
	const TONE_DURATION_SECONDS = 0.16;
	const TONE_GAP_SECONDS = 0.12;

	const clock = getResetClock();
	let { timer }: { timer: ResetTimer } = $props();
	let nextEventTime = $state(0);
	let duration = $state<[number, number]>([0, 0]);
	let add = $state('');
	let alertEnabled = $state(false);
	let numbersShown = $derived(duration[0] > 0 ? 3 : 2);
	let audioContext: AudioContext | undefined;
	let warnedEventTime: number | undefined;
	let startedEventTime: number | undefined;

	$effect(() => {
		const now = clock.now;
		if (nextEventTime + getDurationMilliseconds() < now) {
			updateEventTime(now);
		}
	});

	$effect(() => {
		const now = clock.now;
		if (!alertEnabled || getDurationMilliseconds() === 0) return;

		const remaining = nextEventTime - now;
		if (remaining > 0 && remaining <= SOON_TIME_MS && warnedEventTime !== nextEventTime) {
			warnedEventTime = nextEventTime;
			playAlert(1);
			showNotification('soon');
		}

		const eventEnd = nextEventTime + getDurationMilliseconds();
		if (remaining <= 0 && now < eventEnd && startedEventTime !== nextEventTime) {
			startedEventTime = nextEventTime;
			playAlert(2);
			showNotification('start');
			alertEnabled = false;
		}
	});

	onDestroy(() => {
		if (audioContext && audioContext.state !== 'closed') {
			void audioContext.close();
		}
	});

	function updateEventTime(now: number) {
		// Recalculate the next event countdown from the current time.
		const [newTime, newDuration, newAdd] = getNextEventTime(timer, now);
		nextEventTime = newTime.getTime();
		duration = newDuration;
		add = newAdd;
		warnedEventTime = undefined;
		startedEventTime = undefined;
	}

	function getDurationMilliseconds() {
		// Convert the configured event duration to milliseconds.
		return duration[0] * 60 * 60 * 1000 + duration[1] * 60 * 1000;
	}

	function toggleAlert(event: MouseEvent) {
		// Toggle sound and notification alerts for this timer.
		event.preventDefault();
		event.stopPropagation();

		if (alertEnabled) {
			alertEnabled = false;
			return;
		}

		alertEnabled = true;
		prepareAudio();
		requestNotificationPermission();

		const now = clock.now;
		const remaining = nextEventTime - now;
		const eventEnd = nextEventTime + getDurationMilliseconds();

		if (remaining <= 0 && now < eventEnd) {
			startedEventTime = nextEventTime;
		} else if (remaining > 0 && remaining <= SOON_TIME_MS) {
			warnedEventTime = nextEventTime;
		}
	}

	function requestNotificationPermission() {
		// Request permission before showing browser notifications.
		if (typeof window === 'undefined' || !('Notification' in window)) return;

		if (window.Notification.permission === 'default') {
			void window.Notification.requestPermission();
		}
	}

	function showNotification(stage: 'soon' | 'start') {
		// Show a notification for the selected event stage.
		if (
			typeof window === 'undefined' ||
			!('Notification' in window) ||
			window.Notification.permission !== 'granted'
		) {
			return;
		}

		const notification = new window.Notification(add || 'Guild Wars 2 event', {
			body: stage === 'soon' ? 'Starts in under 5 minutes' : 'Starting now',
			tag: `gw2tools-${nextEventTime}-${stage}`,
			silent: document.visibilityState === 'visible'
		});
		notification.onclick = () => {
			window.focus();
			notification.close();
		};
	}

	function prepareAudio() {
		// Prepare audio playback after a user interaction.
		if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return;

		audioContext ??= new window.AudioContext();
		if (audioContext.state === 'suspended') {
			void audioContext.resume();
		}
	}

	function playAlert(count: number) {
		// Play the alert sound the requested number of times.
		if (!audioContext || audioContext.state === 'closed') return;

		const toneSpacing = TONE_DURATION_SECONDS + TONE_GAP_SECONDS;
		for (let index = 0; index < count; index++) {
			const startTime = audioContext.currentTime + 0.02 + index * toneSpacing;
			const oscillator = audioContext.createOscillator();
			const gain = audioContext.createGain();

			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(880, startTime);
			gain.gain.setValueAtTime(0.0001, startTime);
			gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.01);
			gain.gain.exponentialRampToValueAtTime(0.0001, startTime + TONE_DURATION_SECONDS);

			oscillator.connect(gain);
			gain.connect(audioContext.destination);
			oscillator.start(startTime);
			oscillator.stop(startTime + TONE_DURATION_SECONDS);
		}
	}

	function getNextEventTime(timer: ResetTimer, now: number): [Date, [number, number], string] {
		// Find the next scheduled event and its display details.
		let startOfNextDay = getUTCTimeForStartOfNextDay();
		let startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

		let nextEventTime = now;
		let add: string = '';
		let duration: [number, number] = [0, 0];

		for (let i = 0; i < timer.times.length; i++) {
			if (
				startOfThisDay +
					timer.times[i][0] * 60 * 60 * 1000 +
					timer.times[i][1] * 60 * 1000 +
					timer.duration[0] * 60 * 60 * 1000 +
					timer.duration[1] * 60 * 1000 >
				now
			) {
				nextEventTime =
					startOfThisDay + timer.times[i][0] * 60 * 60 * 1000 + timer.times[i][1] * 60 * 1000;
				const eventAdd = timer.times[i][2];
				if (eventAdd) {
					add = eventAdd;
				}
				duration = timer.duration;
				break;
			}
		}
		return [new Date(nextEventTime), duration, add];
	}
</script>

<div class="flex items-center gap-1.5">
	<Timer targetTime={nextEventTime} {add} {duration} {numbersShown} soonTime={SOON_TIME_MS} />
	<button
		type="button"
		class="hover:brightness-125"
		class:text-yellow-500={alertEnabled}
		style:color={!alertEnabled ? 'var(--foreground-muted)' : undefined}
		aria-label={alertEnabled ? 'Disable timer alert' : 'Enable timer alert'}
		aria-pressed={alertEnabled}
		title={alertEnabled ? 'Disable timer alert' : 'Enable timer alert'}
		onclick={toggleAlert}
	>
		<i class="fa-solid fa-bell" aria-hidden="true"></i>
	</button>
</div>
