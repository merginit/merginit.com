<script lang="ts">
	import type { LinkItem } from '$lib/types';
	import '../app.css';
	import { CookiePopup, CookieStyler, type CookieCategory } from 'cookiiies';
	import ClarityAnalytics from '$lib/components/ClarityAnalytics.svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

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
	class="w-full bg-brand-dark py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-gray-700/50 text-center"
>
	<div
		class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
	>
		{#each legalPageLinks as link}
			<a
				href={link.href}
				class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-300"
			>
				{link.text}
			</a>
		{/each}
	</div>
	<p class="text-xs text-neutral-500 mt-4">
		&copy; {new Date().getFullYear()} merginIT e.U. All rights reserved.
	</p>
</footer>
