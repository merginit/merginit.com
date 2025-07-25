<script lang="ts">
	import type { LinkItem } from '$lib/types';
	import '../app.css';
	import { CookiePopup, CookieStyler, type CookieCategory } from 'cookiiies';
	import ClarityAnalytics from '$lib/components/ClarityAnalytics.svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import Icon from '@iconify/svelte';

	const pageLinks: LinkItem[] = [
		{ text: 'Home', href: '/' },
		{ text: 'Blog', href: '/blog' },
		{ text: 'Free', href: '/free-products' }
		/* { text: 'About', href: '/about' },
		{ text: 'Contact', href: '/contact' } */
	];

	const legalPageLinks: LinkItem[] = [
		{ text: 'Imprint', href: '/legal/imprint' },
		{ text: 'Privacy Policy', href: '/legal/privacy-policy' },
		{ text: 'Cookie Policy', href: '/legal/cookie-policy' },
		{ text: 'Data Request', href: '/data-request' }
	];

	const customCookieCategories: CookieCategory[] = [
		{
			id: 'necessary',
			name: 'Essential Cookies',
			description: 'These cookies are absolutely necessary for the website to function properly.',
			required: true,
			checked: true
		},
		{
			id: 'analytics',
			name: 'Analytics & Performance Cookies',
			description:
				'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
			required: false,
			checked: false
		}
	];

	export let data;

	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration, delay };
	const transitionOut = { easing: cubicIn, y: -y, duration };
</script>

<CookieStyler cookieCategories={customCookieCategories}>
	<CookiePopup />
</CookieStyler>

<ClarityAnalytics />

{#key data.pathname}
	<div class="transition-wrapper" in:fly={transitionIn} out:fly={transitionOut}>
		<slot />
	</div>
{/key}

<footer
	class="w-full bg-brand-dark py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-gray-700/50 text-neutral-400"
>
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
			<div class="md:col-span-1">
				<h3 class="text-lg font-semibold text-neutral-200 mb-3">Navigate</h3>
				<ul class="space-y-1">
					{#each pageLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm hover:text-neutral-200 transition-colors duration-300"
								class:text-brand={data.pathname === link.href}
							>
								{link.text}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="md:col-span-1">
				<h3 class="text-lg font-semibold text-neutral-200 mb-3">Legal</h3>
				<ul class="space-y-1">
					{#each legalPageLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm hover:text-neutral-200 transition-colors duration-300"
								class:text-brand={data.pathname === link.href}
							>
								{link.text}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="md:col-span-1">
				<h3 class="text-lg font-semibold text-neutral-200 mb-3">MerginIT e.U.</h3>
				<p class="text-sm mb-2">
					<span>Your partner for innovative IT solutions.</span><br />
					Contact us at
					<a
						href="mailto:jonas@merginit.com"
						class="text-neutral-400 hover:text-brand transition-colors duration-300 mt-1"
					>
						jonas@merginit.com
					</a>.
				</p>
				<div class="flex gap-2 justify-center md:justify-start">
					<a
						href="https://www.linkedin.com/company/merginit"
						target="_blank"
						rel="noopener noreferrer"
						class="text-neutral-400 hover:text-brand transition-colors duration-300"
						aria-label="LinkedIn"
					>
						<Icon icon="mdi:linkedin" class="w-6 h-6" />
					</a>
					<a
						href="https://github.com/merginit"
						target="_blank"
						rel="noopener noreferrer"
						class="text-neutral-400 hover:text-brand transition-colors duration-300"
						aria-label="GitHub"
					>
						<Icon icon="mdi:github" class="w-6 h-6" />
					</a>
				</div>
			</div>
		</div>
		<div class="border-t border-gray-700/50 pt-6 text-center">
			<div class="mt-4 flex justify-center">
				<a
					href="https://frogdr.com/merginit.com?utm_source=merginit.com"
					target="_blank"
					rel="noopener"
				>
					<img
						src="https://frogdr.com/merginit.com/badge-white.svg"
						alt="Monitor your Domain Rating with FrogDR"
						width="250"
						height="54"
					/>
				</a>
			</div>

			<p class="text-xs mt-4 text-neutral-500">
				&copy; {new Date().getFullYear()} MerginIT e.U. All rights reserved.
			</p>
		</div>
	</div>
</footer>
