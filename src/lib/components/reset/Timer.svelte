<script lang="ts">
	import FlipDigit from './FlipDigit.svelte';

	let {
		highestShown = 0,
		currentTime,
		targetTime
	} = $props<{ highestShown: number; currentTime: number; targetTime: number }>();

	let seconds = $derived(targetTime - currentTime);

	function formatTime(milliseconds: number, mode: number) {
		const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);
		let days = 0,
			hours = 0,
			minutes = 0,
			remainingSeconds = 0;

		switch (mode) {
			case 0: // DAYS
				days = Math.floor(totalSeconds / 86400);
				hours = Math.floor((totalSeconds % 86400) / 3600);
				minutes = Math.floor((totalSeconds % 3600) / 60);
				remainingSeconds = totalSeconds % 60;
				break;
			case 1: // HOURS
				hours = Math.floor(totalSeconds / 3600);
				minutes = Math.floor((totalSeconds % 3600) / 60);
				remainingSeconds = totalSeconds % 60;
				break;
			case 2: // MINUTES
				minutes = Math.floor(totalSeconds / 60);
				remainingSeconds = totalSeconds % 60;
				break;
			case 3: // SECONDS
				remainingSeconds = totalSeconds;
				break;
		}

		return {
			days: days.toString().padStart(2, '0'),
			hours: hours.toString().padStart(2, '0'),
			minutes: minutes.toString().padStart(2, '0'),
			seconds: remainingSeconds.toString().padStart(2, '0')
		};
	}

	let formattedTime = $derived(formatTime(seconds, highestShown));
</script>

<div class="timer inline-flex items-center">
	{#if highestShown === 0}
		{#each formattedTime.days.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.hours.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.minutes.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.seconds.split('') as digit}
			<FlipDigit {digit} />
		{/each}
	{:else if highestShown === 1}
		{#each formattedTime.hours.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.minutes.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.seconds.split('') as digit}
			<FlipDigit {digit} />
		{/each}
	{:else if highestShown === 2}
		{#each formattedTime.minutes.split('') as digit}
			<FlipDigit {digit} />
		{/each}:
		{#each formattedTime.seconds.split('') as digit}
			<FlipDigit {digit} />
		{/each}
	{:else}
		{#each formattedTime.seconds.split('') as digit}
			<FlipDigit {digit} />
		{/each}
	{/if}
</div>

<style>
</style>
