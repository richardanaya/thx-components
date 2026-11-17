import { definePrimitive } from '@ui-sdk/core';

const LEDS = ['ok', 'warn', 'error', 'off'] as const;
type LedStatus = (typeof LEDS)[number];

function statusOf(value: string | undefined): LedStatus {
  return LEDS.includes(value as LedStatus) ? (value as LedStatus) : 'off';
}

const leds = definePrimitive({
  name: 'thx-leds',
  options: { label: 'string' },
  state: (options: { label?: string }) => ({ label: options.label ?? 'Status' }),
  sync: options => (options.label === undefined ? {} : { label: options.label }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      role: 'group',
      attrs: state => ({ 'aria-label': state.label }),
    }),
    led: slot<{ status?: string }>({
      props: { status: 'string' },
      role: 'img',
      attrs: (_state, part) => {
        const status = statusOf(part.props.status);
        return {
          'data-status': status,
          'aria-label': status,
        };
      },
    }),
  }),
});

export { leds };
