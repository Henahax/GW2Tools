<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
</script>

<app class="flex h-dvh flex-col">
	<header class="flex items-center justify-between bg-neutral-800 px-4 py-2">
		<a class="btn btn-ghost" href="/">GW2Tools</a>
		<nav class="flex">
			<a class="btn btn-ghost" href="/reset"><i class="fa-solid fa-arrows-rotate"></i>reset</a>
			<a class="btn btn-ghost" href="/magicfind"><i class="fa-solid fa-clover"></i>magic find</a>
		</nav>
		<div>C</div>
	</header>
	<main class="flex w-full grow flex-col overflow-y-auto">
		<div class=" flex h-full w-full flex-col self-center">
			{@render children()}
			<footer class="flex items-center justify-center gap-8 p-2 text-sm text-neutral-400">
				<div class="grow text-center">© henahax.de 2025</div>
				<a
					class="btn btn-ghost btn-square text-xs"
					href="https://github.com/Henahax/GW2Tools"
					aria-label="GitHub"
				>
					<i class="fa-brands fa-github"></i>
					<span class="max-sm:hidden">Sourcecode</span>
				</a>
			</footer>
		</div>
	</main>
</app>

<style>
</style>
