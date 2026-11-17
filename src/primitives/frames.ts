import { createChange, definePrimitive, elements, type ChangeDetails } from '@ui-sdk/core';

function reducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

type FrameOptions = {
  index?: number;
  defaultIndex?: number;
  interval?: number;
  onIndexChange?: (index: number, details: ChangeDetails<'timer' | 'imperative'>) => void;
};

const frames = definePrimitive({
  name: 'thx-frames',
  options: {
    index: 'number',
    defaultIndex: 'number',
    interval: 'number',
    onIndexChange: 'callback',
  },
  controlled: ['index'],
  state: (options: FrameOptions) => ({
    index: options.index ?? options.defaultIndex ?? 0,
    interval: options.interval ?? 700,
  }),
  sync: options => ({
    ...(options.index === undefined ? {} : { index: options.index }),
    ...(options.interval === undefined ? {} : { interval: options.interval }),
  }),
  agent: { actions: ['setIndex'] },
  api: context => {
    const change = createChange(context);
    return {
      getIndex: () => context.store.get().index,
      setIndex: (index: number, event?: Event) =>
        change('index', index, { reason: 'imperative', event }),
      advance: () => {
        const count = elements<{ value: string }>(context, 'frame').length;
        if (count === 0) return;
        const next = (context.store.get().index + 1) % count;
        change('index', next, { reason: 'timer' });
      },
    };
  },
  slots: slot => ({
    root: slot({
      bind: (_el, part) => {
        if (reducedMotion()) return;
        const timer = window.setInterval(() => part.api.advance(), part.store.get().interval);
        return () => window.clearInterval(timer);
      },
    }),
    frame: slot<{ value: string }>({
      props: { value: 'string' },
      present: (state, part) => Number(part.key) === state.index,
    }),
  }),
});

export { frames };
