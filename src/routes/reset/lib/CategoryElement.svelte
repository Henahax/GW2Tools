<script lang="ts">
	import TaskElement from './TaskElement.svelte';

	import type { Category, Task } from '../types';

	let { category, icon }: Props = $props();

	interface Props {
		category: Category;
		icon: string;
	}
</script>

{#if category.tasks.filter((task:Task) => task.display).length > 0}
	<div
		class="bg-base-100 collapse-plus collapse"
		class:opacity-50={category.tasks.filter((tasks) => tasks.display && !tasks.checked).length ===
			0}
	>
		<input
			type="checkbox"
			checked={category.tasks.filter((task:Task) => task.display && !task.checked)
            .length !== 0}
		/>
		<div class="collapse-title flex flex-row items-center gap-2 font-semibold">
			<i class={icon}></i>
			{category.name}
		</div>
		<div class="collapse-content">
			<ul class="flex flex-col justify-center gap-2">
				{#each category.tasks as task}
					<TaskElement {task} />
				{/each}
			</ul>
		</div>
	</div>
{/if}
