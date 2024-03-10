<script lang="ts">
	import data from '../../assets/reset.json';
	import ResetTimer from './ResetTimer.svelte';
	import Card from './Card.svelte';
</script>

<div class="h-96">
	<div class="flex flex-col flex-wrap w-fit gap-4 p-4 h-full">
		{#each data as category}
			<div class="break-inside-avoid">
				<div class="px-1">{category.name}</div>
				<ul class="text-sm">
					{#each category.tasks as task}
						<li class="p-1">
							<label class="flex flex-row items-center gap-2">
								<input type="checkbox" class="checkbox size-6" />
								<img class="size-6" src={task.icon} alt={task.name} />
								{task.name}
							</label>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<div class="p-4 flex flex-row justify-between items-center gap-2">
	<div>
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Timegated tasks without an ingame tracking system</div>
	</div>
	<div class="flex flex-row gap-4 text-right">
		<div class="flex flex-row gap-4 text-sm">
			<div class="flex flex-col">
				<div>Daily:</div>
				<ResetTimer mode={1} />
			</div>
			<div class="flex flex-col">
				<div>Weekly:</div>
				<ResetTimer mode={2} />
			</div>
		</div>
		<button class="text-2xl"><i class="fa-solid fa-gear"></i></button>
	</div>
</div>
<div class="cardContainer mx-auto px-4">
	{#each data as category}
		<Card {category} />
	{/each}
</div>

<style>
	.cardContainer {
		columns: 3 24rem;
		column-fill: balance;
	}
</style>
