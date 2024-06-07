<script lang="ts">
	import { setCookie } from './functions';
	import { dataStore } from './store';

	export let task: any;

	let checked = task.display;

	function handleChange(event: Event) {
		checked = event.target.checked;
		task.display = checked;
		for (let i = 0; i < $dataStore.length; i++) {
			for (let j = 0; j < $dataStore[i].tasks.length; j++) {
				if ($dataStore[i].tasks[j].id === task.id) {
					$dataStore[i].tasks[j].display = checked;
				}
			}
		}
		setCookie('display.' + task.id, checked.toString(), '');
	}
</script>

<li class="flex w-full flex-row">
	<label class="flex w-full flex-row items-center px-0 py-1">
		<input type="checkbox" class="checkbox size-6" bind:checked on:change={handleChange} />
		<img src={task.icon} alt={task.name} class="size-6 rounded-md" />

		<div class="text-sm">
			{task.name}
		</div>
	</label>
</li>

<style>
</style>
