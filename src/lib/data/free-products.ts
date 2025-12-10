import type { DownloadPlatform, FreeProduct, FreeProductCategory } from '$lib/types';

const placeholderImage = '/og.webp';

export const platformIcons: Record<DownloadPlatform, string> = {
	windows: 'mdi:microsoft-windows',
	mac: 'mdi:apple',
	linux: 'mdi:linux'
};

export const freeProducts: FreeProduct[] = [
	{
		slug: 'html-to-skeleton-converter',
		type: 'website',
		name: 'HTML to Skeleton Converter',
		url: 'https://skeleton.merginit.com',
		githubUrl: 'https://github.com/jonasfroeller/html-to-skeleton',
		description:
			'Paste Tailwind-styled HTML to generate a React skeleton component with live preview. Output uses Tailwind classes, too.',
		longDescription:
			'Transform Tailwind HTML into React skeleton loaders with matching utility classes and live preview so you can ship polished loading states without manual CSS work.',
		icon: 'mdi:code-braces',
		image: placeholderImage,
		imageAlt: 'HTML to Skeleton Converter placeholder preview',
		features: [
			'Convert Tailwind-styled HTML into React/TSX skeleton components',
			'Live preview to check spacing, layout, and colors before copy-paste',
			'Keeps Tailwind utility classes in the generated skeleton output'
		],
		keywords: ['tailwind', 'skeleton loader', 'react', 'ui states']
	},
	{
		slug: 'security-header-analyzer',
		type: 'website',
		name: 'Security Header Analyzer',
		url: 'https://sha.merginit.com',
		githubUrl: 'https://github.com/jonasfroeller/header-checker',
		description: 'Analyze HTTP security headers with scoring.',
		longDescription:
			'Check HTTP security headers, score the response, and see which protections are missing so you can harden deployments quickly.',
		icon: 'mdi:shield-check',
		image: placeholderImage,
		imageAlt: 'Security Header Analyzer placeholder preview',
		features: [
			'Grades HTTP responses based on common security headers',
			'Highlights missing or weak headers with quick explanations',
			'Shareable results to speed up review and remediation'
		],
		keywords: ['security headers', 'http', 'best practices']
	},
	{
		slug: 'veo-video-studio',
		type: 'website',
		name: 'Veo Video Studio',
		url: 'https://veo.merginit.com',
		githubUrl: 'https://github.com/merginit/veo-video-studio',
		description:
			'Browser-based studio for Google Veo with local service-account auth so keys stay on-device.',
		longDescription:
			'Browser UI for Google Veo that keeps service-account credentials local, letting you prompt, render, and manage outputs without handing keys to a remote backend.',
		icon: 'mdi:movie-open-play',
		image: placeholderImage,
		imageAlt: 'Veo Video Studio placeholder preview',
		features: [
			'Local service-account auth keeps Veo credentials on-device',
			'Browser studio to prompt, manage, and review Veo renders',
			'Preview and download generated videos from one interface'
		],
		keywords: ['video', 'veo', 'secure auth']
	},
	{
		slug: 'markdown-to-image',
		type: 'website',
		name: 'Markdown to Image',
		url: 'https://md.merginit.com',
		githubUrl: 'https://github.com/jonasfroeller/markdown2image',
		description:
			'Convert Markdown to clean images (PNG/JPG), PDF, and HTML with live preview, multiple code-block themes, and light/dark modes.',
		longDescription:
			'Generate images, PDFs, or HTML exports from Markdown with theming and live preview so docs, posts, and handoffs stay consistent.',
		icon: 'mdi:language-markdown',
		image: placeholderImage,
		imageAlt: 'Markdown to Image placeholder preview',
		features: [
			'Render Markdown to PNG, JPG, PDF, or HTML exports',
			'Live preview with multiple themes and light/dark modes',
			'Supports code highlighting and images for shareable assets'
		],
		keywords: ['markdown', 'image export', 'pdf']
	},
	{
		slug: 'disposable-email-domains-checker',
		type: 'website',
		name: 'Disposable Email Domains Checker',
		url: 'https://ded.merginit.com',
		githubUrl: 'https://github.com/jonasfroeller/disposable-email-domains',
		description: 'Disposable Email Domains Service Checker.',
		longDescription:
			'Lookup disposable email domains against a maintained list so you can keep sign-ups clean and flag throwaway addresses earlier.',
		icon: 'mdi:email-search',
		image: placeholderImage,
		imageAlt: 'Disposable Email Domains Checker placeholder preview',
		features: [
			'Checks domains against a maintained disposable-email list',
			'Fast lookup UI for quick validation',
			'Copy-friendly results for onboarding or review workflows'
		],
		keywords: ['email validation', 'anti-fraud', 'disposable']
	},
	{
		slug: 'pixtotext',
		type: 'desktop',
		name: 'PixToText',
		url: 'https://jonasfroeller.itch.io/pixtotext',
		description:
			'Turn screenshots into editable text in seconds. Fully local, no login, no data leaves your PC. Supports Tesseract, PaddleOCR, and Native Windows/macOS OCR.',
		longDescription:
			'Cross-platform OCR utility that converts screenshots into text locally with Tesseract, PaddleOCR, or native OS engines so nothing leaves your machine.',
		icon: 'mdi:monitor-screenshot',
		image: placeholderImage,
		imageAlt: 'PixToText placeholder preview',
		features: [
			'Runs fully offline with no account or cloud dependency',
			'Supports Tesseract, PaddleOCR, and native OS OCR engines',
			'Installers for macOS (Apple/Intel), Windows, and Linux AppImage'
		],
		keywords: ['ocr', 'desktop', 'offline'],
		downloadLinks: [
			{
				platform: 'mac',
				label: 'macOS (Apple Silicon)',
				url: 'https://mega.nz/file/xZkFlDZT#jy8vhASdkjvpoTSFMub-CPZSDHIqnknHZ-8lbHdhdOQ'
			},
			{
				platform: 'mac',
				label: 'macOS (Intel)',
				url: 'https://mega.nz/file/FQMGUZLL#sCiCXVjHP7lARNICHmEdHWXR56iq0jQ--P3DBST1fcQ'
			},
			{
				platform: 'linux',
				label: 'Linux (AppImage, amd64)',
				url: 'https://mega.nz/file/hc1ikSJa#OxWZwevkYgUTHqHUdltBG7htT_3tPCLPJMkH1kvdJlM'
			},
			{
				platform: 'windows',
				label: 'Windows (x64)',
				url: 'https://mega.nz/file/sMEF2CqJ#gbN9a7YkJbvHRKUgvCMfOAsXS640D-qqMPozOGNWlAQ'
			}
		]
	},
	{
		slug: 'element-snap',
		type: 'extension',
		name: 'Element Snap',
		url: 'https://chromewebstore.google.com/detail/nldbbahmckpcjcbikdaopeaiidhdomkf',
		githubUrl: 'https://github.com/jonasfroeller/element-snap',
		description: 'Capture pixel-perfect screenshots of any HTML element',
		longDescription:
			'Pick an element and capture an exact PNG without manual cropping so design reviews and bug reports stay precise.',
		icon: 'mdi:camera-outline',
		image: placeholderImage,
		imageAlt: 'Element Snap placeholder preview',
		features: [
			'Select any DOM element and capture a pixel-accurate screenshot',
			'Avoids manual cropping by targeting elements directly',
			'Exports clean PNGs for reviews and bug reports'
		],
		keywords: ['screenshot', 'browser extension', 'frontend']
	},
	{
		slug: 'page-to-markdown-extension',
		type: 'extension',
		name: 'Page To Markdown Extension',
		url: 'https://github.com/jonasfroeller/page-to-markdown-extension',
		githubUrl: 'https://github.com/jonasfroeller/page-to-markdown-extension',
		description: 'Convert web pages to Markdown format',
		longDescription:
			'One-click tool to turn the current page into Markdown so you can store, edit, or share readable copies.',
		icon: 'mdi:language-markdown',
		image: placeholderImage,
		imageAlt: 'Page To Markdown extension placeholder preview',
		features: [
			'Converts the current page into Markdown in one click',
			'Preserves core structure like headings, lists, and links',
			'Useful for notes, docs, or archiving readable copies'
		],
		keywords: ['markdown', 'extension', 'content saving']
	},
	{
		slug: 'youtube-subscriptions-exporter',
		type: 'extension',
		name: 'YouTube Subscriptions Exporter',
		url: 'https://github.com/jonasfroeller/youtube-subscriptions-exporter-extension',
		githubUrl: 'https://github.com/jonasfroeller/youtube-subscriptions-exporter-extension',
		description: 'Export YouTube subscriptions easily',
		longDescription:
			'Export your YouTube subscriptions list so you can back it up or migrate channels without manual copy-paste.',
		icon: 'mdi:youtube',
		image: placeholderImage,
		imageAlt: 'YouTube Subscriptions Exporter placeholder preview',
		features: [
			'Exports your YouTube subscriptions to a portable file',
			'Avoids manual channel-by-channel copy-paste',
			'Handy for backups or migrations to other accounts'
		],
		keywords: ['youtube', 'export', 'backup']
	},
	{
		slug: 'linkedin-notification-filter',
		type: 'extension',
		name: 'LinkedIn Notification Filter',
		url: 'https://github.com/jonasfroeller/linkedin-notification-filter-extension',
		githubUrl: 'https://github.com/jonasfroeller/linkedin-notification-filter-extension',
		description:
			'Hide LinkedIn notifications you do not want to see. Toggle categories and matching notifications are hidden in real time.',
		longDescription:
			'Customize your LinkedIn notification stream by toggling categories you do not care about, keeping the feed focused.',
		icon: 'mdi:linkedin',
		image: placeholderImage,
		imageAlt: 'LinkedIn Notification Filter placeholder preview',
		features: [
			'Toggle LinkedIn notification categories in real time',
			'Hides unwanted notification types while browsing',
			'Lightweight and runs client-side'
		],
		keywords: ['linkedin', 'notifications', 'productivity']
	},
	{
		slug: 'x-spam-sweeper',
		type: 'extension',
		name: 'X Spam Sweeper',
		url: 'https://github.com/merginit/x-spam-sweeper.extension',
		githubUrl: 'https://github.com/merginit/x-spam-sweeper.extension',
		description:
			'Chrome extension to batch review and report spam message requests on X with a native-feeling multi-select UI.',
		longDescription:
			'Batch-review and report spam message requests on X with a multi-select UI that feels native to the product.',
		icon: 'mdi:shield-account',
		image: placeholderImage,
		imageAlt: 'X Spam Sweeper placeholder preview',
		features: [
			'Batch select and process X message requests',
			'Streamlines spam reporting inside the X interface',
			'Multi-select UI to triage faster'
		],
		keywords: ['x', 'spam', 'moderation']
	},
	{
		slug: 'svelte-cookiiies',
		type: 'npm',
		name: 'Svelte Cookiiies',
		url: 'https://www.npmjs.com/package/cookiiies',
		githubUrl: 'https://github.com/jonasfroeller/cookiiies',
		description: 'A GDPR compliant cookie banner for Svelte 5',
		longDescription:
			'GDPR-ready cookie banner for Svelte 5 with configurable categories, styling hooks, and a lightweight API.',
		icon: 'mdi:cookie',
		image: placeholderImage,
		imageAlt: 'Svelte Cookiiies placeholder preview',
		features: [
			'Cookie consent banner built for Svelte 5 projects',
			'Configurable categories to match compliance needs',
			'Lightweight API for styling and behavior'
		],
		keywords: ['svelte', 'cookies', 'gdpr'],
		npmPackage: 'cookiiies'
	},
	{
		slug: 'astro-light-box',
		type: 'npm',
		name: 'Astro Light Box',
		url: 'https://www.npmjs.com/package/astro-light-box',
		githubUrl: 'https://github.com/jonasfroeller/astro.image.lightbox',
		description: 'Lightbox component for Astro',
		longDescription:
			'Drop-in lightbox component for Astro projects so you can showcase images in an overlay without custom wiring.',
		icon: 'mdi:image-multiple',
		image: placeholderImage,
		imageAlt: 'Astro Light Box placeholder preview',
		features: [
			'Drop-in lightbox overlay for Astro image galleries',
			'Keeps markup minimal while focusing the viewer',
			'Fits existing Astro pages and galleries quickly'
		],
		keywords: ['astro', 'lightbox', 'images'],
		npmPackage: 'astro-light-box'
	},
	{
		slug: 'astro-async-loader',
		type: 'npm',
		name: 'Astro Async Loader',
		url: 'https://www.npmjs.com/package/astro-async-loader',
		githubUrl: 'https://github.com/jonasfroeller/astro.async.loader',
		description: 'Async loader component for Astro',
		longDescription:
			'Async loader utility for Astro that lets you defer heavy content and render loading states cleanly.',
		icon: 'mdi:loading',
		image: placeholderImage,
		imageAlt: 'Astro Async Loader placeholder preview',
		features: [
			'Async loader utility for Astro components',
			'Provides loading states while content resolves',
			'Helps keep pages responsive with deferred rendering'
		],
		keywords: ['astro', 'async', 'loader'],
		npmPackage: 'astro-async-loader'
	}
];

export const freeProductsByType: Record<FreeProductCategory, FreeProduct[]> = {
	website: freeProducts.filter((product) => product.type === 'website'),
	desktop: freeProducts.filter((product) => product.type === 'desktop'),
	extension: freeProducts.filter((product) => product.type === 'extension'),
	npm: freeProducts.filter((product) => product.type === 'npm')
};

export const websiteProducts = freeProductsByType.website;
export const desktopProducts = freeProductsByType.desktop;
export const extensionProducts = freeProductsByType.extension;
export const npmProducts = freeProductsByType.npm;

export function findFreeProduct(slug: string) {
	return freeProducts.find((product) => product.slug === slug);
}

export async function refreshNpmDownloads(fetcher: typeof fetch) {
	const results = await Promise.allSettled(
		npmProducts
			.filter((product) => Boolean(product.npmPackage))
			.map(async (product) => {
				const response = await fetcher(`/api/npm-stats?package=${product.npmPackage}`);
				if (!response.ok) {
					throw new Error(`Failed to load stats for ${product.npmPackage}`);
				}

				const data = await response.json();
				product.downloads = data.downloads;

				return { slug: product.slug, downloads: data.downloads as number };
			})
	);

	return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
}
