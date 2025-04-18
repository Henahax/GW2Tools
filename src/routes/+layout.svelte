<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
</script>

<app class="flex min-h-dvh flex-col">
	<header class="flex items-center justify-between bg-neutral-800 px-4 py-2">
		<a class="btn btn-ghost" href="/">GW2Tools</a>
		<nav class="flex">
			<a class="btn btn-ghost" href="/reset"><i class="fa-solid fa-arrows-rotate"></i>reset</a>
			<a class="btn btn-ghost" href="/magicfind"><i class="fa-solid fa-clover"></i>magic find</a>
		</nav>
		<div>C</div>
	</header>
	<main class="flex grow flex-col">
		{@render children()}
	</main>
	<footer class="flex justify-center gap-8 p-2 text-sm text-neutral-400">
		<div class="grow text-center">© henahax.de 2025</div>
		<a href="https://github.com/Henahax/GW2Tools" aria-label="GitHub">
			<i class="fa-brands fa-github"></i>
		</a>
	</footer>
</app>

<style>
</style>
