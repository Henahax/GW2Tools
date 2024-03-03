<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">GW2 Tools</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/" class="btn hover:variant-soft-primary">
					<span>
						<i class="fa-solid fa-house"></i>
					</span>
					<span class="hidden md:block">Home</span>
				</a>
				<a href="/reset" class="btn hover:variant-soft-primary">
					<span>
						<i class="fa-solid fa-arrows-rotate"></i>
					</span>
					<span class="hidden md:block">Reset</span>
				</a>
				<a href="/magicfind" class="btn hover:variant-soft-primary">
					<span>
						<i class="fa-solid fa-clover"></i>
					</span>
					<span class="hidden md:block">MagicFind</span>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	:global(h2) {
		@apply text-2xl;
	}
</style>
