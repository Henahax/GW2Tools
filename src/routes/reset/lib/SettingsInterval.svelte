<script lang="ts">
	import SettingsCategory from './SettingsCategory.svelte';
	import type { Interval } from '../types';

	interface Props {
		interval: Interval;
		filter: string;
	}

	let { interval, filter }: Props = $props();
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-lg font-bold">{interval.tasks}:</h3>
	<div class="flex flex-col gap-4">
		{#each interval.categories.filter((category) => category.tasks.some((task) => task.name
						.toLowerCase()
						.includes(filter.toLowerCase()) || (task.location && task.location
							.toLowerCase()
							.includes(filter.toLowerCase())) || (task.description && task.description
							.toLowerCase()
							.includes(filter.toLowerCase())))) as category}
			<SettingsCategory {category} {filter} />
		{/each}
	</div>
</div>
