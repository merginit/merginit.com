import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: adapter({
		config: "wrangler.jsonc",
	})},
	extensions: ['.svelte', '.svx']
};

export default config;
