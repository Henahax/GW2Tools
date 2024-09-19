<script>
	import Title from '$lib/components/Title.svelte';
	let tools = [
		{
			name: 'Reset',
			path: '/reset',
			icon: 'fa-solid fa-arrows-rotate',
			description: 'checklist for daily and weekly tasks',
			bulletpoints: [
				'select displayed tasks from 50+ in the options',
				'vendors with daily/weekly reset',
				'crafting & harvesting',
				'events & world bosses with timers'
			]
		},
		{
			name: 'Magic Find',
			path: '/magicfind',
			icon: 'fa-solid fa-clover',
			description: 'calculator for optimising magic find',
			bulletpoints: ['account bonuses', 'equipment', 'effects', 'consumables']
		}
		/*
		,
		{
			name: 'Ecto Salvage',
			path: '/ecto',
			icon: 'fa-solid fa-screwdriver-wrench',
			description: 'calculator for salvaging ectos',
			bulletpoints: ['all salvage kits', 'live prices', 'hypothetical prices']
		}
		*/
	];
</script>

<svelte:head>
	<title>GW2Tools: Home</title>
</svelte:head>

<Title title="Henahax' Guild Wars 2 Tools" subtitle="Tool Collection for efficiency and profit"
></Title>

<div class="mx-auto flex flex-col justify-center">
	<!-- lg:grid-cols-3 -->
	<div class="mx-auto grid grid-cols-1 grid-rows-1 gap-4 py-8 md:grid-cols-2">
		{#each tools as tool}
			<a
				class="card bg-base-100 hover:bg-base-200 flex flex-col gap-2 p-8 text-center shadow duration-300 ease-in-out"
				href={tool.path}
			>
				<i class="px-4 text-4xl {tool.icon}"></i>
				<div>
					<h3 class="text-xl">{tool.name}</h3>
					<h4 class="text-sm">{tool.description}</h4>
				</div>
				<ul class="mx-auto w-fit list-disc text-left text-xs">
					{#if tool.bulletpoints}
						{#each tool.bulletpoints as bulletpoint}
							<li>{bulletpoint}</li>
						{/each}
					{/if}
				</ul>
			</a>
		{/each}
	</div>
</div>

<style>
</style>
