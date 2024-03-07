<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let task;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	let show = false;
	show = task.default;
</script>

{#if show}
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
                <div class="[&>*]:pointer-events-none" use:popup={popupHover}>
                    <i class="fa-regular fa-clock"></i>
					</div>
                    <div class="card p-4 variant-filled-secondary" data-popup="popupHover">
                        <p>resets daily</p>
                        <div class="arrow variant-filled-secondary" />
                    </div>
				{/if}
				{#if task.interval == 'weekly'}
					<div class="[&>*]:pointer-events-none" use:popup={popupHover}>
						<i class="fa-regular fa-calendar"></i>
					</div>
                    <div class="card p-4 variant-filled-secondary" data-popup="popupHover">
                        <p>resets weekly</p>
                        <div class="arrow variant-filled-secondary" />
                    </div>
				{/if}
			</div>
			<div class="flex flex-row justify-end">a</div>
			<div class="flex flex-row justify-end">t</div>
		</div>
	</li>
{/if}

