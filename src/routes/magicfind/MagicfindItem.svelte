<script lang="ts">
	import { dataStore } from './store';
	export let item: any;

	let value = item.value;
	let isChecked = item.checked;
	let selected = item.value;

	function handleChange(event: any) {
		for (let c = 0; c < $dataStore.length; c++) {
			for (let i = 0; i < $dataStore[c].items.length; i++) {
				if (item.id === $dataStore[c].items[i].id) {
					if (event.target.type === 'checkbox') {
						$dataStore[c].items[i].checked = isChecked;
					} else if (event.target.type === 'number') {
						$dataStore[c].items[i].value = value;
					} else if (event.target.type === 'select-one') {
						$dataStore[c].items[i].value = selected;
					}
				}
			}
		}
	}
</script>

<tr class="tr-hover">
	{#if item.type === 'number'}
		<td colspan="2" class="value text-right">
			<input
				id={item.id}
				class="input input-bordered h-8 w-full text-right text-xs sm:text-sm"
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
		<td>
			<label class="flex h-full w-full justify-end" for={item.id}>{item.value}</label>
		</td>
	{/if}
	{#if item.type === 'select'}
		<td colspan="2" class="value text-right">
			<select
				id={item.id}
				class="select select-bordered w-full text-xs sm:text-sm"
				bind:value={selected}
				on:change={handleChange}
			>
				{#each item.options as option}
					<option value={option[0]}>{option[1]}</option>
				{/each}
			</select>
		</td>
	{/if}
	<td>
		<label class="flex flex-row flex-wrap items-center" for={item.id}>
			{#each item.icons as icon}
				<img class="size-6 min-w-6" src={icon} alt={item.description} />
			{/each}
		</label>
	</td>
	<td>
		<label for={item.id} class="flex flex-col">
			<div>{item.description}</div>
			<div class="inline-flex flex-wrap gap-x-2">
				{#each item.names as name}
					<a class="link link-primary text-xs" href={name.link}>{name.name}</a>
				{/each}
			</div>
		</label>
	</td>
</tr>
