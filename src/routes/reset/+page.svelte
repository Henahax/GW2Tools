<script lang="ts">
	import { dataStore } from './store';
	import { getCookie } from './functions';
	import { onMount } from 'svelte';
	import json from '../../assets/reset.json';
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
</script>

<svelte:head>
	<title>GW2 Tools: Reset</title>
</svelte:head>

<div class="flex flex-col gap-4">
	{#each $dataStore as category}
		<div class="bg-base-200 collapse-arrow collapse">
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">{category.name}</div>
			<div class="collapse-content">
				<ul>
					{#each category.tasks as task}
						<Task {task} />
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>
