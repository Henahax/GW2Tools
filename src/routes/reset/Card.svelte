<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Task from './Task.svelte';
	export let category;

    let open = true;
</script>

<div class="card card-hover break-inside-avoid">
	<Accordion transitionInParams={{duration: 1250}} transitionOutParams={{duration: 1250}}	>
		<AccordionItem open={open}>
			<svelte:fragment slot="summary"><p class="font-bold">{category.name}</p></svelte:fragment>
			<svelte:fragment slot="content">
				<ul class="divide-black divide-y">
					{#each category.tasks as task}
						<Task {task} />
					{/each}
				</ul>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<style>
	.card:not(:last-child) {
		@apply mb-4;
	}

    .card:not(:has(input[type="checkbox"]:not(:checked))) {
    @apply opacity-50;
  }

  .card:has(ul:empty) {
    @apply invisible;
  }
</style>
