<script lang="ts">
	import Title from '$lib/Title.svelte';
	import type { Task } from './types';
	import { getUTCTimeForStartOfNextDay, getUTCTimeForStartOfNextWeek } from './functions.svelte';
	import IntervalTimer from './IntervalTimer.svelte';
	import EventTimer from './EventTimer.svelte';
	import intervals from './intervals.json';
	import categories from './categories.json';
	import tasks from './tasks.json';

	// TODO: Cookies!

	let filter = $state('');
	let data = $state([] as any);

	function init() {
		let test = [] as any;

		// Parse cookies
		const cookies = document.cookie.split('; ').map((cookie) => {
			const [name, value] = cookie.split('=');
			const [namespace, subname] = name.split('.');
			return { namespace, subname, value };
		});

		intervals.forEach((interval) => {
			// Clone the interval object to avoid mutating the original
			let newInterval = { ...interval };
			let myCategories = [];

			categories.forEach((category) => {
				// Clone the category object to avoid mutating the original
				let newCategory = { ...category };
				let myTasks = [];

				tasks.forEach((task) => {
					if (task.interval === interval.id && task.category === category.id) {
						cookies.forEach(({ namespace, subname, value }) => {
							if (namespace === task.id) {
								if (subname === 'display') {
									task.display = value === 'true';
								} else if (subname === 'checked') {
									task.checked = value === 'true';
								}
							}
						});
						myTasks.push(task);
					}
				});

				if (myTasks.length > 0) {
					newCategory.tasks = myTasks; // Assign tasks to the cloned category
					myCategories.push(newCategory);
				}
			});

			if (myCategories.length > 0) {
				newInterval.categories = myCategories;
				test.push(newInterval);
			}
		});

		// Assign the processed data to the global `data` variable
		data = test;
	}

	$effect(() => {
		//getCookieValues(tasks);
		init();
	});

	function getCookieValues(tasks: Task[]) {
		const cookies = document.cookie.split('; ').map((cookie) => {
			const [name, value] = cookie.split('=');
			const [namespace, subname] = name.split('.');
			return { namespace, subname, value };
		});

		tasks.forEach((task) => {
			cookies.forEach(({ namespace, subname, value }) => {
				if (namespace === task.id) {
					if (subname === 'display') {
						task.display = value === 'true';
					} else if (subname === 'checked') {
						task.checked = value === 'true';
					}
				}
			});
		});
	}

	async function setCookie(task: Task, isSetting = false) {
		let time = new Date().getTime();
		let suffix: string;
		let value: boolean;
		if (isSetting) {
			value = Boolean(task.display);
			suffix = '.display';
			time += 365 * 24 * 60 * 60 * 1000;
		} else {
			value = Boolean(task.checked);
			suffix = '.checked';
			switch (task.interval) {
				case 'daily': {
					time = getUTCTimeForStartOfNextDay().getTime();
					break;
				}
				case 'weekly': {
					time = getUTCTimeForStartOfNextWeek().getTime();
					break;
				}
				default: {
					return;
				}
			}
		}
		document.cookie =
			task.id + suffix + '=' + value + ';expires=' + new Date(time).toUTCString() + ';path=/';
	}
</script>

<svelte:head>
	<title>GW2Tools: Reset</title>
</svelte:head>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<Title
			title="Reset Checklist"
			subtitle="Choose displayed time-gated tasks in the options menu and track progress"
		>
			<div class="flex flex-row items-center gap-4">
				<div class="flex flex-col gap-4 sm:flex-row">
					{#each intervals as interval}
						<div class="flex flex-col text-right">
							<div>{interval.timer}:</div>
							<IntervalTimer interval={interval.id} />
						</div>
					{/each}
				</div>
				<div class="flex flex-col gap-2 sm:flex-row">
					<label for="my-drawer" class="btn btn-outline max-md:btn-square">
						<i class="fa-solid fa-gear"></i>
						<div class="max-md:hidden">Settings</div>
					</label>
					<button class="btn btn-primary max-md:btn-square" onclick={infoModalReset.showModal()}>
						<i class="fa-solid fa-question"></i>
						<div class="max-md:hidden">Info</div>
					</button>
				</div>
			</div>
		</Title>

		<dialog id="infoModalReset" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box">
				<form method="dialog">
					<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 class="text-lg font-bold">Instructions</h3>
				<div class="info-grid grid items-center gap-4 p-4">
					<div class="flex items-center justify-center text-2xl">
						<i class="fa-solid fa-gear"></i>
					</div>

					<div class="flex flex-col">
						<p>select displayed tasks</p>
						<p class="text-xs opacity-50">items, vendors, actions, events</p>
					</div>

					<div class="flex items-center justify-center text-2xl">
						<i class="fa-solid fa-square-check"></i>
					</div>
					<div class="flex flex-col">
						<p>check completed tasks</p>
						<p class="text-xs opacity-50">tasks will reset on daily/weeky reset</p>
					</div>

					<div class="flex items-center justify-center text-2xl">
						<i class="fa-regular fa-circle-question"></i>
					</div>
					<div class="flex flex-col">
						<p>link to relevant information</p>
						<p class="text-xs opacity-50">wiki, calculators</p>
					</div>
					<div class="flex items-center justify-center">
						<span class="countdown font-mono">00:13:37</span>
					</div>
					<div class="flex flex-col">
						<p>countdown to next event</p>
						<div class="flex flex-row gap-4 text-xs opacity-50">
							<div class="flex items-center gap-2">
								<i class="fa-solid fa-play"></i><span>active</span>
							</div>
							<div class="flex items-center gap-2">
								<i class="fa-solid fa-stopwatch"></i><span>soon</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>

		<div class="mx-auto flex w-full flex-col justify-center gap-4 px-2 pb-2 sm:flex-row">
			{#each data as interval}
				<div class="test flex flex-col gap-2">
					<h2 class="px-2 text-lg font-bold">
						{#if interval && interval.categories}
							{interval.tasks}
							({interval.categories.reduce(
								(sum, category) =>
									sum + category.tasks.filter((task) => task.checked && task.display).length,
								0
							)}/{interval.categories.reduce(
								(sum, category) => sum + category.tasks.filter((task) => task.display).length,
								0
							)}):
						{/if}
					</h2>

					<div
						class="columns-1 gap-2 {interval.id === 'daily' ? 'xl:columns-2 2xl:columns-3' : ''}"
					>
						{#each interval.categories as category}
							<div
								class="bg-base-100 collapse-plus collapse"
								class:opacity-50={category.tasks.filter((tasks) => tasks.display && !tasks.checked)
									.length === 0}
							>
								<input
									type="checkbox"
									checked={category.tasks.filter((tasks) => tasks.display && !tasks.checked)
										.length !== 0}
								/>
								<div class="collapse-title flex flex-row items-center gap-2 font-semibold">
									<i class={interval.class}></i>
									{category.name}
								</div>
								<div class="collapse-content">
									<ul class="flex flex-col justify-center gap-2">
										{#each category.tasks as task}
											{#if task.display}
												<li class="flex flex-row gap-4">
													<label
														class="flex w-full cursor-pointer flex-row items-center gap-2 hover:brightness-125"
													>
														<input
															class="checkbox checkbox-lg"
															type="checkbox"
															bind:checked={task.checked}
														/>
														<img class="size-8" src={task.icon} alt={task.name} />
														<div class="flex flex-col">
															<div class="text-sm font-semibold">{task.name}</div>
															{#if task.location}
																<div class="text-xs opacity-70">
																	<i class="fa-solid fa-location-dot"></i>
																	{task.location}
																</div>
															{/if}
															{#if task.description}
																<div class="text-xs opacity-70">{task.description}</div>
															{/if}
														</div>
													</label>
													{#if !task.checked}
														<div class="flex flex-col justify-center">
															<div class="flex flex-row justify-end gap-1 text-sm">
																<a class="hover:opacity-50" href={task.link} title="more info">
																	<i class="fa-regular fa-circle-question"></i>
																</a>
															</div>
															{#if task.timer}
																<div class="flex flex-col justify-end text-right text-xs">
																	<EventTimer {task} />
																</div>
															{/if}
														</div>
													{/if}
												</li>
											{/if}
										{/each}
									</ul>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="drawer-side z-50">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

		<div class="bg-base-300 text-base-content flex h-full flex-col">
			<div class="flex w-full flex-col gap-2 p-4">
				<div class="flex flex-row items-center justify-between gap-4">
					<h2 class="text-xl">Displayed Tasks</h2>
					<label for="my-drawer" aria-label="close sidebar" class="btn btn-ghost btn-xs btn-square">
						<i class="fa-solid fa-xmark"></i>
					</label>
				</div>

				<label class="input input-bordered flex w-full items-center gap-2">
					<i class="fa-solid fa-magnifying-glass"></i>
					<input type="text" class="grow" placeholder="Search" bind:value={filter} />
				</label>
			</div>

			<!-- TODO: Filter -->

			<div class="flex w-full flex-col gap-8 overflow-y-auto p-4">
				{#each data.filter( (interval) => interval.categories.some( (category) => category.tasks.some((task) => task.name
											.toLowerCase()
											.includes(filter.toLowerCase()) || (task.location && task.location
												.toLowerCase()
												.includes(filter.toLowerCase())) || (task.description && task.description
												.toLowerCase()
												.includes(filter.toLowerCase()))) ) ) as interval}
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-bold">{interval.tasks}:</h3>
						<div class="flex flex-col gap-4">
							{#each interval.categories.filter( (category) => category.tasks.some((task) => task.name
												.toLowerCase()
												.includes(filter.toLowerCase()) || (task.location && task.location
													.toLowerCase()
													.includes(filter.toLowerCase())) || (task.description && task.description
													.toLowerCase()
													.includes(filter.toLowerCase()))) ) as category}
								<div>
									<div class="font-semibold">{category.name}</div>
									<div class="flex flex-col justify-center">
										{#each category.tasks.filter((task) => task.name
													.toLowerCase()
													.includes(filter.toLowerCase()) || (task.location && task.location
														.toLowerCase()
														.includes(filter.toLowerCase())) || (task.description && task.description
														.toLowerCase()
														.includes(filter.toLowerCase()))) as task}
											<label class="flex flex-row items-center gap-2 py-1 hover:brightness-125">
												<input class="checkbox" type="checkbox" bind:checked={task.display} />
												<img class="size-8" src={task.icon} alt={task.name} />
												<div class="flex flex-col justify-center">
													<div class="text-sm">{task.name}</div>
													{#if task.location}
														<div class="text-xs opacity-50">
															<i class="fa-solid fa-location-dot"></i>
															{task.location}
														</div>
													{/if}
													{#if task.description}
														<div class="text-xs opacity-50">
															{task.description}
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
</div>

<style>
	.collapse:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.collapse-content li:has(input[type='checkbox']:checked) {
		text-decoration: line-through;
		opacity: 0.5;
	}

	.info-grid {
		grid-template-columns: fit-content(0) 1fr;
	}
</style>
