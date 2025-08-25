import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getAllTags() {
	const paths = import.meta.glob('/src/lib/blog/posts/*.md', { eager: true });
	const tags = new Set<string>();

	for (const path in paths) {
		const file = paths[path] as any;

		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Omit<Post, 'slug'>;

			if (metadata.published && metadata.tags) {
				metadata.tags.forEach((tag) => tags.add(tag));
			}
		}
	}

	return Array.from(tags).sort();
}

export async function GET() {
	const tags = await getAllTags();
	return json(tags);
}
