# thx-chart-bar

**THX 1138 styled horizontal bar chart instrument.**

`<thx-chart-bar>` renders a compact, instrument-style horizontal bar chart. Each row is a labeled track with a phosphor-filled (or warning-amber) bar, value readout, and subtle scanline texture — exactly the kind of readout you would see on a rack-mounted process monitor or sector status panel.

## Instrument Aesthetic

Unlike typical bar charts that feel like presentation software, `thx-chart-bar` is deliberately austere and mechanical:

- Square geometry, no rounded fills.
- Muted background track (`rgba(255,255,255,0.1)` on dark CRT surfaces).
- Phosphor blue gradient fill with soft glow.
- Repeating fine horizontal scanlines on the fill for CRT texture.
- Uppercase mono labels and right-aligned values.
- Warning state switches fill to amber gradient with stronger glow.

The component is almost always placed inside a `<thx-crt-display label="...">` to complete the monitor look.

## Data API (BarDataPoint[])

Set the `data` property with an array of objects:

```ts
interface BarDataPoint {
  label: string;      // Short uppercase identifier (e.g. "7-G", "SECTOR-A")
  value: number;
  max?: number;       // Default 100 — used to compute percentage
  color?: string;     // Currently unused (gradient is fixed per variant)
  warning?: boolean;  // Forces amber styling
}
```

### Example Data (from demo)

```js
const bar = document.getElementById('demo-bar-chart');
bar.data = [
  { label: '7-G', value: 94 },
  { label: '8-H', value: 87 },
  { label: '9-J', value: 91 },
  { label: '10-K', value: 62, warning: true }
];
```

The component automatically renders one row per item, computes widths, and appends `%` when `max === 100`.

## Properties

| Property | Type  | Default | Description |
|----------|-------|---------|-------------|
| `data`   | array | `[]`    | Array of `BarDataPoint` objects (reactive) |

Width is determined by the parent container (flex layout inside the chart).

## Visual Variants & States

- **Normal**: Phosphor blue gradient (`#333` → `#a6c8e1`) + blue glow + white scanlines.
- **Warning** (`warning: true`): Amber gradient (`#666` → `#d4aa00`) + amber glow. Used for out-of-tolerance sectors.

The fill always includes a fine repeating vertical scanline overlay (`repeating-linear-gradient`) giving the bar a glass/CRT screen texture.

No separate "crt" variant — the component is designed to live inside a CRT frame. The track background is intentionally dark-translucent so it works on both light cards and dark CRT surfaces.

## Control-Room Examples

### Sector Analysis Monitor (recommended)

```html
<thx-crt-display label="SECTOR ANALYSIS" style="max-width: 500px">
  <thx-chart-bar id="demo-bar-chart"></thx-chart-bar>
  <thx-status-leds id="demo-status-leds"></thx-status-leds>
</thx-crt-display>
```

```js
barChart.data = [
  { label: '7-G', value: 94 },
  { label: '8-H', value: 87 },
  { label: '9-J', value: 91 },
  { label: '10-K', value: 62, warning: true }
];
```

### Resource Utilization Panel

```html
<thx-crt-display label="RESOURCE UTILIZATION" size="large">
  <thx-chart-bar id="resource-bars"></thx-chart-bar>
</thx-crt-display>
```

Data example:

```js
resourceBars.data = [
  { label: 'CPU', value: 78, max: 100 },
  { label: 'MEM', value: 64, max: 100 },
  { label: 'IO',  value: 41, max: 100 },
  { label: 'NET', value: 92, max: 100, warning: true }
];
```

### Paired with Gauges

In ultradashboard layouts, bar charts sit alongside `thx-chart-gauge` and `thx-progress-ring` inside the same card or CRT frame for a complete "wall of instruments" effect.

## Reduced-Motion Support

The only transition is a CSS `width` change on the fill (`transition: width var(--duration-moderate-2) ease`). This respects the global `prefers-reduced-motion` media query via the design system's token system (no custom animation is used).

The scanline texture on the fill is a static background image — no motion.

## Accessibility

- Purely visual component.
- Labels are short uppercase strings; make them descriptive (e.g. "SECTOR-7G" rather than "A").
- For screen readers, pair the chart with a data table or use `aria-describedby` on the surrounding `thx-crt-display`.
- Values are rendered as text on the right; they remain readable even when the bar is very short.

## Styling & Theming

- Uses `--atmos-primary`, `--atmos-secondary`, `--accent-warning`.
- Track and fill gradients are hard-coded for consistency; color overrides via `data[].color` are not yet implemented.
- The component forces mono font on labels and values.
- Works beautifully inside dark CRT frames and also on light surface cards when a more compact comparison is needed.

`thx-chart-bar` is the go-to component for ranked or categorical telemetry that must feel like a physical process indicator rather than a chart. Combined with the CRT wrapper and status LEDs, it completes a convincing control-room instrumentation cluster.