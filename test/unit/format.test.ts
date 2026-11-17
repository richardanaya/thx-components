import assert from 'node:assert/strict';
import { test } from 'node:test';
import { componentMap } from '../../src/catalog.ts';
import {
  formatBytes,
  formatDate,
  formatNumber,
  formatRelative,
  parseChannels,
  parseNumbers,
} from '../../src/format.ts';

test('parses number lists and monitor channels', () => {
  assert.deepEqual(parseNumbers('12, 40, no, 8'), [12, 40, 8]);
  assert.deepEqual(parseChannels('ALPHA:12,40|BETA:8'), [
    { name: 'ALPHA', points: [12, 40] },
    { name: 'BETA', points: [8] },
  ]);
});

test('formats measurements', () => {
  assert.equal(formatBytes(1536), '1.50 KB');
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(Number.NaN), '—');
  assert.equal(
    formatNumber(1138.5),
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(1138.5)
  );
  assert.equal(formatDate('not-a-date'), '—');
  assert.notEqual(formatDate('2026-11-12T15:04:00Z'), '—');
});

test('formats relative time around a fixed clock', () => {
  const now = Date.parse('2026-11-17T05:00:00Z');
  const text = formatRelative('2026-11-17T04:00:00Z', now);
  assert.match(text, /hour/i);
});

test('maps every former custom element', () => {
  const from = componentMap.map(item => item.from);
  assert.equal(new Set(from).size, from.length);
  assert.equal(from.length, 64);
  assert.ok(from.includes('thx-button'));
  assert.ok(from.includes('thx-chart-line'));
  assert.ok(componentMap.some(item => item.to === 'ui-dialog'));
});
