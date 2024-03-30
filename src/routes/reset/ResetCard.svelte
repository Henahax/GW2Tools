<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Task from './ResetTask.svelte';
	export let category: any;

	$: category, getNotAllChecked();

	let notAllChecked = true;

	function getNotAllChecked() {
		let tasks = 0;
		let checked = 0;

		for (let i = 0; i < category.tasks.length; i++) {
			if (category.tasks[i].display) {
				tasks++;
				if (category.tasks[i].checked) {
					checked++;
				}
			}
		}
		notAllChecked = tasks > checked;
	}
</script>

{#if category.tasks.filter((task) => task.display).length > 0}
	<div class="card card-hover break-inside-avoid {!notAllChecked ? 'opacity-50' : ''}">
		<Accordion transitionInParams={{ duration: 1250 }} transitionOutParams={{ duration: 1250 }}>
			<AccordionItem open={notAllChecked}>
				<svelte:fragment slot="summary"><p class="font-bold">{category.name}</p></svelte:fragment>
				<svelte:fragment slot="content">
					<ul class="divide-surface-700 divide-y">
						{#each category.tasks
							.filter((task) => task.display === true)
							.sort((a, b) => a.interval.localeCompare(b.interval)) as task}
							<Task {task} />
						{/each}
					</ul>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>{/if}

<style>
	.card:not(:last-child) {
		@apply mb-3;
	}
</style>
