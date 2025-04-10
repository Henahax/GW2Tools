<script lang="ts">
	import MagicFindGridSection from '$lib/components/MagicFindGridSection.svelte';
	import {
		MagicFind,
		MagicFindCategory,
		MagicFindItemSelect,
		MagicFindItemNumber,
		MagicFindItemBool,
		MagicFindItemRadio
	} from './MagicFind';

	const magicFindData = [
		{
			id: 'character',
			description: 'character (account & gear)',
			items: [
				{
					id: 'account-bonus',
					description: 'account bonus',
					icons: [
						'https://wiki.guildwars2.com/images/thumb/3/31/Magic_Find.png/20px-Magic_Find.png'
					],
					type: 'number',
					value: 0
				},
				{
					id: 'enrichtment',
					type: 'bool',
					value: 20,
					description: "Amulet Slot: Magical, Otter's Blessing, Wurm's",
					icons: [
						'https://wiki.guildwars2.com/images/1/11/Magical_Infusion.png',
						'https://wiki.guildwars2.com/images/9/9c/Otter%27s_Blessing_Enrichment.png',
						'https://wiki.guildwars2.com/images/f/f7/Wurm%27s_Karmic_Blessing_Enrichment.png'
					],
					names: [
						{
							name: 'Magic Find Enrichment',
							link: 'https://wiki.guildwars2.com/wiki/Enrichment'
						}
					]
				}
			]
		},
		{
			id: 'season',
			description: 'seasonal bonus (festivals / bonus events)',
			type: 'radio',
			items: [
				{
					id: 'no-event',
					type: 'radio',
					value: '0',
					description: 'no event',
					checked: true
				},
				{
					id: 'lunar-new-year',
					type: 'radio',
					value: '15',
					description: 'Lunar New Year',
					icons: ['https://wiki.guildwars2.com/images/f/f1/Memories_of_Home.png'],
					names: [
						{
							name: 'Memories of Home',
							link: 'https://wiki.guildwars2.com/wiki/Memories_of_Home'
						}
					]
				},
				{
					id: 'new-hero',
					type: 'radio',
					value: '50',
					description: 'New Hero Jump Start',
					icons: ['https://wiki.guildwars2.com/images/5/5d/Ace_Racer.png'],
					names: [
						{
							name: 'New Hero Jump Start Boost',
							link: 'https://wiki.guildwars2.com/wiki/New_Hero_Jump_Start_Boost'
						}
					]
				},
				{
					id: 'wvw-rush',
					type: 'radio',
					value: '50',
					description: 'World vs. World Rush',
					icons: ['https://wiki.guildwars2.com/images/7/76/Glorious_Fervor.png'],
					names: [
						{
							name: 'Greater Call of the Mists (WvW)',
							link: 'https://wiki.guildwars2.com/wiki/Greater_Call_of_the_Mists_(WvW)'
						}
					]
				},
				{
					id: 'pvp-rush',
					type: 'radio',
					value: '200',
					description: 'Player vs. Player Rush',
					icons: ['https://wiki.guildwars2.com/images/7/76/Glorious_Fervor.png'],
					names: [
						{
							name: 'Greater Call of the Mists',
							link: 'https://wiki.guildwars2.com/wiki/Greater_Call_of_the_Mists'
						}
					]
				}
			]
		},
		{
			id: 'map-bonus',
			description: 'map bonus',
			items: [
				{
					id: 'perseverance',
					type: 'select',
					description: 'Gained by assisting Pact forces in the Silverwastes (30% per Event)',
					options: [
						{
							value: 0,
							description: ''
						},
						{
							value: 30,
							description: '1 Stack'
						},
						{
							value: 60,
							description: '2 Stacks'
						},
						{
							value: 90,
							description: '3 Stacks'
						},
						{
							value: 120,
							description: '4 Stacks'
						},
						{
							value: 150,
							description: '5 Stacks'
						}
					],
					icons: ['https://wiki.guildwars2.com/images/7/7f/Perseverance.png'],
					names: [
						{
							name: 'Perseverance',
							link: 'https://wiki.guildwars2.com/wiki/Perseverance'
						}
					]
				},
				{
					id: 'hero-of-the-wastes',
					type: 'bool',
					value: 50,
					icons: ['https://wiki.guildwars2.com/images/7/74/Hero_of_the_Wastes.png'],
					names: [
						{
							name: 'Hero of the Wastes',
							link: 'https://wiki.guildwars2.com/wiki/Hero_of_the_Wastes'
						}
					],
					description: 'Participating in the Mordrem Vinewrath meta event'
				}
			]
		},
		{
			id: 'banners',
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
			id: 'consumables',
			description: 'consumables (crafting, trading post, vendors)',
			items: [
				{
					id: 'guild-magic-find',
					type: 'select',
					description: 'Guild Tavern',
					options: [
						{ value: 0, description: '' },
						{ value: 3, description: '3%' },
						{ value: 4, description: '4%' },
						{ value: 5, description: '5%' },
						{ value: 6, description: '6%' },
						{ value: 7, description: '7%' },
						{ value: 8, description: '8%' },
						{ value: 9, description: '9%' },
						{ value: 10, description: '10%' }
					],
					icons: ['https://wiki.guildwars2.com/images/e/ee/Endless_Toymaker%27s_Tonic.png'],
					names: [
						{
							name: 'Guild Magic Find',
							link: 'https://wiki.guildwars2.com/wiki/Guild_Magic_Find'
						}
					]
				},
				{
					id: 'nourishment',
					type: 'bool',
					value: 40,
					description:
						'Chocolate Cream (with active boons) / Longevity Noodles (during Lunar New Year)',
					icons: [
						'https://wiki.guildwars2.com/images/8/8a/Chocolate_Omnomberry_Cream.png',
						'https://wiki.guildwars2.com/images/e/eb/Longevity_Noodles.png'
					],
					names: [
						{
							name: 'Chocolate Omnomberry Cream',
							link: 'https://wiki.guildwars2.com/wiki/Chocolate_Omnomberry_Cream'
						},
						{
							name: 'Longevity Noodles',
							link: 'https://wiki.guildwars2.com/wiki/Longevity_Noodles'
						}
					]
				},
				{
					id: 'enhancement',
					type: 'bool',
					value: 30,
					description: 'Sharpening Skull, Flask of Pumpkin Oil, Lump of Crystallized Nougat',
					icons: [
						'https://wiki.guildwars2.com/images/e/ee/Sharpening_Skull.png',
						'https://wiki.guildwars2.com/images/7/71/Flask_of_Pumpkin_Oil.png',
						'https://wiki.guildwars2.com/images/8/8f/Lump_of_Crystallized_Nougat.png'
					],
					names: [
						{
							name: 'Feline Blessing',
							link: 'https://wiki.guildwars2.com/wiki/Sharpening_Skull'
						},
						{
							name: "Pumpkin's Blessing",
							link: 'https://wiki.guildwars2.com/wiki/Flask_of_Pumpkin_Oil'
						},
						{
							name: "Ghoul's Blessing",
							link: 'https://wiki.guildwars2.com/wiki/Lump_of_Crystallized_Nougat'
						}
					]
				},
				{
					id: 'new-years-gift',
					type: 'bool',
					value: 10,
					description: 'Lucky Draketail, Lucky New Year Firework (Stack duration)',
					icons: [
						'https://wiki.guildwars2.com/images/f/f3/Lucky_Draketail.png',
						'https://wiki.guildwars2.com/images/7/7d/Lucky_New_Year_Firework.png'
					],
					names: [
						{
							name: "New Year's Gift",
							link: 'https://wiki.guildwars2.com/wiki/New_Year%27s_Gift'
						}
					]
				}
			]
		},

		{
			id: 'boosters',
			description: 'boosters (accountbound)',
			items: [
				{
					id: 'magic-find-boost',
					type: 'bool',
					value: 50,
					icons: [
						'https://wiki.guildwars2.com/images/b/b6/Magic_Find_Booster.png',
						'https://wiki.guildwars2.com/images/f/ff/Enchanted_Reward_Boost.png',
						'https://wiki.guildwars2.com/images/4/4d/Communal_Boost_Bonfire.png',
						'https://wiki.guildwars2.com/images/3/3e/Dragon%27s_Fortune_Fireworks.png',
						'https://wiki.guildwars2.com/images/9/9d/Hallows_Fortune_Fireworks.png'
					],
					names: [
						{
							name: 'Magic Find Boost',
							link: 'https://wiki.guildwars2.com/wiki/Magic_Find_Boost'
						}
					],
					description:
						"Magic Find Boosters, Communal Boost Bonfires, Kite Fortunes, Dragon's Fortune Fireworks Hallows Fortune Fireworks."
				},
				{
					id: 'item-boost',
					type: 'bool',
					value: 50,
					icons: [
						'https://wiki.guildwars2.com/images/b/b6/Magic_Find_Booster.png',
						'https://wiki.guildwars2.com/images/f/ff/Enchanted_Reward_Boost.png',
						'https://wiki.guildwars2.com/images/8/82/Heroic_Booster.png',
						'https://wiki.guildwars2.com/images/7/73/Candy_Corn_Gobbler_Pack.png'
					],
					names: [
						{
							name: 'Item Booster',
							link: 'https://wiki.guildwars2.com/wiki/Item_Booster_(effect)'
						}
					],
					description:
						'Item Booster, Item Booster (masterwork), Heroic Booster, Enchanted Reward Boost, Candy Corn Gobbler'
				},
				{
					id: 'celebration-boost',
					type: 'bool',
					value: 100,
					icons: [
						'https://wiki.guildwars2.com/images/2/2e/Celebration_Booster.png',
						'https://wiki.guildwars2.com/images/2/25/Birthday_Booster.png'
					],
					names: [
						{
							name: 'Celebration Bonus',
							link: 'https://wiki.guildwars2.com/wiki/Celebration_Bonus'
						}
					],
					description: 'Celebration Booster, Birthday Booster'
				},
				{
					id: 'black-lion-boost',
					type: 'bool',
					value: 100,
					icons: ['https://wiki.guildwars2.com/images/a/a4/Black_Lion_Booster.png'],
					names: [
						{
							name: 'Black Lion Booster',
							link: 'https://wiki.guildwars2.com/wiki/Black_Lion_Booster'
						}
					],
					description: 'Available for Black Lion Statuettes'
				}
			]
		}
	];

	let magicfind = $state(new MagicFind());
	let totalValue = $derived(getTotalValue(magicfind));

	magicFindData.forEach((seedCategory) => {
		let category: MagicFindCategory = new MagicFindCategory();
		category.id = seedCategory.id;
		category.description = seedCategory.description;
		seedCategory.items.forEach((seedItem) => {
			if (seedItem.type === 'number') {
				let item: MagicFindItemNumber = new MagicFindItemNumber();
				item.description = seedItem.description;
				item.value = seedItem.value;
				item.icons = seedItem.icons;
				item.names = seedItem.names;
				category.items.push(item);
			} else if (seedItem.type === 'select') {
				let item: MagicFindItemSelect = new MagicFindItemSelect();
				item.description = seedItem.description;
				item.value = seedItem.value;
				item.icons = seedItem.icons;
				item.names = seedItem.names;
				item.options = seedItem.options?.map((option) => {
					return { value: option.value, description: option.description };
				});
				category.items.push(item);
			} else if (seedItem.type === 'bool') {
				let item: MagicFindItemBool = new MagicFindItemBool();
				item.description = seedItem.description;
				item.value = seedItem.value;
				item.icons = seedItem.icons;
				item.names = seedItem.names;
				item.checked = seedItem.checked;
				category.items.push(item);
			} else if (seedItem.type === 'radio') {
				let item: MagicFindItemBool = new MagicFindItemRadio();
				item.description = seedItem.description;
				item.value = seedItem.value;
				item.icons = seedItem.icons;
				item.names = seedItem.names;
				item.checked = seedItem.checked;
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

<div
	class="grid w-fit grid-cols-[auto_auto_auto_1fr] gap-x-4 self-center justify-self-center rounded-lg border border-neutral-800 text-xs"
>
	<div
		class="sticky top-0 col-span-full grid grid-cols-subgrid items-center border border-neutral-800 p-2 text-base"
	>
		<div class="col-span-2 text-right">value</div>
		<div></div>
		<div>description</div>
	</div>
	{#each magicfind.categories as category: MagicFindCategory}
		<MagicFindGridSection {category}>
			{#each category.items as item: MagicFindItem}
				<label class="col-span-full grid grid-cols-subgrid items-center p-2">
					{#if item instanceof MagicFindItemSelect}
						<select id={item.id} class="col-span-2 text-xs">
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
								item.setValue(parseInt(e.target.value));
							}}
						/>
					{:else if item instanceof MagicFindItemBool}
						<input id={item.id} type="checkbox" checked={item.checked} />
						<div class="text-right">{item.value}</div>
					{:else if item instanceof MagicFindItemRadio}
						<input id={item.id} type="radio" name={category.id} checked={item.checked} />
						<div class="text-right">{item.value}</div>
					{/if}
					<div class="flex flex-wrap">
						{#each item.icons as icon}
							<img class="size-8" src={icon} alt="icon" />
						{/each}
					</div>
					<div class="flex flex-col">
						<div class="flex flex-wrap gap-2">
							{#each item.names as name}
								<a href={name.link}>{name.name}</a>
							{/each}
						</div>
						<div>{item.description}</div>
					</div>
				</label>
			{/each}
		</MagicFindGridSection>
	{/each}
	<div
		class=" sticky bottom-0 col-span-full grid grid-cols-subgrid items-center border border-neutral-800 p-2 text-base"
	>
		<div class="col-span-2 text-right">{totalValue}</div>
		<div class="col-span-2">% (of max 750%)</div>
	</div>
</div>

<style>
	a {
		text-decoration: underline;
	}
</style>
