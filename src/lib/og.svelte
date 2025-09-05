<script lang="ts">
	export let title: string = 'MerginIT e.U.';
	export let subtitle: string = 'Professional Software Development & SaaS Solutions';
	export let image: string | undefined = undefined;
</script>

<div
	style="
		height: 100%;
		width: 100%;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: #f0f0f0;
		font-family: 'Noto Sans', sans-serif;
	"
>
	<div style="display: flex; align-items: center; justify-content: center;">
		<img
			src={image ?? 'https://merginit.com/favicon.png'}
			alt="MerginIT Logo"
			style="margin: 0 40px; width: 120px; height: 120px;"
		/>
	</div>
	<div
		style="
			display: flex;
			font-size: 48px;
			font-style: normal;
			color: black;
			margin-top: 30px;
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
			margin-top: 20px;
			line-height: 1.4;
			white-space: pre-wrap;
			text-align: center;
		"
	>
		{subtitle || 'Professional Software Development & SaaS Solutions'}
	</div>
</div>
