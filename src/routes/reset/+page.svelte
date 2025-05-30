<script lang="ts">
	import resetData from './reset.json';
	import { Reset, ResetInterval } from './Reset.svelte';
	import {
		getUTCTimeForStartOfNextDay,
		getUTCTimeForStartOfNextWeek
	} from '$lib/helpers/ResetFunctions';
	import Interval from '$lib/components/reset/Interval.svelte';

	import Timer from '$lib/components/reset/Timer.svelte';

	let reset = $state(new Reset(resetData));
	let overlayOpen = $state(false);
	let filter = $state('');
	let currentTime = $state(new Date().getTime());

	$effect(() => {
		const interval = setInterval(() => {
			currentTime = new Date().getTime();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function toggleOverlay() {
		overlayOpen = !overlayOpen;
	}
</script>

<div class="flex w-full flex-wrap items-center gap-8 self-center p-4 max-sm:flex-col">
	<div class="flex flex-col self-start">
		<div class="text-2xl">Reset Checklist</div>
		<div>chose displayed time-gated tasks</div>
	</div>

	<div class="grid grow grid-flow-col gap-4 self-end">
		<div class="flex grow justify-end gap-4">
			<div class="flex flex-col text-end">
				<div class="text-sm">{reset.intervals[0].timer}</div>
				<Timer
					targetTime={getUTCTimeForStartOfNextWeek().getTime()}
					soonTime={86400000}
					numbersShown={4}
					triggerReload={true}
				/>
			</div>
			<div class="flex flex-col text-end">
				<div class="text-sm">{reset.intervals[1].timer}</div>
				<Timer
					targetTime={getUTCTimeForStartOfNextDay().getTime()}
					soonTime={10800000}
					numbersShown={3}
					triggerReload={true}
				/>
			</div>
			<div class="flex gap-2">
				<button class="btn btn-primary">
					<i class="fa-solid fa-question"></i>
					<span class="max-sm:hidden">Info</span>
				</button>
				<button class="btn btn-outline" onclick={toggleOverlay}>
					<i class="fa-solid fa-gear"></i>
					<span class="max-sm:hidden">Settings</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="flex grow flex-col items-center self-center p-2">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
		{#each reset.intervals as interval}
			<Interval {interval} {currentTime} />
		{/each}
	</div>
</div>

<label
	class="overlay backdrop-blur-xs absolute bottom-0 right-0 top-0 flex h-dvh w-dvw grow justify-end {overlayOpen
		? ''
		: 'hidden'}"
	for="closeResetMenu"
>
</label>
<div
	class="menu absolute bottom-0 right-0 top-0 flex h-dvh flex-col border-l border-neutral-700 bg-neutral-900 shadow-lg {overlayOpen
		? 'open'
		: ''}"
>
	<div class="flex flex-col gap-2 p-4">
		<div class="flex w-full items-center justify-between gap-4">
			<div class="text-xl">Displayed Tasks:</div>
			<button
				id="closeResetMenu"
				class="btn btn-ghost btn-square"
				aria-label="close"
				onclick={toggleOverlay}
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<input class="w-full" type="search" placeholder="Search" bind:value={filter} />
	</div>
	<div class="overflow-y-auto">
		<div class="flex flex-col gap-4 p-4">
			{#each reset.intervals.filter( (interval: ResetInterval) => interval.categories.some( (category) => category.tasks.some((task) => task.name
										.toLowerCase()
										.includes(filter.toLowerCase()) || (task.location && task.location
											.toLowerCase()
											.includes(filter.toLowerCase())) || (task.description && task.description
											.toLowerCase()
											.includes(filter.toLowerCase()))) ) ) as interval}
				<div>
					<div class="text-lg font-bold">{interval.timer}</div>
					<div class="flex flex-col gap-2">
						{#each interval.categories.filter((category) => category.tasks.some((task) => task.name
										.toLowerCase()
										.includes(filter.toLowerCase()) || (task.location && task.location
											.toLowerCase()
											.includes(filter.toLowerCase())) || (task.description && task.description
											.toLowerCase()
											.includes(filter.toLowerCase())))) as category: ResetCategory}
							<div>
								<div class="font-semibold">{category.name}</div>
								<div class="flex flex-col gap-2">
									{#each category.tasks.filter((task) => task.name
												.toLowerCase()
												.includes(filter.toLowerCase()) || (task.location && task.location
													.toLowerCase()
													.includes(filter.toLowerCase())) || (task.description && task.description
													.toLowerCase()
													.includes(filter.toLowerCase()))) as task: ResetTask}
										<label class="grid grid-cols-[auto_auto_1fr] items-center gap-2">
											<input
												type="checkbox"
												bind:checked={task.display}
												onchange={(e) => task.setDisplay(e.currentTarget.checked)}
											/>
											<img class="size-6 rounded" src={task.icon} alt={task.name} />
											<div class="flex flex-col text-xs">
												<div class="font-semibold">{task.name}</div>
												{#if task.description}
													<div class="text-neutral-400">{task.description}</div>
												{:else if task.location}
													<div class="flex items-center gap-1.5 text-xs text-neutral-400">
														<i class="fa-solid fa-location-dot"></i>{task.location}
													</div>
												{/if}
											</div>
										</label>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		z-index: 10;
	}

	.menu {
		position: fixed;
		z-index: 50;
		height: 100vh;
		transition: transform 0.5s ease-in-out;
		transform: translateX(100%);
	}

	.menu.open {
		transform: translateX(0);
	}

	/* TODO: Only Toggle Button */
	button:hover {
		background-color: var(--color-neutral-800);
		color: white;
	}
</style>
