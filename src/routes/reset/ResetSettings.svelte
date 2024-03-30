<script lang="ts">
	import data from '../../assets/reset.json';
	import SettingsTask from './ResetSettingsTask.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card flex flex-col p-4">
		<div class="flex w-full flex-row justify-between">
			<h3>Displayed items</h3>
			<button class="btn-icon btn-icon-sm variant-soft" on:click={modalStore.close}>
				<i class="fa-solid fa-x"></i>
			</button>
		</div>
		<div class="m-2 columns-1 md:columns-2 xl:columns-3 2xl:columns-4">
			{#each data as category}
				<div class="category break-inside-avoid">
					<div class="font-bold">{category.name}</div>
					<ul>
						{#each category.tasks as task}
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
