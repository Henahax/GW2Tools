<script lang="ts">
	import { setCookie } from '../functions.svelte';
	import type { Task } from '../types';

	interface Props {
		task: Task;
	}

	let { task }: Props = $props();
</script>

<label class="flex flex-row items-center gap-2 py-1 hover:brightness-125">
	<input
		class="checkbox"
		type="checkbox"
		bind:checked={task.display}
		onchange={() => setCookie(task, true)}
	/>
	<img class="size-8" src={task.icon} alt={task.name} />
	<div class="flex flex-col justify-center">
		<div class="text-sm">{task.name}</div>
		{#if task.location}
			<div class="text-xs opacity-50">
				<i class="fa-solid fa-location-dot"></i>
				{task.location}
			</div>
		{/if}
		{#if task.description}
			<div class="text-xs opacity-50">
				{task.description}
			</div>
		{/if}
	</div>
</label>
