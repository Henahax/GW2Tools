<script lang="ts">
	let { data }: { data: any } = $props();

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
		{ name: 'efficiency' },
		{ name: 'farming' },
		{ name: 'profits' },
		{ name: 'bltc' },
		{ name: 'builds' },
		{ name: 'datawars' }
	];
</script>

<div class="flex grow flex-col justify-center">
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
	<div class="flex self-center">
		{#each external as item}
			<div class="flex flex-col gap-2 rounded-2xl border p-4 text-center">
				<div>{item.name}</div>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
