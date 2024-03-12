<script lang="ts">
	import data from '../../assets/reset.json';
	import ResetTimer from './ResetTimer.svelte';
	import Card from './Card.svelte';

	import Settings from './Settings.svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	const modalComponent: ModalComponent = { ref: Settings };

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	function openSettings() {
		modalStore.trigger(modal);
	}
</script>

<div class="p-4 flex flex-row justify-between items-center gap-2">
	<div>
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Timegated tasks without an ingame tracking system</div>
	</div>
	<div class="flex flex-row gap-4 text-right">
		<div class="flex flex-row flex-wrap justify-end gap-4 text-sm">
			<div class="flex flex-col">
				<div class="text-xs">Daily:</div>
				<ResetTimer mode={1} />
			</div>
			<div class="flex flex-col">
				<div class="text-xs">Weekly:</div>
				<ResetTimer mode={2} />
			</div>
		</div>
		<button class="text-2xl" on:click={openSettings}>
			<i class="fa-solid fa-gear"></i>
		</button>
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
