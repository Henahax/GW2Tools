<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
	import { ModeWatcher } from "mode-watcher";
</script>

<div class="flex min-h-dvh flex-col">
	<header class="inline-flex w-full">
		<div class="mx-auto inline-flex w-full max-w-screen-2xl">
			<Button class="px-4 text-lg" variant="ghost" size="lg" href="/">GW2Tools</Button>
			<nav class="inline-flex w-full justify-end">
				<ul class="inline-flex">
					<li>
						<Button class="inline-flex gap-2 px-4" variant="ghost" size="lg" href="/reset"
							><i class="fa-solid fa-arrows-rotate"></i>Reset</Button
						>
					</li>
					<li>
						<Button class="inline-flex gap-2 px-4" variant="ghost" size="lg" href="/magicfind"
							><i class="fa-solid fa-clover"></i>Magic Find</Button
						>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="mx-auto h-full max-w-screen-2xl grow">
		<ModeWatcher />
		<slot />
	</main>

	<footer class="w-full">footer</footer>
</div>


<style>
	* {
		color: var(--foreground)
	}
</style>