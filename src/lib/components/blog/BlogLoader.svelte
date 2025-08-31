<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		text?: string;
	}

	let { size = 'md', text = 'Loading blog posts...' }: Props = $props();

	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-12 h-12',
		lg: 'w-16 h-16'
	};
</script>

<div class="flex flex-col items-center justify-center py-16 px-4">
	<div class="relative {sizeClasses[size]} mb-4">
		<!-- Outer ring with brand color -->
		<div class="absolute inset-0 rounded-full border-4 border-brand opacity-20"></div>

		<!-- Spinning accent ring -->
		<div
			class="absolute inset-0 rounded-full border-4 border-transparent border-t-accent animate-spin"
		></div>

		<!-- Inner pulsing dot -->
		<div class="absolute inset-1/4 rounded-full bg-brand animate-pulse"></div>
	</div>

	{#if text}
		<p class="text-text-muted text-sm sm:text-base animate-pulse">
			{text}
		</p>
	{/if}
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
