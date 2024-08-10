<script lang="ts">
	import Title from '$lib/Title.svelte';
	import categories from './categories.json';
	import itemList from './items.json';
	import type { Item } from './types';

	let items: Item[] = $state(itemList);

	let sum: number = $derived(getSum(items));

	$effect(() => {});

	function changeChecked(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		const item = items.find((element: Item) => element.id === inputElement.id);
		if (item) {
			item.checked = inputElement.checked;
		}
	}

	function changeValue(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		const item = items.find((element: Item) => element.id === inputElement.id);
		if (item) {
			item.value = Number(inputElement.value);
		}
	}

	function changeSelected(event: Event) {
		const inputElement = event.target as HTMLSelectElement;
		const item = items.find((element: Item) => element.id === inputElement.id);
		if (item) {
			item.value = Number(inputElement.value);
		}
	}

	function getSum(item: Item[]) {
		let i: number = 0;
		items.forEach((item) => {
			switch (item.type) {
				case 'checkbox': {
					if (item.checked && item.value) {
						i += item.value;
					}
					break;
				}
				case 'number':
				case 'select': {
					if (item.value) {
						i += item.value;
					}
					break;
				}
			}
		});
		return i;
	}
</script>

<svelte:head>
	<title>GW2Tools: Magic Find</title>
</svelte:head>

<Title
	title="Magic Find Calculator"
	subtitle="Plan your magic find buffs to reach the maximum cap without wasting limited boosters"
></Title>

<table class="table-zebra table-xs table-pin-rows mx-auto table w-fit">
	<thead class="text-sm">
		<tr class="bg-base-300 shadow">
			<th class="flex w-fit items-center">
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
				<tr class="tr-hover">
					{#if item.type === 'number'}
						<td colspan="2" class="value text-right">
							<input
								id={item.id}
								class="input input-bordered input-sm h-8 w-full text-right text-xs"
								type="number"
								min="0"
								max="350"
								value={item.value}
								onchange={changeValue}
							/>
						</td>
					{/if}
					{#if item.type === 'checkbox'}
						<td>
							<input
								id={item.id}
								class="checkbox"
								type="checkbox"
								checked={item.checked}
								onchange={changeChecked}
							/>
						</td>
						<td>
							<label class="flex h-full w-full justify-end" for={item.id}>
								{item.value}
							</label>
						</td>
					{/if}
					{#if item.type === 'select'}
						<td colspan="2" class="value text-right">
							<select
								id={item.id}
								class="select select-bordered select-sm w-full text-xs"
								onchange={changeSelected}
							>
								{#if item.options}
									{#each item.options as option}
										<option value={option.value}>
											{option.description}
										</option>
									{/each}
								{/if}
							</select>
						</td>
					{/if}
					<td>
						<label class="flex flex-row flex-wrap items-center" for={item.id}>
							{#each item.icons as icon}
								<img class="size-6 min-w-6" src={icon} alt={item.description} />
							{/each}
						</label>
					</td>
					<td>
						<label for={item.id} class="flex flex-col">
							<div class="inline-flex flex-wrap gap-x-2">
								{#each item.names as name}
									<a class="link link-primary text-sm font-semibold" href={name.link}>
										{name.name}
									</a>
								{/each}
							</div>
							<div class="text-xs">
								{item.description}
							</div>
						</label>
					</td>
				</tr>
			{/each}
		{/each}
	</tbody>
	<tfoot>
		<tr class="bg-base-300 text-lg shadow">
			<th></th>
			<th class="text-right {sum < 750 ? 'text-red-500' : 'text-green-500'}">
				{sum}
			</th>
			<th colspan="2" class="normal-case">% (of max 750%)</th>
		</tr>
	</tfoot>
</table>
