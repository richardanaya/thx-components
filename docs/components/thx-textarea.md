# thx-textarea

The `<thx-textarea>` component delivers a THX-1138 styled multi-line text entry field for longer-form content such as directives, observational logs, operator notes, and system messages. It maintains the system's austere aesthetic: mono typography (default normal case for readability of prose), a bottom-border underline, phosphor-blue focus glow, and square geometry. Unlike single-line `thx-input`, textareas default to sentence case (`text-transform: none`) unless the `uppercase` attribute is applied.

It supports automatic height expansion (`autoresize`), live character counting with warning/error thresholds, configurable resize behavior, full form participation, and error/help messaging in a persistent status row. Use it wherever the interface requires extended textual input that still feels like a control-room terminal.

## Import

```js
import 'thx-components/src/components/thx-textarea.js';
```

Or via bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-textarea label="DIRECTIVE" name="order" rows="4"></thx-textarea>
```

## Properties

| Property      | Type    | Default     | Description |
|---------------|---------|-------------|-------------|
| `value`       | string  | `''`        | The current textarea content. |
| `placeholder` | string  | `''`        | Placeholder text when empty. |
| `label`       | string  | `''`        | Uppercase mono label displayed above the field. Red asterisk appended when `required`. |
| `disabled`    | boolean | `false`     | Disables the control (reflected as attribute). |
| `readonly`    | boolean | `false`     | Read-only mode (reflected as attribute). |
| `required`    | boolean | `false`     | Marks required for forms; shows red asterisk. |
| `name`        | string  | `''`        | Form submission name. |
| `rows`        | number  | `4`         | Initial visible rows (HTML `rows` attribute). |
| `cols`        | number  | `20`        | Visible character width (HTML `cols` attribute). |
| `minlength`   | number  | `-1`        | Minimum character length (applied when ≥ 0). |
| `maxlength`   | number  | `-1`        | Maximum character length (applied when ≥ 0). |
| `autoresize`  | boolean | `false`     | When true, the textarea automatically grows in height to fit its content on every input event. |
| `resize`      | string  | `'vertical'`| Resize direction: `'none'`, `'both'`, `'horizontal'`, or `'vertical'`. Applied via CSS class. |
| `errorMessage`| string  | `''`        | Displays a red error message in the left side of the status row and sets `aria-invalid`. |
| `showCharCount`| boolean| `false`     | When true, renders a live character counter (`N` or `N/M`) in the right side of the status row. Colors shift to amber at 90% and red at 100%+ of `maxlength`. |
| `uppercase`   | boolean | `false`     | When true (or attribute present), forces `text-transform: uppercase` on the textarea content. Reflected to the host element. |

## Slots

- `help-text` — Guidance or metadata text shown in the left side of the status row below the textarea (mono uppercase, muted gray). When `errorMessage` is present, the error takes precedence in the same location.

## Events

- `input` — Fired on every keystroke. The component's `value` is already updated. Bubbles and composed. Triggers `autoresize` logic when enabled.
- `change` — Fired after the user commits the change (typically blur). Bubbles and composed.

## Variants & Features

- **Auto-resize**: Enable with `autoresize`. The field starts at the `rows` height but expands vertically as the user types, removing the need for manual scrolling in many cases. Uses `scrollHeight` calculation on each input.
- **Live character counter** (`showCharCount`): Displays current length, optionally against `maxlength`. Visual states:
  - Normal: muted gray.
  - Warning (≥ 90%): `--accent-warning` amber (#D4AA00).
  - Error (≥ 100%): `--accent-error` orange-red (#D44000).
  - The counter is placed in a flex status row alongside help/error text.
- **Resize modes**: Control user resizing via the `resize` property. Default `'vertical'` matches native behavior for textareas. `'none'` produces a fixed-size field.
- **Uppercase mode**: The `uppercase` boolean/attribute applies uppercase transformation while preserving the mono font. Useful for directive-style or machine-log content that must match the rigid labeling language of the rest of the system. Note that placeholder and value remain as authored unless transformed.
- **Error display**: `errorMessage` appears in the status row using critical color and overrides the help-text slot.
- **Form association**: Full participation via FormAssociatedMixin. Supports reset, validity APIs, and proper omission of disabled values. Calls `super.updated` and `super.formResetCallback`.
- **No prefix/suffix**: Unlike `thx-input`, textareas do not support inline prefix/suffix slots to keep the multi-line surface clean.

## Accessibility

- Associated `<label>` with proper `for`/`id` linkage.
- `aria-describedby` always references the status row (help or error).
- `aria-invalid` and `aria-required` are set dynamically.
- Focus ring uses the same phosphor-blue glow treatment as other form controls.
- Keyboard navigation and native textarea behaviors (arrow keys, selection, etc.) are fully preserved.
- Character count and error messages are announced by assistive technology as part of the described-by region.
- The `disabled` and `readonly` states are properly conveyed.

## Design Notes

`thx-textarea` faithfully extends the input philosophy from DESIGN.md while adapting for multi-line use:

- **Typography**: Label and status elements use the signature Courier New uppercase mono with wide tracking. The editable area itself uses `text-transform: none` by default (and increased line-height) so that natural language directives and logs remain readable — a deliberate exception to the "always uppercase" rule for short controls. The `uppercase` attribute restores the rigid machine aesthetic when appropriate.
- **Visual treatment**: Same bottom `2px` border on `#fafafa` background, phosphor focus (`#A6C8E1` + glow), square edges, and disabled/readonly graying as `thx-input`.
- **Status row**: A persistent flex container (`justify-content: space-between`) houses help/error text on the left and the optional char counter on the right. This creates consistent horizontal rhythm below every textarea and mirrors the status discipline seen in `thx-input` (where the row is conditionally rendered).
- **Color signaling**: Warning threshold uses the reserved amber (`#D4AA00`), error uses critical orange-red (`#D44000`). These are the only chromatic accents permitted.
- **Integration**: Mirrors the `aesthetics.css` base rules for `textarea` (padding, mono font, bottom border, focus glow) while adding the label, status, autoresize, and count features.
- The component avoids rounded corners and decorative elements, keeping the field embedded in the institutional slab surface.

## Examples

### Basic directive textarea (from ultradashboard)

```html
<thx-textarea
  name="order"
  label="DIRECTIVE"
  value="Maintain observation. Escalate only if threshold exceeds amber."
  rows="4">
</thx-textarea>
```

### Auto-resizing with character count and help text

```html
<thx-textarea
  label="OBSERVATION LOG"
  name="log"
  rows="3"
  autoresize
  showCharCount
  maxlength="500"
  placeholder="Enter detailed observations...">
  <span slot="help-text">MAX 500 CHARACTERS. USE FOR CRITICAL NOTES ONLY.</span>
</thx-textarea>
```

### Uppercase machine-style notes

```html
<thx-textarea
  label="SYSTEM NOTES"
  name="sysnotes"
  rows="5"
  uppercase
  showCharCount
  maxlength="200"
  resize="none">
</thx-textarea>
```

### Error state

```html
<thx-textarea
  label="MISSION BRIEF"
  errorMessage="BRIEFING EXCEEDS CLASSIFIED LENGTH LIMIT"
  showCharCount
  maxlength="800"
  value="...">
</thx-textarea>
```

### Fixed non-resizable log area

```html
<thx-textarea
  label="TERMINAL OUTPUT"
  rows="8"
  resize="none"
  readonly
  value="THX-1138 // STATUS: NOMINAL&#10;...">
</thx-textarea>
```

The `thx-textarea` is especially suited for generating dense dashboard forms, log viewers, and command-entry UIs where both human prose and machine-style uppercase content must coexist within the same cold, precise visual language.