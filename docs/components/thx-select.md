# thx-select

The `<thx-select>` component is a fully custom, THX-1138 styled dropdown selector that replaces the native `<select>` with a control-room aesthetic. It renders a trigger button with an uppercase mono label, bottom border, down arrow, and a positioned dropdown list populated exclusively by `<thx-option>` child elements. The entire experience — toggle behavior, keyboard navigation, ARIA, and visual states — is implemented in Lit to guarantee consistent square geometry, phosphor accents, and uppercase typography across all environments.

Use it for choosing sectors, modes, asset classes, or any discrete enumerated value in a sterile instrumentation interface. It participates in native forms and provides rich keyboard accessibility (arrows, Home/End, Enter/Space, Escape).

## Import

```js
import 'thx-components/src/components/thx-select.js';
import 'thx-components/src/components/thx-option.js';
```

Bundle import automatically includes both:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-select name="sector" label="SECTOR" value="7g" required>
  <thx-option value="7g">SECTOR 7-G</thx-option>
  <thx-option value="8h">SECTOR 8-H</thx-option>
  <thx-option value="9k">SECTOR 9-K</thx-option>
</thx-select>
```

## Properties

| Property     | Type    | Default     | Description |
|--------------|---------|-------------|-------------|
| `value`      | string  | `''`        | The currently selected value (must match an option's `value`). |
| `placeholder`| string  | `'SELECT...'` | Text shown in the trigger when no value is selected. |
| `label`      | string  | `''`        | Uppercase mono label above the trigger. Red asterisk shown when `required`. |
| `name`       | string  | `''`        | Form field name. |
| `disabled`   | boolean | `false`     | Disables the entire control (reflected). Trigger and dropdown interactions blocked. |
| `required`   | boolean | `false`     | Marks the select as required for form validation. |
| `open`       | boolean | `false`     | Current open/closed state of the dropdown (reflected as attribute; useful for styling or testing). |
| `options`    | (getter)| —           | Read-only array of parsed `{value, label, disabled}` objects derived from child `thx-option` elements. |

## Child Components

The select is populated exclusively via `<thx-option>` elements placed as direct children:

```html
<thx-option value="alpha" [disabled]>ALPHA PROTOCOL</thx-option>
```

**thx-option properties** (set as attributes):

- `value` (string, required) — The submitted value.
- `label` (string, optional) — Display text; falls back to textContent or value.
- `disabled` (boolean) — Prevents selection of this option.
- `selected` (boolean, internal) — Occasionally set by the parent for styling.

The `thx-option` host itself is `display: none`; its role is purely declarative data. All rendering occurs inside the parent `thx-select`'s dropdown.

## Slots

- (Default / unnamed) — Exclusively for `<thx-option>` children. A hidden slot listens for `slotchange` to re-sync the option list dynamically.

No `help-text`, `prefix`, or `suffix` slots (unlike `thx-input`). This keeps the component vertically compact and aligned with sibling inputs that conditionally render status rows.

## Events

- `change` — Dispatched after a new option is selected via click or keyboard. Bubbles and composed. The `value` property is already updated.

No `input` event (discrete selection model).

## Variants & Features

- **Custom dropdown**: Absolutely positioned panel with light background, subtle border, and box-shadow. Max height 200px with internal scrolling. "NO OPTIONS" placeholder when empty.
- **Visual states**:
  - Trigger hover: darker bottom border.
  - Focus: phosphor blue border + glow.
  - Open: border stays phosphor blue; arrow rotates 180°.
  - Selected option: phosphor blue (`#A6C8E1`) background fill with dark text.
  - Disabled options: reduced opacity, no pointer.
- **Keyboard navigation** (when focused):
  - `Space` / `Enter`: Toggle open or select active item.
  - `ArrowDown` / `ArrowUp`: Open and move between enabled options (wraps, skips disabled).
  - `Home` / `End`: Jump to first/last enabled option and open.
  - `Escape` / `Tab`: Close dropdown.
- **Programmatic API**:
  - `.toggle()`, `.close()`, `.select(value)`
  - `.focus()`, `.blur()`
  - `.options` getter
- **Form integration**: Full support via FormAssociatedMixin. Value is submitted when a matching option exists. Resets correctly and omits disabled state.
- **Dynamic options**: Adding/removing/reordering `<thx-option>` children automatically updates the internal list and selected state.
- **No native `<option>` support**: Must use `<thx-option>` for correct styling and data extraction.

## Accessibility

- Trigger uses `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, and `aria-activedescendant`.
- Dropdown listbox and individual options use proper ARIA roles (`listbox`, `option`) with `aria-selected` and `aria-disabled`.
- Label association via `aria-labelledby`.
- Full keyboard operability matching native select expectations plus Home/End support.
- Disabled state conveyed via `aria-disabled`.
- Focus management and visible focus ring follow the system's phosphor glow pattern.
- Screen readers receive accurate announcements of the current selection and available choices.

## Design Notes

`thx-select` embodies the rigid, machine-like form controls described in DESIGN.md:

- **Trigger styling**: Identical bottom-border treatment, mono uppercase text, square corners, and height as `thx-input` for perfect sibling alignment in form grids.
- **Dropdown**: Light surface (`#fafafa`) with hairline border; no rounded corners. Selected state uses the primary phosphor fill exactly as active tabs or buttons.
- **Arrow**: Simple SVG chevron (no icon font) that rotates on open — mechanical and minimal.
- **Typography**: All labels, options, and placeholder text are forced to uppercase Courier New with consistent letter-spacing.
- **No status row**: Deliberately omits help/error lines so that a `thx-select` placed next to a `thx-input` with conditional help-text will remain vertically aligned (the input's status logic was written with this in mind).
- **Color**: Phosphor blue only for focus, open state, and selected option highlight. Everything else is neutral gray.
- The component extends the classless aesthetics baseline for `select` elements while replacing the unpredictable native dropdown with a controlled, themeable list.

## Examples

### Sector selector (from ultradashboard)

```html
<thx-select name="sector" label="SECTOR" value="7g" required>
  <thx-option value="7g">SECTOR 7-G</thx-option>
  <thx-option value="8h">SECTOR 8-H</thx-option>
  <thx-option value="9k">SECTOR 9-K</thx-option>
</thx-select>
```

### With disabled option and custom placeholder

```html
<thx-select label="PROTOCOL" name="protocol" placeholder="CHOOSE MODE">
  <thx-option value="stealth">STEALTH PROTOCOL</thx-option>
  <thx-option value="direct" disabled>DIRECT TRANSMISSION</thx-option>
  <thx-option value="relay">RELAY VIA HUB</thx-option>
</thx-select>
```

### Programmatic control (example in script)

```html
const sel = document.querySelector('thx-select[name="sector"]');
sel.value = '9k';                    // selects and updates display
sel.select('8h');                    // also dispatches change
sel.open = true;                     // opens dropdown
sel.focus();
```

### In a dense form grid

```html
<div class="forms-grid">
  <thx-input label="OPERATOR" name="operator" required></thx-input>
  <thx-select label="SECTOR" name="sector" value="7g">
    <thx-option value="7g">SECTOR 7-G</thx-option>
    <!-- ... -->
  </thx-select>
</div>
```

The `thx-select` + `thx-option` pair gives LLM authors complete control over enumerated fields while guaranteeing the cold, precise, uppercase, square visual language required by the THX aesthetic. It is the recommended choice over native `<select>` inside any THX dashboard or terminal interface.