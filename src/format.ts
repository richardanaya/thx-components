/** Pure formatters shared by the THX primitives. Intl output follows the page locale. */

export function parseNumbers(values: readonly string[] | string | undefined): number[] {
  if (values == null || values === '') return [];
  const list = typeof values === 'string' ? values.split(',') : values;
  return list.map(item => Number(item.trim())).filter(value => Number.isFinite(value));
}

export type ScopeChannel = { name: string; points: number[] };

/** `ALPHA:12,40,28|BETA:8,22` */
export function parseChannels(source: string | undefined): ScopeChannel[] {
  if (!source) return [];
  return source
    .split('|')
    .map(part => {
      const colon = part.indexOf(':');
      const name = (colon === -1 ? part : part.slice(0, colon)).trim() || 'CH';
      const series = colon === -1 ? '' : part.slice(colon + 1);
      return { name, points: parseNumbers(series) };
    })
    .filter(channel => channel.points.length > 0);
}

export function formatBytes(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let size = Math.max(0, value);
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  const digits = index === 0 || size >= 100 ? 0 : size >= 10 ? 1 : 2;
  return `${size.toFixed(digits)} ${units[index]}`;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
}

export function formatDate(value: string): string {
  const time = Date.parse(value);
  if (Number.isNaN(time)) return '—';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(time);
}

const RELATIVE_STEPS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: 'year', seconds: 60 * 60 * 24 * 365 },
  { unit: 'month', seconds: 60 * 60 * 24 * 30 },
  { unit: 'week', seconds: 60 * 60 * 24 * 7 },
  { unit: 'day', seconds: 60 * 60 * 24 },
  { unit: 'hour', seconds: 60 * 60 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 },
];

export function formatRelative(value: string, now = Date.now()): string {
  const time = Date.parse(value);
  if (Number.isNaN(time)) return '—';
  const delta = Math.round((time - now) / 1000);
  const format = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  const abs = Math.abs(delta);
  const step = RELATIVE_STEPS.find(item => abs >= item.seconds) ?? RELATIVE_STEPS.at(-1)!;
  return format.format(Math.round(delta / step.seconds), step.unit);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
