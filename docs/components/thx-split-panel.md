# thx-split-panel

**THX 1138 styled resizable split panel component.**

A two-pane clinical layout instrument with draggable divider, percentage labels, keyboard-accessible resizing, and optional CRT dark variant. Provides the precise, instrument-panel language of THX-1138 for side-by-side telemetry, code vs preview, raw vs analyzed data, or any comparative dashboard surface. Recent improvements include full keyboard navigation on the divider, ARIA separator semantics, and clean CRT variant support.

## Import

```js
import 'thx-components/src/components/thx-split-panel.js';
// or
import 'thx-components';
```

## Basic Usage

```html
<thx-split-panel
  start-label="RAW TELEMETRY"
  end-label="HUMAN REVIEW"
  style="height: 320px; border: 1px solid rgba(0,0,0,0.1)"
>
  <div slot="start">
    <!-- left / top pane content -->
    <pre style="font-family: var(--font-mono);">01001101 01101111 01101110</pre>
  </div>
  <div slot="end">
    <!-- right / bottom pane content -->
    <p>Analyst notes and annotations go here.</p>
  </div>
</thx-split-panel>
```

## Advanced Usage

### Vertical Orientation

```html
<thx-split-panel orientation="vertical" start-label="HEADER" end-label="FOOTER" style="height: 400px">
  <div slot="start">Top content</div>
  <div slot="end">Bottom content</div>
</thx-split-panel>
```

### CRT Variant (Dark Monitor Mode)

```html
<thx-split-panel variant="crt" start-label="SCOPE A" end-label="SCOPE B">
  <!-- children inherit phosphor text automatically on crt variant -->
</thx-split-panel>
```

The CRT variant applies deep `#111` / `#0a0a0a` backgrounds, phosphor accents on labels and handle, and subtle glows.

### Non-Resizable (Fixed Split)

```html
<thx-split-panel resizable="false" position="35" start-label="OBSERVE" end-label="ANALYZE">
  ...
</thx-split-panel>
```

### Programmatic Position + Change Event

```js
const panel = document.querySelector('thx-split-panel');
panel.position = 65; // 0–100, clamped 10–90

panel.addEventListener('change', () => {
  console.log('Split now at', panel.position + '%');
});
```

### Keyboard Resizing

Focus the divider (Tab) and use:

- Arrow keys / PageUp / PageDown: ±1% or ±10%
- Home / End: jump to 10% / 90%
- Shift + arrow: larger 10% steps

The divider exposes `role="separator"` with proper `aria-orientation`, `aria-valuemin/max/now`.

## Properties / Attributes

| Attribute    | Type                          | Default      | Description |
|--------------|-------------------------------|--------------|-------------|
| `orientation`| `'horizontal' \| 'vertical'`  | `'horizontal'` | Split direction (row vs column). |
| `position`   | `number` (0–100)              | `50`         | Percentage allocated to the start pane (clamped 10–90 internally). |
| `resizable`  | `boolean`                     | `true`       | Enables drag + keyboard on the divider handle. |
| `variant`    | `'default' \| 'crt'`          | `'default'`  | Visual theme. `crt` darkens panels and applies phosphor accents. |
| `start-label`| `string`                      | `'PANEL-A'`  | Uppercase mono label + % indicator in the start pane header bar. |
| `end-label`  | `string`                      | `'PANEL-B'`  | Uppercase mono label + % indicator in the end pane header bar. |

`position` and `resizable` are reactive. Labels reflect immediately.

## Slots

| Slot    | Description |
|---------|-------------|
| `start` | Content for the primary (left or top) pane. Receives panel padding. |
| `end`   | Content for the secondary (right or bottom) pane. |

## Events

| Event   | Detail | Description |
|---------|--------|-------------|
| `change`| (none) | Dispatched after drag end or keyboard position change. Bubbles, composed. |

## Variants

- **horizontal** (default) / **vertical**: Classic side-by-side or stacked layout.
- **default** / **crt**: Light institutional slabs vs deep monitor recesses with phosphor text and glow on the handle.
- **resizable=true** (default) vs false: Draggable grip vs static seam.
- **Panel bars**: Every pane has a thin header bar showing indicator dot, label, and live percentage. Bars adapt color in CRT mode.

The divider handle features repeating grip lines (horizontal or vertical) that feel like a physical mechanical slider.

## Accessibility

- Divider is a `role="separator"` with `aria-orientation`, `aria-valuemin="10"`, `aria-valuemax="90"`, `aria-valuenow`.
- When `resizable`, the divider receives `tabindex="0"` and is fully keyboard operable (arrows, Home/End, Page keys).
- Focus-visible styling applies to the interactive divider handle (via shared focus system).
- Panel content remains fully accessible; the split chrome is presentational.
- Drag uses Pointer Events with capture for smooth interaction even when mouse leaves the element.
- No visual-only information: percentages are announced via ARIA and also displayed in the label bars.
- Recommended: Choose descriptive `start-label` / `end-label` values ("RAW TELEMETRY", "HUMAN REVIEW"). Keep pane content concise.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (layout, elevation, CRT displays, charts).

- **Divider language**: Thin central track with a prominent bordered handle containing repeating grip lines (mechanical, industrial). Cursor changes to col-resize / row-resize. Box-shadow and border treatment match button/input language.
- **Panel bars**: Thin top strip with small indicator square + uppercase mono label + right-aligned percentage. In CRT mode the bar receives a subtle phosphor wash and the indicator glows.
- **CRT variant**: Switches start pane to `#111`, end pane to `#0a0a0a`, label colors to secondary/primary phosphor, handle to dark with primary border + glow. Perfect for pairing two charts or two terminal readouts.
- **Typography & color**: Entire component forces mono font stack. All labels uppercase with wide letter-spacing. Content inside slots inherits normal body styling unless the parent sets CRT colors.
- **Constraints**: Position clamped 10–90% to guarantee minimum pane sizes. No collapse behavior.
- **Parts API**: Exposes `part="base"`, `part="panel-start"`, `part="panel-end"`, `part="divider"`, `part="divider-handle"` for advanced external styling or testing.
- **Clinical tone**: Labels read like instrument channel names. The live % readout reinforces the feeling of precise control-room instrumentation.

Split panels are the workhorse for comparative analysis views in dashboards. Frequently contain `thx-chart-*` components, `thx-crt-display`, or raw data vs processed output. See ultradashboard for a live "SPLIT PANEL ANALYSIS" example. Related: [thx-divider](./thx-divider.md) for simpler static seams, [thx-details](./thx-details.md) for collapsible sections.
