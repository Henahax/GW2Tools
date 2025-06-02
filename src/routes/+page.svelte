<script lang="ts">
	const internal = [
		{
			title: 'test',
			subtitle: 'test subtitle',
			icon: 'fa-solid fa-arrows-rotate',
			subitems: ['test1', 'test2']
		},
		{
			title: 'test2',
			subtitle: 'test subtitle 2',
			icon: 'fa-solid fa-clover',
			subitems: ['test1', 'test2']
		}
	];

	const external = [
		{ title: 'efficiency', subtitle: 'a' },
		{ title: 'farming', subtitle: 'a' },
		{ title: 'profits', subtitle: 'a' },
		{ title: 'bltc', subtitle: 'a' },
		{ title: 'builds', subtitle: 'a' },
		{ title: 'datawars', subtitle: 'a' }
	];
</script>

<div class="flex grow flex-col justify-center gap-8">
	<h1 class="self-center text-3xl">Test</h1>
	<section class="flex flex-col">
		<div class="grid w-fit grid-cols-2 gap-4 self-center max-sm:grid-cols-1">
			{#each internal as item}
				<div class="flex flex-col gap-2 rounded-2xl border p-4 text-center">
					<i class="text-4xl {item.icon}"></i>
					<div>
						<div class="text-2xl">{item.title}</div>
						<div>{item.subtitle}</div>
					</div>
					{#if item.subitems.length > 0}
						<ul class="w-fit list-disc self-center text-xs">
							{#each item.subitems as subitem}
								<li class="w-fit">{subitem}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</section>
	<div class="flex flex-wrap justify-center gap-2 self-center">
		{#each external as item}
			<div class="flex flex-col rounded-2xl border p-2 text-center">
				<div>{item.title}</div>
				<div class="text-xs">{item.subtitle}</div>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
