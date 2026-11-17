import {
  createChange,
  definePrimitive,
  type ChangeDetails,
  type PrimitiveContext,
} from '@ui-sdk/core';
import { parseChannels, parseNumbers, type ScopeChannel } from '../format.js';
import { paintBars, paintGauge, paintLine, paintMonitors } from '../scope-draw.js';

type SeriesOptions = {
  value?: number[];
  defaultValue?: number[];
  secondary?: number[];
  min?: number;
  max?: number;
  label?: string;
  onValueChange?: (value: number[], details: ChangeDetails<'imperative'>) => void;
};

function seriesState(options: SeriesOptions) {
  return {
    value: options.value ?? options.defaultValue ?? [],
    secondary: options.secondary ?? [],
    min: options.min ?? 0,
    max: options.max ?? 100,
    label: options.label ?? 'Signal',
  };
}

function seriesSync(options: SeriesOptions) {
  return {
    ...(options.value === undefined ? {} : { value: options.value }),
    ...(options.secondary === undefined ? {} : { secondary: options.secondary }),
    ...(options.min === undefined ? {} : { min: options.min }),
    ...(options.max === undefined ? {} : { max: options.max }),
    ...(options.label === undefined ? {} : { label: options.label }),
  };
}

type SeriesState = ReturnType<typeof seriesState>;

const numberList = (attribute: string | null) => parseNumbers(attribute ?? undefined);

const seriesOptions = {
  value: numberList,
  defaultValue: numberList,
  secondary: numberList,
  min: 'number' as const,
  max: 'number' as const,
  label: 'string' as const,
  onValueChange: 'callback' as const,
};

function seriesApi(
  context: PrimitiveContext<SeriesOptions, SeriesState, 'root'>,
  paint: (canvas: HTMLCanvasElement, state: SeriesState) => void
) {
  const change = createChange(context);
  let canvas: HTMLCanvasElement | null = null;
  const draw = () => {
    if (canvas) paint(canvas, context.store.get());
  };
  return {
    getValue: () => context.store.get().value,
    setValue: (value: number[], event?: Event) =>
      change('value', value, { reason: 'imperative', event }),
    bindPlot: (host: HTMLElement, subscribe: (listener: () => void) => () => void) => {
      canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      host.append(canvas);
      const stop = subscribe(draw);
      const observer = new ResizeObserver(draw);
      observer.observe(host);
      draw();
      return () => {
        stop();
        observer.disconnect();
        canvas?.remove();
        canvas = null;
      };
    },
  };
}

const scopeLine = definePrimitive({
  name: 'thx-scope-line',
  options: seriesOptions,
  controlled: ['value'],
  state: seriesState,
  sync: seriesSync,
  agent: { actions: ['setValue'] },
  api: context =>
    seriesApi(context, (canvas, state) =>
      paintLine(canvas, state.value, state.secondary, state.min, state.max)
    ),
  slots: slot => ({
    root: slot({
      role: 'img',
      attrs: state => ({
        'aria-label': `${state.label}: ${state.value.join(', ')}`,
      }),
      bind: (el, part) => part.api.bindPlot(el, listener => part.store.subscribe(listener)),
    }),
  }),
});

const scopeBar = definePrimitive({
  name: 'thx-scope-bar',
  options: seriesOptions,
  controlled: ['value'],
  state: seriesState,
  sync: seriesSync,
  agent: { actions: ['setValue'] },
  api: context =>
    seriesApi(context, (canvas, state) => paintBars(canvas, state.value, state.min, state.max)),
  slots: slot => ({
    root: slot({
      role: 'img',
      attrs: state => ({
        'aria-label': `${state.label}: ${state.value.join(', ')}`,
      }),
      bind: (el, part) => part.api.bindPlot(el, listener => part.store.subscribe(listener)),
    }),
  }),
});

type GaugeOptions = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  label?: string;
  onValueChange?: (value: number, details: ChangeDetails<'imperative'>) => void;
};

const scopeGauge = definePrimitive({
  name: 'thx-scope-gauge',
  options: {
    value: 'number',
    defaultValue: 'number',
    min: 'number',
    max: 'number',
    label: 'string',
    onValueChange: 'callback',
  },
  controlled: ['value'],
  state: (options: GaugeOptions) => ({
    value: options.value ?? options.defaultValue ?? 0,
    min: options.min ?? 0,
    max: options.max ?? 100,
    label: options.label ?? 'Gauge',
  }),
  sync: options => ({
    ...(options.value === undefined ? {} : { value: options.value }),
    ...(options.min === undefined ? {} : { min: options.min }),
    ...(options.max === undefined ? {} : { max: options.max }),
    ...(options.label === undefined ? {} : { label: options.label }),
  }),
  agent: { actions: ['setValue'] },
  api: context => {
    const change = createChange(context);
    let canvas: HTMLCanvasElement | null = null;
    const draw = () => {
      const state = context.store.get();
      if (canvas) paintGauge(canvas, state.value, state.min, state.max);
    };
    return {
      getValue: () => context.store.get().value,
      setValue: (value: number, event?: Event) =>
        change('value', value, { reason: 'imperative', event }),
      bindPlot: (host: HTMLElement, subscribe: (listener: () => void) => () => void) => {
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        host.append(canvas);
        const stop = subscribe(draw);
        const observer = new ResizeObserver(draw);
        observer.observe(host);
        draw();
        return () => {
          stop();
          observer.disconnect();
          canvas?.remove();
          canvas = null;
        };
      },
    };
  },
  slots: slot => ({
    root: slot({
      role: 'img',
      attrs: state => ({ 'aria-label': `${state.label}: ${state.value}` }),
      bind: (el, part) => part.api.bindPlot(el, listener => part.store.subscribe(listener)),
    }),
  }),
});

type MonitorOptions = { channels?: string; label?: string };

const scopeMonitors = definePrimitive({
  name: 'thx-scope-monitors',
  options: { channels: 'string', label: 'string' },
  state: (options: MonitorOptions) => ({
    channels: parseChannels(options.channels) as ScopeChannel[],
    label: options.label ?? 'Monitors',
  }),
  sync: options => ({
    ...(options.channels === undefined ? {} : { channels: parseChannels(options.channels) }),
    ...(options.label === undefined ? {} : { label: options.label }),
  }),
  api: context => {
    let canvas: HTMLCanvasElement | null = null;
    const draw = () => {
      if (canvas) paintMonitors(canvas, context.store.get().channels);
    };
    return {
      bindPlot: (host: HTMLElement, subscribe: (listener: () => void) => () => void) => {
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        host.append(canvas);
        const stop = subscribe(draw);
        const observer = new ResizeObserver(draw);
        observer.observe(host);
        draw();
        return () => {
          stop();
          observer.disconnect();
          canvas?.remove();
          canvas = null;
        };
      },
    };
  },
  slots: slot => ({
    root: slot({
      role: 'img',
      attrs: state => ({
        'aria-label': `${state.label}: ${state.channels.map(channel => channel.name).join(', ')}`,
      }),
      bind: (el, part) => part.api.bindPlot(el, listener => part.store.subscribe(listener)),
    }),
  }),
});

export { scopeBar, scopeGauge, scopeLine, scopeMonitors };
