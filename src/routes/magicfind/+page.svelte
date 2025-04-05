<script lang="ts">
	const magicFindData = [
		{
			name: 'character',
			description: 'character (account & gear)',
			items: [
				{
					name: 'account bonus',
					type: 'number',
					value: 0,
					checked: true
				},
				{ name: 'enrichtment', value: 20 },
				{
					name: 'guild magic find',
					type: 'select',
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
			items: []
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
	const seedMagicFindItems = [];
</script>

<div class="grid w-fit grid-cols-[auto_auto_auto_1fr] gap-4 self-center justify-self-center">
	<div class="col-span-full grid grid-cols-subgrid items-center text-lg">
		<div class="col-span-3">value</div>
		<div>description</div>
	</div>
	{#each magicFindData as category}
		<div class="col-span-full text-sm">{category.description}</div>
		{#each category.items as item: any}
			<div class="col-span-full grid grid-cols-subgrid items-center">
				{#if item.type === 'select'}
					<select class="col-span-2">
						{#each item.options as option}
							<option class="text-right" value={option.value}>{option.description}</option>
						{/each}
					</select>
				{:else if item.type === 'number'}
					<input
						type="number"
						class="col-span-2 text-right"
						value={item.value}
						min="0"
						max="350"
						step="1"
					/>
				{:else}
					<input type="checkbox" />
					<div class="text-right">{item.value}</div>
				{/if}
				<div></div>
				<div>{item.name}</div>
			</div>
		{/each}
	{/each}
	<div class="col-span-full grid grid-cols-subgrid items-center text-lg">
		<div class="col-span-2 text-right">0</div>
		<div class="col-span-2">% (of max 750%)</div>
	</div>
</div>

<style>
</style>
