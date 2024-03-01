<script lang="ts">
	import Section from './Section.svelte';
	import data from '../../assets/magicfind.json';
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h2 class="py-8">MagicFind Checklist</h2>

	<div class="table-container mx-auto">
		<!-- Native Table Element -->
		<table class="table table-hover table-compact leading-3">
			<thead>
				<tr>
					<th></th>
					<th class="text-right">value</th>
					<th></th>
					<th>info</th>
				</tr>
			</thead>
			<tbody>
				{#each data as category}
					<Section {category} />
				{/each}
			</tbody>
			<tfoot class="sticky bottom">
				<tr>
					<td></td>
					<td colspan="3">testssssssss s dfsaf asf fsa sfa</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<style>
</style>
