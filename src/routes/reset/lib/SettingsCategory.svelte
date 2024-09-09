<script lang="ts">
	import SettingsTask from './SettingsTask.svelte';
	import type { Category } from '../types';

	interface Props {
		category: Category;
		filter: string;
	}

	let { category, filter }: Props = $props();
</script>

<div>
	<div class="font-semibold">{category.name}</div>
	<div class="flex flex-col justify-center">
		{#each category.tasks.filter((task) => task.name
					.toLowerCase()
					.includes(filter.toLowerCase()) || (task.location && task.location
						.toLowerCase()
						.includes(filter.toLowerCase())) || (task.description && task.description
						.toLowerCase()
						.includes(filter.toLowerCase()))) as task}
			<SettingsTask {task} />
		{/each}
	</div>
</div>
