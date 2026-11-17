import { definePrimitive } from '@ui-sdk/core';

type CrtOptions = { variant?: string; label?: string };

const crt = definePrimitive({
  name: 'thx-crt',
  options: { variant: 'string', label: 'string' },
  state: (options: CrtOptions) => ({
    variant: options.variant ?? 'monitor',
    label: options.label ?? '',
  }),
  sync: options => ({
    ...(options.variant === undefined ? {} : { variant: options.variant }),
    ...(options.label === undefined ? {} : { label: options.label }),
  }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'data-variant': state.variant,
      }),
    }),
    label: slot({}),
    screen: slot({}),
  }),
});

export { crt };
