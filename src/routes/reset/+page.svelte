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

<!-- overlays -->
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

			<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
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

<dialog id="modalInstructions" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Instructions</h3>
		<div class="info-grid grid items-center gap-4 p-4">
			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-gear"></i>
			</div>

			<div class="flex flex-col">
				<p>select displayed tasks</p>
				<p class="text-xs opacity-50">items, vendors, actions, events</p>
			</div>

			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-square-check"></i>
			</div>
			<div class="flex flex-col">
				<p>check completed tasks</p>
				<p class="text-xs opacity-50">tasks will reset on daily/weeky reset</p>
			</div>

			<div class="flex items-center justify-center text-2xl">
				<i class="fa-regular fa-circle-question"></i>
			</div>
			<div class="flex flex-col">
				<p>link to relevant information</p>
				<p class="text-xs opacity-50">wiki, calculators</p>
			</div>
			<div class="flex flex-col items-center justify-center text-2xl">
				<i class="fa-regular fa-clock text-lg"></i>
				<i class="fa-regular fa-calendar text-lg"></i>
			</div>
			<div class="flex flex-col">
				<p>reset interval</p>
				<p class="text-xs opacity-50">daily, weekly</p>
			</div>
			<div class="flex items-center justify-center">
				<span class="countdown font-mono">00:13:37</span>
			</div>
			<div class="flex flex-col">
				<p>countdown to next event</p>
				<div class="flex flex-row gap-4 text-xs opacity-50">
					<div class="flex items-center gap-2">
						<i class="fa-solid fa-play"></i><span>active</span>
					</div>
					<div class="flex items-center gap-2">
						<i class="fa-solid fa-stopwatch"></i><span>soon</span>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-center text-2xl">
				<i class="fa-solid fa-bell text-2xl"></i>
			</div>
			<div class="flex flex-col">
				<p>set alarm for next event</p>
				<p class="text-xs opacity-50">requires permission for browser notifications</p>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<div class="flex flex-row items-center justify-between">
	<Header
		title="Reset Checklist"
		subtitle="Choose displayed timegated tasks in the options menu and track progress"
	>
		<div class="flex flex-row items-center gap-4 text-sm">
			<div class="flex flex-row flex-wrap justify-end text-right">
				<div class="flex flex-col">
					<span>Daily:</span>
					<IntervalTimer mode={1} />
				</div>
				<div class="flex flex-col">
					<span>Weekly:</span>
					<IntervalTimer mode={2} />
				</div>
			</div>

			<label for="my-drawer" class="btn max-md:btn-circle drawer-button"
				><i class="fa-solid fa-gear"></i><span class="hidden md:block">Tracked tasks</span></label
			>

			<button class="btn max-md:btn-circle" onclick="modalInstructions.showModal()"
				><i class="fa-solid fa-info"></i><span class="hidden md:block">Instructions</span></button
			>
		</div>
	</Header>
</div>

<div class="container mx-auto columns-1 gap-2 md:columns-2 lg:columns-3 2xl:columns-4">
	{#each $dataStore as category}
		<CategoryItem {category} />
	{/each}
</div>

<style>
	.info-grid {
		grid-template-columns: fit-content(0) 1fr;
	}
</style>
