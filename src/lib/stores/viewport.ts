import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const mobileMediaQuery = '(max-width: 768px)';

export const isMobile = readable(false, (set) => {
	if (!browser) {
		set(false); // Default for SSR or if browser API not available
		return () => {}; // No-op cleanup for SSR
	}

	const mql = window.matchMedia(mobileMediaQuery);
	set(mql.matches);

	const listener = (event: MediaQueryListEvent) => {
		set(event.matches);
	};

	mql.addEventListener('change', listener);

	return () => {
		mql.removeEventListener('change', listener);
	};
});
