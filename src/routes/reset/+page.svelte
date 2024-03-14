<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { settingsStore, checksStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import data from '../../assets/reset.json';
	import ResetTimer from './ResetTimer.svelte';
	import Card from './Card.svelte';
	import Settings from './Settings.svelte';

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = { ref: Settings };
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	onMount(() => {
		$settingsStore = getSettings();
		$checksStore = getChecks();
	});

	function openSettings() {
		modalStore.trigger(modal);
	}

	function getSettings() {
		let settings = [];
		for (let category = 0; category < data.length; category++) {
			for (let task = 0; task < data[category].tasks.length; task++) {
				let value = getCookie('display.' + data[category].tasks[task].id);
				if (value === null && data[category].tasks[task].default) {
					value = true;
				} else if (value === null) {
					value = false;
				}
				let setting = { name: data[category].tasks[task].id, value: value };
				settings.push(setting);
			}
		}
		return settings;
	}

	function getChecks() {
		let checks = [];
		for (let category = 0; category < data.length; category++) {
			for (let task = 0; task < data[category].tasks.length; task++) {
				let value = getCookie('check.' + data[category].tasks[task].id);
				if (value === null) {
					value = false;
				}
				let check = { name: data[category].tasks[task].id, value: value };
				checks.push(check);
			}
		}
		return checks;
	}
</script>

<div class="p-4 flex flex-row justify-between items-center gap-2">
	<div>
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Timegated tasks without an ingame tracking system</div>
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
<div class="cardContainer mx-auto px-4">
	{#each data as category}
		<Card {category} />
	{/each}
</div>

<style>
	.cardContainer {
		columns: 3 24rem;
		column-fill: balance;
		column-gap: 1rem;
	}
</style>
