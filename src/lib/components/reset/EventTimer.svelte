<script lang="ts">
	import Timer from './Timer.svelte';
	import { ResetTimer } from '../../../routes/reset/Reset.svelte';
	import { getUTCTimeForStartOfNextDay } from '$lib/helpers/ResetFunctions';

	let { timer } = $props<{ timer: ResetTimer }>();
	let nextEventTime = $state(getNextEventTime(timer)[0].getTime());
	let duration = $state(getNextEventTime(timer)[1]);
	let add = $state(getNextEventTime(timer)[2]);
	let numbersShown = $derived(duration[0] > 0 ? 3 : 2);

	// Update timer state whenever the timer prop changes
	$effect(() => {
		const [newTime, newDuration, newAdd] = getNextEventTime(timer);
		nextEventTime = newTime.getTime();
		duration = newDuration;
		add = newAdd;
	});

	// Update event time every second and when event is finished
	$effect(() => {
		const interval = setInterval(() => {
			const now = Date.now();
			// Check if current event is finished (past target time + duration)
			if (nextEventTime + (duration[0] * 3600000 + duration[1] * 60000) < now) {
				const [newTime, newDuration, newAdd] = getNextEventTime(timer);
				nextEventTime = newTime.getTime();
				duration = newDuration;
				add = newAdd;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	function getNextEventTime(timer: any): [Date, [number, number], string] {
		let now = new Date().getTime();
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
				if (timer.times[i][2]) {
					add = timer.times[i][2];
				}
				duration = timer.duration;
				break;
			}
		}
		return [new Date(nextEventTime), duration, add];
	}
</script>

<Timer targetTime={nextEventTime} {add} {duration} {numbersShown} />
