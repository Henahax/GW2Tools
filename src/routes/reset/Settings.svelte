<script lang="ts">
	import data from '../../assets/reset.json';

	import type { SvelteComponent } from 'svelte';
	//export let parent: SvelteComponent;

	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
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
						{#each category.tasks as task}
							<li class="py-1">
								<label class="flex flex-row items-center gap-2">
									<input type="checkbox" class="checkbox size-6" data-focusindex="0" />
									<img class="size-6" src={task.icon} alt={task.name} />
									{task.name}
								</label>
							</li>
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
