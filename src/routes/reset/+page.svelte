<script lang="ts">
	import Title from '$lib/components/Title.svelte';

	import type { Interval, Category, Task } from '$lib/types/reset/types';
	import IntervalTimer from '$lib/components/reset/IntervalTimer.svelte';
	import ListInterval from '$lib/components/reset/ListInterval.svelte';
	import SettingsInterval from '$lib/components/reset/SettingsInterval.svelte';
	import intervalsData from '$lib/data/reset/intervals.json';
	import categoriesData from '$lib/data/reset/categories.json';
	import tasksData from '$lib/data/reset/tasks.json';

	const intervals: Interval[] = intervalsData as Interval[];
	const categories: Category[] = categoriesData as Category[];
	const tasks: Task[] = tasksData as Task[];

	let filter = $state('');
	let data = $state([] as Interval[]);

	function init() {
		let initData = [] as Interval[];

		// Parse cookies
		const cookies = document.cookie.split('; ').map((cookie) => {
			const [name, value] = cookie.split('=');
			const [namespace, subname] = name.split('.');
			return { namespace, subname, value };
		});

		intervals.forEach((interval: Interval) => {
			// Clone the interval object to avoid mutating the original
			let newInterval = { ...(interval as Interval) };
			let myCategories = [] as Category[];

			categories.forEach((category: Category) => {
				// Clone the category object to avoid mutating the original
				let newCategory = { ...(category as Category) };
				let myTasks = [] as Task[];

				tasks.forEach((task: Task) => {
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
				initData.push(newInterval);
			}
		});

		// Assign the processed data to the global `data` variable
		data = initData;
	}

	$effect(() => {
		init();
	});
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
				<ListInterval {interval} />
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
						✕
					</label>
				</div>

				<label class="input input-bordered flex w-full items-center gap-2">
					<i class="fa-solid fa-magnifying-glass"></i>
					<input type="text" class="grow" placeholder="Search" bind:value={filter} />
				</label>
			</div>

			<div class="flex w-full flex-col gap-8 overflow-y-auto p-4">
				{#each data.filter( (interval:Interval) => interval.categories.some( (category) => category.tasks.some((task) => task.name
											.toLowerCase()
											.includes(filter.toLowerCase()) || (task.location && task.location
												.toLowerCase()
												.includes(filter.toLowerCase())) || (task.description && task.description
												.toLowerCase()
												.includes(filter.toLowerCase()))) ) ) as interval}
					<SettingsInterval {interval} {filter} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.info-grid {
		grid-template-columns: fit-content(0) 1fr;
	}
</style>
