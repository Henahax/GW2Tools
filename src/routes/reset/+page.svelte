<script lang="ts">
	import Title from '$lib/Title.svelte';
	import taskList from './tasks.json';
	import categories from './categories.json';

	let tasks = $state(taskList);

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

	/*
    dailies / weeklies split

    categories:
    - id
    - name
    - index

    tasks:
    - id
    - category
    - name
    - location (location, vendor name) / info (items: consumes...) use for sorting
    - interval
    - icon
    - link
	 */
</script>

<svelte:head>
	<title>GW2Tools: Reset</title>
</svelte:head>

<Title
	title="Reset Checklist"
	subtitle="Choose displayed timegated tasks in the options menu and track progress"
>
	<div class="flex flex-row items-center gap-4">
		<div class="flex flex-col gap-4 sm:flex-row">
			{#each intervals as interval}
				<div class="flex flex-col text-right">
					<div>{interval.timer}</div>
					<div>00:00:00</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-col gap-4 sm:flex-row">
			<button class="btn btn-outline max-md:btn-square">
				<i class="fa-solid fa-gear"></i>
				<div class="max-md:hidden">Settings</div>
			</button>
			<button class="btn btn-primary max-md:btn-square">
				<i class="fa-solid fa-question"></i>
				<div class="max-md:hidden">Info</div>
			</button>
		</div>
	</div>
</Title>

<div class="mx-auto flex w-full flex-col justify-center gap-4 px-4 sm:flex-row">
	{#each intervals as interval}
		<div>
			<h2 class="py-2 text-lg font-semibold">
				{interval.tasks}
			</h2>
			<div class="columns-1 gap-2 {interval.id === 'daily' ? 'xl:columns-2 2xl:columns-3' : ''}">
				{#each categories as category}
					<div class="collapse-arrow bg-base-200 collapse border border-neutral-700 shadow">
						<input class="collapse-checkbox" type="checkbox" title={interval.reset} checked />
						<div class="collapse-title flex items-center gap-2 font-bold">
							<i class={interval.class}></i>
							{category.name}
						</div>
						<div class="collapse-content">
							<ul class="flex flex-col divide-y divide-neutral-700">
								{#each tasks.filter((t) => t.interval === interval.id && t.category === category.id) as task}
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
												<div class="text-xs opacity-70">{task.info}</div>
											</div>
										</label>
										<div class="flex flex-col">
											<div class="flex flex-row justify-end gap-1 text-sm">
												<a href={task.link} title="more info">
													<i class="fa-regular fa-circle-question"></i>
												</a>
												{#if task.timer}
													<button title="set alarm">
														<i class="fa-regular fa-bell"></i>
													</button>
												{/if}
											</div>
											{#if task.timer}
												<div class="flex flex-col justify-end text-right text-xs">
													<div>TimerDesc</div>
													<div></div>
												</div>
											{/if}
										</div>
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

<style>
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
</style>
