# thx-progress-bar

**THX 1138 styled linear progress bar with CRT variants.**

`<thx-progress-bar>` is a linear progress indicator styled as a piece of precision laboratory or process-control equipment. It supports four visual variants (including a full CRT treatment), indeterminate "processing" mode, optional label + value display, and proper ARIA semantics for accessibility.

## Instrument & Control Aesthetic

Progress bars in THX are never decorative — they represent real machine state:

- Default: institutional gray track with dark fill.
- **crt** variant: dark phosphor track, glowing blue fill, and subtle horizontal scanline texture via the centralized `crtStaticScanlineOverlay`.
- Warning and error states use amber and critical orange fills respectively.
- All variants include a fine repeating scanline texture on the fill for that "illuminated display" feel.
- Labels and percentages use strict uppercase mono typography with wide letter-spacing.

## Variants

| Variant   | Track                  | Fill                          | Use Case                     |
|-----------|------------------------|-------------------------------|------------------------------|
| `default` | Light gray             | Dark gray gradient            | General UI on light surfaces |
| `crt`     | Phosphor blue tint + inset shadow | Bright phosphor blue + glow + scanlines | Monitor panels, dashboards   |
| `warning` | Light gray             | Amber gradient                | Caution / approaching limit  |
| `error`   | Light gray             | Critical orange-red           | Fault / failure state        |

The `crt` variant also tints the label and value text to phosphor blue with a soft glow.

## Properties

| Property      | Type    | Default   | Description |
|---------------|---------|-----------|-------------|
| `value`       | number  | `0`       | Current progress (0–100 range recommended) |
| `max`         | number  | `100`     | Upper bound |
| `variant`     | string  | `"default"` | `"default" \| "crt" \| "warning" \| "error"` |
| `indeterminate`| boolean | `false`   | Shows animated "processing" state |
| `label`       | string  | `""`      | Optional uppercase label above the track |
| `showValue`   | boolean | `false`   | Show percentage (or "PROCESSING...") on the right |

All properties (except some reflected) are reactive.

## ARIA Accessibility (Critical)

The root element always carries proper progressbar semantics:

```html
<div role="progressbar"
     aria-valuenow="67"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-label="Processing">
```

- When `indeterminate`, `aria-valuenow` is omitted.
- `aria-label` falls back to `"Progress"` or uses your `label`.
- This makes the component fully usable with screen readers and assistive tech.

## Indeterminate Mode

```html
<thx-progress-bar indeterminate label="SYNCING TELEMETRY" variant="crt"></thx-progress-bar>
```

Renders a 40%-wide block that slides back and forth. The animation (`indeterminate` keyframe) is a simple translate; the design tokens ensure it respects reduced motion.

When indeterminate, the value text shows `PROCESSING...` (uppercase mono).

## Centralized CRT Effects

The `crt` variant imports and applies:

```js
import { crtStaticScanlineOverlay } from '../styles/crt-effects.js';
```

Applied specifically to the track:

```css
${crtStaticScanlineOverlay('.progress--crt .progress__track', { opacity: 0.05, z: 2 })}
```

This gives the track a convincing illuminated CRT surface without moving scanlines (performance + reduced-motion friendly).

## Control-Room & Dashboard Examples

### Basic Telemetry Progress (CRT style)

```html
<thx-crt-display label="PROCESSING QUEUE">
  <thx-progress-bar
    value="74"
    label="BATCH 1138"
    show-value
    variant="crt">
  </thx-progress-bar>
</thx-crt-display>
```

### Warning / Error Escalation

```html
<thx-progress-bar value="85" variant="warning" label="THERMAL LOAD"></thx-progress-bar>
<thx-progress-bar value="100" variant="error" label="CORE INTEGRITY"></thx-progress-bar>
```

### Indeterminate in Command Dialog

```html
<thx-progress-bar
  indeterminate
  label="EXECUTING DIRECTIVE"
  variant="crt"
  show-value>
</thx-progress-bar>
```

Common in ultradashboard forms and action panels.

### Dense Dashboard Row

Multiple progress bars side-by-side inside a single CRT frame for simultaneous process monitoring.

## Reduced-Motion Support

- The determinate width transition uses the design system's `--duration-moderate-2` token (shortened or disabled on `prefers-reduced-motion`).
- Indeterminate sliding animation is also governed by the same token system.
- The CRT scanline overlay is a static background gradient — zero motion.

## Styling Notes

- Track height is fixed at `--size-2` (very thin, instrument-like).
- Fill always has a subtle vertical scanline texture.
- On `crt` variant, the header label/value receive phosphor coloring + glow.
- Works on both light institutional surfaces and inside dark CRT containers.

## Best Practices

- Always provide a `label` for context (screen readers + visual clarity).
- Use `show-value` when the exact percentage matters to the operator.
- Reserve `warning`/`error` for states that require attention; don't use them for normal progress.
- For the strongest instrument aesthetic, wrap `variant="crt"` instances inside `<thx-crt-display>`.

`thx-progress-bar` brings the same clinical, phosphor-lit seriousness to linear progress that the gauges and charts bring to radial and waveform data. Combined with ARIA and the centralized CRT texture system, it is ready for production command interfaces.