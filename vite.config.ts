import { defineConfig } from 'vite'

export default defineConfig({
	root: 'src/renderer',
	base: './',
	build: {
		outDir: '../../dist',
		emptyOutDir: true,
	},
})
