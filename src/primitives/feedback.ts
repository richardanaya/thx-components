import { createChange, css, definePrimitive, type ChangeDetails } from '@ui-sdk/core';

type OpenOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: ChangeDetails<'dismiss'>) => void;
};

const alert = definePrimitive({
  name: 'thx-alert',
  options: {
    open: 'boolean',
    defaultOpen: 'boolean',
    onOpenChange: 'callback',
    variant: 'string',
  },
  controlled: ['open'],
  state: (options: OpenOptions & { variant?: string }) => ({
    open: options.open ?? options.defaultOpen ?? true,
    variant: options.variant ?? 'info',
  }),
  sync: options => ({
    ...(options.open === undefined ? {} : { open: options.open }),
    ...(options.variant === undefined ? {} : { variant: options.variant }),
  }),
  agent: { actions: ['dismiss'] },
  api: context => {
    const change = createChange(context);
    return {
      dismiss: (event?: Event) => change('open', false, { reason: 'dismiss', event }),
    };
  },
  slots: slot => ({
    root: slot({
      role: state => (state.variant === 'error' ? 'alert' : 'status'),
      roles: ['alert', 'status'],
      attrs: state => ({
        'data-variant': state.variant,
        hidden: state.open ? undefined : '',
      }),
    }),
    dismiss: slot({
      attrs: () => ({ type: 'button' }),
      press: ({ api }, event) => api.dismiss(event),
    }),
  }),
});

const badge = definePrimitive({
  name: 'thx-badge',
  options: { variant: 'string', pulse: 'boolean' },
  state: (options: { variant?: string; pulse?: boolean }) => ({
    variant: options.variant ?? 'neutral',
    pulse: options.pulse ?? false,
  }),
  sync: options => ({
    ...(options.variant === undefined ? {} : { variant: options.variant }),
    ...(options.pulse === undefined ? {} : { pulse: options.pulse }),
  }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'data-variant': state.variant,
        'data-pulse': state.pulse ? '' : undefined,
      }),
    }),
  }),
});

type TagOptions = {
  removed?: boolean;
  defaultRemoved?: boolean;
  onRemovedChange?: (removed: boolean, details: ChangeDetails<'dismiss'>) => void;
};

const tag = definePrimitive({
  name: 'thx-tag',
  options: {
    removed: 'boolean',
    defaultRemoved: 'boolean',
    onRemovedChange: 'callback',
  },
  controlled: ['removed'],
  state: (options: TagOptions) => ({
    removed: options.removed ?? options.defaultRemoved ?? false,
  }),
  sync: options => (options.removed === undefined ? {} : { removed: options.removed }),
  agent: { actions: ['remove'] },
  api: context => {
    const change = createChange(context);
    return {
      remove: (event?: Event) => change('removed', true, { reason: 'dismiss', event }),
    };
  },
  slots: slot => ({
    root: slot({
      attrs: state => ({
        hidden: state.removed ? '' : undefined,
      }),
    }),
    remove: slot({
      attrs: () => ({ type: 'button' }),
      press: ({ api }, event) => api.remove(event),
    }),
  }),
});

const spinner = definePrimitive({
  name: 'thx-spinner',
  options: { label: 'string' },
  state: (options: { label?: string }) => ({ label: options.label ?? 'Loading' }),
  sync: options => (options.label === undefined ? {} : { label: options.label }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      role: 'status',
      attrs: state => ({ 'aria-label': state.label }),
    }),
  }),
});

const skeleton = definePrimitive({
  name: 'thx-skeleton',
  options: { label: 'string' },
  state: (options: { label?: string }) => ({ label: options.label ?? 'Loading' }),
  sync: options => (options.label === undefined ? {} : { label: options.label }),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'aria-busy': 'true',
        'aria-label': state.label,
      }),
    }),
  }),
});

const visuallyHidden = definePrimitive({
  name: 'thx-visually-hidden',
  state: () => ({}),
  api: () => ({}),
  slots: slot => ({
    root: slot({
      attrs: () => ({
        style: css({
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          border: '0',
        }),
      }),
    }),
  }),
});

type PresenceOptions = {
  name?: string;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean, details: ChangeDetails<'imperative'>) => void;
};

const presence = definePrimitive({
  name: 'thx-presence',
  options: {
    name: 'string',
    active: 'boolean',
    defaultActive: 'boolean',
    onActiveChange: 'callback',
  },
  controlled: ['active'],
  state: (options: PresenceOptions) => ({
    name: options.name ?? 'fade',
    active: options.active ?? options.defaultActive ?? true,
  }),
  sync: options => ({
    ...(options.name === undefined ? {} : { name: options.name }),
    ...(options.active === undefined ? {} : { active: options.active }),
  }),
  agent: { actions: ['setActive'] },
  api: context => {
    const change = createChange(context);
    return {
      setActive: (active: boolean, event?: Event) =>
        change('active', active, { reason: 'imperative', event }),
    };
  },
  slots: slot => ({
    root: slot({
      attrs: state => ({
        'data-animation': state.name,
        'data-active': state.active ? '' : undefined,
      }),
    }),
  }),
});

export { alert, badge, presence, skeleton, spinner, tag, visuallyHidden };
