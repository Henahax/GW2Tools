<script lang="ts">
	import Timer from './Timer.svelte';
	import { ResetTimer } from '../../routes/reset/Reset.svelte';
	import { getUTCTimeForStartOfNextDay } from '$lib/helpers/ResetFunctions';

	let { currentTime, timer } = $props<{ currentTime: number; timer: ResetTimer }>();

	let targetTime = $derived(getNextEventTime()[0]);
	let duration: [number, number] = $derived(getNextEventTime()[1]);
	let add = $derived(getNextEventTime()[2]);

	let active = $derived(getNextEventTime()[3]);
	let soon = $derived(getNextEventTime()[4]);

	function getNextEventTime() {
		let startOfNextDay = getUTCTimeForStartOfNextDay();
		let startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

		let nextEventTime = currentTime;
		let add = '';
		let duration: [number, number] = [0, 0];
		let active = false;
		let soon = false;

		for (let i = 0; i < timer.times.length; i++) {
			if (
				startOfThisDay +
					timer.times[i][0] * 60 * 60 * 1000 +
					timer.times[i][1] * 60 * 1000 +
					timer.duration[0] * 60 * 60 * 1000 +
					timer.duration[1] * 60 * 1000 >
				currentTime
			) {
				nextEventTime =
					startOfThisDay + timer.times[i][0] * 60 * 60 * 1000 + timer.times[i][1] * 60 * 1000;
				if (timer.times[i][2]) {
					add = timer.times[i][2];
				}

				duration = timer.duration;

				if (nextEventTime > currentTime) {
					if (currentTime > nextEventTime - 1000 * 60 * 5) {
						soon = true;
					}
				} else {
					active = true;
				}

				break;
			}
		}
		return [new Date(nextEventTime), duration, add, active, soon];
	}
</script>

<div
	class="flex flex-col items-end text-xs {active
		? 'text-green-500'
		: soon
			? 'text-yellow-500'
			: 'text-neutral-400'}"
>
	<div class="text-sm">{timer.name}</div>
	{#if add}
		<div>{add}</div>
	{/if}
	<div class="flex items-center gap-2">
		{#if active}
			<i class="fa-solid fa-play"></i>
		{:else if soon}
			<i class="fa-solid fa-hourglass-half"></i>
		{/if}
		<div class="timer flex gap-0.5">
			<Timer {currentTime} {targetTime} />
			{#if active}
				<div>/</div>
				<div>
					00:{duration[0].toString().padStart(2, '0')}:{duration[1].toString().padStart(2, '0')}
				</div>
			{/if}
		</div>
	</div>
</div>
