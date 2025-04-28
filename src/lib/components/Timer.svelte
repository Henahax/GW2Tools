<script lang="ts">
	import FlipDigit from './FlipDigit.svelte';

	let { time } = $props();
	let count = $state(time - new Date().getTime());

	function formatTime(milliseconds: number) {
		const seconds = Math.floor(milliseconds / 1000);
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

	$effect(() => {
		const interval = setInterval(() => {
			count -= 1000;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let formattedTime = $derived(formatTime(count));
</script>

<div class="timer">
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
	.timer {
		display: inline-flex;
		align-items: center;
		font-family: monospace;
	}
</style>
