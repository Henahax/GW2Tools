<script lang="ts">
	import { getUTCTimeForStartOfNextDay, getUTCTimeForStartOfNextWeek } from './functions.svelte';
	let { interval } = $props();

	let timeRemaining = $state(calculateTimeRemaining());

	$effect(() => {
		const intervalId = setInterval(() => {
			timeRemaining = calculateTimeRemaining();
		}, 1000);

		return () => clearInterval(intervalId);
	});

	function calculateTimeRemaining() {
		let targetDate = new Date();
		switch (interval) {
			case 'daily': {
				targetDate = getUTCTimeForStartOfNextDay();
				break;
			}
			case 'weekly': {
				targetDate = getUTCTimeForStartOfNextWeek();
				break;
			}
		}
		const now = new Date().getTime();
		let difference = targetDate.getTime() - now;

		if (difference < 0) {
			location.reload();
		}

		const days = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)))
			.toString()
			.padStart(2, '0');

		const hours = Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
			.toString()
			.padStart(2, '0');
		const minutes = Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)))
			.toString()
			.padStart(2, '0');
		const seconds = Math.max(0, Math.floor((difference % (1000 * 60)) / 1000))
			.toString()
			.padStart(2, '0');

		return { days, hours, minutes, seconds };
	}
</script>

<span class="countdown flex justify-end font-mono">
	{#if interval === 'weekly'}
		<span style="--value:{timeRemaining.days};"></span>:
	{/if}
	<span style="--value:{timeRemaining.hours};"></span>:
	<span style="--value:{timeRemaining.minutes};"></span>:
	<span style="--value:{timeRemaining.seconds};"></span>
</span>
