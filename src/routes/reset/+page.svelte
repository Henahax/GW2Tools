<script lang="ts">
	import CategoryElement from '$lib/components/CategoryElement.svelte';

	import type { Interval, Category, Task } from '$lib/types/types';

	import intervalsData from '$lib/data/intervals.json';
	import categoriesData from '$lib/data/categories.json';
	import tasksData from '$lib/data/tasks.json';

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

<div class="flex flex-col gap-8 p-4 sm:flex-row">
	{#each data as interval}
		<div class="flex flex-col {interval.id === 'weekly' ? '' : 'grow'}">
			<h3 class="p-2">{interval.tasks}:</h3>
			<div
				class="space-y-4 {interval.id === 'weekly'
					? 'columns-1'
					: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'}"
			>
				{#each interval.categories as category}
					<CategoryElement category={category}>
						<h2 slot="title">{category.name}</h2>
					</CategoryElement>
				{/each}
			</div>
		</div>
	{/each}
</div>
