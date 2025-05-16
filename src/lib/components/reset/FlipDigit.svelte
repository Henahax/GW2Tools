<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	let { digit } = $props();
</script>

<div class="digit-container">
	{#key digit}
		<div class="digit" in:fade={{ duration: 250 }} out:fly={{ y: 10, duration: 250 }}>
			{digit}
		</div>
	{/key}
</div>

<style>
	.digit-container {
		position: relative;
		display: inline-block;
		min-width: 1ch;
		text-align: center;
	}

	.digit {
		position: absolute;
		transform: translateY(-50%);
		line-height: 1;
	}
</style>
