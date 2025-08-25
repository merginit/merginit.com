import { json } from '@sveltejs/kit';
import type { Post, Categories } from '$lib/types';

async function getPosts() {
	let posts: (Post & { content: string })[] = [];

	const paths = import.meta.glob('/src/lib/blog/posts/*.md', { eager: true, as: 'raw' });
	const pathsWithMetadata = import.meta.glob('/src/lib/blog/posts/*.md', { eager: true });

	for (const path in pathsWithMetadata) {
		const file = pathsWithMetadata[path] as any;
		const rawContent = paths[path] as string;
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;

			// Handle both date formats: DD.MM.YYYY and YYYY-MM-DD
			let formattedDate = metadata.date;
			let formattedUpdateDate = metadata.updateDate ?? '';
			if (metadata.date.includes('.')) {
				// Convert date from DD.MM.YYYY to YYYY-MM-DD
				const dateParts = metadata.date.split('.');
				formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
			}
			if (formattedUpdateDate && formattedUpdateDate.includes('.')) {
				const dateParts = formattedUpdateDate.split('.');
				formattedUpdateDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
			}
			// If date already in YYYY-MM-DD format, use as is

			// Extract content for searching using raw markdown content
			let content = '';
			if (rawContent && typeof rawContent === 'string') {
				// Remove frontmatter and clean up the content
				content = rawContent
					.replace(/^---[\s\S]*?---/, '') // Remove frontmatter
					.replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
					.replace(/<[^>]*>/g, ' ') // Remove HTML tags
					.replace(/\s+/g, ' ') // Normalize whitespace
					.trim();
			} else {
				content = '';
			}

			console.log(
				`Content for ${slug} (${content.length} chars):`,
				content.substring(0, 100) + '...'
			);

			const post = {
				...metadata,
				date: formattedDate,
				updateDate: formattedUpdateDate || undefined,
				slug,
				content
			} as Post & { content: string };

			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

function filterPosts(
	posts: (Post & { content: string })[],
	searchQuery: string,
	searchScope: string,
	categories: string[],
	categoryOperator: string,
	tags: string[],
	tagOperator: string,
	dateFrom: string,
	dateTo: string,
	minReadTime: number,
	maxReadTime: number
) {
	return posts.filter((post) => {
		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			let searchMatch = false;

			switch (searchScope) {
				case 'title':
					searchMatch = post.title.toLowerCase().includes(query);
					break;
				case 'description':
					searchMatch = post.description.toLowerCase().includes(query);
					break;
				case 'content':
					searchMatch = post.content.toLowerCase().includes(query);
					break;
				default: // 'all'
					searchMatch =
						post.title.toLowerCase().includes(query) ||
						post.description.toLowerCase().includes(query) ||
						post.content.toLowerCase().includes(query) ||
						post.tags.some((tag) => tag.toLowerCase().includes(query));
			}

			if (!searchMatch) return false;
		}

		// Category filter
		if (categories.length > 0) {
			if (categoryOperator === 'AND') {
				const hasAllCategories = categories.every((cat) =>
					post.categories.includes(cat as Categories)
				);
				if (!hasAllCategories) return false;
			} else {
				const hasMatchingCategory = post.categories.some((cat) => categories.includes(cat));
				if (!hasMatchingCategory) return false;
			}
		}

		// Tag filter
		if (tags.length > 0) {
			if (tagOperator === 'AND') {
				const hasAllTags = tags.every((tag) => post.tags.includes(tag));
				if (!hasAllTags) return false;
			} else {
				const hasMatchingTag = post.tags.some((tag) => tags.includes(tag));
				if (!hasMatchingTag) return false;
			}
		}

		// Date filter
		const postDate = new Date(post.date);
		if (dateFrom) {
			const fromDate = new Date(dateFrom);
			if (postDate < fromDate) return false;
		}
		if (dateTo) {
			const toDate = new Date(dateTo);
			if (postDate > toDate) return false;
		}

		// Reading time filter
		const readingTimeMatch = post.readingTime.match(/(\d+)/);
		if (readingTimeMatch) {
			const readTime = parseInt(readingTimeMatch[1]);
			if (readTime < minReadTime || readTime > maxReadTime) return false;
		}

		return true;
	});
}

export async function GET({ url }) {
	const posts = await getPosts();

	// Extract filter parameters
	const searchQuery = url.searchParams.get('search') || '';
	const searchScope = url.searchParams.get('scope') || 'all';
	const categoriesParam = url.searchParams.get('categories') || '';
	const categories = categoriesParam ? categoriesParam.split(',') : [];
	const categoryOperator = url.searchParams.get('categoryOperator') || 'AND';
	const dateFrom = url.searchParams.get('dateFrom') || '';
	const dateTo = url.searchParams.get('dateTo') || '';
	const minReadTime = parseInt(url.searchParams.get('minReadTime') || '0');
	const maxReadTime = parseInt(url.searchParams.get('maxReadTime') || '999');

	// Extract filter parameters
	const tagsParam = url.searchParams.get('tags') || '';
	const tags = tagsParam ? tagsParam.split(',') : [];
	const tagOperator = url.searchParams.get('tagOperator') || 'OR';

	const filteredPosts = filterPosts(
		posts,
		searchQuery,
		searchScope,
		categories,
		categoryOperator,
		tags,
		tagOperator,
		dateFrom,
		dateTo,
		minReadTime,
		maxReadTime
	);

	// Remove content from response to keep it lightweight
	const postsWithoutContent = filteredPosts.map(({ content, ...post }) => post);

	return json(postsWithoutContent);
}
