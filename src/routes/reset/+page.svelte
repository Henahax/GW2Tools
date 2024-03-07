<script lang="ts">
	import data from '../../assets/reset.json';
	import ResetTimer from './ResetTimer.svelte';
	import Card from './Card.svelte';
</script>

<div class="p-4 flex flex-row justify-between items-center gap-2">
	<div>
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Timegated tasks without an ingame tracking system</div>
	</div>
	<div class="flex flex-row gap-4 text-right">
		<div class="flex flex-row gap-4 text-sm">
			<div class="flex flex-col">
				<div>Daily:</div>
				<ResetTimer mode={1} />
			</div>
			<div class="flex flex-col">
				<div>Weekly:</div>
				<ResetTimer mode={2} />
			</div>
		</div>
		<button><i class="fa-solid fa-gear"></i></button>
	</div>
</div>
<div class="cardContainer mx-auto px-4">
	{#each data as category}
		<Card {category} />
	{/each}
</div>

<style>
	.cardContainer {
		columns: 3 24rem;
		column-fill: balance;
	}
</style>
