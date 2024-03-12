<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

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

	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

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
				<strong class="text-xl uppercase">GW2 Tools</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="gap-0">
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
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
	
	<svelte:fragment slot="pageFooter">
		<div class="p-3 text-center opacity-50 text-xs">© henahax.de 2024</div>
	</svelte:fragment>
</AppShell>

<style>
	:global(main) {
		@apply max-w-screen-2xl w-full mx-auto;
	}
</style>
