<script lang="ts">
	import { dataStore as dataStore } from './store';
	import { onMount } from 'svelte';
	import Item from './Item.svelte';
	import data from '../../assets/magicfind.json';

	onMount(() => {
		$dataStore = data;
	});
</script>

<div class="p-4 flex flex-row justify-between items-center">
	<div>
		<h2 class="h3">MagicFind Checklist</h2>
		<div class="text-sm">Reach the magic find cap efficiently</div>
	</div>
</div>

<div class="mx-auto px-4">
	<table class="table table-hover table-compact leading-3">
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
					<th colspan="4" class="text-left text-sm px-4">{category.name}</th>
				</tr>
				{#each category.items as item}
					<Item {item} />
				{/each}
			{/each}
		</tbody>
		<tfoot class="sticky z-10 text-lg py-4 leading-3">
			<tr>
				<th></th>
				<th id="sum" class="text-right {$dataStore < 750 ? 'text-red-500' : 'text-green-500'}"
					>{$dataStore}</th
				>
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
