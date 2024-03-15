<script lang="ts">
	import { Accordion, AccordionItem, Toast } from '@skeletonlabs/skeleton';
	import Task from './Task.svelte';
	export let category: any;

	$: category, getOpen();

	let open = true;

	function getOpen() {
		let tasks = 0;
		let checked = 0;

		for (let i = 0; i < category.tasks.length; i++) {
			tasks++;
			if (category.tasks[i].checked) {
				checked++;
			}
		}

		open = tasks > checked;
	}
</script>

{#if category.tasks.filter((task) => task.display).length > 0}
	<div class="card card-hover break-inside-avoid">
		<Accordion transitionInParams={{ duration: 1250 }} transitionOutParams={{ duration: 1250 }}>
			<AccordionItem {open}>
				<svelte:fragment slot="summary"><p class="font-bold">{category.name}</p></svelte:fragment>
				<svelte:fragment slot="content">
					<ul class="divide-black divide-y">
						{#each category.tasks
							.filter((task) => task.display === true)
							.sort((a, b) => a.interval.localeCompare(a.id)) as task}
							<Task {task} />
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>{/if}

<style>
	.card:not(:last-child) {
		@apply mb-4;
	}
</style>
