# thx-range

The `<thx-range>` component is a fully styled, THX-1138-inspired range slider for continuous or stepped numeric input. It features an uppercase mono label, an always-visible current value badge, a custom progress fill overlay on the track, optional tick marks, and support for min/max/step — all while participating natively in forms.

Ideal for control-room parameters such as sedation ceiling, power limits, volume, opacity, scan speed, or any numeric threshold that benefits from immediate visual feedback and precise keyboard adjustment.

## Import

```js
import 'thx-components/src/components/thx-range.js';
```

Bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-range 
  name="sedation" 
  label="SEDATION CEILING" 
  value="68" 
  min="0" 
  max="100" 
  show-ticks>
</thx-range>
```

With help text and custom formatting:

```html
<thx-range 
  name="power" 
  label="REACTOR OUTPUT" 
  value="75" 
  min="0" 
  max="100" 
  step="5"
  value-format="{value}%">
  <span slot="help-text">ADJUST WITH ARROW KEYS OR DRAG</span>
</thx-range>
```

## Properties

| Property      | Type    | Default   | Description |
|---------------|---------|-----------|-------------|
| `value`       | number  | `50`      | Current slider value (clamped to min/max). |
| `min`         | number  | `0`       | Minimum allowed value. |
| `max`         | number  | `100`     | Maximum allowed value. |
| `step`        | number  | `1`       | Increment step for keyboard and drag. |
| `disabled`    | boolean | `false`   | Disables the slider (reflected). |
| `label`       | string  | `''`      | Uppercase mono label displayed above the track. Red `*` when `required`. |
| `name`        | string  | `''`      | Form field name for submission. |
| `required`    | boolean | `false`   | Marks as required for form validation. |
| `showValue`   | boolean | `true`    | Shows the live value badge to the right of the label. |
| `valueFormat` | string  | `'{value}'` | Format string for the value display; `{value}` is replaced. |
| `showTicks`   | boolean | `false`   | Renders numeric tick labels below the track. |
| `tickCount`   | number  | `5`       | Number of intervals for ticks (produces `tickCount + 1` labels). |
| `errorMessage`| string  | `''`      | Displays error text below and sets `aria-invalid`. |

## Slots

- `help-text` — Descriptive guidance or units displayed below the slider in muted mono when no `errorMessage` is present.

## Events

- `input` — Dispatched on every value change during drag or keyboard adjustment (live). Bubbles and composed. `value` is already updated.
- `change` — Dispatched when the user commits the change (mouse release or blur after keyboard). Bubbles and composed.

Both events mirror native `<input type="range">` semantics.

## Variants & Features

- **Value display**: Prominent mono badge (`value-display`) always shows the formatted current value unless `showValue` is false. Uses a subtle gray background for visual weight.
- **Progress overlay**: A secondary `progress-bar` layer (using `--atmos-secondary`) sits behind the native track and grows to reflect `(value - min) / (max - min)`. Gives immediate "filled" visual feedback without relying solely on the thumb.
- **Tick marks** (`showTicks`): Generates evenly spaced uppercase labels using the `tickCount` intervals. Useful for reference points ("0 25 50 75 100").
- **Custom formatting**: `valueFormat="{value}%"` or `"{value} KM/H"` produces clean machine-style readouts.
- **Form participation (improved)**: Full `ElementInternals` support via `FormAssociatedMixin`. Submits the numeric `value` (as string) when not disabled. `form.reset()` restores `_defaultValue`. Validation attributes (`required`, `min`, `max`) are forwarded to the native input.
- **Focus handling**: The native range input receives focus. The focus-visible mixin supplies a clean phosphor glow on the thumb on `:focus-visible`. Hover brightens the thumb to primary blue with a soft glow.
- **Keyboard support** (native + enhanced):
  - Arrow keys move by `step`.
  - Home / End jump to min / max.
  - The component exposes public `focus()` and `blur()` methods that delegate to the internal input.
- **Disabled state**: Opacity reduced; cursor becomes not-allowed; form value omitted.
- **Progress calculation & ticks** are computed reactively in getters (`progressPercentage`, `tickValues`, `formattedValue`).

## Accessibility

- Native `<input type="range">` provides core semantics (`role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` via browser).
- `aria-describedby` points to error or help-text id.
- `aria-invalid` and `aria-required` are set when appropriate.
- The label is properly associated via `for`/`id`.
- Focus ring (phosphor glow) appears only on keyboard focus per the focus-visible mixin.
- Screen readers announce the label, current value, min/max, and any help or error text.
- The entire track is keyboard and pointer accessible; no custom elements block interaction.

## Design Notes

`thx-range` follows the exact visual grammar of THX form controls while solving the notoriously inconsistent native range styling:

- **Track & thumb**: Track is `--size-2` tall, light gray. Thumb is a square `--size-3` dark block (zero radius) that turns phosphor blue on hover. The progress fill uses secondary gray for a layered "tape" effect.
- **Typography**: Label and value badge use Courier New uppercase with appropriate letter-spacing. Value badge has a distinct gray pill-like background that feels like a digital readout.
- **Geometry**: All elements are square-cornered. The slider container uses precise vertical rhythm (`--size-2` gaps) so a range placed next to an input or select aligns perfectly in a `forms-grid`.
- **Color**: Operational accent (primary blue) only appears on hover/focus of the thumb and in the progress bar — never decorative. Error state uses the critical orange-red.
- **No custom thumb SVG**: Leverages `::-webkit-slider-thumb` and `::-moz-range-thumb` with identical square styling for cross-browser pixel consistency.
- **Value visibility**: Unlike many sliders that hide the number, THX always shows the formatted value badge — critical for control-room legibility where operators must read exact parameters at a glance.
- The implementation deliberately keeps the native input (for a11y, keyboard, form) while adding the progress layer and value UI that native range lacks.

## Examples

### Sedation ceiling with ticks (ultradashboard)

```html
<thx-range
  name="sedation"
  label="SEDATION CEILING"
  value="68"
  min="0"
  max="100"
  show-ticks>
  <span slot="help-text">Keyboard adjustable with arrows, Home, and End.</span>
</thx-range>
```

### Power output with percentage formatting and step

```html
<thx-range 
  name="reactor" 
  label="REACTOR OUTPUT" 
  value="75" 
  min="0" 
  max="100" 
  step="5"
  value-format="{value}%"
  show-ticks
  tick-count="4">
</thx-range>
```

### Disabled range with error

```html
<thx-range 
  name="override" 
  label="MANUAL OVERRIDE" 
  value="20" 
  min="0" 
  max="50" 
  disabled
  error-message="OVERRIDE LOCKED BY CENTRAL">
</thx-range>
```

### Compact range without value badge (for tight panels)

```html
<thx-range 
  label="OPACITY" 
  value="0.8" 
  min="0" 
  max="1" 
  step="0.05" 
  value-format="{value}"
  show-value="false">
</thx-range>
```

### Inside a CRT display (monitor instrumentation)

```html
<thx-crt-display label="GAIN">
  <thx-range 
    name="gain" 
    value="42" 
    min="0" 
    max="100" 
    show-ticks>
  </thx-range>
</thx-crt-display>
```

### Programmatic control

```js
const range = document.querySelector('thx-range[name="sedation"]');
range.value = 90;                    // live update + form sync
range.focus();
range.addEventListener('input', e => {
  console.log('Live value:', range.value);
});
range.addEventListener('change', e => {
  console.log('Committed:', range.value);
});
```

The `thx-range` delivers precise, instantly legible numeric control in the THX language: square geometry, explicit value readout, progress visualization, and robust form + keyboard behavior. It is the recommended slider for any dashboard, terminal, or instrumentation interface that must feel like real equipment rather than a generic web widget. Pairs naturally with `thx-radio-group`, `thx-rating`, and `thx-color-picker` in specialized input sections.
