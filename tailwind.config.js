/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {
			colors: {}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['dark', 'light']
	}
};
