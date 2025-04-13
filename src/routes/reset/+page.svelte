<script lang="ts">
	import ResetCategory from '$lib/components/ResetCategory.svelte';
	import resetData from './reset.json';

	let data = $state(resetData);
</script>

<div class="flex w-full justify-between">
	<div>Reset</div>
	<div class="flex">
		<div class="flex">
			<div class="flex flex-col">
				<div>Weekly:</div>
				<div>1234</div>
			</div>
			<div class="flex flex-col">
				<div>Weekly:</div>
				<div>1234</div>
			</div>
		</div>
		<div class="flex">
			<div>Button 1</div>
			<div>Button 2</div>
		</div>
	</div>
</div>

<div class="flex grow flex-col justify-center">
	<div class="grid grid-cols-1 gap-4 self-center sm:grid-cols-[auto_1fr]">
		{#each data as interval}
			<div class="flex w-full flex-col">
				<div>{interval.tasks}</div>

				<div
					class={interval.id === 'weekly' ? 'columns-1' : 'columns-1 lg:columns-2 2xl:columns-3'}
				>
					<div class="grid grid-cols-[auto_auto_1fr_auto] border">
						{#each interval.categories as category}
							<ResetCategory {category}>
								{#each category.tasks as task}
									<label class="col-span-full grid grid-cols-subgrid items-center gap-4 p-2">
										<input type="checkbox" id={task.id} />
										<img class="size-8 rounded" src={task.icon} alt={task.description} />
										<div class="flex flex-col">
											<div>{task.name}</div>
											<div class="flex flex-col text-xs">
												{#if task.location}
													<div class="flex items-center gap-1.5">
														<i class="fa-solid fa-location-dot"></i>{task.location}
													</div>
												{/if}
												{#if task.description}
													<div>{task.description}</div>
												{/if}
											</div>
										</div>
										<div>
											<a
												href={task.link}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={task.description}
											>
												<i class="fa-solid fa-circle-info"></i>
											</a>
										</div>
									</label>
								{/each}
							</ResetCategory>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	a:hover {
		color: var(--color-neutral-400);
	}
</style>
