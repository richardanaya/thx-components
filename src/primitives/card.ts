import { definePrimitive } from '@ui-sdk/core';

const card = definePrimitive({
  name: 'thx-card',
  options: { label: 'string' },
  state: (options: { label?: string }) => ({ label: options.label ?? '' }),
  sync: options => (options.label === undefined ? {} : { label: options.label }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'data-label': state.label || undefined,
      }),
    }),
    label: slot({}),
    body: slot({}),
  }),
});

export { card };
