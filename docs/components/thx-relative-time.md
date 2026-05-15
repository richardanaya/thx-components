# thx-relative-time

**THX 1138 styled live relative time component.**

Displays human-readable "time since" or "time until" in narrow (`5M`), short (`5 MIN AGO`), or long (`5 MINUTES AGO`) formats. Automatically updates on a smart interval (more frequent for recent events). Supports warning / error aging variants, optional pulsing live indicator dot, and `badge` presentation. The canonical way to show "last updated", "incident age", or countdowns in the THX system.

## Import

```js
import 'thx-components/src/components/thx-relative-time.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-relative-time date="2026-05-14T12:00:00Z"></thx-relative-time>
<!-- 2H (narrow default) -->

<thx-relative-time date="2026-05-13T09:30:00" format="short"></thx-relative-time>
<!-- 1 DAY AGO -->

<thx-relative-time date="2026-05-20T08:00:00" format="long" live></thx-relative-time>
<!-- 5 DAYS UNTIL -->
```

## Advanced Usage

### Live Telemetry with Indicator

```html
<thx-relative-time 
  date="2026-05-14T14:05:00" 
  live 
  variant="badge">
</thx-relative-time>
```

### Aging Status (auto warning/error)

```html
<thx-relative-time 
  date="2026-05-01T00:00:00" 
  warning-threshold="86400000" 
  error-threshold="604800000">
</thx-relative-time>
<!-- Automatically receives warning or error variant when thresholds crossed -->
```

### Inside CRT Displays

```html
<thx-crt-display label="EVT-1138 // LAST CONTACT">
  <thx-relative-time date="2026-05-14T13:42:00" format="narrow" variant="crt" live></thx-relative-time>
</thx-crt-display>
```

### Countdown vs Age

The component decides suffix direction automatically:
- Past dates → "AGO"
- Future dates → "UNTIL" (narrow omits suffix)

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `date` | `string \| Date` | now | Reference date. |
| `format` | `'narrow' \| 'short' \| 'long'` | `'narrow'` | Style of output. Narrow = compact (`5M`, `2H`); Short/Long add full words and AGO/UNTIL. |
| `update-mode` | `'auto' \| 'always' \| 'never'` (attribute) | `'auto'` | `auto` = dynamic interval based on age; `always` = fixed `update-interval`; `never` = static. |
| `update-interval` | `number` (ms) | `60000` | Fallback interval when `always`. |
| `warning-threshold` | `number` (ms) | `86400000` (1 day) | Age at which `variant="warning"` is auto-applied. |
| `error-threshold` | `number` (ms) | `604800000` (7 days) | Age at which `variant="error"` is auto-applied. |
| `live` | `boolean` | `false` | Shows a pulsing amber indicator dot next to the time. |
| `variant` | `'default' \| 'crt' \| 'badge' \| 'warning' \| 'error'` (reflects) | `'default'` | Visual treatment. Warning/error can be set manually or auto-derived. |

## Slots

None.

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | Container span. |
| `value` | The relative time text. |
| `indicator` | The live pulsing dot (when `live`). |

## Events

None (internal timer-driven updates only).

## Variants

- **default**: Light-surface mono text.
- **crt**: Dark monitor frame + phosphor blue value with glow.
- **badge**: Muted phosphor pill background (great for compact status rows).
- **warning**: Amber-tinted background + border for "stale but not critical".
- **error**: Red-tinted for very old / overdue items.
- **live**: Adds the small pulsing amber dot (controlled by `live` attribute).

## Accessibility

- The relative string is plain text and announced by assistive tech.
- For rapidly changing live times, consider an `aria-live="polite"` wrapper.
- The live indicator is decorative; the `live` state is also communicated by the text itself.
- No keyboard interaction.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#data-visualization--crt).

- **Smart updating**: In `auto` mode the component chooses shorter intervals for recent events (5s when < 1 min old) and backs off to hourly for very old items — efficient and visually responsive.
- **Narrow is the default**: The ultra-compact `5M`, `3H`, `2D` style is the THX signature for dense monitor banks and log columns.
- **Auto-aging variants**: Warning and error variants are applied automatically when thresholds are crossed, giving instant visual aging without extra code.
- **Live dot**: The pulsing dot (amber) is the canonical "currently updating / streaming" marker used across badges and status elements.
- **AI-friendly**: `<thx-relative-time date="ISO" live>` is all an LLM needs to produce a correct, updating, styled relative clock that matches the rest of the interface.
- **Pairing**: Frequently used beside `thx-format-date` (absolute + relative) and inside `thx-crt-display` or `thx-badge`.

## Related Components

- [thx-format-date](./thx-format-date.md)
- [thx-format-bytes](./thx-format-bytes.md)
- [thx-format-number](./thx-format-number.md)
- [thx-badge](./thx-badge.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-status-leds](./thx-status-leds.md)
