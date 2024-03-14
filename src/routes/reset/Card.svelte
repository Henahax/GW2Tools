<script lang="ts">
	import { Accordion, AccordionItem, Toast } from '@skeletonlabs/skeleton';
	import Task from './Task.svelte';
	export let category: any;

	let open = true;

	import { get } from 'svelte/store';
	import { settingsStore } from './store';

	function getOpen() {
		//TODO
		let settings = get(settingsStore);
		for (let i = 0; i < category.tasks.length; i++) {}
	}
</script>

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
</div>

<style>
	.card:not(:last-child) {
		@apply mb-4;
	}

	.card:not(:has(input[type='checkbox']:not(:checked))) {
		@apply opacity-50;
	}

	.card:has(ul:empty) {
		@apply hidden;
	}
</style>
