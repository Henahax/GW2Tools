<script lang="ts">
	let {
		targetTime,
		soonTime = 300000,
		numbersShown = 3
	} = $props<{
		targetTime: number;
		soonTime?: number;
		numbersShown: number;
	}>();

	let currentTime = $state(Math.abs(Date.now()));
	let difference = $derived(targetTime - currentTime);
	let isSoon = $derived(Math.abs(difference) < soonTime && difference > 0);
	let isActive = $derived(Math.abs(difference) < 0);
	let formattedTime = $derived(formatTime(difference, numbersShown));

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = Math.abs(Date.now());
		}, 1000);
	});

	function formatTime(milliseconds: number, mode: number) {
		const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);
		let days = 0,
			hours = 0,
			minutes = 0,
			seconds = 0;
		// Time formatting logic continues below

		switch (mode) {
			case 4: // DAYS
				days = Math.floor(totalSeconds / 86400);
				hours = Math.floor((totalSeconds % 86400) / 3600);
				minutes = Math.floor((totalSeconds % 3600) / 60);
				seconds = totalSeconds % 60;
				break;
			case 3: // HOURS
				hours = Math.floor(totalSeconds / 3600);
				minutes = Math.floor((totalSeconds % 3600) / 60);
				seconds = totalSeconds % 60;
				break;
			case 2: // MINUTES
				minutes = Math.floor(totalSeconds / 60);
				seconds = totalSeconds % 60;
				break;
			case 1: // SECONDS
				seconds = totalSeconds;
				break;
		}

		return {
			days: days.toString().padStart(2, '0'),
			hours: hours.toString().padStart(2, '0'),
			minutes: minutes.toString().padStart(2, '0'),
			seconds: seconds.toString().padStart(2, '0')
		};
	}
</script>

<div
	class="timer inline-flex items-center {isActive ? 'text-green-500' : ''} {isSoon
		? 'text-yellow-500'
		: ''}"
>
	{#if numbersShown === 4}
		{#each formattedTime.days.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.hours.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.minutes.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.seconds.split('') as digit}
			<div>{digit}</div>
		{/each}
	{:else if numbersShown === 3}
		{#each formattedTime.hours.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.minutes.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.seconds.split('') as digit}
			<div>{digit}</div>
		{/each}
	{:else if numbersShown === 2}
		{#each formattedTime.minutes.split('') as digit}
			<div>{digit}</div>
		{/each}
		<div>:</div>
		{#each formattedTime.seconds.split('') as digit}
			<div>{digit}</div>
		{/each}
	{:else}
		{#each formattedTime.seconds.split('') as digit}
			<div>{digit}</div>
		{/each}
	{/if}
</div>

<style>
</style>
