export const UI_SDK_VERSION: '0.1.0-beta.7';

export type MappingKind = 'sdk' | 'primitive' | 'content';

export type ComponentMapping = {
  from: string;
  to: string;
  kind: MappingKind;
  concept: string;
};

export const componentMap: readonly ComponentMapping[];
export const sdkEntries: readonly string[];

export function parseNumbers(values: readonly string[] | string | undefined): number[];
export function parseChannels(source: string | undefined): { name: string; points: number[] }[];
export function formatBytes(value: number): string;
export function formatNumber(value: number): string;
export function formatDate(value: string): string;
export function formatRelative(value: string, now?: number): string;
export function clamp(value: number, min: number, max: number): number;

export const createAgent: typeof import('@ui-sdk/web/agent').createAgent;
export const registerTools: typeof import('@ui-sdk/web/agent').registerTools;
export const observe: typeof import('@ui-sdk/core/observe').observe;

/**
 * THX primitives. Their `definePrimitive` factories are exported at runtime.
 * UI SDK's factory type is not portable in declaration emit, so the published
 * type is `unknown`. Import the TypeScript source when another adapter needs
 * the full factory type.
 */
export const alert: unknown;
export const badge: unknown;
export const tag: unknown;
export const spinner: unknown;
export const skeleton: unknown;
export const visuallyHidden: unknown;
export const presence: unknown;
export const copyButton: unknown;
export const breadcrumb: unknown;
export const card: unknown;
export const crt: unknown;
export const scopeLine: unknown;
export const scopeBar: unknown;
export const scopeGauge: unknown;
export const scopeMonitors: unknown;
export const leds: unknown;
export const formatBytesElement: unknown;
export const formatNumberElement: unknown;
export const formatDateElement: unknown;
export const relativeTime: unknown;
export const comparer: unknown;
export const frames: unknown;
export const include: unknown;
export const resizeObserver: unknown;
export const mutationObserver: unknown;
