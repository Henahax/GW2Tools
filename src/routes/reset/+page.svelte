<script lang="ts">
	import ResetCategoryElement from '$lib/components/ResetCategoryElement.svelte';
	import resetData from './reset.json';
	import { Reset } from './Reset.svelte';

	let reset = $state(new Reset(resetData));

	let overlayOpen = $state(false);

	let filter = $state('');

	function toggleOverlay() {
		console.log('aaa');
		overlayOpen = !overlayOpen;
	}
</script>

<div class="flex items-center gap-8 p-4">
	<div class="flex grow flex-col">
		<div class="text-3xl">Reset</div>
		<div>unter</div>
	</div>

	<div class="grid grid-flow-col grid-cols-[auto_auto] gap-4 sm:grid-cols-[auto_auto_auto_auto]">
		<div class="flex flex-col text-end">
			<div class="text-sm">Weekly:</div>
			<div>zeit</div>
		</div>
		<div class="flex flex-col text-end">
			<div class="text-sm">Daily:</div>
			<div>zeit</div>
		</div>
		<button class="btn btn-outline max-sm:btn-square" onclick={toggleOverlay}>
			<i class="fa-solid fa-gear"></i>
			<span class="max-sm:hidden">Settings</span>
		</button>
		<button class="btn btn-primary max-sm:btn-square">
			<i class="fa-solid fa-question"></i>
			<span class="max-sm:hidden">Info</span>
		</button>
	</div>
</div>

<div class="flex grow flex-col items-center p-2">
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
							<ResetCategoryElement {category} icon={interval.icon}>
								{#each category.tasks.filter((task) => task.display === true) as task: ResetTask}
									<label class="col-span-full grid grid-cols-subgrid items-center gap-4 p-2">
										<input
											type="checkbox"
											id={task.id}
											bind:checked={task.checked}
											onchange={(e) => task.setChecked(e.currentTarget.checked, interval, category)}
										/>
										<img class="size-8 rounded" src={task.icon} alt={task.description} />
										<div class="flex flex-col">
											<div class="text-sm">{task.name}</div>
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
										</div>
										<div>
											<a
												class="text-sm text-neutral-400"
												href={task.link}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={task.description}
											>
												<i class="fa-solid fa-circle-info"></i>
											</a>
										</div>
									</label>
								{/each}
							</ResetCategoryElement>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<div
	class="absolute bottom-0 right-0 top-0 flex h-dvh w-dvw justify-end border border-neutral-800 {overlayOpen
		? ''
		: 'hidden'}"
>
	<label class="overlay backdrop-blur-xs grow" for="closeResetMenu"></label>
	<div class="menu flex h-dvh w-fit flex-col bg-green-500">
		<div class="p-4">
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
		<div class="flex flex-col gap-4 overflow-y-auto p-4">
			{#each reset.intervals as interval}
				<div>
					<div class="text-lg font-bold">{interval.timer}</div>
					<div class="flex flex-col gap-2">
						{#each interval.categories as category: ResetCategory}
							<div>
								<div class="font-semibold">{category.name}</div>
								<div class="flex flex-col gap-1">
									{#each category.tasks.filter((task) => task.name
												.toLowerCase()
												.includes(filter.toLowerCase()) || (task.location && task.location
													.toLowerCase()
													.includes(filter.toLowerCase())) || (task.description && task.description
													.toLowerCase()
													.includes(filter.toLowerCase()))) as task: ResetTask}
										<label class="grid grid-cols-[auto_auto_1fr] items-center gap-2">
											<input type="checkbox" bind:checked={task.display} />
											<img class="size-8 rounded" src={task.icon} alt={task.name} />
											<div class="flex flex-col">
												<div class="text-sm">{task.name}</div>
												{#if task.location}
													<div class="flex items-center gap-1.5 text-xs">
														<i class="fa-solid fa-location-dot"></i>{task.location}
													</div>
												{/if}
												{#if task.description}
													<div class="text-xs">{task.description}</div>
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
		z-index: 50;
	}

	/* TODO */
	.menu {
		transition: width 0.25s ease;
		overflow: clip;
		interpolate-size: allow-keywords;
	}

	a:hover {
		color: var(--color-neutral-400);
	}
</style>
