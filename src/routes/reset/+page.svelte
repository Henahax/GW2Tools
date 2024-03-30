<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { dataStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import json from '../../assets/reset.json';
	import ResetTimer from './ResetIntervalTimer.svelte';
	import Card from './ResetCard.svelte';
	import Settings from './ResetSettings.svelte';

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = { ref: Settings };
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	onMount(() => {
		$dataStore = getData();
	});

	function openSettings() {
		modalStore.trigger(modal);
	}

	function getData() {
		for (let category = 0; category < json.length; category++) {
			for (let task = 0; task < json[category].tasks.length; task++) {
				let display = getCookie('display.' + json[category].tasks[task].id);
				if (display === null && json[category].tasks[task].default) {
					display = true;
				} else if (display === null) {
					display = false;
				}
				let checked = getCookie('check.' + json[category].tasks[task].id);
				if (checked === null) {
					checked = false;
				}
				json[category].tasks[task].display = display;
				json[category].tasks[task].checked = checked;
			}
		}
		return json;
	}
</script>

<svelte:head>
	<title>GW2 Tools: Reset</title>
</svelte:head>

<div class="flex flex-row items-center justify-between gap-2 px-2 py-4 md:px-4">
	<div class="flex-start">
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Choose displayed Timegated tasks in the options and track progress.</div>
	</div>
	<div class="flex flex-row gap-4 text-right">
		<div class="flex flex-row flex-wrap justify-end gap-4 text-sm">
			<div class="flex flex-col">
				<div class="text-xs">Daily:</div>
				<ResetTimer mode={1} />
			</div>
			<div class="flex flex-col">
				<div class="text-xs">Weekly:</div>
				<ResetTimer mode={2} />
			</div>
		</div>
		<button class="text-2xl" on:click={openSettings}>
			<i class="fa-solid fa-gear"></i>
		</button>
	</div>
</div>
<div class="cardContainer mx-auto columns-1 gap-x-3 gap-y-3 px-2 md:columns-2 md:px-4 xl:columns-3">
	{#each $dataStore as category}
		<Card {category} />
	{/each}
</div>
