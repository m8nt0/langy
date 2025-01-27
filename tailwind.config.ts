import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#4F46E5',
				secondary: '#10B981'
			}
		}
	},
	plugins: []
};
