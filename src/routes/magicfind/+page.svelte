<script lang="ts">
	import data from './magicfind.json';
	import {
		MagicFind,
		MagicFindItemSelect,
		MagicFindItemNumber,
		MagicFindItemBool,
		MagicFindItemRadio
	} from './MagicFind.svelte';

	let magicfind: MagicFind = $state(new MagicFind(data));
	let totalValue: number = $derived(magicfind.total);
</script>

<div
	class="magicfind my-auto grid w-fit grid-cols-[auto_auto_1fr_4fr] gap-x-4 self-center justify-self-center rounded-lg text-xs"
>
	<div
		class="magicfind-head sticky top-0 col-span-full grid grid-cols-subgrid items-center border border-neutral-800 p-2 text-base"
	>
		<div class="col-span-2 text-right">value</div>
		<div></div>
		<div>description</div>
	</div>
	{#each magicfind.categories as category: MagicFindCategory}
		<section class="col-span-full grid grid-cols-subgrid">
			<button
				class="magicfind-button col-span-full flex gap-4 border border-neutral-800 px-4 py-1 text-left font-bold max-sm:py-2"
				onclick={() => category.toggleOpen()}
			>
				<div>
					{#if category.open}
						<i class="fa-solid fa-minus"></i>
					{:else}
						<i class="fa-solid fa-plus"></i>
					{/if}
				</div>
				<div class="col-span-3">
					{category.name}
				</div>
			</button>
			<div
				class="section-content col-span-full grid grid-cols-subgrid items-center divide-y divide-neutral-800 {category.open
					? ''
					: 'h-0'}"
			>
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
							<div class="flex flex-wrap gap-x-2">
								{#each item.names as name}
									<a href={name.link} target="_blank" rel="noopener noreferrer">{name.name}</a>
								{/each}
							</div>
							<div>{item.description}</div>
						</div>
					</label>
				{/each}
			</div>
		</section>
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
	.magicfind {
		background-color: var(--card-background);
	}

	.magicfind-head,
	.magicfind-foot {
		background-color: var(--card-background);
	}

	.magicfind-button {
		background-color: var(--card-background-light);
	}

	.magicfind a {
		text-decoration: none;
		color: var(--primary);
	}

	.magicfind a:hover {
		text-decoration: underline;
	}

	.magicfind,
	.magicfind-head,
	.magicfind-foot {
		border-color: var(--border);
	}

	.section-content {
		transition: height 0.5s ease-in-out;
		overflow: clip;
		interpolate-size: allow-keywords;
	}

	button:hover {
		border-color: var(--color-neutral-500);
	}
</style>
