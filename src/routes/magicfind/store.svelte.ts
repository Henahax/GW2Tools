import magicfind from './magicfind.json';

export function createData() {
	let data = $state(magicfind);

	return {
		get data() {
			return data;
		}
	};
}
