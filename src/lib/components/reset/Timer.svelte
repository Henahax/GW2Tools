<script lang="ts">
	import FlipDigit from './FlipDigit.svelte';

	let { currentTime, targetTime } = $props();
	let seconds = $derived(targetTime - currentTime);

	function formatTime(milliseconds: number) {
		const seconds = Math.floor(Math.abs(milliseconds) / 1000);
		const days = Math.floor(seconds / 86400);
		const hours = Math.floor((seconds % 86400) / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return {
			days: days.toString().padStart(2, '0'),
			hours: hours.toString().padStart(2, '0'),
			minutes: minutes.toString().padStart(2, '0'),
			seconds: remainingSeconds.toString().padStart(2, '0')
		};
	}

	let formattedTime = $derived(formatTime(seconds));
</script>

<div class="timer inline-flex items-center">
	{#if parseInt(formattedTime.days) > 0}
		{#each formattedTime.days.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
	{/if}
	{#each formattedTime.hours.split('') as digit}
		<FlipDigit {digit} />
	{/each}:
	{#each formattedTime.minutes.split('') as digit}
		<FlipDigit {digit} />
	{/each}:
	{#each formattedTime.seconds.split('') as digit}
		<FlipDigit {digit} />
	{/each}
</div>

<style>
</style>
