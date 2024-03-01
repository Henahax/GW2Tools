<script lang="ts">
	export let item: any;
</script>

<tr>
	<td>
		{#if item.type === 'number'}
			<input class="checkbox" type="checkbox" checked disabled />
		{/if}
		{#if item.type === 'checkbox'}
			<input class="checkbox" type="checkbox" />
		{/if}
	</td>
	<td class="text-right">
		{#if item.type === 'number'}
			<input class="input min-w-16 text-right" type="number" min="0" max="350" value="0" />
		{/if}
		{#if item.type === 'checkbox'}
			{item.value}
		{/if}
	</td>
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

	img {
		@apply size-8 min-w-8;
	}

	td,
	td * {
		vertical-align: middle;
	}
</style>
