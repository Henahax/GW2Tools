<script lang="ts">
	import { dataStore as dataStore } from './store';
	import { onMount } from 'svelte';
	import Item from './Item.svelte';
	import data from '../../assets/magicfind.json';

	onMount(() => {
		$dataStore = data;
	});

	$: $dataStore, getSum();

	let sum = 0;

	function getSum() {
		sum = 0;
		for (let c = 0; c < $dataStore.length; c++) {
			for (let i = 0; i < $dataStore[c].items.length; i++) {
				if ($dataStore[c].items[i].checked) {
					sum += $dataStore[c].items[i].value;
				}
			}
		}
	}
</script>

<div class="flex flex-row items-center justify-between p-4 px-2 md:px-4">
	<div>
		<h2 class="h3">MagicFind Checklist</h2>
		<div class="text-sm">Reach the magic find cap efficiently</div>
	</div>
</div>

<div class="mx-auto px-2 md:px-4">
	<table class="table-hover table-compact table leading-3">
		<thead class="sticky z-10">
			<tr>
				<th></th>
				<th class="text-right">value</th>
				<th></th>
				<th>info</th>
			</tr>
		</thead>
		<tbody>
			{#each $dataStore as category}
				<tr>
					<th colspan="4" class="px-4 text-left text-sm">{category.name}</th>
				</tr>
				{#each category.items as item}
					<Item {item} />
				{/each}
			{/each}
		</tbody>
		<tfoot class="sticky z-10 py-4 text-lg leading-3">
			<tr>
				<th></th>
				<th class="text-right {sum < 750 ? 'text-red-500' : 'text-green-500'}">{sum}</th>
				<th colspan="2" class="normal-case">% (of max 750%)</th>
			</tr>
		</tfoot>
	</table>
</div>

<style>
	table {
		overflow: auto;
	}

	thead {
		inset-block-start: 0;
	}

	tfoot {
		inset-block-end: 0;
	}
</style>
