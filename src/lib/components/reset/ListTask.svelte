<script lang="ts">
	import type { Task } from '$lib/types/reset/types';
	import { setCookie } from '$lib/functions/reset/functions.svelte';
	import EventTimer from './EventTimer.svelte';

	interface Props {
		task: Task;
	}

	let { task }: Props = $props();
</script>

{#if task.display}
	<li class="flex flex-row gap-4">
		<label class="flex w-full cursor-pointer flex-row items-center gap-2 hover:brightness-125">
			<input
				class="checkbox checkbox-lg"
				type="checkbox"
				bind:checked={task.checked}
				onchange={() => setCookie(task)}
			/>
			<img class="size-8" src={task.icon} alt={task.name} />
			<div class="flex flex-col">
				<div class="text-sm font-semibold">{task.name}</div>
				{#if task.location}
					<div class="text-xs opacity-70">
						<i class="fa-solid fa-location-dot"></i>
						{task.location}
					</div>
				{/if}
				{#if task.description}
					<div class="text-xs opacity-70">{task.description}</div>
				{/if}
			</div>
		</label>
		{#if !task.checked}
			<div class="flex flex-col justify-center">
				<div class="flex flex-row justify-end gap-1 text-sm">
					<a class="hover:opacity-50" href={task.link} title="more info" aria-label="more info">
						<i class="fa-regular fa-circle-question"></i>
					</a>
				</div>
				{#if task.timer}
					<div class="flex flex-col justify-end text-right text-xs">
						<EventTimer {task} />
					</div>
				{/if}
			</div>
		{/if}
	</li>
{/if}

<style>
	li:has(input[type='checkbox']:checked) {
		text-decoration: line-through;
		opacity: 0.5;
	}
</style>
