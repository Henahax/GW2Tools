<script lang="ts">
	import EventTimer from '$lib/components/EventTimer.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import resetData from './reset.json';
	import { Reset, ResetInterval, ResetTask } from './Reset.svelte';

	let reset = $state(new Reset(resetData));

	let overlayOpen = $state(false);

	let filter = $state('');

	function toggleOverlay() {
		overlayOpen = !overlayOpen;
	}
</script>

<div class="flex w-full items-center gap-8 self-center p-4">
	<div class="flex grow flex-col">
		<div class="text-3xl">Reset</div>
		<div>unter</div>
	</div>

	<div class="grid grid-flow-col grid-cols-[auto_auto] gap-4 sm:grid-cols-[auto_auto_auto_auto]">
		{#each reset.intervals as interval}
			<div class="flex flex-col text-end">
				<div class="text-sm">{interval.timer}</div>
				<Timer time={interval.time} />
			</div>
		{/each}
		<button class="btn btn-outline" onclick={toggleOverlay}>
			<i class="fa-solid fa-gear"></i>
			<span class="max-sm:hidden">Settings</span>
		</button>
		<button class="btn btn-primary">
			<i class="fa-solid fa-question"></i>
			<span class="max-sm:hidden">Info</span>
		</button>
	</div>
</div>

<div class="flex grow flex-col items-center self-center p-2">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
		{#each reset.intervals as interval}
			<div class="flex w-full flex-col gap-2">
				<div class="px-4">
					{interval.tasks} ({interval.categories
						.flatMap((c) => c.tasks)
						.filter((t) => t.display && t.checked).length}/{interval.categories
						.flatMap((c) => c.tasks)
						.filter((t) => t.display).length})
				</div>

				<div
					class={interval.id === 'weekly'
						? 'columns-1'
						: 'columns-1 gap-2 lg:columns-2 xl:columns-3'}
				>
					<div class="grid grid-cols-[auto_auto_1fr_auto]">
						{#each interval.categories as category: ResetCategory}
							<div
								class="col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 bg-neutral-900 {category.tasks.filter(
									(task: ResetTask) => task.display === true
								).length === 0
									? 'hidden'
									: ''}"
							>
								<button
									class="col-span-full flex items-center gap-2 rounded-sm bg-neutral-800 px-4 py-1 text-xs text-neutral-400 max-sm:py-2"
									onclick={() => category.toggleOpen()}
								>
									<i class={interval.icon}></i>
									{category.name} ({category.tasks
										.filter((task: ResetTask) => task.display === true)
										.filter((task: ResetTask) => task.checked === true)
										.length}/{category.tasks.filter((task: ResetTask) => task.display === true)
										.length})
								</button>
								<div
									class="section-content col-span-full grid grid-cols-subgrid divide-y divide-neutral-800 px-2 {category.open
										? ''
										: 'h-0'}"
								>
									{#each category.tasks.filter((task) => task.display === true) as task: ResetTask}
										<label
											class="col-span-full grid grid-cols-subgrid items-center gap-4 p-2 {task.checked
												? 'text-neutral-400 line-through'
												: ''}"
										>
											<input
												type="checkbox"
												id={task.id}
												bind:checked={task.checked}
												onchange={(e) =>
													task.setChecked(e.currentTarget.checked, interval, category)}
											/>
											<img
												class="self-center justify-self-center rounded {task.checked
													? 'size-6'
													: 'size-8'}"
												src={task.icon}
												alt={task.description}
											/>
											<div class="flex flex-col">
												<div class="text-sm">{task.name}</div>
												{#if !task.checked}
													<div class="flex flex-col text-xs text-neutral-400">
														{#if task.location}
															<div class="flex items-center gap-1.5">
																<i class="fa-solid fa-location-dot"></i>{task.location}
															</div>
														{/if}
														{#if task.description}
															<div>{task.description}</div>
														{/if}
													</div>
												{/if}
											</div>
											{#if !task.checked}
												<div class="flex flex-col items-end">
													<a
														class="text-sm text-neutral-500 transition ease-in-out hover:text-neutral-200"
														href={task.link}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={task.description}
													>
														<i class="fa-solid fa-circle-info"></i>
													</a>
													{#if task.timer}
														<EventTimer timer={task.timer} />
													{/if}
												</div>
											{/if}
										</label>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
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
											<input type="checkbox" bind:checked={task.display} />
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

	.section-content {
		transition: height 0.25s ease-in-out;
		overflow: clip;
		interpolate-size: allow-keywords;
	}

	/* TODO: Only Toggle Button */
	button:hover {
		background-color: var(--color-neutral-800);
		color: white;
	}

	label {
		cursor: pointer;
	}

	label:has(input[type='checkbox']:checked) {
	}
</style>
