<script lang="ts">
	import { dataStore as dataStore } from './store';
	import { onMount } from 'svelte';
	import Header from '$lib/header.svelte';
	import Item from './MagicfindItem.svelte';
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

<Header title="Magic Find Calculator">
	<span class="text-sm"
		>Plan your magic find buffs to reach the maximum cap without wasting limited boosters</span
	>
</Header>

<table class="table-zebra table-xs table-pin-rows table">
	<thead class="bg-green-500 text-sm">
		<tr class="bg-base-300 shadow-xl">
			<th class="flex items-center"><input class="checkbox" type="checkbox" disabled checked /></th>
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
		<tr class="bg-base-300 text-lg shadow-xl">
			<th></th>
			<th class="text-right {sum < 750 ? 'text-red-500' : 'text-green-500'}">{sum}</th>
			<th colspan="2" class="normal-case">% (of max 750%)</th>
		</tr>
	</tfoot>
</table>
