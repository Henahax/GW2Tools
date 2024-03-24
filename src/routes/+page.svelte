<script lang="ts">
	let tools = [
		{
			name: 'Reset',
			path: '/reset',
			icon: 'fa-solid fa-arrows-rotate',
			description: 'checklist for daily and weekly tasks',
			bulletpoints: ['vendors', 'crafting', 'harvesting', 'events & timers']
		},
		{
			name: 'Magicfind',
			path: '/magicfins',
			icon: 'fa-solid fa-clover',
			description: 'calculator for optimising magic find',
			bulletpoints: ['account', 'equipment', 'effects', 'consumables']
		},
		{
			name: 'Ecto Salvage',
			path: '/ecto',
			icon: 'fa-solid fa-screwdriver-wrench',
			description: 'calculator for salvaging ectos',
			bulletpoints: ['all salvage kits', 'live prices', 'hypothetical prices']
		}
	];
</script>

<svelte:head>
	<title>GW2 Tools: Home</title>
</svelte:head>

<div class="container mx-auto flex h-full flex-col items-center justify-center p-4">
	<h4 class="h4 p-4">available tools:</h4>
	<div
		class="container-hover container grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
	>
		{#each tools as tool}
			<a href={tool.path}>
				<div class="card card-hover h-full w-full p-4 text-center">
					<i class="p-4 text-center text-4xl {tool.icon}"></i>
					<h3 class="h3">{tool.name}</h3>
					<p class="py-2">{tool.description}</p>
					<ul class="mx-auto w-fit list-disc text-left">
						{#if tool.bulletpoints}
							{#each tool.bulletpoints as bulletpoint}
								<li>{bulletpoint}</li>
							{/each}
						{/if}
					</ul>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
</style>
