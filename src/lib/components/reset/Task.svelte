<script lang="ts">
	import { ResetTask, ResetCategory, ResetInterval } from '../../../routes/reset/Reset.svelte';
	import EventTimer from '$lib/components/reset/EventTimer.svelte';

	let { task, interval, category } = $props<{
		task: ResetTask;
		category: ResetCategory;
		interval: ResetInterval;
	}>();

	function copyToClipBoard(chatcode: string) {
		navigator.clipboard.writeText(chatcode);
	}
</script>

<label
	class="col-span-full flex items-center gap-4 px-2 py-1.5 hover:brightness-125"
	class:line-through={task.checked}
>
	<input
		type="checkbox"
		id={task.id}
		bind:checked={task.checked}
		onchange={(e) => task.setChecked(e.currentTarget.checked, interval, category)}
	/>
	<img
		class="size-8 self-center justify-self-center rounded"
		class:opacity-50={task.checked}
		src={task.icon}
		alt={task.description}
	/>
	<div class="flex grow flex-col gap-0.5">
		<div class="text-xs">{task.name}</div>
		<div class="subtitle flex flex-col text-xs">
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

		<div class="flex flex-col items-center gap-0.5">
			{#if task.link}
				<a
					class="text-xs transition ease-in-out"
					href={task.link}
					target="_blank"
					title="open info link"
					rel="noopener noreferrer"
					aria-label="open info link"
				>
					<i class="fa-solid fa-circle-info"></i>
				</a>
			{/if}
			{#if task.chatcode}
				<button
					class="text-xs transition ease-in-out"
					aria-label="copy waypoint"
					title="copy waypoint"
					onclick={() => copyToClipBoard(task.chatcode)}
				>
					<i class="fa-solid fa-copy"></i>
				</button>
			{/if}
		</div>
	</div>
</label>

<style>
	label {
		cursor: pointer;
	}

	.subtitle {
		color: var(--foreground-muted);
	}

	a,
	button {
		color: var(--foreground-muted);
	}

	a:hover,
	button:hover {
		color: var(--foreground);
	}
</style>
