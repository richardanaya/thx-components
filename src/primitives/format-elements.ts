import { definePrimitive } from '@ui-sdk/core';
import { formatBytes, formatDate, formatNumber, formatRelative } from '../format.js';

const formatBytesElement = definePrimitive({
  name: 'thx-format-bytes',
  options: { value: 'number' },
  state: (options: { value?: number }) => ({ text: formatBytes(options.value ?? Number.NaN) }),
  sync: options => ({ text: formatBytes(options.value ?? Number.NaN) }),
  api: context => ({ getText: () => context.store.get().text }),
  slots: slot => ({
    root: slot({
      bind: (el, part) => {
        const write = () => {
          el.textContent = part.store.get().text;
        };
        write();
        return part.store.subscribe(write);
      },
    }),
  }),
});

const formatNumberElement = definePrimitive({
  name: 'thx-format-number',
  options: { value: 'number' },
  state: (options: { value?: number }) => ({ text: formatNumber(options.value ?? Number.NaN) }),
  sync: options => ({ text: formatNumber(options.value ?? Number.NaN) }),
  api: context => ({ getText: () => context.store.get().text }),
  slots: slot => ({
    root: slot({
      bind: (el, part) => {
        const write = () => {
          el.textContent = part.store.get().text;
        };
        write();
        return part.store.subscribe(write);
      },
    }),
  }),
});

const formatDateElement = definePrimitive({
  name: 'thx-format-date',
  options: { value: 'string' },
  state: (options: { value?: string }) => ({ text: formatDate(options.value ?? '') }),
  sync: options => ({ text: formatDate(options.value ?? '') }),
  api: context => ({ getText: () => context.store.get().text }),
  slots: slot => ({
    root: slot({
      bind: (el, part) => {
        const write = () => {
          el.textContent = part.store.get().text;
        };
        write();
        return part.store.subscribe(write);
      },
    }),
  }),
});

const relativeTime = definePrimitive({
  name: 'thx-relative-time',
  options: { value: 'string' },
  state: (options: { value?: string }) => ({
    value: options.value ?? '',
    text: formatRelative(options.value ?? ''),
  }),
  sync: options =>
    options.value === undefined
      ? {}
      : { value: options.value, text: formatRelative(options.value) },
  api: context => {
    const timer = window.setInterval(() => {
      const value = context.store.get().value;
      context.store.set({ text: formatRelative(value) });
    }, 30_000);
    context.onDestroy(() => window.clearInterval(timer));
    return { getText: () => context.store.get().text };
  },
  slots: slot => ({
    root: slot({
      attrs: state => ({ datetime: state.value || undefined }),
      bind: (el, part) => {
        const write = () => {
          el.textContent = part.store.get().text;
        };
        write();
        return part.store.subscribe(write);
      },
    }),
  }),
});

export { formatBytesElement, formatDateElement, formatNumberElement, relativeTime };
