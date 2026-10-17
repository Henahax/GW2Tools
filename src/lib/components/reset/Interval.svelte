<script lang="ts">
	import { ResetTask, ResetCategory, ResetInterval } from '../../../routes/reset/Reset.svelte';
	import Category from './Category.svelte';

	let { interval }: {
		interval: ResetInterval;
	} = $props();
</script>

<div class="flex w-full flex-col gap-2">
	<div class="px-4">
		{interval.tasks} ({interval.categories
			.flatMap((category: ResetCategory) => category.tasks)
			.filter((task: ResetTask) => task.display && task.checked).length}/{interval.categories
			.flatMap((category: ResetCategory) => category.tasks)
			.filter((task: ResetTask) => task.display).length})
	</div>
	<div
		class={interval.id === 'weekly' ? 'columns-1' : 'columns-1 gap-2 lg:columns-2 2xl:columns-3'}
	>
		{#each interval.categories as category (category.id)}
			<Category {category} {interval} />
		{/each}
	</div>
</div>
