import satori from 'satori';
import type { SatoriOptions } from 'satori';
import { Resvg, initWasm as resvgInitWasm } from '@resvg/resvg-wasm';
// @ts-ignore - ?url returns a string at runtime
import resvgWasmUrl from '@resvg/resvg-wasm/index_bg.wasm?url';
import { env as privateEnv } from '$env/dynamic/private';
import { html as toReactNode } from 'satori-html';
import { decodeHtmlEntities } from '$lib/utils';
import OgCard from '$lib/og.svelte';
import { render as ssrRender } from 'svelte/server';
import localFontUrl from '$lib/fonts/Noto_Sans/static/NotoSans_Condensed-Black.ttf?url';

const size = { width: 1200, height: 630 } as const;

let resvgWasmReady: Promise<void> | undefined;
async function ensureResvgWasm(origin: string): Promise<void> {
  if (!resvgWasmReady) {
    const wasmUrl = (resvgWasmUrl as string).startsWith('http')
      ? resvgWasmUrl
      : new URL(resvgWasmUrl as string, origin).toString();
    resvgWasmReady = resvgInitWasm(fetch(wasmUrl as string));
  }
  return resvgWasmReady;
}

export const OPTIONS: import('./$types').RequestHandler = async ({ request }) => {
  const acrh = request.headers.get('access-control-request-headers') || '*';
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-headers': acrh,
      'access-control-max-age': '86400'
    }
  });
};

export const GET: import('./$types').RequestHandler = async ({ url, platform }) => {
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
      try {
        const nestedUrl = new URL(nested, u.origin);
        nestedUrl.searchParams.delete('cb');
        clean.searchParams.set('url', nestedUrl.toString());
      } catch { }
    }
    const sorted = new URLSearchParams();
    Array.from(clean.searchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([k, v]) => sorted.append(k, v));
    clean.search = sorted.toString();
    return new Request(`og:img:${clean.pathname}?${clean.search}`, { method: 'GET' });
  }

  const disableCache = url.searchParams.get('no_cache') === '1';
  const cfCaches: any = (globalThis as any).caches;
  if (!disableCache && cfCaches?.default) {
    const match = await cfCaches.default.match(stableOgCacheKey(url));
    if (match) return match;
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

  function arrayBufferToBase64(arrayBuf: ArrayBuffer): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(arrayBuf).toString('base64');
    }
    let binary = '';
    const bytes = new Uint8Array(arrayBuf);
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    // btoa is available in Edge/Workers
    // eslint-disable-next-line no-undef
    return btoa(binary);
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

  async function getPreviewDataUrl(target: string, plat?: Readonly<unknown>): Promise<string | undefined> {
    const withFlag = buildAbsoluteTarget(target);
    try {
      const cfEnv: any = (plat as any)?.env;
      const key = cfEnv?.SCREEN_SHOT_MACHINE_API_KEY || privateEnv?.SCREEN_SHOT_MACHINE_API_KEY || (globalThis as any).process?.env?.SCREEN_SHOT_MACHINE_API_KEY;
      if (key) {
        const api = new URL('https://api.screenshotmachine.com');
        api.searchParams.set('key', key);
        api.searchParams.set('url', withFlag);
        api.searchParams.set('dimension', '1200x630');
        api.searchParams.set('format', 'png');
        api.searchParams.set('cacheLimit', '0');
        api.searchParams.set('delay', '800');
        return await toDataUrl(api.toString());
      }
    } catch { }

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
      const cfEnv: any = (platform as any)?.env;
      if (cfEnv && 'BROWSER' in cfEnv) {
        const absolute = targetAbs.startsWith('http') ? targetAbs : new URL(targetAbs, url.origin).toString();
        const u = new URL(absolute);
        u.searchParams.set('no_cookie', '1');
        u.searchParams.set('cb', Date.now().toString());

        // Stabilize snapshot cache key by excluding the cb param
        const uClean = new URL(u.toString());
        uClean.searchParams.delete('cb');
        const cacheKey = new Request(`og:snap:${uClean.toString()}`, { method: 'GET' });
        const cfCaches: any = (globalThis as any).caches;
        const cached = cfCaches?.default ? await cfCaches.default.match(cacheKey) : undefined;
        if (cached) return await cached.text();

        // @ts-ignore - BROWSER binding is provisioned by wrangler
        const browser = await cfEnv.BROWSER.launch();
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1200, height: 630 });
        await page.addStyleTag({ content: "[role='dialog'],.cookie,.cookies,.cookie-popup,[data-cookie],#cookieConsent,#usercentrics-root{display:none!important}" });
        await page.goto(u.toString(), { waitUntil: 'networkidle' });
        await page.waitForTimeout(600);
        const shot: any = await page.screenshot({ type: 'png' });
        const u8: Uint8Array = shot instanceof Uint8Array ? shot : new Uint8Array(shot as ArrayBuffer);
        const buf: ArrayBuffer = new Uint8Array(u8).slice().buffer as ArrayBuffer;
        await browser.close();

        // Convert to data URL for Satori (avoid runtime fetch)
        const base64 = arrayBufferToBase64(buf);
        const dataUrl = `data:image/png;base64,${base64}`;
        if (cfCaches?.default) await cfCaches.default.put(cacheKey, new Response(dataUrl, {
          headers: {
            'content-type': 'text/plain',
            'cache-control': 'public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000'
          }
        }));
        return dataUrl;
      }

      // Node/vite fallback provider (requires SCREEN_SHOT_MACHINE_API_KEY)
      return await getPreviewDataUrl(targetAbs, platform as any);
    } catch {
      return undefined;
    }
  })();

  const [resolvedImage, resolvedPreview] = await Promise.all([
    resolvedImagePromise,
    resolvedPreviewPromise
  ]);

  const { body, head } = ssrRender(OgCard, {
    props: { title, subtitle, image: resolvedImage, preview: resolvedPreview }
  });
  const element = toReactNode(decodeHtmlEntities(`${body}${head}`));

  try {
    const fontAbsUrl = new URL(localFontUrl, url.origin).toString();
    const fontData = await fetch(fontAbsUrl).then((r) => {
      if (!r.ok) throw new Error(`Failed to load font: ${r.status}`);
      return r.arrayBuffer();
    });
    const fonts: SatoriOptions['fonts'] = [
      { name: 'Noto Sans', data: fontData, style: 'normal', weight: 900 }
    ];

    const svg = await satori(element as any, {
      width: size.width,
      height: size.height,
      fonts
    });

    try {
      await ensureResvgWasm(url.origin);
      const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: size.width },
        background: 'transparent'
      });
      const png = resvg.render().asPng();

      const response = new Response(png, {
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000',
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, OPTIONS'
        }
      });
      if (!disableCache && cfCaches?.default) {
        await cfCaches.default.put(stableOgCacheKey(url), response.clone());
      }
      return response;
    } catch (e) {
      console.error('Resvg rendering failed:', e);
      // Fallback to SVG if PNG rendering fails for any reason
      const response = new Response(svg, {
        headers: {
          'content-type': 'image/svg+xml',
          'cache-control': 'public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000',
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, OPTIONS'
        }
      });
      if (!disableCache && cfCaches?.default) {
        await cfCaches.default.put(stableOgCacheKey(url), response.clone());
      }
      return response;
    }
  } catch (e: any) {
    console.error('OG Generation failed:', e);
    return new Response(`Failed to generate OG image: ${e.message}`, { status: 500 });
  }
};
