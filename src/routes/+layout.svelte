<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex min-h-dvh flex-col">
	<header>
		<div class="inline-flex gap-8">
			<Button variant="link" href="/">Logo, Name
			</Button>
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

	<footer>footer</footer>
</div>
