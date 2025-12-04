import { env as privateEnv } from '$env/dynamic/private';
import { decodeHtmlEntities } from '$lib/utils';
import OgCard from '$lib/og.svelte';
import { render as ssrRender } from 'svelte/server';
import localFontUrl from '$lib/fonts/Noto_Sans/static/NotoSans_Condensed-Black.ttf?url';

const size = { width: 1200, height: 630 } as const;

type CfPage = {
  setViewportSize(opts: { width: number; height: number }): Promise<void>;
  addStyleTag(opts: { content: string }): Promise<void>;
  goto(url: string, opts: { waitUntil: 'networkidle' }): Promise<void>;
  waitForTimeout(ms: number): Promise<void>;
  screenshot(opts: { type: 'png' }): Promise<Uint8Array | ArrayBuffer>;
};

type CfBrowser = {
  newPage(): Promise<CfPage>;
  close(): Promise<void>;
};

export const OPTIONS: import('./$types').RequestHandler = async ({ request }) => {
  const acrHeaders = request.headers.get('access-control-request-headers') || '*';
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-headers': acrHeaders,
      'access-control-max-age': '86400'
    }
  });
};

export const GET: import('./$types').RequestHandler = async ({ url, platform, fetch }) => {
  function isAllowedHostname(hostname: string): boolean {
    const hn = hostname.toLowerCase();
    if (hn === 'localhost' || hn === '127.0.0.1' || hn === '::1') return true;
    if (hn === 'merginit.com' || hn.endsWith('.merginit.com')) return true;
    return false;
  }

  function stableOgCacheKey(u: URL): Request {
    const clean = new URL(u.toString());
    clean.searchParams.delete('no_cache');
    const nested = clean.searchParams.get('url');
    if (nested) {
      let nestedParsed: URL | undefined;
      try {
        nestedParsed = new URL(nested, u.origin);
      } catch {
        nestedParsed = undefined;
      }
      if (nestedParsed) {
        nestedParsed.searchParams.delete('cb');
        clean.searchParams.set('url', nestedParsed.toString());
      }
    }
    const sorted = new URLSearchParams();
    Array.from(clean.searchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([k, v]) => sorted.append(k, v));
    clean.search = sorted.toString();
    return new Request(`https://og-cache.internal${clean.pathname}?${clean.search}`, { method: 'GET' });
  }

  const disableCache = url.searchParams.get('no_cache') === '1';
  const cacheDefault = (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
  if (!disableCache && cacheDefault) {
    try {
      const match = await cacheDefault.match(stableOgCacheKey(url));
      if (match) return match;
    } catch (e) {
      console.error('Cache match failed:', e);
    }
  }

  const title = url.searchParams.get('title') ?? 'MerginIT e.U.';
  const subtitle =
    url.searchParams.get('subtitle') ?? 'Professional Software Development & SaaS Solutions';
  const imageParam = url.searchParams.get('image') ?? undefined;
  const pathParam = url.searchParams.get('path') ?? undefined;
  const urlParam = url.searchParams.get('url') ?? undefined; // full URL override

  if (urlParam) {
    try {
      const u = new URL(urlParam);
      if (!isAllowedHostname(u.hostname)) {
        return new Response('Invalid url param', { status: 400 });
      }
    } catch {
      return new Response('Invalid url param', { status: 400 });
    }
  }
  if (pathParam && /^https?:\/\//i.test(pathParam)) {
    return new Response('Invalid path param', { status: 400 });
  }
  if (imageParam) {
    try {
      if (/^https?:\/\//i.test(imageParam)) {
        const u = new URL(imageParam);
        if (!isAllowedHostname(u.hostname)) {
          return new Response('Invalid image param', { status: 400 });
        }
      }
    } catch {
      return new Response('Invalid image param', { status: 400 });
    }
  }

  function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(arrayBuffer).toString('base64');
    }
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    const btoaFn = (globalThis as unknown as { btoa?: (data: string) => string }).btoa;
    return btoaFn ? btoaFn(binary) : binary;
  }

  async function toDataUrl(inputUrl: string): Promise<string> {
    const resp = await fetch(inputUrl);
    if (!resp.ok) throw new Error(`Failed to fetch image: ${resp.status}`);
    const contentType = resp.headers.get('content-type') || 'image/png';
    const arrayBuf = await resp.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuf);
    return `data:${contentType};base64,${base64}`;
  }

  const resolvedImagePromise = (async () => {
    try {
      const source = imageParam ?? new URL('/favicon.png', url.origin).toString();
      return await toDataUrl(source);
    } catch {
      return undefined;
    }
  })();

  function buildAbsoluteTarget(target: string): string {
    const origin = url.origin;
    const absolute = target.startsWith('http') ? target : new URL(target, origin).toString();
    const urlObj = new URL(absolute);
    urlObj.searchParams.set('no_cookie', '1');
    urlObj.searchParams.set('cb', Date.now().toString());
    return urlObj.toString();
  }

  async function getPreviewDataUrl(target: string, plat?: Readonly<Record<string, unknown>>): Promise<string | undefined> {
    const withFlag = buildAbsoluteTarget(target);
    const cfEnv = (plat as Readonly<Record<string, unknown>>)?.env as Readonly<Record<string, unknown>> | undefined;
    
    const getEnvKey = (name: string): string | undefined => 
      (cfEnv?.[name] as string | undefined) || 
      (privateEnv as Record<string, string | undefined>)?.[name] || 
      (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[name];

    // Try APIFlash first
    const apiFlashKey = getEnvKey('APIFLASH_API_KEY');
    console.log('APIFLASH_API_KEY found:', !!apiFlashKey);
    if (apiFlashKey) {
      try {
        const api = new URL('https://api.apiflash.com/v1/urltoimage');
        api.searchParams.set('access_key', apiFlashKey);
        api.searchParams.set('url', withFlag);
        api.searchParams.set('width', '1200');
        api.searchParams.set('height', '630');
        api.searchParams.set('wait_until', 'page_loaded');
        api.searchParams.set('delay', '1');
        api.searchParams.set('format', 'png');
        return await toDataUrl(api.toString());
      } catch (e) {
        console.error('APIFlash screenshot failed:', e);
      }
    }

    // Fallback to ScreenshotMachine
    const ssmKey = getEnvKey('SCREEN_SHOT_MACHINE_API_KEY');
    console.log('SCREEN_SHOT_MACHINE_API_KEY found:', !!ssmKey);
    if (ssmKey) {
      try {
        const api = new URL('https://api.screenshotmachine.com');
        api.searchParams.set('key', ssmKey);
        api.searchParams.set('url', withFlag);
        api.searchParams.set('dimension', '1200x630');
        api.searchParams.set('format', 'png');
        api.searchParams.set('cacheLimit', '0');
        api.searchParams.set('delay', '800');
        return await toDataUrl(api.toString());
      } catch (e) {
        console.error('ScreenshotMachine screenshot failed:', e);
      }
    }

    return undefined;
  }

  const previewTargetAbs = urlParam
    ? urlParam
    : pathParam
      ? new URL(pathParam, url.origin).toString()
      : undefined;

  const resolvedPreviewPromise = (async () => {
    try {
      const targetAbs = previewTargetAbs;
      if (!targetAbs) return undefined;
      // Prefer Worker Browser Rendering when available (Cloudflare only)
      const cfEnv = (platform as Readonly<Record<string, unknown>>)?.env as Readonly<Record<string, unknown>> | undefined;
      console.log('BROWSER binding available:', !!(cfEnv && 'BROWSER' in cfEnv));
      if (cfEnv && 'BROWSER' in cfEnv) {
        const absolute = targetAbs.startsWith('http') ? targetAbs : new URL(targetAbs, url.origin).toString();
        const u = new URL(absolute);
        u.searchParams.set('no_cookie', '1');
        u.searchParams.set('cb', Date.now().toString());

        // Stabilize snapshot cache key by excluding the cb param
        const uClean = new URL(u.toString());
        uClean.searchParams.delete('cb');
        const cacheKey = new Request(`https://og-cache.internal/snap?url=${encodeURIComponent(uClean.toString())}`, { method: 'GET' });
        const cached = cacheDefault ? await cacheDefault.match(cacheKey) : undefined;
        if (cached) return await cached.text();

        const browserBinding = cfEnv.BROWSER as { launch: () => Promise<CfBrowser> };
        const browser = await browserBinding.launch();
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.addStyleTag({ content: "[role='dialog'],.cookie,.cookies,.cookie-popup,[data-cookie],#cookieConsent,#usercentrics-root{display:none!important}" });
        await page.goto(u.toString(), { waitUntil: 'networkidle' });
        await page.waitForTimeout(600);
        const shot = await page.screenshot({ type: 'png' });
        function isArrayBuffer(v: unknown): v is ArrayBuffer {
          return v instanceof ArrayBuffer || (typeof v === 'object' && v !== null && 'byteLength' in v);
        }
        const u8 = shot instanceof Uint8Array ? shot : isArrayBuffer(shot) ? new Uint8Array(shot) : undefined;
        if (!u8) return undefined;
        const buf = new Uint8Array(u8).slice().buffer;
        await browser.close();

        // Convert to data URL for Satori (avoid runtime fetch)
        const base64 = arrayBufferToBase64(buf);
        const dataUrl = `data:image/png;base64,${base64}`;
        if (cacheDefault) {
          try {
            await cacheDefault.put(cacheKey, new Response(dataUrl, {
              headers: {
                'content-type': 'text/plain',
                'cache-control': 'public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000'
              }
            }));
          } catch (e) {
            console.error('Snapshot cache put failed:', e);
          }
        }
        return dataUrl;
      }

      // Node/vite fallback provider (requires SCREEN_SHOT_MACHINE_API_KEY or APIFLASH_API_KEY)
      const result = await getPreviewDataUrl(targetAbs, platform);
      if (!result) {
        console.warn('No screenshot API key found or all screenshot APIs failed. Set APIFLASH_API_KEY or SCREEN_SHOT_MACHINE_API_KEY.');
      }
      return result;
    } catch (e) {
      console.error('Preview resolution failed:', e);
      return undefined;
    }
  })();

  const [resolvedImage, resolvedPreview] = await Promise.all([resolvedImagePromise, resolvedPreviewPromise]);

  const { body, head } = ssrRender(OgCard, {
    props: { title, subtitle, image: resolvedImage, preview: resolvedPreview }
  });
  const html = decodeHtmlEntities(`${body}${head}`);

  try {
    const { ImageResponse } = await import('workers-og');

    const absoluteFontUrl = localFontUrl.startsWith('http') 
      ? localFontUrl 
      : new URL(localFontUrl, url.origin).toString();
    
    const fontData = await fetch(absoluteFontUrl).then((r) => {
      if (!r.ok) throw new Error(`Failed to load font: ${r.status} from ${absoluteFontUrl}`);
      return r.arrayBuffer();
    });

    const response = new ImageResponse(
      html,
      {
        width: size.width,
        height: size.height,
        fonts: [
          {
            name: 'Noto Sans',
            data: fontData,
            style: 'normal',
            weight: 900
          }
        ]
      }
    );

    response.headers.set('cache-control', 'public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000');
    response.headers.set('access-control-allow-origin', '*');
    response.headers.set('access-control-allow-methods', 'GET, OPTIONS');

    if (!disableCache && cacheDefault) {
      try {
        await cacheDefault.put(stableOgCacheKey(url), response.clone());
      } catch (e) {
        console.error('OG cache put failed:', e);
      }
    }

    return response;
  } catch (e: unknown) {
    const errMsg = e instanceof Error ? `${e.message}\n${e.stack}` : String(e);
    console.error('OG Generation failed:', errMsg);
    return new Response(`Failed to generate OG image: ${errMsg}`, { 
      status: 500,
      headers: { 'content-type': 'text/plain' }
    });
  }
};
