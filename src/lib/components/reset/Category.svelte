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
	class="col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 bg-neutral-900 {category.tasks.filter(
		(task: ResetTask) => task.display === true
	).length === 0
		? 'hidden'
		: ''}"
>
	<button
		class="col-span-full flex items-center gap-2 rounded-sm bg-neutral-800 px-3.5 py-1 text-xs text-neutral-400"
		onclick={() => category.toggleOpen()}
	>
		<i class={interval.icon}></i>
		{category.name} ({category.tasks
			.filter((task: ResetTask) => task.display === true)
			.filter((task: ResetTask) => task.checked === true).length}/{category.tasks.filter(
			(task: ResetTask) => task.display === true
		).length})
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
		transition: height 0.25s ease-in-out;
		transition: width 0.25s ease-in-out;
		overflow: clip;
		interpolate-size: allow-keywords;
	}
</style>
