import { error } from '@sveltejs/kit';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function load({ params }) {
	try {
		const postsDir = join(process.cwd(), 'src/lib/blog/posts');
		const files = await readdir(postsDir);
		
		const matchingFile = files.find(file => {
			const slugFromFile = file.replace(/\.(svx|md)$/, '');
			return slugFromFile.toLowerCase() === params.slug.toLowerCase();
		});

		if (!matchingFile) {
			console.error(`No matching file found for slug: ${params.slug} in ${postsDir}`);
			throw error(404, `Could not find blog post with slug "${params.slug}"`);
		}

		const postModule = await import(/* @vite-ignore */ `/src/lib/blog/posts/${matchingFile}`);

		if (!postModule || !postModule.metadata) {
			console.error(`Metadata missing in blog post file: ${matchingFile}`);
			throw error(500, `Metadata not found for blog post "${params.slug}"`);
		}

		return {
			meta: postModule.metadata,
			matchingFile: matchingFile
		};
	} catch (e: any) {
		console.error(`Error loading post ${params.slug}:`, e.message);
		if (e && typeof e === 'object' && 'status' in e && typeof e.status === 'number') {
			throw e;
		}
		throw error(404, `Could not load blog post "${params.slug}". Reason: ${e.message || 'Unknown error'}`);
	}
}
