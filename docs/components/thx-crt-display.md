# thx-crt-display

**THX 1138 styled CRT monitor display wrapper.**

The `<thx-crt-display>` component is a self-contained CRT monitor frame that turns any slotted content into a convincing piece of control-room instrumentation. It delivers the signature dark, recessed phosphor display aesthetic of the THX Components library: thick borders, animated scanlines, radial vignette, and inset shadow. It is the foundational container for all data visualization instruments.

## Import

```js
import 'thx-components';                    // full library
// or
import 'thx-components/src/components/thx-crt-display.js';
```

The element `<thx-crt-display>` auto-registers.

## Design Intent

Per [DESIGN.md](../DESIGN.md), CRT and scope displays form a distinct dark-mode subsystem used only for literal monitor surfaces (oscilloscopes, telemetry readouts, video scopes). The light institutional gray world is deliberately kept separate from these "machine" surfaces.

- Background: `#111111` (standard) or `#0a0a0a` (scope).
- Frame: thick `#2A2A2A` border with small radius.
- Text and traces: phosphor blue `#A6C8E1` (and amber `#D4AA00` for warnings).
- Effects are **centralized** in `src/styles/crt-effects.js` via `crtMonitorStyles`.

This component is the canonical host for charts (`thx-chart-line`, `thx-chart-gauge`, etc.) and terminal readouts. Placing a chart inside a `thx-crt-display` with an appropriate `label` produces the strongest "real instrument" impression.

## Attributes / Properties

| Attribute | Type   | Default   | Description |
|-----------|--------|-----------|-------------|
| `label`   | string | `""`      | Upper-right panel identifier (e.g. `"TEK 556 // SYSTEM METRICS"`). Rendered in muted mono. |
| `variant` | string | `"crt"`   | `"crt"` (animated scanlines) or `"scope"` (static grid, deeper background). |
| `size`    | string | `"medium"`| `"small"`, `"medium"`, or `"large"` — controls border thickness and padding. |

All properties are reactive.

## Variants

- **crt** (default): Full monitor treatment with horizontal scanline crawl animation.
- **scope**: Oscilloscope / vector display variant. Uses a static blue grid overlay (`16px` pitch) on `#0a0a0a`. No animation. Ideal for line charts and waveforms.

Sizes adjust frame weight and internal breathing room:

- `small`: thin border, tight padding — dense dashboards.
- `medium`: balanced default.
- `large`: heavier frame and generous padding — hero displays.

## Centralized CRT Effects

The component imports and applies `crtMonitorStyles`:

```js
import { crtMonitorStyles } from '../styles/crt-effects.js';
```

Key layers inside `.crt-display`:

- `::before` — repeating linear scanlines (phosphor blue at low opacity), animated with `scanlines` keyframe (4s linear infinite).
- `::after` — radial vignette darkening the edges.
- `.crt-content` — z-indexed slot container (padding varies by size).
- `.crt-label` — absolutely positioned uppercase identifier.

The `@keyframes scanlines` and the entire animation are wrapped in:

```css
@media (prefers-reduced-motion: reduce) {
  .crt-display::before { animation: none; }
}
```

Static scanline and vignette helpers (`crtStaticScanlineOverlay`, `crtStaticVignetteOverlay`) are available for other components (progress bars, image comparer, monitor banks) that need subtle CRT texture without claiming full monitor semantics.

## Instrument Aesthetic & Phosphor Styling

- Enforces `Courier New` / monospace font stack on the host.
- Content inherits the cool phosphor blue (`--atmos-primary`).
- The combination of inset shadow, subtle grid/scanlines, and glow produces the exact "sterile control room" feeling described in DESIGN.md.
- Avoid placing bright light-surface content inside; the CRT frame expects dark, high-contrast, mono or phosphor-colored children.

## Reduced-Motion Support

Scanline animation is **completely disabled** when the user has `prefers-reduced-motion: reduce`. The scope grid variant is always static. All other visual depth (vignette, frame, shadows) remains.

## Practical Control-Room Examples

### Basic Telemetry Panel

```html
<thx-crt-display label="CRT-01 // TEK 555" style="max-width: 600px">
  <div style="padding: var(--size-4); color: var(--atmos-primary); font-family: var(--font-mono);">
    <div style="text-transform: uppercase; letter-spacing: var(--font-letterspacing-4); margin-bottom: var(--size-3);">
      Sector Compliance Analysis
    </div>
    <div style="display: flex; gap: var(--size-4);">
      <div>
        <div style="font-size: var(--font-size-5);">94%</div>
        <div style="font-size: var(--font-size-0); color: var(--atmos-secondary);">7-G EFFICIENCY</div>
      </div>
      <!-- more KPI blocks -->
    </div>
  </div>
</thx-crt-display>
```

### Hosting a Line Chart (Oscilloscope Style)

```html
<thx-crt-display variant="scope" label="MAINFRAME-1138 // OSCILLOSCOPE" style="max-width: 640px">
  <thx-chart-line id="waveform" style="width:100%; min-height:220px;"></thx-chart-line>
</thx-crt-display>
```

```js
// JS
const chart = document.getElementById('waveform');
chart.data = {
  labels: ['00', '04', '08', '12', '16', '20'],
  min: 0, max: 100,
  series: [
    { name: 'SIG-A', color: '#a6c8e1', data: [22, 41, 38, 67, 71, 59] },
    { name: 'SIG-B', color: '#d4aa00', dasharray: '3,2', data: [15, 28, 55, 49, 62, 81] }
  ]
};
```

### Pressure / Environmental Monitor

```html
<thx-crt-display label="ENV-07 // PRESSURE" size="large" style="max-width: 240px">
  <thx-chart-gauge value="73" label="PSI" min="0" max="100" threshold="80"></thx-chart-gauge>
</thx-crt-display>
```

### Multiple Monitors in a Bank

Place `thx-chart-monitors` directly or wrap individual gauges inside multiple `thx-crt-display` elements for a full wall-of-instruments look.

## Styling Notes & Tokens

The component respects CSS custom properties from `aesthetics.css` (Open Props + THX tokens):

- `--crt-bg`, `--crt-bg-dark`, `--crt-border`
- `--atmos-primary` (phosphor blue)
- `--atmos-secondary` (muted labels)
- `--size-*` spacing scale
- `--font-mono`

You can override via `:host` or by styling slotted content. For deeper customization, import `crtMonitorStyles` directly in your own Lit components.

## Accessibility

- The frame itself is a presentational container (`<div>`).
- Ensure meaningful `aria-label` or visible text on child content.
- Labels are purely decorative (not interactive).
- When used as a chart container, the inner chart or readout should carry its own semantic labeling.

This component is the foundation for the entire data-visualization layer. Use it liberally in command dashboards to give every metric a physical, monitor-like presence.