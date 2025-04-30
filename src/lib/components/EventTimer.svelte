<script lang="ts">
	import Timer from './Timer.svelte';
	import { ResetTimer } from '../../routes/reset/Reset.svelte';

	let { timer } = $props<{ timer: ResetTimer }>();

	let targetTime = $derived(timer.targetTime);
	let add = $derived(timer.add);
</script>

<div class="flex flex-col items-end text-xs text-neutral-400">
	<Timer time={targetTime} />
	{#if add}
		<div>{add}</div>
	{/if}
</div>
