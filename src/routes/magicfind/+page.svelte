<script lang="ts">
	import MagicFindGridSection from '$lib/components/MagicFindGridSection.svelte';
	import data from './magicfind.json';
	import {
		MagicFind,
		MagicFindCategory,
		MagicFindItemSelect,
		MagicFindItemNumber,
		MagicFindItemBool,
		MagicFindItemRadio
	} from './MagicFind.svelte';

	let magicfind: MagicFind = $state(new MagicFind());
	let totalValue: number = $derived(magicfind.total);

	data.forEach((seedCategory) => {
		let category: MagicFindCategory = new MagicFindCategory();
		category.id = seedCategory.id;
		category.description = seedCategory.description;
		seedCategory.items.forEach((seedItem) => {
			if (seedItem.type === 'number') {
				let item: MagicFindItemNumber = new MagicFindItemNumber();
				item.description = seedItem.description || '';
				item.value =
					typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
				item.icons = seedItem.icons || [];
				item.names = [
					{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }
				];
				category.items.push(item);
			} else if (seedItem.type === 'select') {
				let item: MagicFindItemSelect = new MagicFindItemSelect();
				item.description = seedItem.description;
				item.icons = seedItem.icons || [];
				item.names = [
					{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }
				];
				item.options = seedItem.options.map((option: { value: number; description: string }) => {
					return { value: option.value, description: option.description };
				});
				category.items.push(item);
			} else if (seedItem.type === 'bool') {
				let item: MagicFindItemBool = new MagicFindItemBool();
				item.description = seedItem.description || '';
				item.value =
					typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
				item.icons = seedItem.icons || [];
				item.names = [
					{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }
				];
				const boolItem = seedItem as { checked?: boolean };
				item.checked = !!boolItem.checked;
				category.items.push(item);
			} else if (seedItem.type === 'radio') {
				let item: MagicFindItemRadio = new MagicFindItemRadio();
				item.description = seedItem.description || '';
				item.value =
					typeof seedItem.value === 'string' ? parseInt(seedItem.value) : seedItem.value || 0;
				item.icons = seedItem.icons || [];
				item.names = [
					{ name: seedItem.names?.[0]?.name || '', link: seedItem.names?.[0]?.link || '' }
				];
				const radioItem = seedItem as { checked?: boolean };
				item.checked = !!radioItem.checked;
				category.items.push(item);
			}
		});

		magicfind.categories.push(category);
	});
</script>

<div
	class="magicfind grid w-fit grid-cols-[auto_auto_1fr_4fr] gap-x-4 self-center justify-self-center rounded-lg border text-xs"
>
	<div
		class="magicfind-head sticky top-0 col-span-full grid grid-cols-subgrid items-center border border-neutral-800 p-2 text-base"
	>
		<div class="col-span-2 text-right">value</div>
		<div></div>
		<div>description</div>
	</div>
	{#each magicfind.categories as category: MagicFindCategory}
		<MagicFindGridSection {category}>
			{#each category.items as item: MagicFindItem}
				<label class="magicfind-item col-span-full grid grid-cols-subgrid items-center p-2">
					{#if item instanceof MagicFindItemSelect}
						<select
							id={item.id}
							class="col-span-2 text-xs"
							onchange={(e) => {
								const target = e.target as HTMLSelectElement;
								item.setSelected(parseInt(target.value));
							}}
						>
							{#each item.options as option}
								<option class="text-right" value={option.value}>
									{option.description}
								</option>
							{/each}
						</select>
					{:else if item instanceof MagicFindItemNumber}
						<input
							id={item.id}
							type="number"
							class="col-span-2 text-right text-xs"
							value={item.value}
							min="0"
							max="350"
							step="1"
							onchange={(e) => {
								const target = e.target as HTMLInputElement;
								item.setValue(parseInt(target.value));
							}}
						/>
					{:else if item instanceof MagicFindItemBool}
						<input
							id={item.id}
							type="checkbox"
							checked={item.checked}
							onchange={(e) => {
								const target = e.target as HTMLInputElement;
								item.setChecked(target.checked);
							}}
						/>
						<div class="text-right">{item.value}</div>
					{:else if item instanceof MagicFindItemRadio}
						<input
							id={item.id}
							type="radio"
							name={category.id}
							checked={item.checked}
							onchange={(e) => {
								const target = e.target as HTMLInputElement;
								item.setChecked(target.checked, category);
							}}
						/>
						<div class="text-right">{item.value}</div>
					{/if}
					<div class="flex flex-wrap">
						{#each item.icons as icon}
							<img class="size-8" src={icon} alt="icon" />
						{/each}
					</div>
					<div class="flex flex-col">
						<div class="flex flex-wrap">
							{#each item.names as name}
								<a href={name.link} target="_blank" rel="noopener noreferrer">{name.name}</a>
							{/each}
						</div>
						<div>{item.description}</div>
					</div>
				</label>
			{/each}
		</MagicFindGridSection>
	{/each}
	<div
		class="magicfind-foot sticky bottom-0 col-span-full grid grid-cols-subgrid items-center border p-2 text-base"
	>
		<div
			class="col-span-2 text-right font-bold {totalValue < 750 ? 'text-red-500' : 'text-green-500'}"
		>
			{totalValue}
		</div>
		<div class="col-span-2">% (of max 750%)</div>
	</div>
</div>

<style>
</style>
