import { bindDrag, createChange, css, definePrimitive, type ChangeDetails } from '@ui-sdk/core';
import { clamp } from '../format.js';

type ComparerOptions = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number, details: ChangeDetails<'drag' | 'keyboard'>) => void;
};

const comparer = definePrimitive({
  name: 'thx-comparer',
  options: {
    value: 'number',
    defaultValue: 'number',
    onValueChange: 'callback',
  },
  controlled: ['value'],
  state: (options: ComparerOptions) => ({
    value: options.value ?? options.defaultValue ?? 50,
  }),
  sync: options => (options.value === undefined ? {} : { value: options.value }),
  commits: ['value'],
  agent: { actions: ['setValue'] },
  api: context => {
    const change = createChange(context);
    return {
      getValue: () => context.store.get().value,
      setValue: (value: number, event?: Event, reason: 'drag' | 'keyboard' = 'drag') =>
        change('value', clamp(value, 0, 100), { reason, event }),
    };
  },
  slots: slot => ({
    root: slot({
      attrs: state => ({
        style: css({ '--thx-split': `${state.value}%` }),
      }),
    }),
    before: slot({}),
    after: slot({}),
    handle: slot({
      attrs: state => ({
        type: 'button',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuenow': String(Math.round(state.value)),
        'aria-orientation': 'horizontal',
      }),
      on: {
        pointerdown: (event, { el, api }) => {
          const host = el?.closest("[data-slot='thx-comparer']");
          if (!el || !(host instanceof HTMLElement)) return;
          bindDrag(el, event, {
            onMove: ({ x }) => {
              const rect = host.getBoundingClientRect();
              const next = ((x - rect.left) / rect.width) * 100;
              api.setValue(next, event, 'drag');
            },
            onEnd: () => {},
          });
        },
        keydown: (event, { api }) => {
          const current = api.getValue();
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            api.setValue(current + 5, event, 'keyboard');
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            api.setValue(current - 5, event, 'keyboard');
          } else if (event.key === 'Home') {
            event.preventDefault();
            api.setValue(0, event, 'keyboard');
          } else if (event.key === 'End') {
            event.preventDefault();
            api.setValue(100, event, 'keyboard');
          }
        },
      },
    }),
  }),
});

export { comparer };
