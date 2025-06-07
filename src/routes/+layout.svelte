<script lang="ts">
	import type { LinkItem } from '$lib/types';
	import '../app.css';
	import { CookiePopup, CookieStyler, type CookieCategory } from 'cookiiies';
	import ClarityAnalytics from '$lib/components/ClarityAnalytics.svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	const pageLinks: LinkItem[] = [
		{ text: 'Home', href: '/' },
		{ text: 'Blog', href: '/blog' },
		/* { text: 'About', href: '/about' },
		{ text: 'Contact', href: '/contact' } */
	];

	const legalPageLinks: LinkItem[] = [
		{ text: 'Imprint', href: '/legal/imprint' },
		{ text: 'Privacy Policy', href: '/legal/privacy-policy' }
		/* { text: 'Terms of Service', href: '/legal/tos' }, */
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
			description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
			required: false,
			checked: false
		}
	];

	let { children, data } = $props();

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
		{@render children()}
	</div>
{/key}

<footer
	class="w-full bg-brand-dark py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-gray-700/50 text-neutral-400"
>
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
			<div class="md:col-span-1">
				<h3 class="text-lg font-semibold text-neutral-200 mb-3">Navigate</h3>
				<ul class="space-y-2">
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
				<ul class="space-y-2">
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
				<p class="text-sm">
					Your partner for innovative IT solutions.
					<br />
					<!-- Placeholder for address or other info -->
				</p>
			</div>
		</div>
		<div class="border-t border-gray-700/50 pt-6 text-center">
			<p class="text-xs text-neutral-500">
				&copy; {new Date().getFullYear()} MerginIT e.U. All rights reserved.
			</p>
		</div>
	</div>
</footer>
