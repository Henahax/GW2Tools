<script lang="ts">
	import { goto } from '$app/navigation';

	let {
		targetTime,
		soonTime = 300000,
		numbersShown = 3,
		triggerReload = false,
		add = ''
	} = $props<{
		targetTime: number;
		soonTime?: number;
		numbersShown?: number;
		triggerReload?: boolean;
		add?: string;
	}>();

	let currentTime = $state(Math.abs(Date.now()));
	let difference = $derived(targetTime - currentTime);
	let isSoon = $derived(difference < soonTime && difference > 0);
	let isActive = $derived(difference < 0);
	let formattedTime = $derived(formatTime(difference, numbersShown));

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = Date.now();

			// reload page on date change
			if (triggerReload && difference < 0) {
				goto(window.location.pathname);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	function getTimeUnitsToShow(mode: number, time: ReturnType<typeof formatTime>) {
		const units = [];
		if (mode >= 4) units.push({ value: time.days });
		if (mode >= 3) units.push({ value: time.hours });
		if (mode >= 2) units.push({ value: time.minutes });
		units.push({ value: time.seconds });
		return units;
	}

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
	class="line-h flex flex-col items-end"
	class:text-green-500={isActive}
	class:text-yellow-500={isSoon}
	class:text-neutral-400={!isActive && !isSoon && !triggerReload}
>
	<div class="timer inline-flex items-center gap-1.5">
		{#if isActive && !triggerReload}
			<i class="fa-solid fa-play"></i>
		{:else if isSoon && !triggerReload}
			<i class="fa-solid fa-hourglass-half"></i>
		{/if}
		<div class="inline-flex items-center">
			{#each getTimeUnitsToShow(numbersShown, formattedTime) as unit, index}
				{#each unit.value.split('') as digit}
					<div>{digit}</div>
				{/each}
				{#if index < getTimeUnitsToShow(numbersShown, formattedTime).length - 1}
					<div>:</div>
				{/if}
			{/each}
		</div>
	</div>
	{#if add.length > 0}
		<div>{add}</div>
	{/if}
</div>

<style>
</style>
