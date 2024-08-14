<script lang="ts">
	import Title from '$lib/Title.svelte';
	import taskList from './tasks.json';
	import categories from './categories.json';
	import type { Task } from './types';
	import IntervalTimer from './IntervalTimer.svelte';
	import EventTimer from './EventTimer.svelte';

	let tasks: Task[] = $state(taskList as Task[]);
	let filter = $state('');

	let intervals = [
		{
			id: 'daily',
			timer: 'Daily:',
			tasks: 'Daily Tasks:',
			reset: 'resets daily',
			class: 'fa-regular fa-clock'
		},
		{
			id: 'weekly',
			timer: 'Weekly:',
			tasks: 'Weekly Tasks:',
			reset: 'resets weekly',
			class: 'fa-regular fa-calendar'
		}
	];
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
							<div>{interval.timer}</div>
							<IntervalTimer interval={interval.id}/>
						</div>
					{/each}
				</div>
				<div class="flex flex-col gap-2 sm:flex-row">
					<label for="my-drawer" class="btn btn-outline max-md:btn-square">
						<i class="fa-solid fa-gear"></i>
						<div class="max-md:hidden">Settings</div>
					</label>
					<button class="btn btn-primary max-md:btn-square">
						<i class="fa-solid fa-question"></i>
						<div class="max-md:hidden">Info</div>
					</button>
				</div>
			</div>
		</Title>

		<div class="mx-auto flex w-full flex-col justify-center gap-4 px-2 sm:flex-row">
			{#each intervals as interval}
				<div>
					<h3 class="p-2 text-lg font-bold">
						{interval.tasks}
					</h3>
					<div
						class="columns-1 gap-2 {interval.id === 'daily' ? 'xl:columns-2 2xl:columns-3' : ''}"
					>
						{#each categories as category}
							<div
								class="collapse-arrow bg-base-300 collapse border border-neutral-700 shadow-xl"
								class:opacity-50={tasks.filter(
									(task) =>
										task.interval === interval.id &&
										task.category === category.id &&
										task.display &&
										!task.checked
								).length === 0}
							>
								<input
									class="collapse-checkbox"
									type="checkbox"
									title={interval.reset}
									checked={tasks.filter(
										(task) =>
											task.interval === interval.id &&
											task.category === category.id &&
											task.display &&
											!task.checked
									).length > 0}
								/>
								<div class="collapse-title flex items-center gap-2 font-bold">
									<i class={interval.class}></i>
									{category.name}
								</div>
								<div class="collapse-content">
									<ul class="flex flex-col divide-y divide-neutral-700">
										{#each tasks.filter((task) => task.interval === interval.id && task.category === category.id && task.display) as task}
											<li class="flex flex-row items-center gap-2 py-1">
												<label class="flex w-full flex-row items-center gap-2">
													<input
														class="checkbox checkbox-lg"
														type="checkbox"
														bind:checked={task.checked}
													/>
													<img src={task.icon} alt={task.name} class="size-8" />
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
												<div class="flex flex-col">
													<div class="flex flex-row justify-end gap-1 text-sm">
														<a href={task.link} title="more info">
															<i class="fa-regular fa-circle-question"></i>
														</a>
														<!-- TODO: alarm
														{#if task.timer}
															<button title="set alarm">
																<i class="fa-regular fa-bell"></i>
															</button>
														{/if}
														-->
													</div>
													{#if task.timer}
														<div class="flex flex-col justify-end text-right text-xs">
															<EventTimer task={task}/>
														</div>
													{/if}
												</div>
												{/if}
											</li>
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

			<div class="flex w-full flex-col gap-4 overflow-y-auto p-4">
				{#each intervals.reverse() as interval}
					<div class="settingsInterval">
						<h3 class="text-lg font-bold">{interval.tasks}</h3>
						<div class="flex flex-col gap-2">
							{#each categories as category}
								<div class="settingsCategory">
									<h4 class="text-md">{category.name}</h4>
									<ul class="divide-y divide-neutral-700">
										{#each tasks.filter((task) => task.interval === interval.id && task.category === category.id && (task.name
													.toLowerCase()
													.includes(filter.toLowerCase()) || (task.description && task.description
															.toLowerCase()
															.includes(filter.toLowerCase())) || (task.location && task.location
															.toLowerCase()
															.includes(filter.toLowerCase())))) as task}
											<li class="py-1">
												<label class="flex flex-row items-center gap-2">
													<input class="checkbox" type="checkbox" bind:checked={task.display} />
													<img class="size-8" src={task.icon} alt={task.id} />
													<div class="flex flex-col items-start">
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
											</li>
										{/each}
									</ul>
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
	.settingsInterval:not(:has(input[type='checkbox'])),
	.settingsCategory:not(:has(input[type='checkbox'])),
	.collapse:not(:has(li)) {
		display: none;
	}

	.collapse:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.collapse-content li:first-child {
		padding-top: 0;
	}

	.collapse-content li:last-child {
		padding-bottom: 0;
	}

	.collapse-content li:has(input[type='checkbox']:checked) {
		text-decoration: line-through;
		opacity: 0.5;
	}
</style>
