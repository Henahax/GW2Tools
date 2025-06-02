<script lang="ts">
	import { ResetTask, ResetCategory, ResetInterval } from '../../../routes/reset/Reset.svelte';
	import Task from './Task.svelte';

	let { interval, category, currentTime } = $props<{
		category: ResetCategory;
		interval: ResetInterval;
		currentTime: number;
	}>();
</script>

<div
	class="col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 shadow-md

 {category.tasks.filter((task: ResetTask) => task.display === true).length === 0 ? 'hidden' : ''}"
>
	<!-- todo: check if done -->
	<button
		class="col-span-full flex items-center gap-2 rounded border border-neutral-700 py-1 pl-3.5 pr-2.5 text-xs backdrop-blur-md hover:border-neutral-500"
		onclick={() => category.toggleOpen()}
	>
		{#if category.tasks
			.filter((task: ResetTask) => task.display === true)
			.filter((task: ResetTask) => task.checked === true).length === category.tasks.filter((task: ResetTask) => task.display === true).length}
			<i class="fa-solid fa-check"></i>
		{:else}
			<i class={interval.icon}></i>
		{/if}

		<div class="grow text-left">
			{category.name} ({category.tasks
				.filter((task: ResetTask) => task.display === true)
				.filter((task: ResetTask) => task.checked === true).length}/{category.tasks.filter(
				(task: ResetTask) => task.display === true
			).length})
		</div>
		{#if category.tasks
			.filter((task: ResetTask) => task.display === true)
			.filter((task: ResetTask) => task.checked === true).length === category.tasks.filter((task: ResetTask) => task.display === true).length}
			<i class="fa-solid fa-check"></i>
		{/if}
	</button>
	<div
		class="section-content col-span-full grid grid-cols-subgrid divide-y divide-neutral-800 {category.open
			? ''
			: 'h-0'}"
	>
		{#each category.tasks.filter((task: ResetTask) => task.display === true) as task: ResetTask}
			<Task {task} {interval} {category} {currentTime} />
		{/each}
	</div>
</div>

<style>
	.section-content {
		background-color: var(--card-background);
		transition: height 0.25s ease-in-out;
		transition: width 0.25s ease-in-out;
		overflow: clip;
		interpolate-size: allow-keywords;
	}
</style>
