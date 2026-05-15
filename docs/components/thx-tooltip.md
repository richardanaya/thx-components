# thx-tooltip

**THX 1138 styled clinical tooltip with phosphor glow.**

A lightweight, accessible tooltip that appears on hover or focus with configurable placement, delay, warning/error variants, optional label prefix, and full CRT scanline texture. Supports both plain text and rich HTML content via slot or attribute. The canonical way to provide contextual help, data values, or status explanations without cluttering the primary interface.

## Import

```js
import 'thx-components/src/components/thx-tooltip.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-tooltip content="System is operating within nominal parameters.">
  <thx-icon name="info" color="primary"></thx-icon>
</thx-tooltip>
```

## Advanced Usage

### With Label Prefix and Placement

```html
<thx-tooltip 
  label="CPU" 
  content="Core temperature: 47°C" 
  placement="bottom" 
  variant="warning">
  <span>47°C</span>
</thx-tooltip>
```

### Rich Content via Slot

```html
<thx-tooltip placement="right">
  <thx-badge variant="error">CRITICAL</thx-badge>
  <div slot="content">
    <strong>OVERRIDE ACTIVE</strong><br>
    Manual intervention required in Sector 9.
  </div>
</thx-tooltip>
```

### Programmatic Control

```js
const tip = document.querySelector('thx-tooltip');
tip.show();
tip.hide();
```

### Disabled / Non-intrusive Mode

```html
<thx-tooltip content="..." disabled>
  <button>...</button>
</thx-tooltip>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `content` | `string` | — | Tooltip text (used when no `content` slot). |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to the trigger. |
| `variant` | `'default' \| 'warning' \| 'error'` | `'default'` | Color treatment (phosphor blue, amber, or red). |
| `delay` | `number` (ms) | `100` | Show delay on hover/focus. |
| `disabled` | `boolean` | `false` | Prevents the tooltip from appearing. |
| `html` | `boolean` | `false` | Treats `content` as raw HTML (use with caution). |
| `label` | `string` | — | Optional dimmed prefix rendered before the value (e.g. "CPU:"). |

## Slots

- default: The trigger element (icon, badge, text, button, etc.). Receives `aria-describedby`.
- `content`: Rich tooltip body (overrides or supplements the `content` attribute).

## Events

- `toggle` — bubbles when the tooltip is shown or hidden.

## Accessibility

- Trigger receives `aria-describedby` pointing to the tooltip.
- Tooltip itself has `role="tooltip"` and `aria-hidden` when closed.
- Fully keyboard accessible (focus on trigger shows the tooltip).
- The component manages show/hide timeouts cleanly on disconnect.
- When using `html` content, ensure it remains accessible (proper headings, contrast, etc.).

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#overlays-and-tooltips).

- **CRT scanline**: Subtle static scanline overlay via `crtStaticScanlineOverlay` on the tooltip surface.
- **Arrow**: CSS-rotated square that matches the border and background of the tooltip bubble.
- **Label + value styling**: The `label` is rendered in secondary gray; the main value or slotted content uses primary/tertiary for emphasis.
- **Variants**: Warning and error change both border/glow and arrow colors to amber or red — consistent with status language elsewhere.
- **AI-friendly**: `<thx-tooltip content="..." placement="bottom"><thx-icon name="help"></thx-icon></thx-tooltip>` is the minimal pattern for contextual help that matches the entire THX aesthetic.
- **Delay**: Short 100ms default prevents accidental popups while remaining responsive.
- **Max width**: 300px with normal wrapping for longer explanations.

## Related Components

- [thx-icon](./thx-icon.md)
- [thx-badge](./thx-badge.md)
- [thx-visually-hidden](./thx-visually-hidden.md)
- [thx-popup](./thx-popup.md) — for more complex floating panels
- [thx-menu-item](./thx-menu-item.md) — tooltips often accompany menu rows
