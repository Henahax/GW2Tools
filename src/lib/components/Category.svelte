<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

    import Task from './Task.svelte';
</script>

<Collapsible.Root open class="w-fit bg-green-900">
	<Collapsible.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" size="sm" class="w-full">
			<slot name="title" />
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<ul>
			<Task></Task>
            <Task></Task>
		</ul>
	</Collapsible.Content>
</Collapsible.Root>
