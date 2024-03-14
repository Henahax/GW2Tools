<script lang="ts">
	import { Accordion, AccordionItem, Toast } from '@skeletonlabs/skeleton';
	import Task from './Task.svelte';
	export let category: any;

	let items = 0;

	//todo open reactive
	let open = true;

	import { get } from 'svelte/store';
	import { settingsStore, checksStore } from './store';

	$: $settingsStore, getOpen();
	$: $checksStore, getOpen();

	function getOpen() {
		//todo open reactive
		let checkedTasks = 0;
		let shows = get(settingsStore);
		let checks = get(checksStore);

		if (shows && checks && category) {
			for (let i = 0; i < category.tasks.length; i++) {
				for (let j = 0; j < shows.length; j++) {
					if (category.tasks[i].id === shows[j].name && shows[j].value === true) {
						items++;
					}
					for (let k = 0; k < checks.length; k++) {
						if (
							category.tasks[i].id === shows[j].name &&
							shows[j].value === true &&
							category.tasks[i].id === checks[k].name &&
							checks[k].value === true
						) {
							checkedTasks++;
						}
					}
				}
			}
		}

		open = items > checkedTasks;
	}
</script>

{#if items > 0}
	<div class="card card-hover break-inside-avoid">
		<Accordion transitionInParams={{ duration: 1250 }} transitionOutParams={{ duration: 1250 }}>
			<AccordionItem {open}>
				<svelte:fragment slot="summary"><p class="font-bold">{category.name}</p></svelte:fragment>
				<svelte:fragment slot="content">
					<ul class="divide-black divide-y">
						{#each category.tasks.sort((a, b) => a.interval.localeCompare(a.id)) as task}
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

	.card:not(:has(input[type='checkbox']:not(:checked))) {
		@apply opacity-50;
	}
</style>
