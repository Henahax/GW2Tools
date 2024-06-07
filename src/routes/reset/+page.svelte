<script lang="ts">
	import { dataStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import json from '../../assets/reset.json';
	import Header from '$lib/header.svelte';
	import IntervalTimer from './IntervalTimer.svelte';
	import Task from './Task.svelte';
	import SettingsTask from './SettingsTask.svelte';
	import Category from './Category.svelte';

	onMount(() => {
		$dataStore = getData();
	});

	function getData() {
		for (let category = 0; category < json.length; category++) {
			for (let task = 0; task < json[category].tasks.length; task++) {
				let display = getCookie('display.' + json[category].tasks[task].id);
				if (display === null && json[category].tasks[task].default) {
					display = true;
				} else if (display === null) {
					display = false;
				}
				let checked = getCookie('check.' + json[category].tasks[task].id);
				if (checked === null) {
					checked = false;
				}
				json[category].tasks[task].display = display;
				json[category].tasks[task].checked = checked;
			}
		}
		return json;
	}
</script>

<svelte:head>
	<title>GW2Tools: Reset</title>
</svelte:head>

<div class="drawer z-50">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
	</div>
	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="menu bg-base-200 text-base-content min-h-full w-fit p-4">
			<!-- Sidebar content here -->
			<h2 class="text-lg font-bold">Displayed tasks</h2>

			<div class="columns-1 md:columns-2 xl:columns-3 2xl:columns-4">
				{#each $dataStore as category}
					<div class="break-inside-avoid py-2">
						<div class="text-sm font-semibold">{category.name}</div>
						<ul>
							{#each category.tasks as task}
								<SettingsTask {task} />
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="flex flex-row items-center justify-between">
	<Header title="Reset Checklist">
		<span class="text-sm"
			>Choose displayed timegated tasks in the options menu and track progress</span
		>
	</Header>

	<div class="flex flex-row items-center gap-4 text-right text-sm">
		<div class="flex flex-row flex-wrap justify-end gap-x-4 gap-y-2">
			<div class="flex flex-col">
				<span>Daily:</span>
				<IntervalTimer mode={1} />
			</div>
			<div class="flex flex-col">
				<span>Weekly:</span>
				<IntervalTimer mode={2} />
			</div>
		</div>
		<label for="my-drawer" class="btn btn-circle drawer-button text-2xl"
			><i class="fa-solid fa-gear"></i></label
		>
	</div>
</div>

<div class="container mx-auto columns-1 gap-4 md:columns-2 2xl:columns-3">
	{#each $dataStore as category}
		<Category {category} />
	{/each}
</div>
