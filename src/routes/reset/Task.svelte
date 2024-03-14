<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { settingsStore } from './store';
	import { getCookie } from './functions';
	import { setCookie } from './functions';
	import EventTimer from './EventTimer.svelte';

	export let task: any;

	let show = false;
	let checked = getChecked();

	$: $settingsStore, getShown();

	onMount(() => {
		checked = getChecked();
	});

	function getShown(){
		let test: any = get(settingsStore);
		for (let i = 0; i < test.length; i++) {
			if (test[i].name === task.id) {
				show = test[i].value;
			}
		}
	}

	function getChecked() {
		let checked = getCookie('check.' + task.id);
		if (checked === null) {
			return false;
		}
		return checked;
	}

	function setChecked(event) {
		checked = event.target.checked;
		setCookie('check.' + task.id, checked.toString(), task.interval);
	}
</script>

{#if show}
	<li class="w-full flex flex-row py-1 {checked ? 'opacity-50' : ''}">
		<label class="flex flex-row items-center w-full">
			<input type="checkbox" class="checkbox size-6" bind:checked on:change={setChecked} />
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
{/if}
