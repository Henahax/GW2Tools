<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { settingsStore, checksStore } from './store';
	import { setCookie } from './functions';
	import EventTimer from './EventTimer.svelte';

	export let task: any;

	let show = false;
	let checked = false;

	$: $settingsStore, getShown();
	$: $checksStore, getChecked();

	onMount(() => {
		getChecked();
	});

	function getShown() {
		let shows: any = get(settingsStore);
		for (let i = 0; i < shows.length; i++) {
			if (shows[i].name === task.id) {
				show = shows[i].value;
			}
		}
	}

	function getChecked() {
		let checks: any = get(checksStore);
		for (let i = 0; i < checks.length; i++) {
			if (checks[i].name === task.id) {
				checked = checks[i].value;
			}
		}
	}

	function setChecked(event: Event) {
		checked = event.target.checked;
		setCookie('check.' + task.id, checked.toString(), task.interval);
		let checks: any = get(checksStore);
		for (let i = 0; i < checks.length; i++) {
			if (checks[i].name === task.id) {
				checks[i].value = checked;
				$checksStore = checks;
			}
		}
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
