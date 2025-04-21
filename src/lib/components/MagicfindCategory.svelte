<script lang="ts">
	let { children, category } = $props();

	let open = $state(true);

	function toggle() {
		open = !open;
	}
</script>

<section class="col-span-full grid grid-cols-subgrid">
	<button
		class="magicfind-button col-span-full flex gap-4 border border-neutral-800 px-4 py-1 text-left font-bold max-sm:py-2"
		onclick={toggle}
	>
		<div>
			{#if open}
				<i class="fa-solid fa-minus"></i>
			{:else}
				<i class="fa-solid fa-plus"></i>
			{/if}
		</div>
		<div class="col-span-3">
			{category.name}
		</div>
	</button>
	<div
		class="section-content col-span-full grid grid-cols-subgrid items-center divide-y divide-neutral-800 {open
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
