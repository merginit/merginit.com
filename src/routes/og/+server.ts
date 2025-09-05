import satori from 'satori';
import type { SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import OgCard from '$lib/og.svelte';
import { render as ssrRender } from 'svelte/server';
import localFontUrl from '$lib/fonts/Noto_Sans/static/NotoSans_Condensed-Black.ttf?url';

const size = { width: 1200, height: 630 } as const;

export const GET: import('./$types').RequestHandler = async ({ url }) => {
  const title = url.searchParams.get('title') ?? 'MerginIT e.U.';
  const subtitle =
    url.searchParams.get('subtitle') ?? 'Professional Software Development & SaaS Solutions';
  const imageParam = url.searchParams.get('image') ?? undefined;

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

  let resolvedImage: string | undefined = undefined;
  try {
    const source = imageParam ?? new URL('/favicon.png', url.origin).toString();
    resolvedImage = await toDataUrl(source);
  } catch {
    resolvedImage = undefined;
  }

  const { body, head } = ssrRender(OgCard, { props: { title, subtitle, image: resolvedImage } });
  const element = toReactNode(`${body}${head}`);

  const fontAbsUrl = new URL(localFontUrl, url.origin).toString();
  const fontData = await fetch(fontAbsUrl).then((r) => r.arrayBuffer());
  const fonts: SatoriOptions['fonts'] = [
    { name: 'Noto Sans', data: fontData, style: 'normal', weight: 900 }
  ];

  const svg = await satori(element as any, {
    width: size.width,
    height: size.height,
    fonts
  });

  try {
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: size.width },
      background: 'transparent'
    });
    const png = resvg.render().asPng();

    return new Response(png, {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'public, max-age=0, s-maxage=3600'
      }
    });
  } catch {
    return new Response(svg, {
      headers: {
        'content-type': 'image/svg+xml',
        'cache-control': 'public, max-age=0, s-maxage=3600'
      }
    });
  }
};
