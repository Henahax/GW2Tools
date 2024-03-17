<script lang="ts">
	import { onMount } from 'svelte';
	import { storeEcto, storeDust } from './store';

	let salvage = [
		{
			name: 'Copper-Fed Salvage-o-Matic',
			icon: 'https://wiki.guildwars2.com/images/0/00/Copper-Fed_Salvage-o-Matic.png',
			cost: 3,
			dust: 1.625,
			luck: 105
		},
		{
			name: "Runecrafter's Salvage-o-Matic",
			icon: 'https://wiki.guildwars2.com/images/2/26/Runecrafter%27s_Salvage-o-Matic.png',
			cost: 30,
			dust: 1.575,
			luck: 105
		},
		{
			name: 'Silver-Fed Salvage-o-Matic',
			icon: 'https://wiki.guildwars2.com/images/a/a2/Silver-Fed_Salvage-o-Matic.png',
			cost: 60,
			dust: 1.85,
			luck: 105
		},
		{
			name: 'Black Lion Salvage Kit',
			icon: 'https://wiki.guildwars2.com/images/1/1d/Black_Lion_Salvage_Kit.png',
			cost: 0,
			dust: 2.05,
			luck: 105
		}
	];
	let ectoBuy = 0;
	let ectoSell = 0;
	let dustBuy = 0;
	let dustSell = 0;

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
		ectoSell = $storeEcto.sells?.unit_price;
	}
	function getDustPrice() {
		dustBuy = $storeDust.buys?.unit_price;
		dustSell = $storeDust.sells?.unit_price;
	}
</script>

<div class="flex mx-auto gap-4">
	<div class="card p-4 flex flex-col gap-2 w-fit">
		<h3 class="h3">Ecto</h3>
		<div>
			<label class="label px-2" for="ectoBuy">Buy</label>
			<input id="ectoBuy" class="input text-right" type="number" bind:value={ectoBuy} />
		</div>
		<div>
			<label class="label px-2" for="ectoSell">Sell</label>
			<input id="ectoSell" class="input text-right" type="number" bind:value={ectoSell} />
		</div>
	</div>
	<div class="card p-4 flex flex-col gap-2 w-fit">
		<h3 class="h3">Dust</h3>
		<div>
			<label class="label px-2" for="dustBuy">Buy</label>
			<input id="dustBuy" class="input text-right" type="number" bind:value={dustBuy} />
		</div>
		<div>
			<label class="label px-2" for="dustSell">Sell</label>
			<input id="dustSell" class="input text-right" type="number" bind:value={dustSell} />
		</div>
	</div>
</div>

<div>
	{#each salvage as kit}
		<div class="card">
			<div class="flex flex-row gap-2 items-center">
				<img class="size-8" src={kit.icon} alt={kit.name} />
				<div>{kit.name}</div>
			</div>
			<div></div>
		</div>
	{/each}
</div>
