<script lang="ts">
	export let title;
	export let subtitle;
</script>

<div class="mx-auto flex w-full max-w-screen-2xl flex-row items-center justify-between gap-4 p-4">
	<div class="flex flex-col">
		<h2 class="text-2xl font-bold">{title}</h2>
		<span class="text-sm">{subtitle}</span>
	</div>
	<slot />
</div>
