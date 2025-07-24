import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { LinkPreview } from '$lib/types';

// Simple in-memory cache
const cache = new Map<string, { data: LinkPreview; expires: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function fetchPreview(url: string): Promise<LinkPreview> {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();

  // Extract title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : url;

  // Extract description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1] : '';

  // Extract favicon
  const faviconMatch = html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i);
  let favicon = faviconMatch ? faviconMatch[1] : '/favicon.ico';
  if (favicon && !favicon.startsWith('http')) {
    try {
      const u = new URL(url);
      favicon = u.origin + (favicon.startsWith('/') ? favicon : '/' + favicon);
    } catch {}
  }

  // Extract preview image
  const imgMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  let image = imgMatch ? imgMatch[1] : undefined;
  if (image && !image.startsWith('http')) {
    try {
      const u = new URL(url);
      image = u.origin + (image.startsWith('/') ? image : '/' + image);
    } catch {}
  }

  return {
    url,
    title,
    description,
    favicon,
    image,
  };
}

export const GET: RequestHandler = async ({ url }) => {
  const target = url.searchParams.get('url');
  if (!target) return json({ error: 'Missing url parameter' }, { status: 400 });

  // Check cache
  const cached = cache.get(target);
  if (cached && cached.expires > Date.now()) {
    return json(cached.data);
  }

  try {
    const data = await fetchPreview(target);
    cache.set(target, { data, expires: Date.now() + CACHE_TTL });
    return json(data);
  } catch (e) {
    return json({ error: 'Failed to fetch preview' }, { status: 500 });
  }
};
