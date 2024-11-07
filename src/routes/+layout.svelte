<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex min-h-dvh flex-col">
	<header class="inline-flex w-full">
		<div class="inline-flex max-w-screen-2xl mx-auto w-full">
			<Button class="text-lg px-4" variant="ghost" size="lg" href="/">GW2Tools</Button>
			<nav class="inline-flex w-full justify-end">
				<ul class="inline-flex">
					<li><Button class="px-4 inline-flex gap-2" variant="ghost" size="lg" href="/reset"><i class="fa-solid fa-arrows-rotate"></i>Reset</Button></li>
					<li><Button class="px-4 inline-flex gap-2" variant="ghost" size="lg" href="/magicfind"><i class="fa-solid fa-clover"></i>Magic Find</Button></li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="h-full grow max-w-screen-2xl mx-auto">
		<slot />
	</main>

	<footer class="w-full">footer</footer>
</div>