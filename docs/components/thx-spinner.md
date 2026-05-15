# thx-spinner

**THX 1138 styled loading spinner with multiple visual styles.**

A compact, highly configurable loading indicator offering circle (SVG), dots, bars, and pulse animations in default, CRT phosphor, warning, and error color treatments. Used inside buttons during async actions, in panels while data loads, and as standalone status indicators. Fully accessible with `role="status"`.

## Import

```js
import 'thx-components/src/components/thx-spinner.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-spinner size="md" variant="crt"></thx-spinner>
<thx-spinner spinner-style="dots" size="sm"></thx-spinner>
<thx-spinner spinner-style="bars" variant="warning"></thx-spinner>
```

## Advanced Usage

### Inside Buttons (loading state)

```html
<thx-button loading>
  <thx-spinner size="sm" slot="prefix" variant="crt"></thx-spinner>
  PROCESSING DIRECTIVE
</thx-button>
```

### CRT Instrument Panel Status

```html
<div class="status-row">
  <thx-spinner size="lg" variant="crt" spinner-style="pulse"></thx-spinner>
  <span>SYNCHRONIZING...</span>
</div>
```

### Error / Warning States

```html
<thx-spinner variant="error" spinner-style="circle"></thx-spinner>
<thx-spinner variant="warning" spinner-style="dots"></thx-spinner>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` (reflects) | `'md'` | Overall dimensions of the spinner. |
| `variant` | `'default' \| 'crt' \| 'warning' \| 'error'` (reflects) | `'default'` | Color family. `crt` applies phosphor blue + glow. |
| `spinner-style` | `'circle' \| 'dots' \| 'bars' \| 'pulse'` (attribute) | `'circle'` | Visual animation pattern. |

## Slots

None. Purely presentational.

## Accessibility

- The root element has `role="status"` and `aria-label="Loading"`.
- All inner graphics are marked appropriately (`aria-hidden` on decorative SVG).
- When used inside a button, the button itself should also carry `aria-busy="true"`.
- Color variants (warning/error) are paired with visible text or badge context.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#loading-states-and-skeletons).

- **Circle**: Rotating dashed SVG stroke. CRT version receives primary color + drop-shadow glow.
- **Dots**: Three staggered scaling dots — classic "ellipsis" feel with modern timing.
- **Bars**: Vertical bars with scaleY animation — reminiscent of audio meters or signal strength.
- **Pulse**: Two overlapping expanding circles (or squares) with staggered timing — soft breathing effect.
- **CRT treatment**: Primary color + soft phosphor glow on all styles. Perfect inside dark monitor surfaces.
- **AI-friendly**: `<thx-spinner variant="crt" size="sm">` inside any async control gives instant, on-brand loading affordance.
- **Sizing**: Consistent `--size-*` scale so spinners align perfectly with icons, text, and button labels.
- **Button integration**: The `thx-button` and `thx-copy-button` families internally use this component during their loading phase.

## Related Components

- [thx-button](./thx-button.md)
- [thx-icon-button](./thx-icon-button.md)
- [thx-copy-button](./thx-copy-button.md)
- [thx-skeleton](./thx-skeleton.md)
- [thx-progress-bar](./thx-progress-bar.md) and [thx-progress-ring](./thx-progress-ring.md)
- [thx-status-leds](./thx-status-leds.md)
