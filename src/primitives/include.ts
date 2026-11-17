import { definePrimitive } from '@ui-sdk/core';

type IncludeMode = 'text' | 'html';

function allowedSource(src: string): boolean {
  if (!src || src.startsWith('javascript:') || src.startsWith('data:')) return false;
  try {
    const url = new URL(src, window.location.href);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const include = definePrimitive({
  name: 'thx-include',
  options: { src: 'string', mode: 'string' },
  state: (options: { src?: string; mode?: string }) => ({
    src: options.src ?? '',
    mode: (options.mode === 'html' ? 'html' : 'text') as IncludeMode,
    status: 'idle' as 'idle' | 'loading' | 'ready' | 'error',
  }),
  sync: options => ({
    ...(options.src === undefined ? {} : { src: options.src }),
    ...(options.mode === undefined
      ? {}
      : { mode: (options.mode === 'html' ? 'html' : 'text') as IncludeMode }),
  }),
  api: context => ({
    async load() {
      const { src, mode } = context.store.get();
      if (!allowedSource(src)) {
        context.store.set({ status: 'error' });
        return;
      }
      context.store.set({ status: 'loading' });
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(String(response.status));
        const body = await response.text();
        const host = context.element('root');
        if (host) {
          if (mode === 'html') host.innerHTML = body;
          else host.textContent = body;
        }
        context.store.set({ status: 'ready' });
      } catch {
        context.store.set({ status: 'error' });
      }
    },
  }),
  slots: slot => ({
    root: slot({
      attrs: state => ({ 'data-status': state.status }),
      bind: (_el, part) => {
        void part.api.load();
        return part.store.subscribe(() => {
          const status = part.store.get().status;
          if (status === 'idle') void part.api.load();
        });
      },
    }),
  }),
});

export { include };
