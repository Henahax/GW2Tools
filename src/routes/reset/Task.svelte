<script lang="ts">
	import EventTimer from './EventTimer.svelte';
	import { setCookie } from './functions';
	import { dataStore } from './store';

	export let task: any;

	let checked = task.checked;
	let alarm = task.alarm;

	function checkTask(event: Event) {
		checked = event.target.checked;
		task.checked = checked;
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					$dataStore[i].tasks[j].checked = checked;
					if (checked) {
						alarm = false;
						task.alarm = false;
						$dataStore[i].tasks[j].alarm = false;
					}
				}
			}
		}
		setCookie('check.' + task.id, checked.toString(), task.interval);
	}

	function setAlarm(event: Event) {
		alarm = event.target.checked;
		task.alarm = alarm;
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					$dataStore[i].tasks[j].alarm = alarm;
				}
			}
		}
	}
</script>

<li
	class="flex w-full flex-row py-1 {checked
		? 'line-through opacity-50 hover:opacity-50'
		: 'opacity-90 hover:opacity-100'}"
>
	<label class="flex w-full flex-row items-center">
		<input type="checkbox" class="checkbox size-6" bind:checked on:change={checkTask} />
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
				<a href={task.link} class="opacity-50 hover:opacity-100" title="open more info">
					<i class="fa-regular fa-circle-question"></i>
				</a>
			{/if}
			{#if task.interval == 'daily'}
				<div class="opacity-50" title="resets daily">
					<i class="fa-regular fa-clock"></i>
				</div>
			{/if}
			{#if task.interval == 'weekly'}
				<div class="opacity-50" title="resets weekly">
					<i class="fa-regular fa-calendar"></i>
				</div>
			{/if}
			{#if task.timer}
				<div class="chk flex items-center" title="set alarm">
					<label class={alarm ? 'fa-solid' : 'fa-regular'}>
						<input type="checkbox" bind:checked={alarm} on:change={setAlarm} />
					</label>
				</div>
			{/if}
		</div>
		{#if !checked && task.timer}
			<EventTimer {task} />
		{/if}
	</div>
</li>

<style>
	.chk input {
		display: none;
	}

	.chk label::before {
		content: '\f0f3';
		font-family: 'Font Awesome 5 Free';
		opacity: 0.5;
	}

	.chk label:has(input:checked)::before {
		content: '\f0f3';
		opacity: 1;
		color: white;
	}
</style>
