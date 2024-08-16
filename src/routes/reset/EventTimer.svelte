<script lang="ts">
	import { getUTCTimeForStartOfNextDay } from './functions.svelte';
	import type { Task } from './types';

	interface MyProps {
		task: Task;
	}
	let { task }: MyProps = $props();

	let nextEventTime: [Date, object, string] = $state([new Date(), {}, '']);
	let targetTime: number = $state(0);
	let active = $state(false);
	let soon = $state(false);
	let duration: [string, string] = $state(['00', '00']);
	let add: string = $state('');

	let timeRemaining = $state(calculateTimeRemaining());

	$effect(() => {
		const intervalId = setInterval(() => {
			timeRemaining = calculateTimeRemaining();
		}, 1000);

		return () => clearInterval(intervalId);
	});

	function calculateTimeRemaining() {
		if (!task.timer) {
			return {
				seconds: ''
			};
		}

		nextEventTime = getNextEventTime(task.timer);
		targetTime = nextEventTime[0].getTime();
		duration = [
			task.timer.duration[0].toString().padStart(2, '0'),
			task.timer.duration[1].toString().padStart(2, '0')
		];
		add = nextEventTime[2];

		const now = new Date().getTime();
		const isCountingDown = targetTime > now;
		const difference = isCountingDown ? targetTime - now : now - targetTime;

		active = !isCountingDown;
		if (!active && difference < 1000 * 60 * 5) {
			//todo alarm
			/*
			if (!soon) {
				if (task.alarm) {
				}
			}
            */
			soon = true;
		} else {
			soon = false;
		}

		const hours = Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
			.toString()
			.padStart(2, '0');
		const minutes = Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)))
			.toString()
			.padStart(2, '0');
		const seconds = Math.max(0, Math.floor((difference % (1000 * 60)) / 1000))
			.toString()
			.padStart(2, '0');

		return { hours, minutes, seconds };
	}

	function getNextEventTime(timer: any): [Date, object, string] {
		var now = new Date();
		var startOfNextDay = getUTCTimeForStartOfNextDay();
		var startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

		var nextEventTime = now.getTime();
		var add: string = '';
		var duration = [0, 0];

		for (let i = 0; i < timer.times.length; i++) {
			if (
				startOfThisDay +
					timer.times[i][0] * 60 * 60 * 1000 +
					timer.times[i][1] * 60 * 1000 +
					timer.duration[0] * 60 * 60 * 1000 +
					timer.duration[1] * 60 * 1000 >
				now.getTime()
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

<div
	class="eventTimer flex flex-col items-end text-xs"
	class:text-success={active}
	class:text-warning={soon}
>
	{#if add.length > 0}
		<div class="w-max">
			{add}
		</div>
	{/if}
	<div class="flex items-center gap-1.5 font-mono text-xs">
		{#if active}
			<i class="fa-solid fa-play"></i>
		{/if}
		{#if soon}
			<i class="fa-solid fa-stopwatch"></i>
		{/if}
		<div class="flex items-center gap-0.5">
			<span class="countdown">
				<span style="--value:{timeRemaining.hours};"></span>:
				<span style="--value:{timeRemaining.minutes};"></span>:
				<span style="--value:{timeRemaining.seconds};"></span>
			</span>
			{#if active}
				<span>/</span>
				<span>{duration[0]}:{duration[1]}:00</span>
			{/if}
		</div>
	</div>
</div>
