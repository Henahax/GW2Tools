<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
    import TaskElement from './TaskElement.svelte';

	import type { Category} from '$lib/types/types';

	let { category }: Props = $props();

	interface Props {
		category: Category;
	}
</script>

<Collapsible.Root open class="w-full border rounded-xl break-inside-avoid">
	<Collapsible.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" size="sm" class="w-full">
			<slot name="title" />
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="p-2">
		<ul>
			{#each category.tasks as task}
				<TaskElement task={task}/>
			{/each}
		</ul>
	</Collapsible.Content>
</Collapsible.Root>