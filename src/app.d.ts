// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			meta?: {
				title: string;
				description?: string;
				type?: string;
				[key: string]: unknown;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		clarity?: (...args: never[]) => void;
	}
}

declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

declare module '*.svx' {
	import type { SvelteComponent } from 'svelte';

	export default class Comp extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

export {};
