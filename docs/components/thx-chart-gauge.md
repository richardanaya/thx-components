# thx-chart-gauge

**THX 1138 styled analog panel gauge (SVG).**

`<thx-chart-gauge>` is an analog circular gauge rendered in SVG that mimics a physical panel meter or pressure indicator. It features a 270° arc, tick marks with numeric labels, central digital readout, and automatic warning state — the perfect "instrument" for CPU load, pressure, temperature, or any bounded metric that an operator would glance at on a rack.

## Real Instrument Feel

- Thick phosphor arc with round line-cap and drop-shadow glow.
- 5 evenly spaced tick marks (0/25/50/75/100) with tiny mono labels.
- Large central value in glowing phosphor mono.
- Optional small uppercase label beneath the value.
- When `value >= threshold`, the arc and glow instantly switch to warning amber (`#d4aa00`).
- Smooth CSS transition on value change.

The gauge is intentionally compact (140×140 px intrinsic) and is almost always placed inside a `<thx-crt-display>` or a dense panel grid.

## Properties

| Property   | Type   | Default | Description |
|------------|--------|---------|-------------|
| `value`    | number | `0`     | Current reading |
| `min`      | number | `0`     | Lower bound |
| `max`      | number | `100`   | Upper bound |
| `label`    | string | `""`    | Small text label below the numeric value (e.g. "PSI", "CPU") |
| `color`    | string | primary phosphor | Override stroke color (ignored once in warning) |
| `threshold`| number | `80`    | Value at which gauge switches to amber warning state |

All numeric properties are reactive; changing `value` smoothly animates the arc via `stroke-dasharray`.

## Warning Behavior

The internal `_isWarning` getter returns `true` when `value >= threshold`. In warning mode:

- Arc stroke becomes amber.
- Glow filter uses amber.
- Text value remains phosphor (for contrast) unless the parent CRT surface forces otherwise.

This gives instant visual escalation without extra attributes.

## Usage & Data Binding

Attribute-driven (no complex object):

```html
<thx-chart-gauge
  value="73"
  label="PSI"
  min="0"
  max="100"
  threshold="80">
</thx-chart-gauge>
```

Update live:

```js
gauge.value = 87;   // smoothly animates; crosses threshold → turns amber
```

## Control-Room Examples

### Environmental Sensor Cluster

```html
<thx-crt-display label="PRESSURE MONITOR" style="max-width: 200px">
  <thx-chart-gauge
    value="73"
    label="PSI"
    min="0"
    max="100"
    threshold="80">
  </thx-chart-gauge>
</thx-crt-display>
```

### Biometric / System Load Dashboard (ultradashboard pattern)

```html
<div class="sensor-grid">
  <thx-chart-gauge value="73" label="CPU"></thx-chart-gauge>
  <thx-chart-gauge value="88" label="SED" threshold="80"></thx-chart-gauge>
  <thx-progress-ring value="64" label="NET"></thx-progress-ring>
</div>
```

The gauge at 88% immediately shows amber, drawing the operator's eye.

### Multiple Gauges in One CRT Frame

Wrap several gauges side-by-side inside a single `thx-crt-display` for a classic multi-dial instrument cluster.

## Phosphor & Glow Details

- Background arc: low-opacity phosphor (`rgba(166,200,225,0.2)`).
- Active arc: full phosphor or amber + `drop-shadow(0 0 3px ...)`.
- Value text: 22px mono with 2px glow.
- Tick labels: 4px ultra-small mono for density.
- All elements use the design system's `--atmos-primary` / `--accent-warning` tokens.

## Reduced-Motion Support

The arc transition uses `--duration-moderate-2` (CSS custom property). The design system and `aesthetics.css` already shorten or disable transitions when `prefers-reduced-motion: reduce` is active. No JavaScript-driven animation bypasses this.

## Accessibility

- Purely visual SVG gauge.
- The numeric value is rendered as visible text inside the SVG — screen readers can usually announce it.
- Provide `aria-label` on a wrapping element or pair with a `<thx-format-number>` for explicit live region updates.
- For critical thresholds, combine with `thx-status-leds` or `thx-alert` that carry proper ARIA live announcements.

## Styling Notes

- Fixed intrinsic size; scale via CSS `transform: scale()` or by placing in a flex/grid container.
- The SVG is self-contained — color overrides are limited to the `color` property (pre-warning).
- Best visual results when the parent surface is dark CRT (`thx-crt-display` or `.dark-panel`).

`thx-chart-gauge` completes the instrument set alongside line charts and progress rings. A row of these glowing dials inside a labeled CRT frame is the visual signature of a THX control-room dashboard.