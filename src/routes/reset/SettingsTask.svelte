<script lang="ts">
	import { onMount } from 'svelte';
	import { getCookie } from './functions';
	import { setCookie } from './functions';

	export let task;

	onMount(() => {
		checked = getChecked();
	});

	function getChecked() {
		let isChecked = getCookie('display.' + task.id);
		if (isChecked === null) {
			if (task.default === true) {
				return true;
			} else {
				return false;
			}
		} else {
			checked = isChecked;
			return isChecked;
		}
	}

	function setChecked(event) {
		checked = event.target.checked;
		setCookie('display.' + task.id, checked.toString(), '');
	}

	let checked;
</script>

<li class="py-1">
	<label class="flex flex-row items-center gap-2">
		<input
			type="checkbox"
			class="checkbox size-6"
			data-focusindex="0"
			bind:checked
			on:change={setChecked}
		/>
		<img class="size-6" src={task.icon} alt={task.name} />
		{task.name}
	</label>
</li>
