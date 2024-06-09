<script lang="ts">
	export let title;
</script>

<div class="flex flex-col p-4">
	<h2 class="text-2xl font-bold">{title}</h2>
	<slot />
</div>
