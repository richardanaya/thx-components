import { createParts, wrappedButton, wrappedChild } from '@ui-sdk/web';
import { breadcrumb } from './primitives/breadcrumb.js';
import { card } from './primitives/card.js';
import { comparer } from './primitives/comparer.js';
import { copyButton } from './primitives/copy-button.js';
import { crt } from './primitives/crt.js';
import {
  alert,
  badge,
  presence,
  skeleton,
  spinner,
  tag,
  visuallyHidden,
} from './primitives/feedback.js';
import {
  formatBytesElement,
  formatDateElement,
  formatNumberElement,
  relativeTime,
} from './primitives/format-elements.js';
import { frames } from './primitives/frames.js';
import { include } from './primitives/include.js';
import { leds } from './primitives/leds.js';
import { mutationObserver, resizeObserver } from './primitives/observers.js';
import { scopeBar, scopeGauge, scopeLine, scopeMonitors } from './primitives/scope.js';

createParts(alert, {
  root: { tag: 'thx-alert', display: 'block', api: ['dismiss'] },
  dismiss: { tag: 'thx-alert-dismiss', target: wrappedButton, display: 'contents' },
});

createParts(badge, {
  root: { tag: 'thx-badge', display: 'block' },
});

createParts(tag, {
  root: { tag: 'thx-tag', display: 'block', api: ['remove'] },
  remove: { tag: 'thx-tag-remove', target: wrappedButton, display: 'contents' },
});

createParts(spinner, {
  root: { tag: 'thx-spinner', display: 'block' },
});

createParts(skeleton, {
  root: { tag: 'thx-skeleton', display: 'block' },
});

createParts(visuallyHidden, {
  root: { tag: 'thx-visually-hidden', display: 'block' },
});

createParts(presence, {
  root: { tag: 'thx-presence', display: 'block', api: ['setActive'] },
});

createParts(copyButton, {
  root: {
    tag: 'thx-copy-button',
    target: wrappedButton,
    display: 'contents',
    api: ['copy', 'isCopied'],
  },
});

createParts(breadcrumb, {
  root: { tag: 'thx-breadcrumb', display: 'block' },
  item: { tag: 'thx-breadcrumb-item', target: wrappedChild('a'), display: 'contents' },
  separator: { tag: 'thx-breadcrumb-separator', display: 'contents' },
});

createParts(card, {
  root: { tag: 'thx-card', display: 'block' },
  label: { tag: 'thx-card-label', display: 'block' },
  body: { tag: 'thx-card-body', display: 'block' },
});

createParts(crt, {
  root: { tag: 'thx-crt', display: 'block' },
  label: { tag: 'thx-crt-label', display: 'block' },
  screen: { tag: 'thx-crt-screen', display: 'block' },
});

createParts(scopeLine, {
  root: { tag: 'thx-scope-line', display: 'block', api: ['setValue', 'getValue'] },
});

createParts(scopeBar, {
  root: { tag: 'thx-scope-bar', display: 'block', api: ['setValue', 'getValue'] },
});

createParts(scopeGauge, {
  root: { tag: 'thx-scope-gauge', display: 'block', api: ['setValue', 'getValue'] },
});

createParts(scopeMonitors, {
  root: { tag: 'thx-scope-monitors', display: 'block' },
});

createParts(leds, {
  root: { tag: 'thx-leds', display: 'block' },
  led: { tag: 'thx-led', display: 'block' },
});

createParts(formatBytesElement, {
  root: { tag: 'thx-format-bytes', display: 'block', api: ['getText'] },
});

createParts(formatNumberElement, {
  root: { tag: 'thx-format-number', display: 'block', api: ['getText'] },
});

createParts(formatDateElement, {
  root: { tag: 'thx-format-date', display: 'block', api: ['getText'] },
});

createParts(relativeTime, {
  root: { tag: 'thx-relative-time', display: 'block', api: ['getText'] },
});

createParts(comparer, {
  root: { tag: 'thx-comparer', display: 'block', api: ['setValue', 'getValue'] },
  before: { tag: 'thx-comparer-before', display: 'block' },
  after: { tag: 'thx-comparer-after', display: 'block' },
  handle: { tag: 'thx-comparer-handle', target: wrappedButton, display: 'contents' },
});

createParts(frames, {
  root: { tag: 'thx-frames', display: 'block', api: ['setIndex', 'advance'] },
  frame: { tag: 'thx-frame', display: 'block' },
});

createParts(include, {
  root: { tag: 'thx-include', display: 'block', api: ['load'] },
});

createParts(resizeObserver, {
  root: { tag: 'thx-resize-observer', display: 'block' },
});

createParts(mutationObserver, {
  root: { tag: 'thx-mutation-observer', display: 'block' },
});
