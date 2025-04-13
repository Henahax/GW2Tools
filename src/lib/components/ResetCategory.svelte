<script lang="ts">
	let { children, category } = $props();

	let open = $state(true);

	function toggle() {
		open = !open;
	}
</script>

<div class="col-span-full grid break-inside-avoid grid-cols-subgrid border">
	<button class="col-span-full border" onclick={toggle}>{category.name}</button>
	<div
		class="section-content col-span-full grid grid-cols-subgrid divide-y divide-neutral-500 px-2 {open
			? ''
			: 'h-0'}"
	>
		{@render children()}
	</div>
</div>

<style>
	.section-content {
		transition: height 0.5s ease;
		overflow: clip;
		interpolate-size: allow-keywords;
	}
</style>
