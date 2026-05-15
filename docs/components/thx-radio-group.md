# thx-radio-group

The `<thx-radio-group>` component is the authoritative container and state manager for THX-1138 radio selections. It accepts `<thx-radio>` or `<thx-radio-button>` children, enforces mutual exclusivity, wires keyboard arrow navigation (including Home/End), provides an optional uppercase label with required indicator, supports vertical or horizontal orientation, and participates fully in native forms.

Use it for any exclusive choice — priority levels, display modes, sectors, protocols, or profiles — where the sterile control-room aesthetic and reliable keyboard behavior are required.

## Import

```js
import 'thx-components/src/components/thx-radio-group.js';
import 'thx-components/src/components/thx-radio.js';        // or thx-radio-button
```

Bundle import automatically registers the group and its supported children:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

Standard square radios (default variant):

```html
<thx-radio-group name="priority" label="PRIORITY" value="observe" required>
  <thx-radio value="observe">OBSERVE</thx-radio>
  <thx-radio value="intercept">INTERCEPT</thx-radio>
  <thx-radio value="isolate">ISOLATE</thx-radio>
</thx-radio-group>
```

Button / segmented style (classic control-panel look):

```html
<thx-radio-group label="DISPLAY PROFILE" value="cold" variant="button">
  <thx-radio-button value="cold">COLD</thx-radio-button>
  <thx-radio-button value="scope">SCOPE</thx-radio-button>
  <thx-radio-button value="black">BLACK</thx-radio-button>
</thx-radio-group>
```

## Properties

| Property      | Type    | Default     | Description |
|---------------|---------|-------------|-------------|
| `value`       | string  | `''`        | The currently selected child's `value`. Two-way bound. |
| `name`        | string  | `''`        | Form field name used for submission (applied to all children). |
| `label`       | string  | `''`        | Uppercase mono group label rendered above the radios. |
| `orientation` | string  | `'vertical'`| Layout: `'vertical'` or `'horizontal'`. |
| `disabled`    | boolean | `false`     | Disables the entire group and all children (reflected). |
| `required`    | boolean | `false`     | Marks selection as required; shows red asterisk in label and sets `aria-required`. |
| `variant`     | string  | `'default'` | `'default'` (square radios) or `'button'` (uses `thx-radio-button` children inside a bordered segmented container). |
| `errorMessage`| string  | `''`        | When set, displays the message below the group in error color and sets `aria-invalid`. |

## Slots

- (Default) — Exclusively for `<thx-radio>` or `<thx-radio-button>` children. `slotchange` automatically triggers `syncRadios()`.
- `help-text` — Optional descriptive text shown below the radios (muted mono uppercase). Only rendered when no `errorMessage` is present. Receives the `.group-label` styling.

## Events

- `change` — Dispatched after the user (or `select()` call) changes the selected value. Bubbles and composed. The `value` property is already updated and children are synchronized.

## Variants & Features

- **Layout** (`orientation`):
  - `vertical` (default): Stacked column with `--size-2` gaps — best for forms and labeled lists.
  - `horizontal`: Row layout with wrapping; ideal for compact mode selectors.
- **Visual variants** (`variant`):
  - `default`: Children appear as individual square (or rounded) radios.
  - `button`: Children are rendered inside a single bordered container with right-border separators (classic segmented button group). Hover and active states are coordinated.
- **Automatic child synchronization**: On `value` change, slotchange, or update, the group sets `name`, `checked`, and `disabled` on every `thx-radio` / `thx-radio-button` descendant. Previous per-child disabled states are preserved when the group is re-enabled.
- **Full keyboard navigation** (when group container receives focus):
  - ArrowRight / ArrowDown: Move to next enabled radio/button (wraps).
  - ArrowLeft / ArrowUp: Move to previous (wraps).
  - Home: Jump to first enabled option.
  - End: Jump to last enabled option.
  - The focused child receives `.focus()` call.
- **Form participation (improved)**: Powered by `FormAssociatedMixin` + `ElementInternals`. The group's `value` (when not disabled) is submitted under the `name`. `form.reset()` restores the original `value` and re-syncs children. Disabled groups submit nothing. Works identically for both radio and radio-button children.
- **Label & validation**: Optional `label` + red required asterisk. `errorMessage` provides inline validation feedback using the critical `--accent-error` color. Help text via slot only appears when no error is present.
- **Programmatic API**:
  - `select(value)` — Sets value, syncs children, dispatches `change`.
  - `options` getter — Returns array of `{value, label, disabled}` from current children.
  - `radioElements` getter — Live list of child `thx-radio` / `thx-radio-button` elements.
- **Dynamic children**: Adding or removing radios at runtime automatically re-syncs via slotchange.

## Accessibility

- Container carries `role="radiogroup"`, `aria-labelledby` (when label present), `aria-describedby` (error or help), `aria-required`, and `aria-invalid`.
- Individual children expose their native `role="radio"` / `aria-checked` (or the button variant's explicit attributes).
- Full roving focus managed internally; only one element in the tab order at a time.
- Arrow keys, Home, and End are handled with `preventDefault` for expected radio-group behavior.
- Disabled state on group or individual items is properly conveyed (`aria-disabled`, skipped in arrow navigation).
- Label text, required indicator, error messages, and help-text are all announced by screen readers in logical order.
- Focus-visible glow appears on the group container and is delegated to the active child element.

## Design Notes

`thx-radio-group` is the orchestration layer that makes individual radio controls production-ready while preserving the exact THX visual language:

- **Typography**: Group label uses the signature Courier New uppercase mono with `--font-letterspacing-4`. Error and help text reuse the same muted `.group-label` class.
- **Geometry**: Children maintain square or button geometry. In `button` variant a single outer border + internal dividers create the authentic segmented control look from 1970s–80s instrumentation.
- **Color**: Error uses `--accent-error` (#D44000). Active button fills use `--atmos-primary`. All else stays in the neutral gray family.
- **Spacing discipline**: Consistent `--size-2` / `--size-3` gaps ensure perfect vertical rhythm when mixed with `thx-input`, `thx-select`, `thx-range`, etc.
- **Form integration**: The improved mixin-based participation means radio groups behave like native `<input type="radio">` groups for `FormData`, validation, and reset — a major improvement over older manual implementations.
- **No visual CRT attribute**: Like other form controls, the group lives on the light institutional surface. It looks excellent inside `<thx-crt-display>` or dark panels; the phosphor focus glow remains visible.

## Examples

### Priority selector in a form (ultradashboard)

```html
<thx-radio-group name="priority" label="PRIORITY" value="observe" required>
  <thx-radio value="observe">OBSERVE</thx-radio>
  <thx-radio value="intercept">INTERCEPT</thx-radio>
  <thx-radio value="isolate">ISOLATE</thx-radio>
</thx-radio-group>
```

### Horizontal layout with help text

```html
<thx-radio-group 
  name="transmission" 
  label="TRANSMISSION" 
  value="secure" 
  orientation="horizontal">
  <thx-radio value="secure">SECURE</thx-radio>
  <thx-radio value="open">OPEN</thx-radio>
  <thx-radio value="jammed" disabled>JAMMED</thx-radio>
  <span slot="help-text">SECURE RECOMMENDED FOR CLASSIFIED</span>
</thx-radio-group>
```

### Segmented button variant (control-room classic)

```html
<thx-radio-group label="DISPLAY PROFILE" value="cold" variant="button">
  <thx-radio-button value="cold">COLD</thx-radio-button>
  <thx-radio-button value="scope">SCOPE</thx-radio-button>
  <thx-radio-button value="black">BLACK</thx-radio-button>
</thx-radio-group>
```

### With validation error

```html
<thx-radio-group 
  name="sector" 
  label="SECTOR" 
  value="" 
  required 
  errorMessage="SELECTION REQUIRED FOR MISSION COMMIT">
  <thx-radio value="7g">SECTOR 7-G</thx-radio>
  <thx-radio value="8h">SECTOR 8-H</thx-radio>
</thx-radio-group>
```

### Programmatic usage and reset handling

```js
const group = document.querySelector('thx-radio-group[name="priority"]');
group.value = 'isolate';          // updates UI + form value
group.select('intercept');        // same + fires change event

// Listen for changes
group.addEventListener('change', () => {
  console.log('Selected priority:', group.value);
});

// Reset via containing form
form.reset();                     // group restores _defaultValue and syncs children
```

### Dense control stack mixing radio-group with other THX inputs

```html
<thx-card label="OPERATIONAL PARAMETERS">
  <thx-select label="SECTOR" name="sector">...</thx-select>
  <thx-range label="POWER LIMIT" value="75" min="0" max="100" show-ticks></thx-range>
  <thx-radio-group label="ENGAGEMENT RULES" name="rules" value="observe">
    <thx-radio value="observe">OBSERVE</thx-radio>
    <thx-radio value="engage">ENGAGE</thx-radio>
  </thx-radio-group>
</thx-card>
```

The `<thx-radio-group>` is the recommended way to deploy radio selection in any THX-1138 interface. It guarantees consistent state, excellent keyboard ergonomics, proper form submission, and the precise visual language of the design system whether you choose the quiet square radio style or the bold segmented button style. Pair it with `thx-range`, `thx-rating`, and `thx-color-picker` for complete specialized control panels.
