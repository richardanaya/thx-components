import type { HTMLAttributes, Ref } from 'react';

export type PartProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
  variant?: string;
  label?: string;
  value?: string | number;
  name?: string;
  channels?: string;
  status?: string;
  modal?: string;
  'default-value'?: string;
  'default-open'?: boolean;
  'default-checked'?: boolean;
  'data-variant'?: string;
  'data-mark'?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'thx-alert': PartProps;
      'thx-badge': PartProps;
      'thx-crt': PartProps;
      'thx-crt-label': PartProps;
      'thx-crt-screen': PartProps;
      'thx-format-bytes': PartProps;
      'thx-format-number': PartProps;
      'thx-led': PartProps;
      'thx-leds': PartProps;
      'thx-scope-bar': PartProps;
      'thx-scope-gauge': PartProps;
      'thx-scope-line': PartProps;
      'thx-scope-monitors': PartProps;
      'ui-avatar': PartProps;
      'ui-avatar-fallback': PartProps;
      'ui-button': PartProps;
      'ui-dialog': PartProps;
      'ui-dialog-backdrop': PartProps;
      'ui-dialog-close': PartProps;
      'ui-dialog-content': PartProps;
      'ui-dialog-description': PartProps;
      'ui-dialog-title': PartProps;
      'ui-field': PartProps;
      'ui-field-description': PartProps;
      'ui-field-label': PartProps;
      'ui-input': PartProps;
      'ui-meter': PartProps;
      'ui-meter-indicator': PartProps;
      'ui-meter-label': PartProps;
      'ui-meter-track': PartProps;
      'ui-meter-value': PartProps;
      'ui-progress': PartProps;
      'ui-progress-indicator': PartProps;
      'ui-progress-label': PartProps;
      'ui-progress-track': PartProps;
      'ui-progress-value': PartProps;
      'ui-slider': PartProps;
      'ui-slider-control': PartProps;
      'ui-slider-indicator': PartProps;
      'ui-slider-thumb': PartProps;
      'ui-slider-track': PartProps;
      'ui-slider-value': PartProps;
      'ui-switch': PartProps;
      'ui-switch-thumb': PartProps;
      'ui-tabs': PartProps;
      'ui-tabs-list': PartProps;
      'ui-tabs-panel': PartProps;
      'ui-tabs-tab': PartProps;
      'ui-textarea': PartProps;
    }
  }
}
