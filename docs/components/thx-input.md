# thx-input

The `<thx-input>` component provides a clinical, THX-1138-inspired text input control for the sterile control-room interface. It features an uppercase monospaced label, a minimalist bottom-border underline (no full box frame), phosphor-blue focus glow, square geometry, and optional prefix/suffix adornments. Designed for operator terminals, command parameters, authentication fields, and data-entry consoles where the UI must feel like instrumentation rather than a modern web form.

Built on Lit and the FormAssociatedMixin, it participates fully in native `<form>` submissions, supports standard HTML input validation attributes, exposes `focus()`/`blur()` methods, and emits the expected `input` and `change` events. Password inputs include a built-in visibility toggle using phosphor-themed symbols.

## Import

```js
import 'thx-components/src/components/thx-input.js';
```

For the full library bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-input label="USERNAME" name="username" required></thx-input>
```

## Properties

| Property      | Type    | Default   | Description |
|---------------|---------|-----------|-------------|
| `type`        | string  | `'text'`  | The HTML input type (`text`, `password`, `email`, `number`, `search`, `tel`, `url`, etc.). When set to `password`, a visibility toggle button is automatically rendered. |
| `value`       | string  | `''`      | The current input value. Two-way bound in usage; updates trigger form value sync. |
| `placeholder` | string  | `''`      | Placeholder text displayed when the field is empty. |
| `label`       | string  | `''`      | Visible label rendered above the input in uppercase Courier New with wide letter-spacing. When `required` is true, a red asterisk (`*`) is appended. |
| `disabled`    | boolean | `false`   | Disables the input (faded, non-interactive). Form value is omitted on submission. |
| `readonly`    | boolean | `false`   | Makes the field read-only (gray background). |
| `required`    | boolean | `false`   | Marks the field required for form validation. Displays a red asterisk in the label and sets `aria-required`. |
| `name`        | string  | `''`      | The form field name used for submission. |
| `autocomplete`| string  | `'off'`   | The `autocomplete` attribute passed through to the native input. |
| `minlength`   | number  | `-1`      | Minimum character length (only applied if ≥ 0). |
| `maxlength`   | number  | `-1`      | Maximum character length (only applied if ≥ 0). |
| `pattern`     | string  | `''`      | Regular expression pattern for client-side validation. |
| `errorMessage`| string  | `''`      | When provided, renders a red error status line below the input, sets `aria-invalid="true"`, and visually signals validation failure using the critical orange-red accent. |

## Slots

- `prefix` — Content injected at the left edge of the input field (e.g. unit labels, icons, or identifiers like `<span slot="prefix">ID</span>`). Automatically adds left padding to the input.
- `suffix` — Content injected at the right edge of the input field (e.g. units like `<span slot="suffix">KM</span>`). Automatically adds right padding.
- `help-text` — Descriptive guidance or metadata displayed in a muted mono uppercase status row below the field. The row only reserves vertical space when content is present (via slotchange tracking), ensuring alignment with sibling form controls such as `thx-select`.

## Events

- `input` — Dispatched on every keystroke or programmatic value change. Bubbles and is composed. The `value` property is already updated when the event fires.
- `change` — Dispatched when the user commits a change (typically on blur). Bubbles and is composed.

Both events mirror native `<input>` semantics for easy drop-in replacement in existing form logic.

## Variants & Features

- **Password toggle** (`type="password"`): A square toggle button appears on the right using `◎` (hidden) / `◉` (visible) symbols. Clicking switches between `password` and `text` types. Hover and focus use phosphor blue (`#A6C8E1`). The button is fully accessible with `aria-label` and `aria-pressed`.
- **Error state**: Set `errorMessage` to display inline validation feedback in `--accent-error` (#D44000). Clears automatically when the user corrects the value (manual clearing of the property is recommended on successful re-validation).
- **Prefix / Suffix adornments**: Ideal for machine-style identifiers ("THX-", "SECTOR", units, currency symbols). Content in these slots receives mono typography and is non-interactive (pointer-events: none).
- **Form participation**: Full native form support via `ElementInternals`. Includes `formResetCallback`, `checkValidity()`, `reportValidity()`, and `setValidity()`. The component correctly omits disabled values from submission.
- **Character constraints**: `minlength`/`maxlength`/`pattern` are forwarded to the native input and respected by the browser. No live character counter is rendered by default (add via `help-text` slot if needed).
- **CRT context**: The input itself uses the light surface theme (white background, gray bottom border). It can be placed inside `<thx-crt-display>` or dark panels; the focus ring will still glow in phosphor blue. No dedicated `crt` attribute exists on this component (unlike certain display-oriented elements).

## Accessibility

- A proper `<label>` element is always associated with the input via `id`/`for` when a `label` property is supplied.
- `aria-describedby` dynamically references either the error message or help-text slot.
- `aria-invalid="true"` and `aria-required="true"` are set based on state.
- Keyboard focus is managed by the underlying input with enhanced visible focus styles (phosphor border + soft glow ring) provided by the `focus-visible` mixin. The focus ring respects `prefers-reduced-motion`.
- All interactive elements (including the password toggle) are keyboard reachable and properly labeled.
- Screen readers announce the label, required state, current value, help text, and error messages in a logical order.

## Design Notes

The component is a direct embodiment of the DESIGN.md specification for inputs and forms:

- **Typography**: Labels and status text use `Courier New` (or `--font-mono`), `text-transform: uppercase`, and generous letter-spacing (`--font-letterspacing-4` for labels, `--font-letterspacing-2` for values/status). This creates the rigid, alphanumeric "machine label" aesthetic of the THX-1138 universe.
- **Geometry & borders**: Perfectly square (no `border-radius`). The input uses a single `2px` bottom border on a near-white (`#fafafa`) background instead of a full box — a signature of the system that keeps controls feeling embedded in the slab rather than floating.
- **Color & state signaling**: Neutral grays (`--neutral-600`, `--neutral-200`, `--neutral-800`) for inactive states. Focus activates `--atmos-primary` (#A6C8E1) border with a soft `rgba(166, 200, 225, 0.3)` glow. Errors use the critical `--accent-error` (#D44000).
- **Minimalism**: No decorative icons, gradients, or rounded corners. The password toggle and prefix/suffix are functional extensions that preserve the mono uppercase language.
- **Status row discipline**: The help/error line only occupies space when populated. This ensures vertical rhythm alignment across mixed form controls (e.g., an input next to a select that lacks a status row by default).
- The styling closely mirrors and extends the classless `aesthetics.css` rules for native `input[type="text"]` etc., ensuring consistency between bare HTML and enhanced `<thx-input>` usage.

## Examples

### With prefix, help text, and required (from ultradashboard)

```html
<thx-input 
  name="operator" 
  label="OPERATOR" 
  value="THX-1138" 
  required>
  <span slot="prefix">ID</span>
  <span slot="help-text">Authenticated command identity.</span>
</thx-input>
```

### Password input with toggle and length constraint

```html
<thx-input
  type="password"
  label="ACCESS CODE"
  name="accessCode"
  placeholder="ENTER 8-12 CHARACTERS"
  minlength="8"
  maxlength="12"
  required>
</thx-input>
```

### Error state with custom message

```html
<thx-input
  label="SECTOR CODE"
  name="sector"
  value="9K"
  errorMessage="SECTOR 9-K IS CURRENTLY OFFLINE">
</thx-input>
```

### With suffix unit indicator

```html
<thx-input
  label="RANGE"
  name="rangeKm"
  type="number"
  placeholder="0">
  <span slot="suffix">KM</span>
  <span slot="help-text">MAXIMUM OPERATIONAL DISTANCE</span>
</thx-input>
```

### Complete form grouping

```html
<form id="control-form">
  <thx-input label="OPERATOR" name="operator" value="THX-1138" required>
    <span slot="prefix">ID</span>
  </thx-input>

  <thx-input type="password" label="PASSCODE" name="passcode" required></thx-input>

  <!-- Other thx-* form controls here -->
</form>
```

The component is ideal for LLM-generated control panels, terminal UIs, and any interface requiring precise, austere form fields that feel part of a larger machine system.