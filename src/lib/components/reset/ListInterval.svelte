<script lang="ts">
	import ListCategory from './ListCategory.svelte';
	import type { Interval } from '$lib/types/reset/types';

	interface Props {
		interval: Interval;
	}

	let { interval }: Props = $props();
</script>

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
			class="columns-1 gap-2 space-y-2 {interval.id === 'daily' ? 'lg:columns-2 xl:columns-3' : ''}"
		>
			{#each interval.categories as category}
				<ListCategory {category} icon={interval.class} />
			{/each}
		</div>
	</div>
{/if}
