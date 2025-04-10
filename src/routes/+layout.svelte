<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
</script>

<app class="flex min-h-dvh flex-col">
	<header class="flex items-center justify-between bg-neutral-800 p-4">
		<div>GW2Tools</div>
		<nav>
			<a href="/reset">reset</a>
			<a href="/magicfind">magic find</a>
		</nav>
		<div>C</div>
	</header>
	<main class="flex grow flex-col items-center justify-center self-center">
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
