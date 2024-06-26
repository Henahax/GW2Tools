<script lang="ts">
	export let title;
	export let subtitle;
</script>

<div class="flex w-full flex-row justify-between px-2 py-4">
	<div class="flex flex-col">
		<h2 class="text-2xl font-bold">{title}</h2>
		<span class="text-sm">{subtitle}</span>
	</div>
	<slot />
</div>
