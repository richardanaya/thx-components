import { definePrimitive } from '@ui-sdk/core';

type CopyOptions = { text?: string; timeout?: number };

const copyButton = definePrimitive({
  name: 'thx-copy-button',
  options: { text: 'string', timeout: 'number' },
  state: (_options: CopyOptions) => ({ copied: false, error: '' }),
  agent: { actions: ['copy'] },
  api: context => {
    let timer = 0;
    context.onDestroy(() => window.clearTimeout(timer));
    return {
      isCopied: () => context.store.get().copied,
      copy: async () => {
        const text = context.options().text ?? '';
        try {
          await navigator.clipboard.writeText(text);
          context.store.set({ copied: true, error: '' });
          window.clearTimeout(timer);
          const timeout = context.options().timeout ?? 2000;
          timer = window.setTimeout(() => {
            context.store.set({ copied: false, error: '' });
          }, timeout);
        } catch {
          context.store.set({ copied: false, error: 'failed' });
        }
      },
    };
  },
  slots: slot => ({
    root: slot({
      attrs: state => ({
        type: 'button',
        'data-copied': state.copied ? '' : undefined,
        'data-error': state.error ? '' : undefined,
        'aria-live': 'polite',
      }),
      press: ({ api }) => {
        void api.copy();
      },
    }),
  }),
});

export { copyButton };
