# thx-chart-monitors

**THX 1138 styled monitor bank (small multiples CRT tiles).**

`<thx-chart-monitors>` creates a responsive grid of small CRT monitor tiles — "small multiples" for at-a-glance status across many channels, cameras, sectors, or nodes. Each tile is a self-contained mini display with label, large glowing value, percentage bar, and optional alert state.

## Design as Instrument Bank

This component directly embodies the "wall of monitors" aesthetic from THX 1138 control rooms:

- Dark grid backplane (`#1a1a1a`) with hairline borders.
- Individual tiles use full CRT surface treatment via centralized static scanline + vignette overlays (`crtStaticScanlineOverlay` + `crtStaticVignetteOverlay` from `crt-effects.js`).
- Phosphor blue value with strong text-shadow glow.
- Thin bottom bar indicator that also glows.
- Alert state instantly switches value + bar to warning amber with matching glow.

The result feels like a bank of security or process monitors rather than a data visualization widget.

## Data API (MonitorData[])

```ts
interface MonitorData {
  label: string;     // Tile identifier (e.g. "CAM-01", "NODE-7G")
  value: string;     // Large central reading ("7-G", "98.4", "OK")
  percent: number;   // 0–100 — drives the bottom bar width
  alert?: boolean;   // When true, value and bar become amber
}
```

### Example Data (from index.html demo)

```js
monitorBank.data = [
  { label: 'CAM-01', value: '7-G', percent: 94 },
  { label: 'CAM-02', value: '8-H', percent: 87 },
  { label: 'CAM-03', value: '9-J', percent: 91 },
  { label: 'CAM-04', value: '10-K', percent: 62, alert: true },
  { label: 'CAM-05', value: '11-L', percent: 88 },
  // ...
];
```

## Properties

| Property  | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `data`    | array  | `[]`    | Array of `MonitorData` objects |
| `columns` | number | `4`     | Number of columns in the CSS grid (responsive `repeat(auto-fill, minmax(100px, 1fr))` base) |

The grid is always fluid; `columns` forces an explicit `repeat(N, 1fr)` when you want fixed density.

## Centralized CRT Effects (Static)

Unlike the full animated `thx-crt-display`, this component uses the **static** decorative overlays:

```js
import { crtStaticScanlineOverlay, crtStaticVignetteOverlay } from '../styles/crt-effects.js';
```

Applied to each `.monitor-unit`:

- Very subtle scanlines (`opacity: 0.03`).
- Moderate vignette (`opacity: 0.4`).

This gives every tile authentic CRT glass texture without the performance cost or distraction of moving scanlines across dozens of monitors.

## Visual States

- **Normal**: Phosphor blue value + bar with blue glow.
- **Alert**: Amber value + bar with stronger amber glow. Use for any channel that has crossed a tolerance.

The bottom bar is always present and gives instant relative magnitude comparison across the entire bank — a key instrument pattern.

## Control-Room Examples

### Camera / Sector Monitor Wall (primary use)

```html
<thx-card label="MONITOR BANK" variant="default">
  <thx-chart-monitors id="monitor-bank" columns="4"></thx-chart-monitors>
</thx-card>
```

```js
monitorBank.data = [
  { label: 'CAM-01', value: '7-G', percent: 94 },
  { label: 'CAM-02', value: '8-H', percent: 87 },
  { label: 'CAM-03', value: '9-J', percent: 91 },
  { label: 'CAM-04', value: '10-K', percent: 62, alert: true },
  { label: 'CAM-05', value: '11-L', percent: 88 },
  { label: 'CAM-06', value: '12-M', percent: 95 },
  { label: 'CAM-07', value: '13-N', percent: 79 },
  { label: 'CAM-08', value: '14-O', percent: 91 }
];
```

### Dense Telemetry Grid

Use `columns="6"` or `columns="8"` on wide dashboards for 16–32 simultaneous channels. The `minmax(100px,1fr)` ensures tiles never become too small.

### Inside a Large CRT Frame

You can also nest the entire bank inside a `thx-crt-display` for an even heavier "master console" presentation, though the component already carries its own CRT surface treatment.

## Reduced-Motion Support

All effects are static CSS backgrounds and box-shadows. No animations exist in this component, so it is inherently friendly to reduced-motion users. The parent design system tokens ensure any transitions (bar width) respect the media query.

## Accessibility

- Visual grid only.
- Labels are short uppercase codes — pair the whole bank with a summary table or live region that announces "CAM-04 now in alert state".
- The percentage bars convey relative magnitude; for precise values rely on the large central `value` text.
- Consider `aria-label="Camera status grid"` on a wrapping element.

## Styling Notes

- Grid gap and tile sizing use the `--size-*` scale.
- Each tile has `aspect-ratio: 4/3` for classic monitor proportions.
- Glow intensity is tuned higher on the value (`text-shadow`) than on the thin bar.
- Works equally well in light dashboard cards and dark command centers.

`thx-chart-monitors` is the density champion of the visualization suite. A full 4×4 or 8×4 grid of these glowing tiles instantly communicates "this is a serious monitoring station" to any user familiar with industrial or cinematic control rooms.