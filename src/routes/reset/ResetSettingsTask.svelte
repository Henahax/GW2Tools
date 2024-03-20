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

<li class="py-1">
	<label class="flex flex-row items-center gap-2">
		<input
			type="checkbox"
			class="checkbox size-6"
			data-focusindex="0"
			bind:checked
			on:change={handleChange}
		/>
		<img class="size-6" src={task.icon} alt={task.name} />
		{task.name}
	</label>
</li>
