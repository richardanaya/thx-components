import { definePrimitive } from '@ui-sdk/core';

const resizeObserver = definePrimitive({
  name: 'thx-resize-observer',
  state: () => ({ width: 0, height: 0 }),
  api: context => ({
    setSize: (width: number, height: number) => context.store.set({ width, height }),
  }),
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'data-width': String(state.width),
        'data-height': String(state.height),
      }),
      bind: (el, part) => {
        const observer = new ResizeObserver(entries => {
          const box = entries[0]?.contentRect;
          if (!box) return;
          const width = Math.round(box.width);
          const height = Math.round(box.height);
          const current = part.store.get();
          if (current.width === width && current.height === height) return;
          part.api.setSize(width, height);
          el.dispatchEvent(
            new CustomEvent('thx-resize', { detail: { width, height }, bubbles: true })
          );
        });
        observer.observe(el);
        return () => observer.disconnect();
      },
    }),
  }),
});

const mutationObserver = definePrimitive({
  name: 'thx-mutation-observer',
  state: () => ({ count: 0 }),
  api: context => ({
    note: () => context.store.set({ count: context.store.get().count + 1 }),
  }),
  slots: slot => ({
    root: slot({
      attrs: state => ({ 'data-count': String(state.count) }),
      bind: (el, part) => {
        const observer = new MutationObserver(records => {
          part.api.note();
          el.dispatchEvent(
            new CustomEvent('thx-mutation', {
              detail: { count: part.store.get().count, records: records.length },
              bubbles: true,
            })
          );
        });
        observer.observe(el, { childList: true, subtree: true, attributes: true });
        return () => observer.disconnect();
      },
    }),
  }),
});

export { mutationObserver, resizeObserver };
