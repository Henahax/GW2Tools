<script lang="ts">
	import data from '../../assets/reset.json';
	import SettingsTask from './SettingsTask.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	//settings sortieren sich um wenn man menü 2 mal aufmacht
</script>

{#if $modalStore[0]}
	<div class="flex flex-col card p-4">
		<div class="w-full flex flex-row justify-between">
			<h3>Displayed items</h3>
			<button class="btn-icon btn-icon-sm variant-soft" on:click={modalStore.close}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
		<div class="md:columns-2 xl:columns-3 2xl:columns-4 p-2 m-4">
			{#each data as category}
				<div class="category break-inside-avoid">
					<div class="font-bold">{category.name}</div>
					<ul>
						{#each category.tasks.sort((a, b) => a.interval.localeCompare(a.ic)) as task}
							<SettingsTask {task} />
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<div class="flex w-full justify-center">
			<button class="btn variant-soft" on:click={modalStore.close}>Ok</button>
		</div>
	</div>
{/if}

<style>
	.category:not(:last-child) {
		@apply mb-4;
	}
</style>
