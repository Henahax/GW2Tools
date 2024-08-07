import magicfind from './magicfind.json';

export function createData() {
	let data = $state(magicfind);
	let sum = $derived(test(data));

	function test(data: any) {
		return 0;
	}

	return {
		get data() {
			return data;
		},
		get sum() {
			return sum;
		}
	};
}
