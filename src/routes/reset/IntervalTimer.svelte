<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { TimeRemaining } from './types';
	export let mode: modes;

	enum modes {
		day = 1,
		week = 2
	}

	let targetDate;
	let timeRemaining = calculateTimeRemaining();

	function calculateTimeRemaining(): TimeRemaining {
		switch (mode) {
			case modes.day: {
				targetDate = getUTCTimeForStartOfNextDay();
				break;
			}
			case modes.week: {
				targetDate = getUTCTimeForStartOfNextWeek();
				break;
			}
		}

		const now = new Date().getTime();
		const difference = targetDate.getTime() - now;

		if (difference <= 0) {
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

	const interval = setInterval(() => {
		timeRemaining = calculateTimeRemaining();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});

	function getUTCTimeForStartOfNextDay() {
		const now = new Date();
		const tomorrow = new Date(now);
		tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
		tomorrow.setUTCHours(0, 0, 0, 0);

		return tomorrow;
	}

	function getUTCTimeForStartOfNextWeek() {
		const now = new Date();
		var nextMonday = new Date();

		while (nextMonday.getUTCDay() !== 1) {
			nextMonday.setUTCDate(nextMonday.getUTCDate() + 1);
		}

		nextMonday.setUTCHours(7, 30, 0, 0);
		if (nextMonday < now) {
			nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
		}
		return nextMonday;
	}
</script>

<span class="countdown font-mono">
	{#if mode == modes.week}
		<span style="--value:{timeRemaining.days};"></span>:
	{/if}
	<span style="--value:{timeRemaining.hours};"></span>:
	<span style="--value:{timeRemaining.minutes};"></span>:
	<span style="--value:{timeRemaining.seconds};"></span>
</span>
