<script lang="ts">
	import { onMount } from 'svelte';
	import { storeEcto, storeDust } from './store';
	import Header from '$lib/header.svelte';

	let salvage = [
		{
			id: 1,
			name: 'Black Lion Salvage Kit',
			icon: 'https://wiki.guildwars2.com/images/1/1d/Black_Lion_Salvage_Kit.png',
			cost: 0,
			dust: 2.05,
			luck: 105
		},
		{
			id: 2,
			name: 'Silver-Fed Salvage-o-Matic',
			icon: 'https://wiki.guildwars2.com/images/a/a2/Silver-Fed_Salvage-o-Matic.png',
			cost: 60,
			dust: 1.85,
			luck: 105
		},
		{
			id: 3,
			name: "Runecrafter's Salvage-o-Matic",
			icon: 'https://wiki.guildwars2.com/images/2/26/Runecrafter%27s_Salvage-o-Matic.png',
			cost: 30,
			dust: 1.575,
			luck: 105
		},
		{
			id: 4,
			name: 'Copper-Fed Salvage-o-Matic',
			icon: 'https://wiki.guildwars2.com/images/0/00/Copper-Fed_Salvage-o-Matic.png',
			cost: 3,
			dust: 1.625,
			luck: 105
		}
	];

	let ectoBuy = 0;
	let dustSell = 0;
	let luckExchange = 704;

	onMount(async () => {
		try {
			const responseEcto = await fetch(
				'https://api.guildwars2.com/v2/commerce/prices/19721?lang=en'
			);
			const responseDust = await fetch(
				'https://api.guildwars2.com/v2/commerce/prices/24277?lang=en'
			);

			if (!responseEcto.ok || !responseDust.ok) {
				throw new Error('Failed to fetch data');
			}

			$storeEcto = await responseEcto.json();
			$storeDust = await responseDust.json();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	$: $storeEcto, getEctoPrice();
	$: $storeDust, getDustPrice();

	function getEctoPrice() {
		ectoBuy = $storeEcto.buys?.unit_price;
	}

	function getDustPrice() {
		dustSell = $storeDust.sells?.unit_price;
	}

	function getProfit(kitId: number, ectoPrice = 0, dustPrice = 0, luckPrice = 0) {
		let profit = 0;

		let kit;
		for (let item of salvage) {
			if (item.id === kitId) {
				kit = item;
			}
		}

		profit = kit?.dust * dustPrice * 0.85 + (kit.luck / 1000) * luckPrice - (ectoPrice + kit?.cost);

		return Math.round(profit);
	}
</script>

<svelte:head>
	<title>GW2Tools: Ecto Salvage</title>
</svelte:head>

<Header title="Ecto Salvage">
	<span class="text-sm">Is salvaging Ectos to Dust profitable?</span>
	<span class="text-sm">initial prices are the current prices from the trading post</span>
</Header>

<div class="flex flex-col gap-2">
	<div class="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
		<div class="card bg-base-200 flex flex-col gap-2 p-4 shadow-xl">
			<div class="flex flex-row items-center justify-start gap-2">
				<img
					class="size-8"
					src="https://wiki.guildwars2.com/images/9/9b/Glob_of_Ectoplasm.png"
					alt="Glob of Ectoplasm"
				/>
				<div class="text-lg">Glob of Ectoplasm</div>
			</div>
			<span>order price</span>

			<label class="input input-bordered flex items-center gap-2">
				<input
					type="number"
					class="grow text-right"
					placeholder="order price"
					bind:value={ectoBuy}
				/>
				<img
					class="size-6"
					src="https://wiki.guildwars2.com/images/1/11/Copper_coin_%28highres%29.png"
					alt="copper"
				/>
			</label>
			<div class="text-xs">
				order Globs of Ectoplasm for this price on the trading post and wait until your order is
				fulfilled
			</div>
		</div>
		<div class="card bg-base-200 flex flex-col gap-2 p-4 shadow-xl">
			<div class="flex flex-row items-center justify-start gap-2">
				<img
					class="size-8"
					src="https://wiki.guildwars2.com/images/3/3a/Pile_of_Crystalline_Dust.png"
					alt="Pile of Crystalline Dust"
				/>
				<div class="text-lg">Crystalline Dust</div>
			</div>
			<span>listing price</span>
			<label class="input input-bordered flex items-center gap-2">
				<input
					type="number"
					class="grow text-right"
					placeholder="listing price"
					bind:value={dustSell}
				/>
				<img
					class="size-6"
					src="https://wiki.guildwars2.com/images/1/11/Copper_coin_%28highres%29.png"
					alt="copper"
				/>
			</label>
			<div class="text-xs">
				list Piles of Crystalline Dust for this price on the trading post and wait unti it is sold
			</div>
		</div>
		<div class="card bg-base-200 flex flex-col gap-2 p-4 shadow-xl">
			<div class="flex flex-row items-center justify-start gap-2">
				<img
					class="size-8"
					src="https://wiki.guildwars2.com/images/8/83/Essence_of_Luck_%28exotic%29.png"
					alt="Essence of Luck"
				/>
				<div class="text-lg">Essence of Luck</div>
			</div>

			<span>exchange 1000 for</span>
			<label class="input input-bordered flex items-center gap-2">
				<input
					type="number"
					class="grow text-right"
					placeholder="exchange 1000 for"
					bind:value={luckExchange}
				/>
				<img
					class="size-6"
					src="https://wiki.guildwars2.com/images/1/11/Copper_coin_%28highres%29.png"
					alt="copper"
				/>
			</label>

			<div class="text-xs">
				<div>Drooburt rewards junk worth 704c per 1000 luck during Lunar New Year festival.</div>
				<div>Set to 0 to ignore luck value.</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
		{#each salvage as kit}
			<div class="card bg-base-200 flex flex-col gap-2 p-4 shadow-xl">
				<div class="flex flex-row items-center justify-start gap-2">
					<img class="size-8" src={kit.icon} alt={kit.name} />
					<div class="text-lg">{kit.name}</div>
				</div>

				<div class="flex flex-row items-center justify-between gap-2">
					<div class="flex flex-col">
						<div class="text-sm">salvaging profit after fees</div>
						{#if kit.id === 1}
							<div class="text-sm">salvaging cost ignored</div>
						{/if}
					</div>
					<div class="flex flex-row items-center gap-1">
						<img
							class="size-6"
							src="https://wiki.guildwars2.com/images/1/11/Copper_coin_%28highres%29.png"
							alt="copper"
						/>
						<div
							class="flex flex-row items-center gap-1 text-xl {getProfit(
								kit.id,
								ectoBuy,
								dustSell,
								luckExchange
							) > 0
								? 'text-green-500'
								: 'text-red-500'}"
						>
							{getProfit(kit.id, ectoBuy, dustSell, luckExchange)}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
