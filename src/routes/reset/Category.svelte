<script lang="ts">
	import Task from './Task.svelte';
	import type { Category } from './types';
	export let category: Category;

	$: category, getNotAllChecked();

	let notAllChecked = true;

	function getNotAllChecked() {
		let tasks = 0;
		let checked = 0;

		for (let i = 0; i < category.tasks.length; i++) {
			if (category.tasks[i].display) {
				tasks++;
				if (category.tasks[i].checked) {
					checked++;
				}
			}
		}
		notAllChecked = tasks > checked;
	}
</script>

{#if category.tasks.filter((task) => task.display).length > 0}
	<div
		class="card bg-base-100 collapse-arrow collapse min-h-12 w-full shadow {!notAllChecked
			? 'opacity-50'
			: ''}"
	>
		<input type="checkbox" checked={notAllChecked} />
		<div class="collapse-title font-medium">{category.name}</div>
		<div class="collapse-content">
			<ul class="divide-base-300 divide-y">
				{#each category.tasks
					.filter((task) => task.display === true)
					.sort((a, b) => a.interval.localeCompare(b.interval)) as task}
					<Task {task} />
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	:is(.container .collapse:not(:last-child)) {
		@apply mb-2;
	}
</style>
