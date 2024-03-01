<script lang="ts">
	import Item from './Item.svelte';

	export let category: any;
</script>

<tr>
	<th colspan="4" class="text-left px-3 pt-3 pb-1">{category.name}</th>
</tr>
{#each category.items as item}
	<Item {item} />
{/each}
