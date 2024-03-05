<script lang="ts">
	import Item from './Item.svelte';
	import data from '../../assets/magicfind.json';
	import {sumStore} from "./store";
</script>

<div class="container mx-auto flex flex-col justify-center items-center">
	<h2 class="h2 py-4">MagicFind Checklist</h2>

	<div class="mx-auto">
		<table class="table table-hover table-compact leading-3 max-w-fit mx-auto">
			<thead class="sticky z-10">
				<tr>
					<th></th>
					<th class="text-right">value</th>
					<th></th>
					<th>info</th>
				</tr>
			</thead>
			<tbody>
				{#each data as category}
					<tr>
						<th colspan="4" class="text-left px-4 py-2">{category.name}</th>
					</tr>
					{#each category.items as item}
						<Item {item} />
					{/each}
				{/each}
			</tbody>
			<tfoot class="sticky z-10 text-lg py-4 leading-3">
				<tr>
					<th></th>
					<th id="sum" class="text-right {$sumStore < 750 ? 'text-red-500' : 'text-green-500'}">{$sumStore}</th>
					<th colspan="2" class="normal-case">% (of max 750%)</th>
				</tr>
			</tfoot>
		</table>
	</div>
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

	th {
		padding-top: 0.5rem !important;
		padding-bottom: 0.5rem !important;
		padding: 1rem 0.75rem !important;
	}

	:global(th) {
		padding: 1rem 0.75rem !important;
	}
</style>
