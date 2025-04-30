<script lang="ts">
	import Timer from './Timer.svelte';
	import { ResetTimer } from '../../routes/reset/Reset.svelte';

	let timer: ResetTimer = $props();

	let targetTime = $state(0);
</script>

<div class="flex flex-col items-end text-xs text-neutral-400">
	<Timer time={targetTime} />
	<div>{0}</div>
</div>
