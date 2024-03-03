<script lang="ts">
	import Section from './Section.svelte';
	import data from '../../assets/magicfind.json';

	let sum = 0;

  let calculate = function calculate() {
    let calc = 0;

    let checkboxes = document.getElementsByClassName("checkbox");
    let values = document.getElementsByClassName("value");

    calc += Number(document.getElementById("account")!.value);

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        calc += Number(values[i].textContent);
      }
    }
    sum = calc;

    var elementSum = document.getElementById("sum")!;
    elementSum.classList.remove("text-red-500");
    elementSum.classList.remove("text-green-500");
    if (sum >= 750) {
      elementSum.classList.add("text-green-500");
    } else {
      elementSum.classList.add("text-red-500");
    }
  };
</script>

<div class="container h-full max-h-full mx-auto flex flex-col justify-center items-center">
	<h2 class="h2 py-8">MagicFind Checklist</h2>

	<div class="table-container mx-auto">
		<!-- Native Table Element -->
		<table class="table table-hover table-compact leading-3">
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
					<Section {category} {calculate} />
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th></th>
					<th id="sum" class="text-right text-red-500">{sum}</th>
					<th colspan="2">% (of max 750%)</th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>

<style>
		.table tfoot th{
		padding: 1rem 0.5rem;
	}
	tfoot{
		position: sticky;
		bottom: 0;
		z-index: 10;
	}
</style>
