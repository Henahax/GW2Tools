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
	class="collapsible col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 shadow-md"
	class:hidden={displayedTasks.length === 0}
>
	<button
		class="collapsible-header col-span-full flex items-center gap-2 rounded border border-neutral-700 py-1 pl-3.5 pr-2.5 text-xs backdrop-blur-md"
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
		class="collapsible-content col-span-full grid grid-cols-subgrid divide-y divide-neutral-800"
		class:closed={!category.open}
	>
		{#each category.tasks.filter((task: ResetTask) => task.display === true) as task: ResetTask}
			<Task {task} {interval} {category} />
		{/each}
	</div>
</div>

<style>
</style>
