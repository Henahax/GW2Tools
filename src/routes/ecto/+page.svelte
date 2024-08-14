<script lang="ts">
	import Title from '$lib/Title.svelte';
	import salvagekits from './salvage.json';
</script>

<svelte:head>
	<title>GW2Tools: Ecto Salvage</title>
</svelte:head>

<Title title="Ecto Salvage" subtitle="Is salvaging Ectos to Dust profitable?">
	<button class="btn btn-primary max-md:btn-square">
		<i class="fa-solid fa-question"></i>
		<div class="max-md:hidden">Info</div>
	</button>
</Title>

<div class="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
	{#each salvagekits as salvagekit}
		<div class="card bg-base-100 flex flex-col gap-2 p-4 shadow">
			<div class="flex flex-row items-center justify-start gap-2">
				<img class="size-8 rounded-md" src={salvagekit.icon} alt={salvagekit.name} />
				<div class="text-lg">{salvagekit.name}</div>
			</div>
			<slot />
		</div>
	{/each}
</div>
