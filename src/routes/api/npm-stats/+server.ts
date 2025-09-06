import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface NpmStatsResponse {
    downloads: number;
    package: string;
    start: string;
    end: string;
}

interface CachedStats {
    downloads: number;
    lastUpdated: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const statsCache = new Map<string, CachedStats>();

export const GET: RequestHandler = async ({ url }) => {
    const packageName = url.searchParams.get('package');

    if (!packageName) {
        return json({ error: 'Package name is required' }, { status: 400 });
    }

    const cached = statsCache.get(packageName);
    const now = Date.now();

    if (cached && (now - cached.lastUpdated) < CACHE_DURATION) {
        return json({ downloads: cached.downloads, cached: true });
    }

    try {
        const response = await fetch(`https://api.npmjs.org/downloads/point/2014-03-05:2222-12-31/${packageName}`);

        if (!response.ok) {
            throw new Error(`NPM API returned ${response.status}`);
        }

        const data: NpmStatsResponse = await response.json();

        statsCache.set(packageName, {
            downloads: data.downloads,
            lastUpdated: now
        });

        return json({ downloads: data.downloads, cached: false });
    } catch (error) {
        console.error('Error fetching npm stats:', error);

        if (cached) {
            return json({ downloads: cached.downloads, cached: true, stale: true });
        }

        return json({ error: 'Failed to fetch npm stats' }, { status: 500 });
    }
};
