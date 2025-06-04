<script lang="ts">
	import { ResetTask, ResetCategory, ResetInterval } from '../../../routes/reset/Reset.svelte';
	import Task from './Task.svelte';

	let { interval, category } = $props<{
		category: ResetCategory;
		interval: ResetInterval;
		currentTime: number;
	}>();

	let displayedTasks = $derived(category.tasks.filter((task: ResetTask) => task.display === true));
	let checkedDisplayedTasks = $derived(
		displayedTasks.filter((task: ResetTask) => task.checked === true)
	);
	let allDisplayedTasksChecked = $derived(
		displayedTasks.length > 0 && checkedDisplayedTasks.length === displayedTasks.length
	);
</script>

<div
	class="category col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 shadow-md"
	class:hidden={displayedTasks.length === 0}
>
	<button
		class="col-span-full flex items-center gap-2 rounded border border-neutral-700 py-1 pl-3.5 pr-2.5 text-xs backdrop-blur-md"
		onclick={() => category.toggleOpen()}
	>
		{#if allDisplayedTasksChecked}
			<i class="fa-solid fa-check"></i>
		{:else}
			<i class={interval.icon}></i>
		{/if}

		<div class="grow text-left">
			{category.name} ({checkedDisplayedTasks.length}/{displayedTasks.length})
		</div>
		{#if allDisplayedTasksChecked}
			<i class="fa-solid fa-check"></i>
		{/if}
	</button>
	<div
		class="items col-span-full grid grid-cols-subgrid divide-y divide-neutral-800"
		class:closed={!category.open}
	>
		{#if category.open}
			{#each category.tasks.filter((task: ResetTask) => task.display === true) as task: ResetTask}
				<Task {task} {interval} {category} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.category button:hover {
		border: 1px solid var(--color-neutral-500);
	}

	.category:has(button:hover) {
		border: 1px solid var(--color-neutral-500);
	}

	.items {
		background-color: var(--card-background);
		transform-origin: top;
		transition:
			transform 0.25s ease-in-out,
			opacity 0.25s ease-in-out;
		will-change: transform, opacity;
	}

	.items.closed {
		transform: scaleY(0);
		opacity: 0;
	}
</style>
