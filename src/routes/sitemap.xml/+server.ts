import type { Post } from "$lib/types";

const SITE_NAME = "https://merginit.com";

const staticPages: { path: string; lastmod?: string; changefreq?: string; priority?: string }[] = [
	{ path: "/", changefreq: "daily", priority: "1.0" },
	{ path: "/legal", changefreq: "monthly", priority: "0.4" },
	{ path: "/legal/privacy-policy", changefreq: "monthly", priority: "0.3" },
	{ path: "/legal/imprint", changefreq: "monthly", priority: "0.3" },
	{ path: "/legal/cookie-policy", changefreq: "monthly", priority: "0.3" },
	{ path: "/data-request", changefreq: "monthly", priority: "0.6" },
	{ path: "/free-products", changefreq: "weekly", priority: "0.7" },
	{ path: "/blog", changefreq: "weekly", priority: "0.8" },
];

export async function GET() {
	const modules = import.meta.glob("/src/lib/blog/posts/*.md") as Record<
		string,
		() => Promise<{ metadata: Post }>
	>;

	const blogEntries: { slug: string; date?: string }[] = [];

	for (const path of Object.keys(modules)) {
		await modules[path]().then((mod) => {
			if (mod.metadata && mod.metadata.published) {
                const filename = path.split('/').pop()?.replace('.md', '') || '';
				const lastMod = mod.metadata.updateDate || mod.metadata.date;
				blogEntries.push({ slug: filename, date: lastMod });
			}
		});
	}

	const sitemapEntries = staticPages.map(page => `
		<url>
			<loc>${SITE_NAME}${page.path}</loc>
			${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
			${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
			${page.priority ? `<priority>${page.priority}</priority>` : ''}
		</url>`).join("");

	const dynamicEntries = blogEntries
		.map(
			(entry) => `
		<url>
			<loc>${SITE_NAME}/blog/${String(entry.slug)}</loc>
			${entry.date ? `<lastmod>${new Date(entry.date).toISOString().split('T')[0]}</lastmod>` : ''}
			<changefreq>weekly</changefreq>
			<priority>0.7</priority>
		</url>`,
		)
		.join("");

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
		${sitemapEntries}
		${dynamicEntries}
		</urlset>`.trim(),
		{
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "max-age=0, s-maxage=3600", // Cache for 1 hour
			},
		},
	);
}
