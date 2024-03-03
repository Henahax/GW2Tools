<script lang="ts">
	import Item from './Item.svelte';

	export let category: any;
	export let calculate: any;
</script>

<tr>
	<th colspan="4" class="text-left px-4 py-2">{category.name}</th>
</tr>
{#each category.items as item}
	<Item {item} {calculate} />
{/each}
