<script lang="ts">
	let { children, category } = $props();

	let open = $state(true);

	function toggle() {
		open = !open;
	}
</script>

<section class="col-span-full grid grid-cols-subgrid">
	<button
		class="col-span-full grid grid-cols-subgrid rounded-lg border border-neutral-800 p-2 text-left"
		onclick={toggle}
	>
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
		class="section-content col-span-full grid grid-cols-subgrid items-center px-2 {open
			? ''
			: 'h-0'}"
	>
		{@render children()}
	</div>
</section>

<style>
	button:hover {
		border-color: var(--color-neutral-500);
	}

	.section-content {
		transition: height 0.5s ease;
		overflow: clip;
		interpolate-size: allow-keywords;
	}
</style>
