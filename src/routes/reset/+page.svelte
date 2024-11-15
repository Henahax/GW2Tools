<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import EventTimer from '$lib/components/EventTimer.svelte';

	import type { Interval, Category, Task } from '$lib/types/types';

	import intervalsData from '$lib/data/intervals.json';
	import categoriesData from '$lib/data/categories.json';
	import tasksData from '$lib/data/tasks.json';
	import { setCookie } from '$lib/functions/functions';

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

<section class="mx-auto flex flex-col">
	<div>Test</div>
	<div class="flex w-fit flex-col gap-4 p-2 sm:flex-row">
		{#each data as interval}
			{#if interval.categories.reduce((sum, category) => sum + category.tasks.filter((task) => task.display).length, 0) > 0}
				<div class="flex flex-col gap-2">
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
						class="columns-1 gap-2 space-y-2 {interval.id === 'daily'
							? 'lg:columns-2 xl:columns-3'
							: ''}"
					>
						{#each interval.categories as category}
							{#if category.tasks.filter((task: Task) => task.display).length > 0}
								<Card.Root class="border-neutral-800 shadow-md">
									<Card.Content class="p-0">
										<Collapsible.Root open class="break-inside-avoid border-none">
											<Collapsible.Trigger asChild let:builder>
												<Button builders={[builder]} variant="ghost" size="sm" class="w-full">
													<h3 class="inline-flex w-full items-center gap-2">
														<i class={interval.class}></i>
														{category.name}
													</h3>
												</Button>
											</Collapsible.Trigger>
											<Collapsible.Content>
												<ul class="flex flex-col justify-center divide-y divide-neutral-800 px-2 py-1">
													{#each category.tasks as task}
														<li class="flex flex-row items-center gap-2 p-1">
															<label class="flex grow cursor-pointer flex-row items-center gap-3 {task.checked ? 'opacity-50' : ''}">
																<Checkbox
																	bind:checked={task.checked}
																	onchange={setCookie(task)}
																	class="mx-1 scale-150 border-neutral-500"
																/>
																<img class="size-8 rounded" src={task.icon} alt={task.name} />
																<div class="flex flex-col">
																	<div class="text-sm font-semibold { task.checked ? 'line-through' : '' }">{task.name}</div>
																	{#if !task.checked}
																		{#if task.description}
																			<div class="text-xs opacity-70">{task.description}</div>
																		{/if}
																		{#if task.location}
																			<div class="text-xs opacity-70">
																				<i class="fa-solid fa-location-dot"></i>
																				{task.location}
																			</div>
																		{/if}
																	{/if}
																</div>
															</label>
															{#if !task.checked}
																<div class="flex flex-col justify-center">
																	<div class="flex flex-row justify-end gap-1 text-sm">
																		<a
																			class="hover:opacity-50"
																			href={task.link}
																			title="more info"
																			aria-label="more info"
																		>
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
													{/each}
												</ul>
											</Collapsible.Content>
										</Collapsible.Root>
									</Card.Content>
								</Card.Root>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style>
	ul li:hover {
		filter: brightness(1.1);
	}
</style>
