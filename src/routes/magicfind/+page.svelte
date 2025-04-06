<script lang="ts">
	import {
		MagicFind,
		MagicFindCategory,
		MagicFindItem,
		MagicFindItemSelect,
		MagicFindItemNumber,
		MagicFindItemBool
	} from './MagicFind';

	const magicFindData = [
		{
			name: 'character',
			description: 'character (account & gear)',
			items: [
				{
					name: 'account bonus',
					icons: [
						'https://wiki.guildwars2.com/images/thumb/3/31/Magic_Find.png/20px-Magic_Find.png'
					],
					type: 'number'
				},
				{ name: 'enrichtment', value: 20 },
				{
					name: 'guild magic find',
					icons: ['https://wiki.guildwars2.com/images/e/ee/Endless_Toymaker%27s_Tonic.png'],
					type: 'select',
					options: [
						{ value: 0, description: '0' },
						{ value: 3, description: '3' },
						{ value: 4, description: '4' },
						{ value: 5, description: '5' },
						{ value: 6, description: '6' },
						{ value: 7, description: '7' },
						{ value: 8, description: '8' },
						{ value: 9, description: '9' },
						{ value: 10, description: '10' }
					]
				}
			]
		},
		{
			name: 'season',
			description: 'seasonal bonus (festivals / bonus events)',
			items: []
		},
		{
			name: 'map bonus',
			description: 'map bonus',
			items: []
		},
		{
			name: 'banners',
			description: 'banners (guild & items)',
			items: [
				{
					type: 'bool',
					value: 15,
					icons: [
						'https://wiki.guildwars2.com/images/a/ae/Guild_Heroes_Banner.png',
						'https://wiki.guildwars2.com/images/0/0f/10_Kill_Gold_and_15_Magic_Find_Banner.png'
					],
					names: [
						{
							name: 'Guild Magic Find Banner Boost',
							link: 'https://wiki.guildwars2.com/wiki/Guild_Magic_Find_Banner_Boost'
						}
					],
					description:
						'Guild Gold and Magic Find Banners, Guild Heroes Banners, Guild Anniversary Banners.'
				},
				{
					type: 'bool',
					value: 10,
					icons: ['https://wiki.guildwars2.com/images/9/9d/Spirit_Banner.png'],
					names: [
						{
							name: 'Spirit Banner Boost',
							link: 'https://wiki.guildwars2.com/wiki/Spirit_Banner'
						}
					],
					description: 'Spirit Banner'
				}
			]
		},
		{
			name: 'consumables',
			description: 'consumables (crafting & trading post)',
			items: []
		},
		{
			name: 'boosters',
			description: 'boosters (accountbound)',
			items: []
		}
	];

	let magicfind = $state(new MagicFind());
	let totalValue = $derived(getTotalValue(magicfind));

	magicFindData.forEach((seedCategory) => {
		let category: MagicFindCategory = new MagicFindCategory();
		category.description = seedCategory.description;
		seedCategory.items.forEach((seedItem) => {
			if (seedItem.type === 'number') {
				let item: MagicFindItemNumber = new MagicFindItemNumber();
				item.description = seedItem.name;
				item.icons = seedItem.icons;
				category.items.push(item);
			} else if (seedItem.type === 'select') {
				let item: MagicFindItemSelect = new MagicFindItemSelect();
				item.description = seedItem.name;
				item.icons = seedItem.icons;
				item.options = seedItem.options?.map((option) => {
					return { value: option.value, description: option.description };
				});
				category.items.push(item);
			} else if (seedItem.type === 'bool') {
				let item: MagicFindItemBool = new MagicFindItemBool();
				item.description = seedItem.name;
				item.icons = seedItem.icons;
				category.items.push(item);
			}
		});

		magicfind.categories.push(category);
	});

	function getTotalValue(magicfind: MagicFind): number {
		return magicfind.categories.reduce((total, category) => {
			return (
				total +
				category.items.reduce((sum, item) => {
					if (item instanceof MagicFindItemBool) {
						return sum + (item.checked ? 1 : 0);
					} else if (item instanceof MagicFindItemNumber || item instanceof MagicFindItemSelect) {
						return sum + item.value;
					}
					return sum;
				}, 0)
			);
		}, 0);
	}
</script>

<div class="grid w-fit grid-cols-[auto_auto_auto_1fr] gap-4 self-center justify-self-center">
	<div class="col-span-full grid grid-cols-subgrid items-center text-lg">
		<div class="col-span-3">value</div>
		<div>description</div>
	</div>
	{#each magicfind.categories as category: MagicFindCategory}
		<details class="col-span-full grid grid-cols-subgrid" open>
			<summary class="col-span-full">{category.description}</summary>
			{#each category.items as item: MagicFindItem}
				{#if item instanceof MagicFindItemSelect}
					<select class="col-span-2">
						{#each item.options as option}
							<option class="text-right" value={option.value}>
								{option.description}
							</option>
						{/each}
					</select>
				{:else if item instanceof MagicFindItemNumber}
					<input
						type="number"
						class="col-span-2"
						value={item.value}
						min="0"
						max="350"
						step="1"
						onchange={(e) => {
							item.setValue(parseInt(e.target.value));
						}}
					/>
				{:else if item instanceof MagicFindItemBool}
					<input type="checkbox" />
					<div class="">{item.value}</div>
				{/if}
				<div class="">
					{#each item.icons as icon}
						<img class="size-8" src={icon} alt="icon" />
					{/each}
				</div>
				<div>{item.description}</div>
			{/each}
		</details>
	{/each}
	<div class="col-span-full grid grid-cols-subgrid items-center text-lg">
		<div class="col-span-2 text-right">{totalValue}</div>
		<div class="col-span-2">% (of max 750%)</div>
	</div>
</div>

<style>
	summary {
		cursor: pointer;
	}
</style>
