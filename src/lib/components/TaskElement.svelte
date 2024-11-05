<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';

	import type { Task} from '$lib/types/types';

	let { task }: Props = $props();

	interface Props {
		task: Task;
	}
</script>

<li class="flex flex-row items-center">
	<label class="flex flex-row items-center gap-2 grow">
		<Checkbox/>
		<img class="size-8" src={task.icon} alt={task.name}/>
		<div>{task.name}</div>
	</label>
</li>
