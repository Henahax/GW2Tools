<script lang="ts">
	import EventTimer from './EventTimer.svelte';
	import { setCookie } from './functions';
	import { dataStore } from './store';

	export let task: any;

	let checked = task.checked;
	let alarm = task.alarm;

	$: $dataStore, getAlarm();

	function checkTask(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
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

	function getAlarm() {
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					alarm = $dataStore[i].tasks[j].alarm;
				}
			}
		}
	}

	function setAlarm() {
		if (alarm) {
			if (Notification.permission !== 'denied') {
				Notification.requestPermission().then((permission) => {
					if (permission !== 'granted') {
						alarm = false;
					}
				});
			}
		}
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					$dataStore[i].tasks[j].alarm = alarm;
				}
			}
		}
	}
</script>

<li class="flex w-full flex-row gap-4 py-1 {checked ? 'line-through opacity-25' : ''}">
	<label class="flex w-full flex-row items-center">
		<input type="checkbox" class="checkbox size-6" bind:checked on:change={checkTask} />
		<img src={task.icon} alt={task.name} class="mx-2 size-8 rounded-md" />
		<div class="flex flex-col">
			<div class="text-sm">
				{task.name}
			</div>
			<div class="text-xs opacity-70">{task.info}</div>
		</div>
	</label>
	<div class="flex flex-col justify-center text-right text-sm">
		<div class="flex flex-row justify-end gap-1">
			{#if task.link}
				<a href={task.link} title="open more info">
					<i class="fa-regular fa-circle-question"></i>
				</a>
			{/if}
			{#if task.interval == 'daily'}
				<div title="resets daily">
					<i class="fa-regular fa-clock"></i>
				</div>
			{/if}
			{#if task.interval == 'weekly'}
				<div title="resets weekly">
					<i class="fa-regular fa-calendar"></i>
				</div>
			{/if}
			{#if task.timer}
				<label class="swap">
					<!-- this hidden checkbox controls the state -->
					<input type="checkbox" bind:checked={alarm} on:change={setAlarm} />

					<i class="fa-solid fa-bell swap-on text-warning fill-current"></i>

					<i class="fa-regular fa-bell swap-off fill-current"></i>
				</label>{/if}
		</div>
		{#if !checked && task.timer}
			<EventTimer {task} />
		{/if}
	</div>
</li>

<style>
</style>
