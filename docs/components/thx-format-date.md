# thx-format-date

**THX 1138 styled date & time formatter.**

Renders dates in standardized, uppercase, monospace clinical formats (`short`, `medium`, `long`, `full`, `iso`, `unix`, or the signature `crt` double-slash style). Zero boilerplate — supply a date string or ISO and the component handles locale formatting, timezone, and THX typography. Includes optional `show-label` prefix for dashboard consistency.

## Import

```js
import 'thx-components/src/components/thx-format-date.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-format-date date="2026-05-14T14:30:00Z"></thx-format-date>
<!-- MAY 14, 2026, 02:30 PM (medium default) -->

<thx-format-date date="2026-05-14" format="short"></thx-format-date>
<!-- 05/14/26 -->

<thx-format-date date="2026-05-14T14:30:00" format="crt" show-label></thx-format-date>
<!-- DATE // 2026-05-14 // 14:30:00 -->
```

## Advanced Usage

### CRT Monitor Readout

```html
<thx-crt-display label="LOG-1138 // LAST EVENT">
  <thx-format-date 
    date="2026-05-14T09:05:22" 
    format="crt" 
    variant="crt">
  </thx-format-date>
</thx-crt-display>
```

### With Timezone & Full Precision

```html
<thx-format-date 
  date="2026-05-14T14:30:00Z" 
  format="full" 
  locale="en-GB" 
  time-zone="America/New_York">
</thx-format-date>
<!-- 14 MAY 2026, 10:30:00 AM -->
```

### Live System Clock Example (combined with relative-time)

```html
<div class="status-row">
  <thx-format-date date={currentISO} format="crt" show-label></thx-format-date>
  <thx-relative-time date={currentISO} live></thx-relative-time>
</div>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `date` | `string \| Date` | current time | Date to format. Accepts ISO strings, timestamps, or Date objects. |
| `format` | `'short' \| 'medium' \| 'long' \| 'full' \| 'iso' \| 'unix' \| 'crt'` | `'medium'` | Output style. `crt` produces the signature `YYYY-MM-DD // HH:MM:SS`. `iso` and `unix` are machine formats. |
| `locale` | `string` | `'en-US'` | Passed to `Intl.DateTimeFormat`. |
| `time-zone` | `string` | — | IANA timezone (e.g. `"UTC"`, `"Europe/London"`). |
| `show-label` | `boolean` (attribute `show-label`) | `false` | Prepends the static `DATE //` prefix in muted mono (styled appropriately for CRT). |
| `variant` | `'default' \| 'crt'` (reflects) | `'default'` | `crt` applies dark panel background + phosphor colors and text glow. |

## Slots

None. Output is fully generated.

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | Container span. |
| `value` | The formatted date string. |

## Events

None.

## Variants

- **default / medium, short, long, full**: Institutional light-surface mono uppercase via `Intl`.
- **crt**: Produces `2026-05-14 // 14:30:05` with optional phosphor frame when `variant="crt"`.
- **iso / unix**: Raw machine-readable strings (useful for data attributes or logs).
- **show-label**: Adds the "DATE //" header prefix for consistent dashboard labeling.

## Accessibility

- The rendered date text is plain, readable content — screen readers announce it naturally.
- When used as a live clock, wrap the element (or its parent) in a region with `aria-live="polite"`.
- `show-label` text is visible (not `aria-hidden`) and provides useful context.
- No interactive states; purely presentational.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#data-visualization--crt).

- **CRT signature format**: The `format="crt"` style (`YYYY-MM-DD // HH:MM:SS`) is the canonical THX timestamp used across logs, event feeds, and instrument panels. It uses double-slash separators for visual separation of date and time.
- **Uppercase discipline**: All output is forced uppercase for the THX aesthetic. `Intl` output is uppercased in the component.
- **Label prefix**: The `show-label` attribute injects a static "DATE //" prefix using `::before` so the whole line reads as a single labeled datum.
- **AI-friendly minimalism**: Instead of writing formatting utilities or importing date libs in every template, authors (human or LLM) simply write `<thx-format-date date="..." format="crt">` and obtain perfect, on-brand output.
- **Locale & TZ support**: Full `Intl` power is exposed without requiring the consumer to know the API.
- **Pairing**: Frequently combined with `thx-relative-time` for "absolute + relative" displays and with `thx-format-number` / `thx-format-bytes` inside CRT instrument banks.

The formatter family (`bytes`, `date`, `number`, `relative-time`) forms the data-presentation layer of the THX 1138 library — zero-JS, semantic, instantly recognizable in any control-room interface.

## Related Components

- [thx-format-bytes](./thx-format-bytes.md)
- [thx-format-number](./thx-format-number.md)
- [thx-relative-time](./thx-relative-time.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-chart-monitors](./thx-chart-monitors.md)
