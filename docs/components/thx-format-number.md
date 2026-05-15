# thx-format-number

**THX 1138 styled number formatter with multiple notations.**

Renders numbers in clean monospace clinical formats: decimal, percent, currency, exponential, engineering (K/M/G suffixes), or the special `crt` scientific `1.23E+03` style. Splits value and unit into CSS parts for fine-grained styling. The workhorse for KPIs, sensor values, percentages, and scientific readouts in the THX system.

## Import

```js
import 'thx-components/src/components/thx-format-number.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-format-number value="1234567.89"></thx-format-number>
<!-- 1,234,567.89 -->

<thx-format-number value="0.875" notation="percent" precision="1"></thx-format-number>
<!-- 87.5% -->

<thx-format-number value="1499" notation="currency" currency="USD"></thx-format-number>
<!-- $1,499 -->

<thx-format-number value="0.0000456" notation="engineering"></thx-format-number>
<!-- 45.60µ (micro) -->
```

## Advanced Usage

### Engineering & CRT Scientific Notation

```html
<thx-format-number 
  value="2.45e12" 
  notation="crt" 
  precision="2" 
  variant="crt">
</thx-format-number>
<!-- 2.45E+12 with phosphor styling -->

<thx-format-number value="987654321" notation="engineering" precision="1"></thx-format-number>
<!-- 987.7M -->
```

### Inside Instrument Panels

```html
<thx-crt-display label="SIG-07 // FREQUENCY">
  <div style="display:flex; align-items:baseline; gap: var(--size-2);">
    <thx-format-number value="142000000" notation="engineering" precision="1" variant="crt"></thx-format-number>
    <span style="color:var(--atmos-secondary);">HZ</span>
  </div>
</thx-crt-display>
```

### Percentage with Status

```html
<thx-format-number value="94.7" notation="percent" precision="1"></thx-format-number>
<thx-badge variant="success">NOMINAL</thx-badge>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | `0` | The numeric value to format. |
| `notation` | `'decimal' \| 'percent' \| 'currency' \| 'exponential' \| 'engineering' \| 'crt'` | `'decimal'` | Output style. `crt` and `exponential` produce scientific notation. `engineering` uses 10³-step suffixes. |
| `precision` | `number` | `2` | Maximum (and minimum for some notations) fraction digits. |
| `locale` | `string` | `'en-US'` | Locale for `Intl.NumberFormat`. |
| `currency` | `string` | `'USD'` | ISO currency code when `notation="currency"`. |
| `variant` | `'default' \| 'crt'` (reflects) | `'default'` | `crt` applies dark monitor frame + phosphor text/glow. |

## Slots

None.

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | Outer container. |
| `value` | The numeric portion. |
| `unit` | Suffix / symbol portion (%, $, M, E+03, etc.). |

## Events

None.

## Variants & Notation Styles

- **decimal**: Standard localized number with grouping.
- **percent**: Value treated as 0–1 ratio; appends `%`.
- **currency**: Full currency symbol + formatting via `Intl`.
- **exponential**: `toExponential(precision).toUpperCase()`.
- **engineering**: 1K, 1.2M, 3.4G, 5.6T style (powers of 1000, three-decade steps).
- **crt**: Scientific `MANTISS E+EXP` with phosphor styling when `variant="crt"`.
- **crt variant**: Dark background, blue primary value, secondary unit, subtle glow — matches the entire CRT instrument family.

## Accessibility

- Pure text output; numbers and units are announced by screen readers.
- For live updating metrics, place inside an `aria-live` region.
- When the number conveys status (e.g. high error rate), accompany with visible `thx-badge`, `thx-tag`, or `thx-status-leds`.
- No focus behavior.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#data-visualization--crt).

- **Part-based theming**: Value is always heavier weight; unit is dimmed and slightly smaller. Engineering and exponential notations promote the suffix to bold for visual weight.
- **Uppercase & mono**: Consistent with the rest of the formatter suite and all THX data displays.
- **CRT scientific**: The `notation="crt"` produces a distinctive `2.45E+03` form that feels like old mainframe or oscilloscope readouts.
- **AI / LLM friendly**: Authors write a single declarative element instead of hand-rolling number formatting, `toFixed`, or importing Intl helpers in generated templates.
- **Zero / NaN handling**: Gracefully shows "NaN" or "0" without crashing.
- **Density & pairing**: Designed to live next to `thx-format-bytes`, `thx-format-date`, and inside `thx-chart-*` legends or monitor panels.

The four formatters (`bytes`, `date`, `number`, `relative-time`) give you complete, zero-dependency, on-brand numeric and temporal presentation for any control-room interface.

## Related Components

- [thx-format-bytes](./thx-format-bytes.md)
- [thx-format-date](./thx-format-date.md)
- [thx-relative-time](./thx-relative-time.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-chart-gauge](./thx-chart-gauge.md), [thx-chart-monitors](./thx-chart-monitors.md)
