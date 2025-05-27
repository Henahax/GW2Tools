<script lang="ts">
	import Timer from './NewTimer.svelte';
	import { ResetTimer } from '../../../routes/reset/Reset.svelte';
	import { getUTCTimeForStartOfNextDay } from '$lib/helpers/ResetFunctions';

	let { timer } = $props<{ timer: ResetTimer }>();

	let nextEventTime = $derived(getNextEventTime(timer)[0].getTime());
	let duration = $derived(getNextEventTime(timer)[1]);
	let add = $derived(getNextEventTime(timer)[2]);
	let numbersShown = $derived(duration[0] > 0 ? 3 : 2);

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
