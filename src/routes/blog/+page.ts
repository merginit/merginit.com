import type { Post, Categories } from '$lib/types';

type FilterQuery = {
	search: string;
	searchScope: 'all' | 'title' | 'description' | 'content';
	categories: Categories[];
	categoryOperator: 'OR' | 'AND';
	tags: string[];
	tagOperator: 'OR' | 'AND';
	dateFrom: string;
	dateTo: string;
	minReadTime: number;
	maxReadTime: number;
};

function parseFiltersFromUrl(url: URL): FilterQuery {
	const categoriesParam = url.searchParams.get('categories') || '';
	const tagsParam = url.searchParams.get('tags') || '';

	return {
		search: url.searchParams.get('search') || '',
		searchScope: (url.searchParams.get('scope') || 'all') as FilterQuery['searchScope'],
		categories: categoriesParam ? (categoriesParam.split(',') as Categories[]) : [],
		categoryOperator: (url.searchParams.get('categoryOperator') ||
			'AND') as FilterQuery['categoryOperator'],
		tags: tagsParam ? tagsParam.split(',') : [],
		tagOperator: (url.searchParams.get('tagOperator') || 'OR') as FilterQuery['tagOperator'],
		dateFrom: url.searchParams.get('dateFrom') || '',
		dateTo: url.searchParams.get('dateTo') || '',
		minReadTime: parseInt(url.searchParams.get('minReadTime') || '0', 10),
		maxReadTime: parseInt(url.searchParams.get('maxReadTime') || '60', 10)
	};
}

function buildQueryString(filters: FilterQuery): string {
	const params = new URLSearchParams();

	if (filters.search) params.set('search', filters.search);
	if (filters.searchScope !== 'all') params.set('scope', filters.searchScope);
	if (filters.categories.length > 0) {
		params.set('categories', filters.categories.join(','));
		params.set('categoryOperator', filters.categoryOperator);
	}
	if (filters.tags.length > 0) {
		params.set('tags', filters.tags.join(','));
		params.set('tagOperator', filters.tagOperator);
	}
	if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
	if (filters.dateTo) params.set('dateTo', filters.dateTo);
	if (filters.minReadTime > 0) params.set('minReadTime', String(filters.minReadTime));
	if (filters.maxReadTime < 60) params.set('maxReadTime', String(filters.maxReadTime));

	const qs = params.toString();
	return qs ? `?${qs}` : '';
}

export async function load({ fetch, url }) {
	const filters = parseFiltersFromUrl(url);
	const query = buildQueryString(filters);

	const response = await fetch(`/api/posts${query}`);
	const posts: Post[] = await response.json();

	return { posts, filters };
}
