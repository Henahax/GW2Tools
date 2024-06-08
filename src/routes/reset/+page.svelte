<script lang="ts">
	import { dataStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import Header from '$lib/header.svelte';
	import IntervalTimer from './IntervalTimer.svelte';
	import SettingsTask from './SettingsTask.svelte';
	import CategoryItem from './Category.svelte';

	import type { Category } from './types';
	import json from '../../assets/reset.json';

	const data: Category[] = json as Category[];

	onMount(() => {
		$dataStore = getData();
	});

	function getData() {
		for (let category = 0; category < data.length; category++) {
			for (let task = 0; task < data[category].tasks.length; task++) {
				let display = getCookie('display.' + data[category].tasks[task].id);
				if (display === null && data[category].tasks[task].display === true) {
					display = true;
				} else if (display === null) {
					display = false;
				}
				let checked = getCookie('check.' + data[category].tasks[task].id);
				if (checked === null) {
					checked = false;
				}
				data[category].tasks[task].display = display;
				data[category].tasks[task].checked = checked;
			}
		}
		return data;
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

	<label class="swap">
		<!-- this hidden checkbox controls the state -->
		<input type="checkbox" />

		<!-- volume on icon -->
		<svg
			class="swap-on fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			><path
				d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
			/></svg
		>

		<!-- volume off icon -->
		<svg
			class="swap-off fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			><path
				d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
			/></svg
		>
	</label>

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

<div class="container mx-auto columns-1 gap-2 md:columns-2 lg:columns-3 2xl:columns-4">
	{#each $dataStore as category}
		<CategoryItem {category} />
	{/each}
</div>
