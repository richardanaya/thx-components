/** Phosphor grid drawing for the CRT scope primitives. */

const GRID = '#333333';
const PHOSPHOR = '#a6c8e1';
const PHOSPHOR_DIM = '#707e91';
const AMBER = '#d4aa00';
const VOID = '#0a0a0a';

export type PlotSize = { width: number; height: number };

export function fitCanvas(canvas: HTMLCanvasElement, height: number): PlotSize | null {
  const width = canvas.clientWidth || canvas.parentElement?.clientWidth || 0;
  if (width <= 0) return null;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width, height };
}

export function paintGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = VOID;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= width; x += 22) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
  }
  for (let y = 0; y <= height; y += 22) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
  }
  ctx.stroke();
}

function yAt(value: number, min: number, max: number, height: number, pad: number): number {
  const span = max - min || 1;
  const t = (value - min) / span;
  return height - pad - t * (height - pad * 2);
}

export function paintLine(
  canvas: HTMLCanvasElement,
  points: number[],
  secondary: number[],
  min: number,
  max: number
): void {
  const size = fitCanvas(canvas, 168);
  if (!size) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  paintGrid(ctx, size.width, size.height);
  strokeSeries(ctx, points, min, max, size, PHOSPHOR);
  strokeSeries(ctx, secondary, min, max, size, AMBER);
}

function strokeSeries(
  ctx: CanvasRenderingContext2D,
  points: number[],
  min: number,
  max: number,
  size: PlotSize,
  color: string
): void {
  if (points.length === 0) return;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  points.forEach((point, index) => {
    const x = points.length === 1 ? size.width / 2 : (index / (points.length - 1)) * size.width;
    const y = yAt(point, min, max, size.height, 12);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export function paintBars(
  canvas: HTMLCanvasElement,
  points: number[],
  min: number,
  max: number
): void {
  const size = fitCanvas(canvas, 168);
  if (!size) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  paintGrid(ctx, size.width, size.height);
  if (points.length === 0) return;
  const gap = 6;
  const barWidth = Math.max(2, (size.width - gap * (points.length + 1)) / points.length);
  points.forEach((point, index) => {
    const span = max - min || 1;
    const t = Math.min(1, Math.max(0, (point - min) / span));
    const barHeight = t * (size.height - 16);
    const x = gap + index * (barWidth + gap);
    const y = size.height - 8 - barHeight;
    ctx.fillStyle = PHOSPHOR;
    ctx.shadowColor = PHOSPHOR;
    ctx.shadowBlur = 8;
    ctx.fillRect(x, y, barWidth, barHeight);
  });
  ctx.shadowBlur = 0;
}

export function paintGauge(
  canvas: HTMLCanvasElement,
  value: number,
  min: number,
  max: number
): void {
  const size = fitCanvas(canvas, 150);
  if (!size) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.fillStyle = VOID;
  ctx.fillRect(0, 0, size.width, size.height);
  const cx = size.width / 2;
  const cy = size.height * 0.72;
  const radius = Math.min(size.width, size.height) * 0.42;
  const start = Math.PI * 0.85;
  const end = Math.PI * 2.15;
  ctx.beginPath();
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 8;
  ctx.arc(cx, cy, radius, start, end);
  ctx.stroke();
  const span = max - min || 1;
  const t = Math.min(1, Math.max(0, (value - min) / span));
  ctx.beginPath();
  ctx.strokeStyle = PHOSPHOR;
  ctx.shadowColor = PHOSPHOR;
  ctx.shadowBlur = 8;
  ctx.arc(cx, cy, radius, start, start + (end - start) * t);
  ctx.stroke();
  ctx.shadowBlur = 0;
  const angle = start + (end - start) * t;
  ctx.beginPath();
  ctx.strokeStyle = '#deffff';
  ctx.lineWidth = 2;
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(angle) * (radius - 10), cy + Math.sin(angle) * (radius - 10));
  ctx.stroke();
  ctx.fillStyle = PHOSPHOR;
  ctx.font = "12px 'Courier New', Courier, monospace";
  ctx.textAlign = 'center';
  ctx.fillText(String(Math.round(value)), cx, cy + 22);
}

export function paintMonitors(
  canvas: HTMLCanvasElement,
  channels: { name: string; points: number[] }[]
): void {
  const row = 36;
  const size = fitCanvas(canvas, Math.max(row, channels.length * row));
  if (!size) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.fillStyle = VOID;
  ctx.fillRect(0, 0, size.width, size.height);
  ctx.font = "11px 'Courier New', Courier, monospace";
  ctx.textBaseline = 'middle';
  channels.forEach((channel, index) => {
    const top = index * row;
    ctx.fillStyle = PHOSPHOR_DIM;
    ctx.textAlign = 'left';
    ctx.fillText(channel.name.toUpperCase(), 8, top + row / 2);
    const min = Math.min(...channel.points);
    const max = Math.max(...channel.points);
    ctx.beginPath();
    ctx.strokeStyle = index % 2 === 0 ? PHOSPHOR : AMBER;
    ctx.lineWidth = 1.25;
    channel.points.forEach((point, pointIndex) => {
      const x = 72 + (pointIndex / Math.max(1, channel.points.length - 1)) * (size.width - 84);
      const span = max - min || 1;
      const y = top + 8 + (1 - (point - min) / span) * (row - 16);
      if (pointIndex === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
}
