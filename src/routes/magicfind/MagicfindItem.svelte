<script lang="ts">
	import { dataStore } from './store';
	export let item: any;

	let value = item.value;
	let isChecked = item.checked;

	function handleChange(event: any) {
		update(event.target.type);
	}

	function handleRowClick() {
		if (item.type === 'checkbox') {
			isChecked = !isChecked;
			update(item.type);
		} else if (item.type === 'number') {
			const input = document.getElementById(item.id) as HTMLInputElement;
			input.focus();
			input.select();
		}
	}

	function update(type: any) {
		for (let c = 0; c < $dataStore.length; c++) {
			for (let i = 0; i < $dataStore[c].items.length; i++) {
				if (item.id === $dataStore[c].items[i].id) {
					if (type === 'checkbox') {
						$dataStore[c].items[i].checked = isChecked;
					} else if (type === 'number') {
						$dataStore[c].items[i].value = value;
					}
				}
			}
		}
	}
</script>

<tr class="tr-hover" on:click={handleRowClick}>
	{#if item.type === 'number'}
		<td colspan="2" class="value text-right">
			<input
				id={item.id}
				class="input input-bordered h-8 px-2 text-right"
				type="number"
				min="0"
				max="350"
				bind:value
				on:change={handleChange}
			/>
		</td>
	{/if}
	{#if item.type === 'checkbox'}
		<td class="w-fit">
			<input
				id={item.id}
				class="checkbox"
				type="checkbox"
				bind:checked={isChecked}
				on:change={handleChange}
			/>
		</td>
		<td class="value text-right">
			{item.value}
		</td>
	{/if}
	<td>
		<div class="flex flex-row flex-wrap items-center">
			{#each item.icons as icon}
				<img class="size-6 min-w-6" src={icon} alt={item.description} />
			{/each}
		</div>
	</td>
	<td>
		<div class="flex flex-col">
			<div>{item.description}</div>
			<div class="inline-flex flex-wrap gap-x-2">
				{#each item.names as name}
					<a class="link link-primary text-xs" href={name.link}>{name.name}</a>
				{/each}
			</div>
		</div>
	</td>
</tr>
