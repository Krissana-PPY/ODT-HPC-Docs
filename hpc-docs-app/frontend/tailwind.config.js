/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md,svx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans Thai', 'Noto Sans Thai', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace']
			},
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					950: '#172554'
				},
				accent: {
					yellow: {
						50:  '#fefce8',
						100: '#fef9c3',
						200: '#fef08a',
						300: '#fde047',
						400: '#facc15',
						500: '#eab308',
						600: '#ca8a04',
						700: '#a16207',
					},
					purple: {
						50:  '#faf5ff',
						100: '#f3e8ff',
						200: '#e9d5ff',
						300: '#d8b4fe',
						400: '#c084fc',
						500: '#a855f7',
						600: '#9333ea',
						700: '#7e22ce',
					}
				}
			}
		}
	},
	plugins: []
};
