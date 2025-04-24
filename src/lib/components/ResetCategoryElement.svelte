<script lang="ts">
	import { ResetTask } from '../../routes/reset/Reset.svelte';

	let { children, category, icon } = $props();
</script>

<div
	class="col-span-full grid break-inside-avoid grid-cols-subgrid rounded-sm border border-neutral-800 bg-neutral-900 {category.tasks.filter(
		(task: ResetTask) => task.display === true
	).length === 0
		? 'hidden'
		: ''}"
>
	<button
		class="col-span-full flex items-center gap-2 rounded-sm bg-neutral-800 px-4 py-1 text-xs text-neutral-400 max-sm:py-2"
		onclick={() => category.toggleOpen()}
	>
		<i class={icon}></i>
		{category.name} ({category.tasks
			.filter((task: ResetTask) => task.display === true)
			.filter((task: ResetTask) => task.checked === true).length}/{category.tasks.filter(
			(task: ResetTask) => task.display === true
		).length})
	</button>
	<div
		class="section-content col-span-full grid grid-cols-subgrid divide-y divide-neutral-800 px-2 {category.open
			? ''
			: 'h-0'}"
	>
		{@render children()}
	</div>
</div>

<style>
	.section-content {
		transition: height 0.25s ease;
		overflow: clip;
		interpolate-size: allow-keywords;
	}

	button:hover {
		background-color: var(--color-neutral-800);
		color: white;
	}
</style>
