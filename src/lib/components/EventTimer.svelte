<script lang="ts">
	import Timer from './Timer.svelte';
	import { ResetTimer } from '../../routes/reset/Reset.svelte';
	import { getUTCTimeForStartOfNextDay } from '$lib/functions/ResetFunctions.svelte';

	let timer: ResetTimer = $props();

	let activeTimer = $derived(getNextEventTime(timer));

	function getNextEventTime(timer: ResetTimer) {
		let test1 = timer.times;
		let test2 = timer.duration;

		console.log('test1', test1);
		console.log('test2', test2);

		let next = 0;
		let add: string = '';

		let now = new Date();
		let startOfNextDay = getUTCTimeForStartOfNextDay();
		let startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

		for (let i = 0; i < timer.times.length; i++) {
			if (
				startOfThisDay +
					timer.times[i][0] * 60 * 60 * 1000 +
					timer.times[i][1] * 60 * 1000 +
					timer.duration[0] * 60 * 60 * 1000 +
					timer.duration[1] * 60 * 1000 >
				now.getTime()
			) {
				next = startOfThisDay + timer.times[i][0] * 60 * 60 * 1000 + timer.times[i][1] * 60 * 1000;
				if (timer.times[i][2]) {
					add = timer.times[i][2] ?? '';
				}
				break;
			}
		}
		return { next: next, add: add };
	}
</script>

<div class="flex flex-col items-end text-xs text-neutral-400">
	<Timer time={activeTimer.next} />
	<div>{activeTimer.add}</div>
</div>
