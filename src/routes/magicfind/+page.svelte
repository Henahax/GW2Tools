<script lang="ts">
	import { dataStore as dataStore } from './store';
	import { onMount } from 'svelte';
	import Header from '$lib/header.svelte';
	import Item from './Item.svelte';
	import data from '../../assets/magicfind.json';

	onMount(() => {
		$dataStore = data;
	});

	$: $dataStore, getSum();

	let sum = 0;

	function getSum() {
		sum = 0;
		console.log($dataStore);
		for (let c = 0; c < $dataStore.length; c++) {
			for (let i = 0; i < $dataStore[c].items.length; i++) {
				if ($dataStore[c].items[i].checked) {
					sum += $dataStore[c].items[i].value;
				}
			}
		}
	}
</script>

<svelte:head>
	<title>GW2Tools: Magic Find</title>
</svelte:head>

<!-- overlays -->
<dialog id="modalInstructions" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Instructions</h3>
		<div class="info-grid grid items-center gap-4 p-4">
			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-square-check"></i>
			</div>
			<div class="flex flex-col">
				<p>choose items</p>
				<p class="text-xs opacity-50">check boxes or fill in values</p>
			</div>

			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-percent"></i>
			</div>
			<div class="flex flex-col">
				<p>use the calculator</p>
				<p class="text-xs opacity-50">reach maximum magic find of 750%</p>
			</div>

			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-piggy-bank"></i>
			</div>
			<div class="flex flex-col">
				<p>save boosters</p>
				<p class="text-xs opacity-50">let them collect even more dust</p>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<Header
	title="Magic Find Calculator"
	subtitle="Plan your magic find buffs to reach the maximum cap without wasting limited boosters"
>
	<button class="btn max-md:btn-circle" onclick="modalInstructions.showModal()">
		<i class="fa-solid fa-info"></i>
		<span class="hidden md:block">Instructions</span>
	</button>
</Header>

<table class="table-zebra table-xs table-pin-rows table">
	<thead class="bg-green-500 text-sm">
		<tr class="bg-base-100 shadow">
			<th class="flex w-fit items-center"
				><input class="checkbox" type="checkbox" disabled checked /></th
			>
			<th class="text-right">value</th>
			<th></th>
			<th>info</th>
		</tr>
	</thead>
	<tbody>
		{#each $dataStore as category}
			<tr>
				<th colspan="4">{category.name}</th>
			</tr>
			{#each category.items as item}
				<Item {item} />
			{/each}
		{/each}
	</tbody>
	<tfoot>
		<tr class="bg-base-100 text-lg shadow">
			<th></th>
			<th class="text-right {sum < 750 ? 'text-red-500' : 'text-green-500'}">{sum}</th>
			<th colspan="2" class="normal-case">% (of max 750%)</th>
		</tr>
	</tfoot>
</table>

<style>
	.info-grid {
		grid-template-columns: fit-content(0) 1fr;
	}
</style>
