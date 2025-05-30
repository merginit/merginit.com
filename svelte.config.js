import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/* import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);
const pathToBlogPostLayout = join(directory, './src/routes/blog/[slug]/+layout.svelte'); */

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			// layout: pathToBlogPostLayout
		}),
		vitePreprocess(),
	],
	kit: {
		adapter: adapter(),
		alias: {
			'$blog': 'src/lib/blog'
		}
	}
};

export default config;
