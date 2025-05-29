<script lang="ts">
	import { ResetTask, ResetCategory, ResetInterval } from '../../../routes/reset/Reset.svelte';
	import EventTimer from '$lib/components/reset/NewEventTimer.svelte';

	let { task, interval, category, currentTime } = $props<{
		task: ResetTask;
		category: ResetCategory;
		interval: ResetInterval;
		currentTime: number;
	}>();

	function copyToClipBoard(chatcode: string) {
		navigator.clipboard.writeText(chatcode);
	}
</script>

<label
	class="col-span-full flex items-center gap-4 p-2 {task.checked
		? 'text-neutral-400 line-through'
		: ''}"
>
	<input
		type="checkbox"
		id={task.id}
		bind:checked={task.checked}
		onchange={(e) => task.setChecked(e.currentTarget.checked, interval, category)}
	/>
	<img
		class="size-8 self-center justify-self-center rounded {task.checked ? 'opacity-50' : ''}"
		src={task.icon}
		alt={task.description}
	/>
	<div class="flex grow flex-col gap-0.5">
		<div class="text-xs">{task.name}</div>
		<div class="flex flex-col text-xs text-neutral-400">
			{#if task.location}
				<div class="flex items-center gap-1.5">
					<i class="fa-solid fa-location-dot"></i>{task.location}
				</div>
			{/if}
			{#if task.description}
				<div>{task.description}</div>
			{/if}
		</div>
	</div>

	<div class="flex items-center gap-2 text-xs">
		{#if !task.checked}
			{#if task.timer}
				<EventTimer timer={task.timer} />
			{/if}
		{/if}

		<div class="flex items-center gap-1">
			{#if task.chatcode}
				<button
					class="text-sm text-neutral-500 transition ease-in-out hover:text-neutral-200"
					aria-label="copy waypoint"
					title="copy waypoint"
					onclick={() => copyToClipBoard(task.chatcode)}
				>
					<i class="fa-solid fa-copy"></i>
				</button>
			{/if}

			{#if task.link}
				<a
					class="text-sm text-neutral-500 transition ease-in-out hover:text-neutral-200"
					href={task.link}
					target="_blank"
					title="open info link"
					rel="noopener noreferrer"
					aria-label="open info link"
				>
					<i class="fa-solid fa-circle-info"></i>
				</a>
			{/if}
		</div>
	</div>
</label>

<style>
	label {
		cursor: pointer;
	}
</style>
