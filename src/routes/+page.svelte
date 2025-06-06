<script lang="ts">
	const internal = [
		{
			title: 'Reset',
			subtitle: 'time-gated tasks checklist',
			icon: 'fa-solid fa-arrows-rotate',
			subitems: [
				'select from 90+ tasks to track',
				'daily and weekly tasks available',
				'included event timers'
			],
			link: '/reset'
		},
		{
			title: 'Magic Find',
			subtitle: 'magic find calculator',
			icon: 'fa-solid fa-clover',
			subitems: [
				'open containers with maximum magic find',
				'select from numerous options',
				'save valuable limited boosters'
			],
			link: '/magicfind'
		}
	];

	const external = [
		{
			title: 'GW2Efficiency',
			subtitle: 'account, currencies, crafting',
			link: 'https://gw2efficiency.com'
		},
		{ title: 'Fast Farming Community', subtitle: 'conversions, calculators' },
		{ title: 'GW2BLTC', subtitle: 'trading, price history' },
		{ title: 'GW2 Profits', subtitle: 'trading, crafting' },
		{ title: 'DataWars2', subtitle: 'trading, calculators' }
	];
</script>

<div class="flex grow flex-col justify-center gap-8">
	<h1 class="self-center text-3xl">GW2Tools</h1>
	<section class="flex flex-col">
		<div class="grid w-fit grid-cols-2 gap-4 self-center max-sm:grid-cols-1">
			{#each internal as item}
				<a class="flex flex-col gap-2 rounded-2xl border p-4 text-center" href={item.link}>
					<i class="text-4xl {item.icon}"></i>
					<div>
						<div class="text-2xl">{item.title}</div>
						<div>{item.subtitle}</div>
					</div>
					{#if item.subitems.length > 0}
						<ul class="w-fit list-disc self-center px-4 text-xs">
							{#each item.subitems as subitem}
								<li class="w-fit">{subitem}</li>
							{/each}
						</ul>
					{/if}
				</a>
			{/each}
		</div>
	</section>
	<section class="flex flex-col gap-2">
		<h1 class="self-center text-xl">external tools:</h1>

		<div class="flex flex-wrap justify-center gap-2 self-center">
			{#each external as item}
				<a class="flex flex-col rounded-2xl border p-4 text-center" href={item.link}>
					<div>{item.title}</div>
					<div class="text-xs">{item.subtitle}</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	a {
		border-color: var(--foreground-muted);
		cursor: pointer;
	}

	a:hover {
		border-color: var(--foreground);
	}
</style>
