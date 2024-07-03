<script lang="ts">
  import { onMount } from 'svelte';
  let className = ''

  export { className as class }
  export let centerText: any = ''
  export let data: ({
    name: string;
    value: number;
  } | undefined)[];

  type Point = {
    x: number;
    y: number;
  }

  let canvas: HTMLCanvasElement;

  const render = () => {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let totalValue = 0;
    for(let dataPoint of data) {
      if (!dataPoint) continue;
      totalValue += dataPoint.value;
    }

    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const radius = Math.min(center.x, center.y);

    let startAngle = 0;
    for(let dataPoint of data) {
      if (!dataPoint) continue;
      let sliceAngle = (dataPoint.value / totalValue) * 2 * Math.PI;
      drawSlice(ctx, center, radius, startAngle, startAngle + sliceAngle, getRandomColor());
      clearLine(ctx, center, radius, startAngle + sliceAngle, getRandomColor());
      startAngle += sliceAngle;
    }

    clearCircle(ctx, center, radius*0.65);

    let fontSize = `${centerText}`.length > 5 ? `${centerText}`.length > 10 ? 17 : 20 : 30;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(centerText, center.x, center.y+10);
  }

  onMount(() => render());
  $: if (canvas && data && centerText) render();

  const clearLine = (ctx: CanvasRenderingContext2D, start: Point, length: number, angle: number, color: string) => {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out'
    if (angle % (Math.PI/2) === 0) {
      ctx.lineWidth = 3;
    } else {
      ctx.lineWidth = 6;
    }
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + length * Math.cos(angle), start.y + length * Math.sin(angle));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  const drawSlice = (ctx: CanvasRenderingContext2D, center: Point, radius: number, startAngle: number, endAngle: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  const clearCircle = (ctx: CanvasRenderingContext2D, center: Point, radius: number) => {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out'
    ctx.arc(center.x, center.y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
</script>

<canvas class={className} bind:this={canvas} width="170" height="170" />