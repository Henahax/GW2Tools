<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	import { Modal } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	let currentTile: number = 0;
</script>

<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="hidden text-2xl uppercase sm:block">GW2 Tools</strong>
				<strong class="text-xs uppercase sm:hidden">
					<div>GW2</div>
					<div>Tools</div>
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div>
					<a href="/" class="btn hover:variant-soft-primary px-4">
						<span>
							<i class="fa-solid fa-house"></i>
						</span>
						<span class="hidden md:block">Home</span>
					</a>
					<a href="/reset" class="btn hover:variant-soft-primary px-4">
						<span>
							<i class="fa-solid fa-arrows-rotate"></i>
						</span>
						<span class="hidden md:block">Reset</span>
					</a>
					<a href="/magicfind" class="btn hover:variant-soft-primary px-4">
						<span>
							<i class="fa-solid fa-clover"></i>
						</span>
						<span class="hidden md:block">Magic Find</span>
					</a>
					<a href="/ecto" class="btn hover:variant-soft-primary px-4">
						<span>
							<i class="fa-solid fa-screwdriver-wrench"></i>
						</span>
						<span class="hidden md:block">Ecto Salvage</span>
					</a>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="p-3 text-center text-xs opacity-50">© henahax.de 2024</div>
	</svelte:fragment>
</AppShell>

<style>
	:global(main) {
		@apply mx-auto w-full max-w-screen-2xl;
	}
</style>
