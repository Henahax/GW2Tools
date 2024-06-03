<script>
	import './styles.css';
</script>

<div class="app flex min-h-dvh flex-col">
	<div class="bg-base-200 w-full">
		<div class="navbar mx-auto max-w-screen-2xl">
			<div class="flex-1">
				<a href="/" class="btn btn-ghost text-xl">GW2Tools</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li class="hidden sm:block"><a href="/"><i class="fa-solid fa-house"></i>Home</a></li>
					<li class="hidden sm:block">
						<a href="/reset"><i class="fa-solid fa-arrows-rotate"></i>Reset</a>
					</li>
					<li class="hidden sm:block">
						<a href="/magicfind"><i class="fa-solid fa-clover"></i>Magic Find</a>
					</li>
					<li class="hidden sm:block">
						<a href="/ecto"><i class="fa-solid fa-screwdriver-wrench"></i>Ecto Salvage</a>
					</li>
					<li class="sm:hidden">
						<details>
							<summary><i class="fa-solid fa-bars"></i>Menu</summary>
							<ul class="menu bg-base-200 z-50 rounded-t-none p-2">
								<li><a href="/"><i class="fa-solid fa-house"></i>Home</a></li>
								<li><a href="/reset"><i class="fa-solid fa-arrows-rotate"></i>Reset</a></li>
								<li><a href="/magicfind"><i class="fa-solid fa-clover"></i>Magic Find</a></li>
								<li>
									<a href="/ecto"><i class="fa-solid fa-screwdriver-wrench"></i>Ecto Salvage</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<main class="mx-auto max-w-screen-2xl p-2">
		<slot />
	</main>
</div>

<style>
</style>
