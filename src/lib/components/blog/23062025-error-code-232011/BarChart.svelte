<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let id = 'barCanvas';

	const data = {
		labels: [
			'Refresh Page',
			'Clear Cache',
			'Incognito Mode',
			'Disable Extensions',
			'Update Browser',
			'Disable Hardware Accel.',
			'Reset Browser',
			'Check Internet',
			'Disable VPN',
			'Repair File'
		],
		datasets: [
			{
				label: 'Likelihood of Success (1-10)',
				data: [8, 9, 8, 7, 6, 6, 5, 7, 5, 4],
				backgroundColor: '#cc9900',
				borderColor: '#cc9900',
				borderWidth: 1
			},
			{
				label: 'Complexity of Fix (1-10)',
				data: [1, 2, 2, 3, 2, 3, 4, 3, 3, 6],
				backgroundColor: '#388278',
				borderColor: '#388278',
				borderWidth: 1
			}
		]
	};

	onMount(() => {
		const ctx = document.getElementById(id) as HTMLCanvasElement | null;
		if (!ctx) return;

		new Chart(ctx, {
			type: 'bar',
			data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						ticks: { color: '#888888' },
						grid: { color: '#888888' }
					},
					y: {
						beginAtZero: true,
						min: 0,
						max: 10,
						ticks: { stepSize: 1, color: '#888888' },
						grid: { color: '#888888' }
					}
				},
				plugins: {
					legend: {
						labels: { color: '#888888' }
					}
				}
			}
		});
	});
</script>

<div style="height:500px">
	<canvas {id}></canvas>
</div>
