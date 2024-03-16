<script lang="ts">
	import EventTimer from './EventTimer.svelte';
	import { setCookie } from './functions';
	import { dataStore } from './store';

	export let task: any;

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

<li class="w-full flex flex-row py-1 {checked ? 'opacity-50' : ''}">
	<label class="flex flex-row items-center w-full">
		<input type="checkbox" class="checkbox size-6" bind:checked on:change={handleChange} />
		<img src={task.icon} alt={task.name} class="size-8 mx-2" />
		<div class="flex flex-col">
			<div class="text-sm">
				{task.name}
			</div>
			<div class="text-xs opacity-50">{task.info}</div>
		</div>
	</label>
	<div class="flex flex-col justify-center text-sm text-right">
		<div class="flex flex-row justify-end gap-1">
			{#if task.link}
				<a href={task.link} class="opacity-50">
					<i class="fa-regular fa-circle-question"></i>
				</a>
			{/if}
			{#if task.interval == 'daily'}
				<div class="[&>*]:pointer-events-none opacity-50">
					<i class="fa-regular fa-clock"></i>
				</div>
			{/if}
			{#if task.interval == 'weekly'}
				<div class="[&>*]:pointer-events-none opacity-50">
					<i class="fa-regular fa-calendar"></i>
				</div>
			{/if}
		</div>
		{#if !checked && task.timer}
			<EventTimer timer={task.timer} />
		{/if}
	</div>
</li>
