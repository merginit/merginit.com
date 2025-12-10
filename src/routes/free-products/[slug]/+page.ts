import { findFreeProduct } from '$lib/data/free-products';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const typeLabels = {
	website: 'web tool',
	desktop: 'desktop app',
	extension: 'browser extension',
	npm: 'npm package'
} as const;

export const load: PageLoad = ({ params }) => {
	const product = findFreeProduct(params.slug);

	if (!product) {
		throw error(404, 'Product not found');
	}

	const description = product.longDescription || product.description;
	const typeLabel = typeLabels[product.type];

	return {
		product,
		meta: {
			title: `${product.name} - Free ${typeLabel} | MerginIT e.U.`,
			description,
			type: 'article'
		}
	};
};
