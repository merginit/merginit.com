<script lang="ts">
	import type { LinkItem } from '$lib/types';
	import '../app.css';

	const legalPageLinks: LinkItem[] = [
		{ text: 'Imprint', href: '/legal/imprint' },
		{ text: 'Privacy Policy', href: '/legal/privacy-policy' },
		/* { text: 'Terms of Service', href: '/legal/tos' }, */
	];

	let { children } = $props();
</script>

{@render children()}

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
