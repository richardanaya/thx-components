import { createRovingFocus, definePrimitive } from '@ui-sdk/core';

type CrumbProps = { value: string; current?: boolean };

const breadcrumb = definePrimitive({
  name: 'thx-breadcrumb',
  state: () => ({ focused: null as string | null }),
  api: context => {
    const roving = createRovingFocus(context, {
      slot: 'item',
      key: 'focused',
      orientation: () => 'horizontal',
      loop: () => true,
      claims: (_state, item) => item.key === '1' || Boolean((item.props as CrumbProps).current),
    });
    return {
      roving,
      keydown(event: KeyboardEvent, el: HTMLElement) {
        roving.keydown(event, el);
      },
    };
  },
  slots: slot => ({
    root: slot({
      role: 'navigation',
    }),
    item: slot<CrumbProps>({
      props: { value: 'string', current: 'boolean' },
      attrs: (state, part) => ({
        tabindex: part.api.roving.tabIndex(state, part),
        'aria-current': part.props.current ? 'page' : undefined,
      }),
      on: {
        keydown: (event, { el, api }) => {
          if (el) api.keydown(event, el);
        },
      },
      bind: (el, part) => part.api.roving.bind(el, part),
    }),
    separator: slot({
      attrs: () => ({ 'aria-hidden': 'true' }),
    }),
  }),
});

export { breadcrumb };
