import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ChromeStatsResponse {
    users: number;
    rating: number;
    ratingCount: number;
}

interface CachedStats {
    users: number;
    rating: number;
    ratingCount: number;
    lastUpdated: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const statsCache = new Map<string, CachedStats>();

export const GET: RequestHandler = async ({ url }) => {
    const extensionId = url.searchParams.get('id');

    if (!extensionId) {
        return json({ error: 'Extension ID is required' }, { status: 400 });
    }

    const cached = statsCache.get(extensionId);
    const now = Date.now();

    if (cached && (now - cached.lastUpdated) < CACHE_DURATION) {
        return json({ users: cached.users, rating: cached.rating, ratingCount: cached.ratingCount, cached: true });
    }

    try {
        const response = await fetch(`https://chromewebstore.google.com/detail/${extensionId}`);

        if (!response.ok) {
            throw new Error(`Chrome Web Store returned ${response.status}`);
        }

        const html = await response.text();
        
        const userCountMatch = html.match(/>([\d.,]+)\s+(?:Nutzer|users|Users|User|utilisateurs|usuarios)/i);
        
        let users = 0;
        if (userCountMatch && userCountMatch[1]) {
            // Remove dots/commas used as thousands separators
            users = parseInt(userCountMatch[1].replace(/[.,]/g, ''), 10);
        }
        
        // Simple regex fallback
        const ratingMatch = html.match(/class="Vq0ZA">([\d,.]+)</);
        const ratingCountMatch = html.match(/class="xJEoWe">([\d.,]+)&nbsp;Bewertungen</) || html.match(/class="xJEoWe">([\d.,]+)\s+(?:ratings|Bewertungen)/);

        const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 0;
        const ratingCount = ratingCountMatch ? parseInt(ratingCountMatch[1].replace(/[.,]/g, ''), 10) : 0;


        if (users === 0) {
            console.warn(`Could not extract user count for ${extensionId}`);
        }

        const data: ChromeStatsResponse = {
            users,
            rating,
            ratingCount
        };

        statsCache.set(extensionId, {
            ...data,
            lastUpdated: now
        });

        return json({ ...data, cached: false });
    } catch (error) {
        console.error('Error fetching Chrome stats:', error);

        if (cached) {
            return json({ users: cached.users, rating: cached.rating, ratingCount: cached.ratingCount, cached: true, stale: true });
        }

        return json({ error: 'Failed to fetch Chrome stats' }, { status: 500 });
    }
};
