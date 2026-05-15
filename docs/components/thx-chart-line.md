# thx-chart-line

**THX 1138 styled canvas-based oscilloscope line chart.**

`<thx-chart-line>` is a canvas-based line chart that renders like a classic laboratory oscilloscope or strip-chart recorder. It is designed for real-time telemetry, compliance waveforms, sensor traces, and multi-channel system metrics — never for decorative marketing charts.

## Instrument Philosophy

Charts in the THX library must feel like **instruments**, not business graphics:

- Thin phosphor traces with soft glow.
- Muted blue grid on dark background.
- Monospace Courier labels and tick values.
- Low-contrast grid lines (`rgba(166,200,225,0.15)`).
- Optional dashed traces and outlined points for secondary channels.
- Shadow/glow on the active line for that "live phosphor" pop.

When wrapped in `<thx-crt-display variant="scope">` it becomes indistinguishable from a Tektronix or HP scope in a 1970s control room.

## Data Binding (LineChartData)

The component is driven entirely by the `data` property (set via JavaScript). No HTML attributes for series data.

```ts
interface LineSeries {
  name: string;           // Legend label (uppercased in rendering)
  color: string;          // Any CSS color — use #a6c8e1 (primary), #707e91 (secondary), #d4aa00 (warning)
  data: number[];         // Values. Length should match labels
  dasharray?: string;     // e.g. "4,2" for dashed line
  outlined?: boolean;     // Draw stroked circles instead of filled dots
}

interface LineChartData {
  labels: string[];       // X-axis tick labels (MON, 00:00, etc.)
  series: LineSeries[];
  min?: number;           // Y-axis minimum (default 0)
  max?: number;           // Y-axis maximum (default 100)
}
```

### Setting Data

```js
const chart = document.querySelector('thx-chart-line');
chart.data = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  min: 0,
  max: 100,
  series: [
    { name: 'COMPLIANCE', color: '#a6c8e1', data: [16, 31, 39, 50, 61, 69] },
    {
      name: 'EFFICIENCY',
      color: '#707e91',
      dasharray: '4,2',
      outlined: true,
      data: [31, 36, 43, 39, 46, 50]
    },
    { name: 'ALERTS', color: '#d4aa00', data: [54, 59, 40, 66, 70, 74] }
  ]
};
```

The chart reacts to property changes and automatically redraws on resize (via ResizeObserver).

## Properties

| Property | Type   | Default          | Description |
|----------|--------|------------------|-------------|
| `data`   | object | `{labels:[], series:[]}` | Full chart definition (see above) |
| `width`  | number | `440`            | Logical width used for coordinate calculations |
| `height` | number | `180`            | Logical height (aspect ratio preserved on resize) |

The canvas is always responsive and pixel-perfect at device pixel ratio (capped at 2×).

## Rendering Details

- **Grid**: Horizontal lines at 30/60/90/120/150. Vertical lines between first and last X label.
- **Axes**: Thick muted lines with mono 9px labels. Y-axis uses evenly spaced computed values.
- **Series**: 2px stroke + 4px radius dots (or outlined rings). Soft `shadowBlur` glow using the series color.
- **Legend**: Right-aligned, vertical stack of colored line samples + labels.
- All text uses `'Courier New', monospace` at 9px for maximum instrument density.

## Phosphor & Warning Styling

- Primary traces: `#a6c8e1` (or `--atmos-primary`).
- Secondary/quiet: `#707e91`.
- Warning/alert traces: `#d4aa00` (amber) — used for the ALERTS series above.
- Glow is achieved with `ctx.shadowColor` + `shadowBlur`; it respects the chosen series color.

## Control-Room Examples

### System Metrics Scope (recommended pattern)

```html
<thx-crt-display variant="scope" label="TEK 556 // SYSTEM METRICS" style="max-width: 620px">
  <thx-chart-line id="metrics" style="width:100%; min-height:200px; display:block;"></thx-chart-line>
</thx-crt-display>
```

```js
// Typical live telemetry update
metrics.data = {
  labels: ['00', '04', '08', '12', '16', '20'],
  min: 0, max: 100,
  series: [
    { name: 'SIG-A', color: '#a6c8e1', data: [22,41,38,67,71,59] },
    { name: 'SIG-B', color: '#d4aa00', dasharray:'3,2', data:[15,28,55,49,62,81] }
  ]
};
```

### Compliance Waveform in Ultradashboard

From the ultradashboard example — placed inside a large CRT with adjacent terminal output:

```html
<thx-crt-display label="MAINFRAME-1138 // OSCILLOSCOPE" class="dark-panel">
  <thx-chart-line id="compliance-line" height="220"></thx-chart-line>
</thx-crt-display>
```

The chart is part of a split layout showing both waveform and numeric telemetry.

### Multiple Series with Visual Hierarchy

- Solid filled primary metric in bright phosphor.
- Dashed + outlined secondary reference trace.
- Amber warning channel that stands out without shouting.

## Reduced-Motion & Performance

- The chart itself has no CSS animations (pure canvas).
- When hosted inside `thx-crt-display`, the parent's scanline animation is already disabled under `prefers-reduced-motion`.
- Canvas is redrawn only on data change or container resize — efficient for dashboards.

## Accessibility

- The canvas is not semantic. Provide an alternative textual summary or `aria-describedby` on the parent CRT frame.
- For screen-reader users, consider pairing the chart with a `<table>` of the same data or a `thx-format-number` list of current values.
- Legend text is purely visual; ensure labels are meaningful.

## Styling Notes

The component forces its own mono font stack. You can influence colors only through the `data` objects (series `color`). For a full CRT container effect, always wrap in `<thx-crt-display variant="scope">`.

This component, together with the CRT wrapper, is the heart of the library's data-visualization story. It turns abstract numbers into something an operator would actually watch on a physical console.