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
	<main class="flex grow flex-col items-center justify-center self-center p-4">
		{@render children()}
	</main>
	<footer>henahax</footer>
</app>

<style>
</style>
