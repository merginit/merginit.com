import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/lib/blog/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;

			// Handle both date formats: DD.MM.YYYY and YYYY-MM-DD
			let formattedDate = metadata.date;
			if (metadata.date.includes('.')) {
				// Convert date from DD.MM.YYYY to YYYY-MM-DD
				const dateParts = metadata.date.split('.');
				formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
			}
			// If date already in YYYY-MM-DD format, use as is

			const post = { ...metadata, date: formattedDate, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
