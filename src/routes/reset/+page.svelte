<script lang="ts">
	import { dataStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import json from '../../assets/reset.json';
	import Header from '$lib/header.svelte';
	import IntervalTimer from './IntervalTimer.svelte';
	import Task from './Task.svelte';

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

	/*
Converters:

https://wiki.guildwars2.com/wiki/Portable_exchanger

Material
Mawdrey II, Princess, Star of Gratitude, Spearmarshal's Plea, Gleam of Sentience

PvP, WvW
Shards of Glory Converter, Memory Gobbler

Currency
Karmic Converter, Ley-Energy Matter Converter, Sentient Singularity, Volatile Singularity, Fractal Reliquary

Ecto Gamble

Portable Wizard's Tower Exchange
Daily/Weekly
*/
</script>

<svelte:head>
	<title>GW2Tools: Reset</title>
</svelte:head>

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
		<button class="btn btn-circle text-2xl">
			<i class="fa-solid fa-gear"></i>
		</button>
	</div>
</div>

<div class="container mx-auto columns-1 gap-8 md:columns-2 2xl:columns-3">
	{#each $dataStore as category}
		<div class="card bg-base-200 collapse-arrow collapse w-full shadow-xl">
			<input type="checkbox" checked={true} />
			<div class="collapse-title text-lg font-medium">{category.name}</div>
			<div class="collapse-content">
				<ul class="divide-base-300 divide-y">
					{#each category.tasks.sort((a, b) => a.interval.localeCompare(b.interval)) as task}
						<Task {task} />
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>

<style>
	:is(.container .collapse:not(:last-child)) {
		margin-bottom: 1rem;
	}

	.collapse,
	.collapse-content {
		transition-duration: 700ms;
	}
</style>
