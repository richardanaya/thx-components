# thx-status-leds

**THX 1138 styled status LED array / indicator bank.**

A compact horizontal or grid-capable array of small square LEDs that can be driven by an array of `{active, state}` objects or a simple `count` with default pattern. Supports normal (blue), warning (amber), and error (red) illumination with appropriate glow. The canonical micro-indicator for multi-channel health, channel status, or binary state matrices in control-room UIs.

## Import

```js
import 'thx-components/src/components/thx-status-leds.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-status-leds count="8" label="BANK A"></thx-status-leds>
```

## Advanced Usage

### Explicit LED States

```html
<thx-status-leds 
  label="CORE STATUS" 
  .leds=${[
    {active:true, state:'normal'},
    {active:true, state:'normal'},
    {active:false},
    {active:true, state:'warning'},
    {active:true, state:'error'}
  ]}>
</thx-status-leds>
```

### Inside CRT Displays

```html
<thx-crt-display label="SIG-ARRAY // CHANNEL HEALTH">
  <thx-status-leds count="12"></thx-status-leds>
</thx-crt-display>
```

### Combined with Relative Time or Badges

```html
<div class="status-line">
  <thx-status-leds count="4"></thx-status-leds>
  <thx-relative-time date="..." live></thx-relative-time>
  <thx-badge variant="pulse">LIVE</thx-badge>
</div>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `leds` | `Array<{active:boolean, state?:'normal'\|'warning'\|'error'}>` | `[]` | Explicit LED data. When provided, overrides `count`. |
| `count` | `number` | `8` | Number of LEDs to render when `leds` is empty. Default pattern lights first half. |
| `label` | `string` | `''` | Optional uppercase mono label rendered above the LED row. |

## Slots

None.

## Accessibility

- The array is decorative. Provide a visible `label` or surrounding text that describes what the LEDs represent (e.g. "Channel health: 6 of 8 nominal").
- Individual LEDs have no interactive or semantic role beyond color and illumination.
- When the meaning is critical, also surface the state in text (`thx-badge`, `thx-tag`, or plain content).

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#status-indicators-and-leds).

- **Square micro-LEDs**: 8×8 px base size with 1px border — the exact geometry used for status dots on avatars and inside badges.
- **Glow**: Active LEDs receive a soft box-shadow in the appropriate accent color (blue primary, amber warning, red error).
- **Default pattern**: When only `count` is supplied, the first `count/2` LEDs are lit (nominal state) — useful for quick "half healthy" demos.
- **Label styling**: Uses the same `label-sm` mono uppercase typography as other micro-labels.
- **AI-friendly**: `<thx-status-leds count="6" label="NODES">` is the minimal declaration for a beautiful multi-channel status row.
- **Density**: Extremely compact — multiple arrays can be placed in a single instrument without visual weight.
- **Pairing**: Frequently appears next to `thx-relative-time`, `thx-format-number`, and inside `thx-crt-display` or `thx-badge` racks.

## Related Components

- [thx-badge](./thx-badge.md)
- [thx-avatar](./thx-avatar.md) — uses similar status dot logic
- [thx-spinner](./thx-spinner.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-status-leds] is the array counterpart to the single pulsing dot on `thx-relative-time` (when `live`)
