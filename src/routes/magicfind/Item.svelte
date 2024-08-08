<script lang="ts">
	let { item } = $props();

	let value = $state(item.value);
	let checked = $state(item.checked);
	let selected = $state(item.selected);

	function handleChange() {
		//todo
		return;
	}
</script>

<tr class="tr-hover">
	{#if item.type === 'number'}
		<td colspan="2" class="value text-right">
			<input
				id={item.id}
				class="input input-bordered input-sm h-8 w-full text-right text-xs"
				type="number"
				min="0"
				max="350"
				onchange={handleChange}
				bind:value
			/>
		</td>
	{/if}
	{#if item.type === 'checkbox'}
		<td>
			<input id={item.id} class="checkbox" type="checkbox" onchange={handleChange} bind:checked />
		</td>
		<td>
			<label class="flex h-full w-full justify-end" for={item.id}>{item.value}</label>
		</td>
	{/if}
	{#if item.type === 'select'}
		<td colspan="2" class="value text-right">
			<select
				id={item.id}
				class="select select-bordered select-sm w-full text-xs"
				onchange={handleChange}
				bind:value={selected}
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
			<div class="inline-flex flex-wrap gap-x-2">
				{#each item.names as name}
					<a class="link link-primary text-sm font-semibold" href={name.link}>{name.name}</a>
				{/each}
			</div>
			<div class="text-xs">{item.description}</div>
		</label>
	</td>
</tr>
