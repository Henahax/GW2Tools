<script lang="ts">
	export let item: any;
	export let calculate: any;

	let id = generateShortHash(item);

	function selectText(event: Event) {
		event.target.select();
	}

	function generateShortHash(obj) {
		const jsonString = JSON.stringify(obj);
		let hash = 0;

		for (let i = 0; i < jsonString.length; i++) {
			const char = jsonString.charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}

		return Math.abs(hash).toString(36).substring(0, 6); // Return the first 6 characters
	}

	function focusInput() {
		document.getElementById(id)?.focus();
		document.getElementById(id).checked = !document.getElementById(id).checked;
		calculate();
	}
</script>

<tr class="item" on:click={focusInput}>
	{#if item.type === 'number'}
		<td colspan="2" class="value text-right">
			<input
				{id}
				class="input text-right"
				type="number"
				min="0"
				max="350"
				value="0"
				on:change={calculate}
				on:click={selectText}
			/>
		</td>
	{/if}
	{#if item.type === 'checkbox'}
		<td class="w-fit">
			<input {id} class="checkbox" type="checkbox" on:click={focusInput} />
		</td>
		<td class="value text-right">
			{item.value}
		</td>
	{/if}
	<td>
		<div class="flex flex-row flex-wrap items-center">
			{#each item.icons as icon}
				<img src={icon} alt={item.description} />
			{/each}
		</div>
	</td>
	<td>
		<div class="inline-flex flex-wrap gap-x-2">
			{#each item.names as name}
				<a class="anchor" href={name.link}>{name.name}</a>
			{/each}
		</div>
		<div>{item.description}</div>
	</td>
</tr>

<style>
	input[type='number'] {
		@apply py-1;
	}

	input[type='checkbox'] {
		@apply size-8;
	}

	img {
		@apply size-8 min-w-8;
	}

	td,
	td * {
		vertical-align: middle;
	}

	td {
		padding-top: 0.125rem !important;
		padding-bottom: 0.125rem !important;
	}

	div {
		text-wrap: wrap;
	}
</style>
