<script lang="ts">
	import { Toast, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import EventTimer from './EventTimer.svelte';
	import { onMount } from 'svelte';

	import { getCookie } from './functions';
	import { setCookie } from './functions';


	onMount(() => {
    checked = getChecked();
  });

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

	function getDisplayed() {
    let displayed = getCookie("display." + task.id);
    if (displayed === null) {
      if (task.default) {
        return true;
      }
      return false;
    }
    return displayed;
  }

	export let task;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	let show = getDisplayed();

	let checked = getChecked();
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
					<div class="[&>*]:pointer-events-none opacity-50" use:popup={popupHover}>
						<i class="fa-regular fa-clock"></i>
					</div>
					<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
						<p>resets daily</p>
						<div class="arrow variant-filled-secondary" />
					</div>
				{/if}
				{#if task.interval == 'weekly'}
					<div class="[&>*]:pointer-events-none opacity-50" use:popup={popupHover}>
						<i class="fa-regular fa-calendar"></i>
					</div>
					<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
						<p>resets weekly</p>
						<div class="arrow variant-filled-secondary" />
					</div>
				{/if}
			</div>
			{#if !checked && task.timer}
				<EventTimer timer={task.timer} />
			{/if}
		</div>
	</li>
{/if}
