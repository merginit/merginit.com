import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types';

type PostModuleEntry = () => Promise<{ metadata: Post }>;
type BlogPostModules = Record<string, PostModuleEntry>;

const modules = import.meta.glob([
	"/src/lib/blog/posts/*.md",
	"/src/lib/blog/posts/*.svx"
]) as BlogPostModules;

export async function load({ params }) {
	const { slug: requestedSlug } = params;
	let matchedPath: string | undefined;

	for (const path in modules) {
		const filenameWithExtension = path.split('/').pop();
		if (filenameWithExtension) {
			const slugFromFile = filenameWithExtension.replace(/\.(md|svx)$/, '');
			if (slugFromFile.toLowerCase() === requestedSlug.toLowerCase()) {
				matchedPath = path;
				break;
			}
		}
	}

	if (!matchedPath) {
		console.error(`No matching file found for slug: ${requestedSlug} in /src/lib/blog/posts/`);
		throw error(404, `Could not find blog post with slug "${requestedSlug}"`);
	}

	try {
		const postModuleLoader = modules[matchedPath];
		const postContent = await postModuleLoader();

		if (!postContent || !postContent.metadata) {
			console.error(`Metadata missing in blog post file: ${matchedPath}`);
			throw error(500, `Metadata not found for blog post "${requestedSlug}"`);
		}

		return {
			meta: postContent.metadata,
			matchingFile: matchedPath.split('/').pop()
		};
	} catch (e: any) {
		console.error(`Error loading post ${requestedSlug} (path: ${matchedPath}):`, e.message);
		if (e && typeof e === 'object' && 'status' in e && typeof e.status === 'number') {
			throw e;
		}
		throw error(500, `Could not load blog post "${requestedSlug}". Reason: ${e.message || 'Unknown error'}`);
	}
}
