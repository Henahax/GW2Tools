<script lang="ts">
	import Title from '$lib/Title.svelte';
	import ItemThing from './Item.svelte';
	import magicfind from './magicfind.json';

	import { MagicfindCategory, MagicfindItem, MagicfindItemName } from './classes';

	const categories: MagicfindCategory[] = magicfind.map(
		(category: any) =>
			new MagicfindCategory(
				category.id,
				category.name,
				category.items.map(
					(item: any) =>
						new MagicfindItem(
							item.id,
							item.type,
							item.value,
							item.icons,
							item.names.map((name: any) => new MagicfindItemName(name.name, name.link)),
							item.description,
							item.checked,
							item.options
						)
				)
			)
	);

	const sum: number = $derived(getSum(categories));

	function getSum(data: MagicfindCategory[]) {
		let sum = 0;
		data.forEach((category) => {
			category.items.forEach((item) => {
				switch (item.type) {
					case 'checkbox': {
						if (item.checked) {
							sum += item.value;
						}
						break;
					}
					default:
						{
							sum += item.value;
						}
						break;
				}
			});
		});
		return sum;
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
		{#each categories as category}
			<tr>
				<th colspan="4">{category.name}</th>
			</tr>
			{#each category.items as item}
				<ItemThing {item} />
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
