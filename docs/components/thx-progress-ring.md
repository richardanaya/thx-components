# thx-progress-ring

**THX 1138 styled circular progress ring (SVG).**

`<thx-progress-ring>` is the circular counterpart to the linear progress bar. It renders a compact SVG ring (default 48 px) with track, glowing fill arc, optional centered value, four visual variants, and full ARIA progress semantics. Perfect for dense instrument clusters where space is limited but status must remain instantly readable.

## Circular Instrument Aesthetic

- Thin square-ended stroke (not rounded) for mechanical precision.
- Phosphor blue or amber fill with `drop-shadow` glow.
- Track is low-opacity phosphor on CRT variant.
- Centered mono numeric value (or `...` in indeterminate).
- Subtle static scanline texture on the CRT variant via centralized helper.
- Automatic warning/amber state is controlled by the `variant` attribute (no auto-threshold like the gauge).

The ring is designed to sit alongside `thx-chart-gauge` elements in sensor grids.

## Properties

| Property      | Type    | Default | Description |
|---------------|---------|---------|-------------|
| `value`       | number  | `0`     | Progress 0–100 |
| `size`        | number  | `48`    | Diameter in pixels |
| `stroke`      | number  | `4`     | Stroke width in pixels |
| `variant`     | string  | `"default"` | `"default" \| "crt" \| "warning" \| "error"` |
| `indeterminate`| boolean | `false` | Spinning indeterminate mode |
| `showValue`   | boolean | `false` | Display numeric value in the center |

`size` and `stroke` allow scaling from tiny status dots to larger dashboard dials.

## Variants

- **default**: Light track, dark gray fill.
- **crt**: Phosphor-tinted track (`rgba(166,200,225,0.2)`), bright blue glowing fill, text-shadow on value.
- **warning**: Amber fill.
- **error**: Critical orange-red fill.

The `crt` variant applies `crtStaticScanlineOverlay` to the host with a `border-radius: round` clip so the scanlines follow the circular shape.

## Indeterminate Mode

```html
<thx-progress-ring indeterminate size="64" stroke="5" variant="crt" show-value></thx-progress-ring>
```

The fill uses a fixed dasharray and rotates continuously. Animation respects reduced-motion tokens.

## ARIA Accessibility

Identical contract to the linear bar:

```html
<div role="progressbar"
     aria-valuenow="64"
     aria-valuemin="0"
     aria-valuemax="100">
```

- Value omitted in indeterminate mode.
- No `aria-label` by default — supply one via a wrapping element or parent `thx-crt-display` when context is needed.

## Centralized CRT Effects

```js
import { crtStaticScanlineOverlay } from '../styles/crt-effects.js';
```

The scanline overlay is applied to `.ring--crt` and then clipped round:

```css
${crtStaticScanlineOverlay('.ring--crt', { opacity: 0.05 })}
.ring--crt::before { border-radius: var(--radius-round); }
```

This keeps the CRT texture system consistent across all data components.

## Control-Room Examples

### Sensor Grid (ultradashboard pattern)

```html
<div class="sensor-grid">
  <thx-chart-gauge value="73" label="CPU"></thx-chart-gauge>
  <thx-chart-gauge value="88" label="SED" threshold="80"></thx-chart-gauge>
  <thx-progress-ring value="64" size="56" show-value variant="crt"></thx-progress-ring>
</div>
```

### Compact Status in CRT Frame

```html
<thx-crt-display label="NETWORK LOAD" size="small">
  <thx-progress-ring value="87" variant="crt" show-value size="42"></thx-progress-ring>
</thx-crt-display>
```

### Indeterminate Action Feedback

```html
<thx-progress-ring
  indeterminate
  variant="crt"
  size="32"
  stroke="3"
  show-value>
</thx-progress-ring>
<span style="font-family: var(--font-mono); font-size: var(--font-size-0);">AUTHENTICATING...</span>
```

### Dense Multi-Ring Panel

Use a CSS grid of rings with different sizes and variants for a complete "status wall" inside one CRT display.

## Reduced-Motion Support

- Arc offset transition uses design system duration tokens (disabled on `prefers-reduced-motion`).
- Indeterminate rotation animation is likewise governed by the same tokens.
- Scanline texture is static.

## Styling & Sizing

- The SVG is rotated –90° so 0% starts at the top (classic gauge behavior).
- Glow filter is applied only to the CRT variant fill.
- Value text is absolutely centered and uses mono typography with letter-spacing.
- Scale the entire ring with CSS or by changing the `size` property (recommended for crisp rendering).

## Best Practices

- Pair rings with gauges in the same row for visual rhythm.
- Use `show-value` only when the number itself is important; otherwise the arc alone communicates enough.
- On very small sizes (`< 32px`) consider hiding the value or using only as a colored status dot.
- For the richest CRT experience, place inside `<thx-crt-display>` or a dark panel.

`thx-progress-ring` is the compact workhorse of the instrumentation layer. Together with the linear bar, gauges, and monitor banks, it lets you build dense, believable control-room interfaces that feel like they belong in a real operations center rather than a web dashboard.