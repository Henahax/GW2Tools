<script lang="ts">
	import Item from './Item.svelte';
	import data from '../../assets/magicfind.json';

	let sum = 0;

	function calculate() {
		let calc = 0;
		let items = document.getElementsByClassName('item');

		for (let item of items) {
			let numberInput = item.querySelector('input[type="number"]');
			if (numberInput) {
				calc += Number(numberInput?.value);
			} else {
				let checkbox = item.querySelector('.checkbox');
				let value = item.querySelector('.value');

				if (checkbox && checkbox.checked) {
					calc += Number(value?.textContent);
				}
			}
		}
		sum = calc;

		var elementSum = document.getElementById('sum')!;
		elementSum.classList.remove('text-red-500');
		elementSum.classList.remove('text-green-500');
		if (sum >= 750) {
			elementSum.classList.add('text-green-500');
		} else {
			elementSum.classList.add('text-red-500');
		}
	}

	function focusInput(id) {
		var element = document.getElementById(id);
		if (element) {
			element.focus();
			element.checked = !element.checked;
			calculate();
		}
	}

	function selectText(event: Event) {
		event.target.select();
	}
</script>

<div class="container mx-auto flex flex-col justify-center items-center">
	<h2 class="h2 py-4">MagicFind Checklist</h2>

	<div class="mx-auto">
		<table class="table table-hover table-compact leading-3 max-w-fit mx-auto">
			<thead class="sticky z-10">
				<tr>
					<th></th>
					<th class="text-right">value</th>
					<th></th>
					<th>info</th>
				</tr>
			</thead>
			<tbody>
				{#each data as category}
					<tr>
						<th colspan="4" class="text-left px-4 py-2">{category.name}</th>
					</tr>
					{#each category.items as item}
						<Item {item} {calculate} />
					{/each}
				{/each}
			</tbody>
			<tfoot class="sticky z-10 text-lg py-4 leading-3">
				<tr>
					<th></th>
					<th id="sum" class="text-right text-red-500">{sum}</th>
					<th colspan="2" class="normal-case">% (of max 750%)</th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<style>
	table {
		overflow: auto;
	}

	thead {
		inset-block-start: 0;
	}

	tfoot {
		inset-block-end: 0;
	}

	th {
		padding-top: 0.5rem !important;
		padding-bottom: 0.5rem !important;
		padding: 1rem 0.75rem !important;
	}

	:global(th) {
		padding: 1rem 0.75rem !important;
	}
</style>
