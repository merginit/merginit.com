<script lang="ts">
	interface FuzzyTextProps {
		text: string;
		fontSize?: number | string;
		fontWeight?: string | number;
		fontFamily?: string;
		color?: string;
		enableHover?: boolean;
		baseIntensity?: number;
		hoverIntensity?: number;
	}

	let {
		text,
		fontSize = 'clamp(2rem, 8vw, 8rem)',
		fontWeight = 900,
		fontFamily = 'inherit',
		color = '#fff',
		enableHover = true,
		baseIntensity = 0.18,
		hoverIntensity = 0.5
	}: FuzzyTextProps = $props();

	let canvasRef: (HTMLCanvasElement & { cleanupFuzzyText?: () => void }) | undefined = undefined;

	$effect(() => {
		let animationFrameId: number;
		let isCancelled = false;
		const canvas = canvasRef;

		if (typeof window === 'undefined' || !canvas) return;

		const init = async () => {
			if (document.fonts?.ready) {
				await document.fonts.ready;
			}
			if (isCancelled || !canvas) return;

			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			const computedFontFamily =
				fontFamily === 'inherit'
					? window.getComputedStyle(canvas).fontFamily || 'sans-serif'
					: fontFamily;

			const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
			let numericFontSize: number;
			if (typeof fontSize === 'number') {
				numericFontSize = fontSize;
			} else {
				const temp = document.createElement('span');
				temp.style.fontSize = fontSizeStr;
				temp.style.visibility = 'hidden';
				temp.style.position = 'absolute';
				document.body.appendChild(temp);
				const computedSize = window.getComputedStyle(temp).fontSize;
				numericFontSize = parseFloat(computedSize);
				document.body.removeChild(temp);
			}

			const offscreen = document.createElement('canvas');
			const offCtx = offscreen.getContext('2d');
			if (!offCtx) return;

			offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
			offCtx.textBaseline = 'alphabetic';
			const metrics = offCtx.measureText(text);

			const actualLeft = metrics.actualBoundingBoxLeft;
			const actualRight = metrics.actualBoundingBoxRight;
			const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
			const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

			const paintedWidth = actualRight - actualLeft;
			const tightHeight = Math.ceil(actualAscent + actualDescent);

			const extraWidthBuffer = 10;
			const offscreenWidth = Math.ceil(paintedWidth) + extraWidthBuffer;
			const xDrawPosOnOffscreen = -actualLeft + extraWidthBuffer / 2;

			offscreen.width = offscreenWidth;
			offscreen.height = tightHeight;

			offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
			offCtx.textBaseline = 'alphabetic';
			offCtx.fillStyle = color;
			offCtx.fillText(text, xDrawPosOnOffscreen, actualAscent);

			const horizontalMargin = 50;
			const verticalMargin = 0;
			canvas.width = offscreenWidth + horizontalMargin * 2;
			canvas.height = tightHeight + verticalMargin * 2;
			ctx.translate(horizontalMargin, verticalMargin);

			const interactiveLeft = xDrawPosOnOffscreen - extraWidthBuffer / 2;
			const interactiveTop = 0;
			const interactiveRight = interactiveLeft + paintedWidth;
			const interactiveBottom = tightHeight;

			let isHovering = false;
			const fuzzRange = 30;
			const max_dx_magnitude = Math.ceil(Math.max(baseIntensity, hoverIntensity) * 0.5 * fuzzRange);

			const run = () => {
				if (isCancelled || !canvas) return;

				ctx.clearRect(-max_dx_magnitude, 0, offscreenWidth + 2 * max_dx_magnitude, tightHeight);

				const intensity = isHovering ? hoverIntensity : baseIntensity;
				for (let j = 0; j < tightHeight; j++) {
					const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
					ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
				}
				animationFrameId = window.requestAnimationFrame(run);
			};

			run();

			const isInsideTextArea = (x: number, y: number) => {
				const translatedX = x - horizontalMargin;
				const translatedY = y - verticalMargin;
				return (
					translatedX >= interactiveLeft &&
					translatedX <= interactiveRight &&
					translatedY >= interactiveTop &&
					translatedY <= interactiveBottom
				);
			};

			const handleMouseMove = (e: MouseEvent) => {
				if (!enableHover || !canvas) return;
				const rect = canvas.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				isHovering = isInsideTextArea(x, y);
			};

			const handleMouseLeave = () => {
				isHovering = false;
			};

			const handleTouchMove = (e: TouchEvent) => {
				if (!enableHover || !canvas) return;
				e.preventDefault();
				const rect = canvas.getBoundingClientRect();
				const touch = e.touches[0];
				const x = touch.clientX - rect.left;
				const y = touch.clientY - rect.top;
				isHovering = isInsideTextArea(x, y);
			};

			const handleTouchEnd = () => {
				isHovering = false;
			};

			if (enableHover) {
				canvas.addEventListener('mousemove', handleMouseMove);
				canvas.addEventListener('mouseleave', handleMouseLeave);
				canvas.addEventListener('touchmove', handleTouchMove, {
					passive: false
				});
				canvas.addEventListener('touchend', handleTouchEnd);
			}

			const cleanup = () => {
				window.cancelAnimationFrame(animationFrameId);
				if (enableHover && canvas) {
					canvas.removeEventListener('mousemove', handleMouseMove);
					canvas.removeEventListener('mouseleave', handleMouseLeave);
					canvas.removeEventListener('touchmove', handleTouchMove);
					canvas.removeEventListener('touchend', handleTouchEnd);
				}
			};
			if (canvas) {
				canvas.cleanupFuzzyText = cleanup;
			}
		};

		init();

		return () => {
			isCancelled = true;
			window.cancelAnimationFrame(animationFrameId);
			if (canvas && canvas.cleanupFuzzyText) {
				canvas.cleanupFuzzyText();
			}
		};
	});
</script>

<canvas bind:this={canvasRef}></canvas>
