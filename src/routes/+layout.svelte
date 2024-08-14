<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './styles.css';
	import NavItems from '$lib/NavItems.svelte';

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app flex min-h-dvh flex-col">
	<div class="bg-base-300 flex flex-row justify-center">
		<div class="navbar max-w-screen-2xl">
			<div class="navbar-start">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
						<i class="fa-solid fa-bars"></i>
					</div>
					<ul
						class="menu menu-sm dropdown-content bg-base-300 rounded-box top-10 z-[2] mt-3 w-40 gap-y-2 p-2 shadow"
					>
						<NavItems />
					</ul>
				</div>
				<a class="btn btn-ghost text-xl" href="/">GW2Tools</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<NavItems />
				</ul>
			</div>
			<div class="navbar-end"></div>
		</div>
	</div>

	<main class="mx-auto w-full grow">
		<slot />
	</main>

	<footer class="footer flex items-center p-2 text-xs">
		<div class="grow"></div>
		<div class="w-fit">© henahax.de 2024</div>
		<div class="flex grow justify-end">
			<a class="btn btn-ghost btn-xs" href="https://github.com/Henahax/GW2Tools">
				<i class="fa-brands fa-github"></i>Sourcecode
			</a>
		</div>
	</footer>
</div>
