<script lang="ts">
	import Category from './Category.svelte';
	import data from '../../assets/magicfind.json';

	let sum = 0;

	let calculate = function calculate() {
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
	};
</script>

<div class="container mx-auto flex flex-col justify-center items-center">

    <h2 class="h2 py-4">MagicFind Checklist</h2>

    <div class="table-container mx-auto">
        <table class="table table-hover table-compact leading-3 max-w-fit mx-auto">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-right">value</th>
                    <th></th>
                    <th>info</th>
                </tr>
            </thead>
            <tbody>
                {#each data as category}
                    <Category {category} {calculate} />
                {/each}
            </tbody>
            <tfoot>
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
	tfoot{
		position: sticky;
		bottom: 0;
		z-index: 10;
		inset-block-end: 0;
	}
</style>
