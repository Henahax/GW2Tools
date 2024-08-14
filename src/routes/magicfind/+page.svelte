<script lang="ts">
	import Title from '$lib/Title.svelte';
	import categories from './categories.json';
	import itemList from './items.json';
	import type { Item } from './types';

	let items: Item[] = $state(itemList as Item[]);
	let sum: number = $derived(getSum(items));

	function getSum(myItems: Item[]) {
		let mySum: number = 0;
		myItems.forEach((item) => {
			if (item.type === 'number' || (item.type === 'checkbox' && item.checked)) {
				mySum += Number(item.value);
			} else if (item.type === 'select' && item.options) {
				const selectedOption = item.options.find((option) => option.value == item.value);
				if (selectedOption) {
					mySum += Number(selectedOption.value);
				}
			}
		});
		return mySum;
	}
</script>

<svelte:head>
	<title>GW2Tools: Magic Find</title>
</svelte:head>

<Title
	title="Magic Find Calculator"
	subtitle="Plan your magic find buffs to reach the maximum cap without wasting limited boosters"
>
	<button class="btn btn-primary max-md:btn-square">
		<i class="fa-solid fa-question"></i>
		<div class="max-md:hidden">Info</div>
	</button>
</Title>

<table class="table-zebra table-sm table-pin-rows mx-auto table w-fit">
	<thead class="text-sm">
		<tr class="bg-base-100 shadow">
			<th>
				<input class="checkbox" type="checkbox" disabled checked />
			</th>
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
			{#each items.filter((item) => item.category === category.id) as item}
				<tr>
					{#if item.type === 'checkbox'}
						<td>
							<input
								id={item.id}
								class="checkbox checkbox-lg"
								type="checkbox"
								bind:checked={item.checked}
							/>
						</td>
						<td>
							<label class="flex h-full w-full justify-end" for={item.id}>{item.value}</label>
						</td>
					{:else if item.type === 'number'}
						<td colspan="2">
							<input
								id={item.id}
								class="input input-bordered input-sm w-24 text-right"
								bind:value={item.value}
							/>
						</td>
					{:else if item.type === 'select' && item.options}
						<td colspan="2">
							<select
								id={item.id}
								class="select select-bordered select-sm w-24"
								bind:value={item.value}
							>
								{#each item.options as option}
									<option value={option.value}>{option.description}</option>
								{/each}
							</select>
						</td>
					{/if}
					<td>
						<label class="flex flex-row flex-wrap items-center" for={item.id}>
							{#each item.icons as icon}
								<img class="size-8 min-w-8" src={icon} alt="" />
							{/each}
						</label>
					</td>
					<td>
						<label for={item.id}>
							<div>
								{#each item.names as name}
									<a class="link link-primary font-semibold" href={name.link}>{name.name}</a>
								{/each}
							</div>
							<div>
								{item.description}
							</div>
						</label>
					</td>
				</tr>
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
