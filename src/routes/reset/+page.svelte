<script lang="ts">
	import data from '../../assets/reset.json';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="p-4 flex flex-row justify-between items-center">
	<div>
		<h2 class="h3">Reset Checklist</h2>
		<div class="text-sm">Timegated tasks without an ingame tracking system</div>
	</div>
	<div class="flex flex-row gap-4 text-right">
		<div class="flex flex-row gap-4 text-sm">
			<div class="flex flex-col">
				<div>Daily:</div>
				<div>02:35:55</div>
			</div>
			<div class="flex flex-col">
				<div>Weekly:</div>
				<div>8:02:35:55</div>
			</div>
		</div>
		<button><i class="fa-solid fa-gear"></i></button>
	</div>
</div>
<div class="cardContainer mx-auto px-4">
	{#each data as category}
		<div class="card break-inside-avoid">
			<Accordion>
				<AccordionItem open>
					<svelte:fragment slot="summary"><p class="font-bold">{category.name}</p></svelte:fragment>
					<svelte:fragment slot="content">
						<ul class="divide-black divide-y">
							{#each category.tasks as task}
								<li class="w-full flex flex-row py-1">
									<label class="flex flex-row items-center w-full">
										<input type="checkbox" class="checkbox size-6" />
										<img src={task.icon} alt={task.name} class="size-8 mx-2" />
										<div class="flex flex-col">
											<div class="text-sm">
												{task.name}
											</div>
											<div class="text-xs opacity-50">{task.info}</div>
										</div>
									</label>
									<div class="text-xs text-right">
										<div class="flex flex-row justify-end gap-1 opacity-50">
											{#if task.link}
												<a href={task.link}>
													<i class="fa-regular fa-circle-question"></i>
												</a>
											{/if}
											{#if task.interval == 'daily'}
												<div>
													<i class="fa-regular fa-clock"></i>
												</div>
											{/if}
											{#if task.interval == 'weekly'}
												<div>
													<i class="fa-regular fa-calendar"></i>
												</div>
											{/if}
										</div>
										<div class="flex flex-row justify-end">a</div>
										<div class="flex flex-row justify-end">t</div>
									</div>
								</li>
							{/each}
						</ul>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	{/each}
</div>

<style>
	.cardContainer {
		columns: 3 24rem;
		column-fill: balance;
	}

	.card:not(:last-child) {
		margin-bottom: 1rem;
	}
</style>
