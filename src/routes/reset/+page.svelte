<script lang="ts">
	import Title from '$lib/Title.svelte';
	import taskList from './tasks.json';

	let tasks = $state(taskList);
	let groupedTasks = $derived({
		daily: tasks.filter((task) => task.interval === 'daily'),
		weekly: tasks.filter((task) => task.interval === 'weekly')
	});

	/*
    dailies / weeklies split

    categories:
    - id
    - name
    - index

    tasks:
    - id
    - category
    - name
    - location (location, vendor name) / info (items: consumes...) use for sorting
    - interval
    - icon
    - link
	 */
</script>

<svelte:head>
	<title>GW2Tools: Reset</title>
</svelte:head>

<Title
	title="Reset Checklist"
	subtitle="Choose displayed timegated tasks in the options menu and track progress"
></Title>

<div class="flex flex-col p-4 md:flex-row">
	{#each Object.entries(groupedTasks) as [interval, tasks]}
		<div>
			<h2 class="text-xl">{interval.charAt(0).toUpperCase() + interval.slice(1)} Tasks</h2>
			<ul>
				{#each tasks as task (task.id)}
					<li>
						<img src={task.icon} alt={task.name} width="32" height="32" />
						<a href={task.link} target="_blank" rel="noopener noreferrer">{task.name}</a>
						- {task.info}
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
