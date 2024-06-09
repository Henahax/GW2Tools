<script lang="ts">
	export let title;
	export let icon;
</script>

<div class="card bg-base-100 flex flex-col gap-2 p-4 shadow">
	<div class="flex flex-row items-center justify-start gap-2">
		<img class="size-8 rounded-md" src={icon} alt={title} />
		<div class="text-lg">{title}</div>
	</div>
	<slot />
</div>
