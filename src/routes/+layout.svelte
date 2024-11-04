<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex min-h-dvh flex-col">
	<header class="w-full">
		<div class="inline-flex gap-8">
			<Button>Menu</Button>
			<Button variant="ghost" href="/">GW2Tools</Button>
			<nav>
				<ul class="inline-flex gap-4">
					<li><Button variant="link" href="/reset">Reset</Button></li>
					<li><Button variant="link" href="/magicfind">Magic Find</Button></li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="h-full grow">
		<slot />
	</main>

	<footer class="w-full">footer</footer>
</div>