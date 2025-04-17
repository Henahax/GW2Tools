<script lang="ts">
	import ResetCategoryElement from '$lib/components/ResetCategoryElement.svelte';
	import resetData from './reset.json';
	import { Reset, ResetInterval, ResetTask, ResetCategory } from './Reset.svelte';

	// Initialize with proper class instances to enable state
	let data = $state(
		resetData.map((interval) => {
			const resetInterval = Object.assign(new ResetInterval(), interval);
			resetInterval.categories = interval.categories.map((category) => {
				const resetCategory = Object.assign(new ResetCategory(), category);
				resetCategory.tasks = category.tasks.map((task) => Object.assign(new ResetTask(), task));
				return resetCategory;
			});
			return resetInterval;
		})
	);
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

<div class="flex flex-col items-center justify-center">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
		{#each data as interval}
			<div class="flex w-full flex-col gap-2">
				<div>
					{interval.tasks} ({interval.categories
						.flatMap((c) => c.tasks)
						.filter((t) => t.display && t.checked).length}/{interval.categories
						.flatMap((c) => c.tasks)
						.filter((t) => t.display).length})
				</div>

				<div
					class={interval.id === 'weekly' ? 'columns-1' : 'columns-1 lg:columns-2 2xl:columns-3'}
				>
					<div class="grid grid-cols-[auto_auto_1fr_auto]">
						{#each interval.categories as category: ResetCategory}
							<ResetCategoryElement {category} icon={interval.icon}>
								{#each category.tasks.filter((task) => task.display === true) as task: ResetTask}
									<label class="col-span-full grid grid-cols-subgrid items-center gap-4 p-2">
										<input
											type="checkbox"
											id={task.id}
											checked={task.checked}
											onchange={(e) => task.setChecked(e.currentTarget.checked)}
										/>
										<img class="size-8 rounded" src={task.icon} alt={task.description} />
										<div class="flex flex-col">
											<div class="text-sm">{task.name}</div>
											<div class="flex flex-col text-xs text-neutral-400">
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
												class="text-sm text-neutral-400"
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
							</ResetCategoryElement>
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
