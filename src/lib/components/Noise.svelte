<script lang="ts">
  interface NoiseProps {
    patternSize?: number;
    patternScaleX?: number;
    patternScaleY?: number;
    patternRefreshInterval?: number;
    patternAlpha?: number;
  }

  let {
    patternSize = 250,
    patternScaleX = 1,
    patternScaleY = 1,
    patternRefreshInterval = 2,
    patternAlpha = 15,
  }: NoiseProps = $props();

  let canvasRef: HTMLCanvasElement | undefined = undefined;
  let animationFrameId: number;

  $effect(() => {
    if (typeof window === 'undefined' || !canvasRef) {
      return;
    }

    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context from canvas");
      return;
    }

    let frame = 0;

    // Capture current prop values for this effect run
    // Ensures that if a prop changes, the effect re-runs with the new value from the start
    const currentPatternSize = patternSize;
    const currentPatternScaleX = patternScaleX;
    const currentPatternScaleY = patternScaleY;
    // Ensure refresh interval is at least 1 to prevent division by zero or no updates
    const currentPatternRefreshInterval = Math.max(1, patternRefreshInterval); 
    const currentPatternAlpha = patternAlpha;

    // Create a separate canvas for generating the noise pattern
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = currentPatternSize;
    patternCanvas.height = currentPatternSize;
    const patternCtx = patternCanvas.getContext("2d");

    if (!patternCtx) {
      console.error("Failed to get 2D context from pattern canvas");
      return;
    }

    const patternData = patternCtx.createImageData(currentPatternSize, currentPatternSize);
    const patternPixelDataLength = currentPatternSize * currentPatternSize * 4; // RGBA

    const resize = () => {
      const dpr = window.devicePixelRatio || 1; // Device pixel ratio for high-res displays
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Reset any previous transformations
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Apply scaling for the pattern. The canvas buffer is already DPR-adjusted.
      ctx.scale(currentPatternScaleX, currentPatternScaleY);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = 180 + Math.random() * 75; // Random light grayscale value (180-255)
        patternData.data[i] = value;       // R
        patternData.data[i + 1] = value;   // G
        patternData.data[i + 2] = value;   // B
        patternData.data[i + 3] = currentPatternAlpha; // Alpha
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      // The clearRect and fillRect coordinates are in the scaled context.
      // To cover the entire canvas buffer, use its width/height divided by the scale factors.
      const viewWidth = canvas.width / currentPatternScaleX;
      const viewHeight = canvas.height / currentPatternScaleY;

      ctx.clearRect(0, 0, viewWidth, viewHeight);
      
      const createdPattern = ctx.createPattern(patternCanvas, "repeat");
      if (createdPattern) {
        ctx.fillStyle = createdPattern;
        ctx.fillRect(0, 0, viewWidth, viewHeight);
      } else {
        console.error("Failed to create pattern from pattern canvas");
      }
    };

    let loopRunning = true;

    const loop = () => {
      if (!loopRunning) return;

      if (frame % currentPatternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      loopRunning = false;
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
      if (ctx) {
        const viewWidth = canvas.width / currentPatternScaleX;
        const viewHeight = canvas.height / currentPatternScaleY;
        ctx.clearRect(0, 0, viewWidth, viewHeight);
      }
    };
  });
</script>

<canvas 
  class="fixed inset-0 w-full h-full pointer-events-none -z-10" 
  bind:this={canvasRef}
  aria-hidden="true"
></canvas>
