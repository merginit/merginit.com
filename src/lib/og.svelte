<script lang="ts">
	export let title: string = 'MerginIT e.U.';
	export let subtitle: string = 'Professional Software Development & SaaS Solutions';
	export let image: string | undefined = undefined;
	export let preview: string | undefined = undefined;
</script>

<div
	style="
		height: 100%;
		width: 100%;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: #f0f0f0;
		font-family: 'Noto Sans', sans-serif;
		padding-top: 40px;
		padding-bottom: 0;
	"
>
	<div
		style="
			display: flex;
			font-size: 56px;
			font-style: normal;
			color: black;
			margin-top: 10px;
			line-height: 1.2;
			white-space: pre-wrap;
			font-weight: bold;
		"
	>
		{title || 'MerginIT e.U.'}
	</div>
	<div
		style="
			display: flex;
			font-size: 24px;
			font-style: normal;
			color: #666;
			margin-top: 8px;
			line-height: 1.4;
			white-space: pre-wrap;
			text-align: center;
		"
	>
		{subtitle || 'Professional Software Development & SaaS Solutions'}
	</div>
	{#if preview}
		<div
			style="position: relative; width: 1000px; height: 420px; margin-top: auto; margin-bottom: 0; display: flex;"
		>
			<img
				src={preview}
				alt="Page preview"
				style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; border-top-left-radius: 16px; border-top-right-radius: 16px; border-bottom-left-radius: 0; border-bottom-right-radius: 0;"
			/>
			<img
				src={image ?? 'https://merginit.com/favicon.png'}
				alt="Logo"
				style="position: absolute; right: 16px; bottom: 16px; width: 72px; height: 72px; border-radius: 9999px; background: #fff; border: 2px solid rgba(255,255,255,0.9); box-shadow: 0 6px 18px rgba(0,0,0,0.2);"
			/>
		</div>
	{/if}
</div>
