<script lang="ts">
	export let item: any;
	export let calculate: any;
</script>

<tr>
	{#if item.type === 'number'}
		<td colspan="2" class="value text-right">
			<input
				id="account"
				class="input text-right"
				type="number"
				min="0"
				max="350"
				value="0"
				on:change={calculate}
			/>
		</td>
	{/if}
	{#if item.type === 'checkbox'}
		<td>
			<input class="checkbox" type="checkbox" on:change={calculate} />
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
	input:disabled {
		@apply opacity-50;
	}

	input[type='checkbox'] {
		@apply size-8;
	}

	input[type='checkbox']:disabled {
		@apply size-6 mx-1;
	}

	input[type='number'] {
		border-radius: 1rem;
		padding: 0.5rem;
	}

	img {
		@apply size-8 min-w-8;
	}

	td {
		padding: 0.5rem;
	}

	td,
	td * {
		vertical-align: middle;
	}

	div {
		text-wrap: wrap;
	}
</style>
