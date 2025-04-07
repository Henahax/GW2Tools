<script lang="ts">
	let { children, category } = $props();

	let open = $state(true);

	function toggle() {
		open = !open;
	}
</script>

<section class="col-span-full grid grid-cols-subgrid gap-4">
	<button class="col-span-full flex items-center gap-4 rounded text-left" onclick={toggle}>
		<div class="w-2">
			{#if open}
				<i class="fa-solid fa-chevron-down"></i>
			{:else}
				<i class="fa-solid fa-chevron-right"></i>
			{/if}
		</div>
		<div class="col-span-3">
			{category.description}
		</div>
	</button>
	<div
		class="section-content col-span-full grid grid-cols-subgrid items-center gap-4 {open
			? ''
			: 'h-0'}"
	>
		{@render children()}
	</div>
</section>

<style>
	.section-content {
		transition: height 0.5s ease;
		overflow: clip;
		interpolate-size: allow-keywords;
	}

	section:has(button:hover) {
		background-color: var(--color-neutral-800);
	}
</style>
