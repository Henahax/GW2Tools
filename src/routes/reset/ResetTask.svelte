<script lang="ts">
	import EventTimer from './ResetEventTimer.svelte';
	import { setCookie } from './functions';
	import { dataStore } from './store';

	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let task: any;

	const popupHoverDaily: PopupSettings = {
		event: 'hover',
		target: 'popupHoverDaily',
		placement: 'top'
	};

	const popupHoverWeekly: PopupSettings = {
		event: 'hover',
		target: 'popupHoverWeekly',
		placement: 'top'
	};

	let checked = task.checked;

	function handleChange(event: Event) {
		checked = event.target.checked;
		task.checked = checked;
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					$dataStore[i].tasks[j].checked = checked;
				}
			}
		}
		setCookie('check.' + task.id, checked.toString(), task.interval);
	}
</script>

<li
	class="flex w-full flex-row py-1 {checked
		? 'line-through opacity-50 hover:opacity-50'
		: 'opacity-90 hover:opacity-100'}"
>
	<label class="flex w-full flex-row items-center">
		<input type="checkbox" class="checkbox size-6" bind:checked on:change={handleChange} />
		<img src={task.icon} alt={task.name} class="mx-2 size-8" />
		<div class="flex flex-col">
			<div class="text-sm">
				{task.name}
			</div>
			<div class="text-xs opacity-50">{task.info}</div>
		</div>
	</label>
	<div class="flex flex-col justify-center text-right text-sm">
		<div class="flex flex-row justify-end gap-1">
			{#if task.link}
				<a href={task.link} class="opacity-50 hover:opacity-100">
					<i class="fa-regular fa-circle-question"></i>
				</a>
			{/if}
			{#if task.interval == 'daily'}
				<div class="opacity-50">
					<i class="fa-regular fa-clock"></i>
				</div>
			{/if}
			{#if task.interval == 'weekly'}
				<div class="opacity-50">
					<i class="fa-regular fa-calendar"></i>
				</div>
			{/if}
		</div>
		{#if !checked && task.timer}
			<EventTimer timer={task.timer} />
		{/if}
	</div>
</li>
