# thx-multi-select

The `<thx-multi-select>` component provides a custom multi-choice dropdown in the THX-1138 control-room style. Users can select zero or more options from a list of `<thx-option>` children. The trigger displays the current selection (first label + count badge when multiple) with the signature bottom border, uppercase mono typography, and phosphor focus treatment. The dropdown presents each choice with a square checkbox indicator that fills when selected.

It is the natural companion to `thx-select` for scenarios requiring multiple discrete values (assets, tags, sectors, filters). Full keyboard support, ARIA multi-select semantics, and native form participation (via repeated FormData entries) are included. The value property is an array of strings.

## Import

```js
import 'thx-components/src/components/thx-multi-select.js';
import 'thx-components/src/components/thx-option.js';
```

The webcomponents bundle includes everything:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-multi-select name="assets" label="ASSETS">
  <thx-option value="drone">DRONE FLEET</thx-option>
  <thx-option value="sensor">SENSOR ARRAY</thx-option>
  <thx-option value="relay">RELAY NODE</thx-option>
</thx-multi-select>
```

## Properties

| Property     | Type      | Default      | Description |
|--------------|-----------|--------------|-------------|
| `label`      | string    | `''`         | Uppercase mono label above the trigger. Red asterisk for `required`. |
| `name`       | string    | `''`         | Form field name. When multiple values are selected, repeated entries are submitted. |
| `placeholder`| string    | `'SELECT...'`| Displayed when no options are selected. |
| `disabled`   | boolean   | `false`      | Disables trigger and dropdown (reflected). |
| `required`   | boolean   | `false`      | Marks required for form validation. |
| `open`       | boolean   | `false`      | Current dropdown visibility (reflected). |
| `value`      | string[]  | `[]`         | Array of selected option values. Two-way bound; mutations update the UI and form. |
| `options`    | (getter)  | —            | Live array of the child `thx-option` DOM elements. |
| `optionData` | (getter)  | —            | Computed array of `{value, label, disabled, selected}` objects for the current state. |

## Child Components

Uses the same `<thx-option>` declarative children as `thx-select`:

```html
<thx-option value="drone" [disabled]>DRONE FLEET</thx-option>
```

Properties on `thx-option` (`value`, `label`, `disabled`) are read by the multi-select. The `selected` attribute on options is not required for usage — the parent manages selection state via the `value` array.

## Slots

- (Default) — Reserved exclusively for `<thx-option>` children. A hidden slot with `slotchange` listener keeps the internal list in sync.

No help-text or prefix/suffix slots. The component maintains the same vertical footprint as `thx-select`.

## Events

- `change` — Fired whenever a selection is toggled (add or remove). Bubbles and composed. The `value` array is already updated.

## Variants & Features

- **Selection model**: Clicking an option (or pressing Enter/Space on the active item) toggles its membership in the `value` array. Multiple items can be checked simultaneously.
- **Trigger display**:
  - Zero selections → placeholder.
  - One selection → that option's label.
  - Two or more → first label + `+N` (e.g., `DRONE FLEET +2`).
  - A phosphor-blue count badge (`badge-count`) appears to the right of the text showing the total number selected.
- **Dropdown options**: Each row contains a custom square checkbox (CSS border + checkmark pseudo-element) followed by the uppercase label. Selected rows receive the full phosphor blue background fill.
- **Keyboard navigation**: Identical rich support as `thx-select` (arrows, Home/End, Enter/Space to toggle, Escape to close). Navigation skips disabled options.
- **Form submission**: Sophisticated handling via `_updateFormValue`:
  - Disabled → null.
  - Single value or no name → simple string.
  - Multiple values with a name → `FormData` with repeated `append(name, value)` calls so server frameworks receive a proper multi-value field.
- **Dynamic children**: Adding or removing `<thx-option>` elements automatically refreshes the list and selected states.
- **Visual polish**: Phosphor hover glow on options, subtle bottom borders between choices, rotating arrow, focus ring on trigger.

## Accessibility

- Trigger: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-multiselectable` implied via the listbox.
- Listbox: `role="listbox" aria-multiselectable="true"`.
- Options: `role="option"`, `aria-selected`, `aria-disabled`.
- Full keyboard operability with proper focus management.
- Count badge and selection state are conveyed through ARIA.
- Focus-visible styles and phosphor glow match the rest of the form system.
- Disabled state properly communicated.

## Design Notes

`thx-multi-select` extends the single-select pattern while introducing multi-selection affordances that remain true to DESIGN.md:

- **Trigger**: Same height, padding, bottom border, mono uppercase, and square shape as `thx-input` and `thx-select` for seamless form grids.
- **Dropdown**: Slightly thicker phosphor border on open, elevated shadow, 250px max-height scroll container.
- **Checkboxes**: Hand-crafted square indicators (no native checkbox) using the system's geometric language. Filled dark (`#333`) with white check on selection; border matches neutral text.
- **Badge count**: Small phosphor-blue pill with dark text — a compact, machine-readable indicator that echoes badge components elsewhere in the library.
- **Typography & color**: Strict adherence to uppercase Courier labels, phosphor blue for active/selected states and focus, amber/critical reserved for warnings/errors (not used here).
- **Alignment**: Matches the height and status-row absence of `thx-select`, allowing mixed single/multi selects and inputs to sit cleanly beside one another.
- The CSS-drawn checkbox and count badge are lightweight, zero-dependency extensions of the core aesthetic.

## Examples

### Basic assets multi-select (from ultradashboard)

```html
<thx-multi-select id="asset-select" name="assets" label="ASSETS">
  <thx-option value="drone">DRONE FLEET</thx-option>
  <thx-option value="sensor">SENSOR ARRAY</thx-option>
  <thx-option value="relay">RELAY NODE</thx-option>
  <thx-option value="hub" disabled>COMMAND HUB</thx-option>
</thx-multi-select>
```

### With pre-selected values and count badge visible

```html
<thx-multi-select
  label="CLEARANCE LEVELS"
  name="clearance"
  .value=${['alpha', 'beta']}>
  <thx-option value="alpha">ALPHA CLEARANCE</thx-option>
  <thx-option value="beta">BETA CLEARANCE</thx-option>
  <thx-option value="gamma">GAMMA CLEARANCE</thx-option>
</thx-multi-select>
```

### Programmatic usage

```js
const ms = document.getElementById('asset-select');
ms.value = ['drone', 'sensor'];           // selects two, shows badge "2"
ms.toggleOption('relay');                 // adds or removes
console.log(ms.optionData);               // inspect current state
ms.focus();
```

### In a forms grid with single select and input

```html
<div class="forms-grid">
  <thx-input label="OPERATOR" name="operator" required></thx-input>
  <thx-select label="PRIMARY SECTOR" name="sector">...</thx-select>
  <thx-multi-select label="SECONDARY ASSETS" name="assets">...</thx-multi-select>
</div>
```

The component is ideal for LLM-generated command consoles, filter panels, and configuration UIs where multiple machine entities must be chosen while preserving the cold, precise, square, phosphor-accented visual system. It submits correctly to any backend expecting repeated form keys.