<script lang="ts">
	import { dataStore as dataStore } from './store';
	import { onMount } from 'svelte';
	import type { MagicFindCategory, MagicFindItem } from './types';
	import Title from '$lib/Title.svelte';
	import Item from './Item.svelte';
	import data from './magicfind.json';

	onMount(() => {
		$dataStore = data;
	});

	$: $dataStore, getSum();

	let sum = 0;

	function getSum() {
		sum = 0;

		$dataStore.forEach((category: MagicFindCategory) => {
			category.items.forEach((item: MagicFindItem) => {
				if (item.checked) {
					sum += item.value;
				}
			});
		});
	}
</script>

<svelte:head>
	<title>GW2Tools: Magic Find</title>
</svelte:head>

<Title
	title="Magic Find Calculator"
	subtitle="Plan your magic find buffs to reach the maximum cap without wasting limited boosters"
></Title>

<table class="table-zebra table-xs table-pin-rows table">
	<thead class="text-sm">
		<tr class="bg-base-300 shadow">
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
		<tr class="bg-base-300 text-lg shadow">
			<th></th>
			<th class="text-right {sum < 750 ? 'text-red-500' : 'text-green-500'}">{sum}</th>
			<th colspan="2" class="normal-case">% (of max 750%)</th>
		</tr>
	</tfoot>
</table>
