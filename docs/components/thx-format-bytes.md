# thx-format-bytes

**THX 1138 styled bytes / file-size formatter.**

A zero-JS, drop-in component that renders human-readable byte counts (or bits) in strict monospace uppercase clinical style. Perfect for telemetry, file listings, memory readouts, and storage dashboards. Automatically splits value and unit into styled `part`s for precise theming. Supports CRT monitor framing and precision control.

## Import

```js
import 'thx-components/src/components/thx-format-bytes.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-format-bytes value="1048576"></thx-format-bytes>
<!-- renders: 1.00 MB -->

<thx-format-bytes value="2048" unit="bytes" precision="0"></thx-format-bytes>
<!-- renders: 2 KB -->

<thx-format-bytes value="1250000" unit="bits"></thx-format-bytes>
<!-- renders: 1.25 Mb -->
```

## Advanced Usage

### In Data Tables and Telemetry

```html
<tr>
  <td>CORE DUMP</td>
  <td><thx-format-bytes value="4194304" precision="1"></thx-format-bytes></td>
</tr>
<tr>
  <td>BUFFER</td>
  <td><thx-format-bytes value="98304" unit="bytes"></thx-format-bytes></td>
</tr>
```

### CRT Instrument Style

```html
<thx-crt-display label="MEM-01 // RAM USAGE">
  <thx-format-bytes 
    value="67108864" 
    precision="2" 
    variant="crt">
  </thx-format-bytes>
</thx-crt-display>
```

### Bits vs Bytes for Network / Storage

```html
<thx-format-bytes value="125000000" unit="bits" precision="1"></thx-format-bytes>
<!-- 125.00 Mb (network throughput) -->

<thx-format-bytes value="125000000" unit="bytes" precision="1"></thx-format-bytes>
<!-- 119.21 MB (storage) -->
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | `0` | Number of bytes (or bits) to format. Reactive. |
| `unit` | `'bytes' \| 'bits' \| 'b' \| 'B'` | `'bytes'` | Base unit. `'bits'` / `'b'` uses 1000 base and bit suffixes (`kb`, `Mb`); `'bytes'` uses 1024 and `KB`, `MB`. |
| `precision` | `number` | `2` | Decimal places shown in the value portion. |
| `variant` | `'default' \| 'crt'` (reflects) | `'default'` | `crt` applies dark phosphor monitor frame with blue text and subtle glow. |

## Slots

None. Purely presentational; content is generated from `value`.

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | The outer container span. |
| `value` | The numeric portion (bold, primary color). |
| `unit` | The unit suffix (dimmed secondary color). |

## Events

None. This is a pure formatter with no interactivity.

## Variants

- **default**: Light-surface institutional styling — value in `neutral-800`, unit in `neutral-600`.
- **crt**: Dark monitor frame (`#111` bg, `#2a2a2a` border) with phosphor blue value (`#a6c8e1`) and soft text glow. Ideal inside `thx-crt-display` or chart monitors.

## Accessibility

- Purely decorative visual representation. Pair with visible surrounding labels or `aria-label` on a parent for full context (e.g. "64 MB RAM used").
- The numeric value is always present in the DOM as text, so screen readers will read the formatted size naturally.
- No focus or keyboard behavior — use inside tables, lists, or as child of focusable controls when needed.
- When displaying live changing values, consider wrapping in an `aria-live` polite region.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#data-visualization--crt) and the formatter family section.

- **Mono contract**: Always uppercase, letter-spaced Courier New. Matches `thx-format-date`, `thx-format-number`, and `thx-relative-time`.
- **Unit semantics**: 1024-based binary prefixes for storage (`KB`, `MB`); 1000-based decimal for bits/network (`Mb`). The component chooses the correct suffix list automatically.
- **Precision & zero handling**: Special-cases `0 B` / `0 b`. Trailing zeros after decimal are preserved per `precision`.
- **CRT integration**: The `variant="crt"` + `part` selectors allow seamless embedding in instrument banks alongside gauges and charts.
- **AI-friendly**: Drop the element with a `value` attribute and the system renders correct, on-brand size strings without any script or formatting logic on the consuming side. Perfect for LLM-generated telemetry UIs.
- **Density**: Compact inline layout (`inline-flex`, baseline-aligned) so it sits cleanly in data rows, logs, and headers without shifting layout.

Use `thx-format-bytes` wherever you need machine-readable numeric sizes turned into instantly scannable clinical readouts.

## Related Components

- [thx-format-number](./thx-format-number.md) — general numeric, percent, currency, engineering notation.
- [thx-format-date](./thx-format-date.md) — standardized date/time strings.
- [thx-relative-time](./thx-relative-time.md) — live "X MIN AGO" displays.
- [thx-crt-display](./thx-crt-display.md) — the preferred container for CRT-styled formatters.
- [thx-chart-monitors](./thx-chart-monitors.md) — small-multiple instrument panels that often include size readouts.
