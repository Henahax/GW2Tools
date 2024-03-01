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
					<span>Home</span>
				</a>
				<a href="/reset" class="btn hover:variant-soft-primary">
					<span>
						<i class="fa-solid fa-arrows-rotate"></i>
					</span>
					<span>Reset</span>
				</a>
				<a href="/magicfind" class="btn hover:variant-soft-primary">
					<span>
						<i class="fa-solid fa-clover"></i>
					</span>
					<span>MagicFind</span>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
