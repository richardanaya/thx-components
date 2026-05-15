# thx-checkbox

The `<thx-checkbox>` component renders a square, THX-1138-styled boolean toggle with an optional label. It uses a custom-drawn checkbox (dark fill + white geometric indicator) instead of the native browser appearance while remaining fully accessible and form-participating. The indeterminate state is supported for "select all" master checkboxes that reflect mixed child states.

Checkboxes are compact inline controls that fit the sterile, square geometry of the design system. Use them for binary flags, multi-select lists, consent toggles, or any "on/off" setting in a control-room interface. The label is provided via the default slot so authors can include rich or uppercase mono text.

## Import

```js
import 'thx-components/src/components/thx-checkbox.js';
```

Bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-checkbox name="ack" value="yes" checked>ACKNOWLEDGED</thx-checkbox>
```

With slotted label text (recommended style: uppercase):

```html
<thx-checkbox name="log" checked>
  LOG TO CENTRAL
</thx-checkbox>
```

## Properties

| Property      | Type    | Default | Description |
|---------------|---------|---------|-------------|
| `checked`     | boolean | `false` | Whether the checkbox is checked. Reflected as attribute. |
| `indeterminate`| boolean| `false` | Tri-state "mixed" indicator (horizontal line). Cleared automatically on user toggle. |
| `disabled`    | boolean | `false` | Disables interaction and fades the control (reflected). |
| `value`       | string  | `'on'`  | The value submitted to the form when checked. |
| `name`        | string  | `''`    | Form field name. |

## Slots

- (Default) — The label text or content displayed to the right of the checkbox square. Typically uppercase mono text for consistency with the rest of the system. The slot content receives the `.label` mono styling.

## Events

- `change` — Dispatched after the checked state is toggled by user interaction or programmatic call. Bubbles and composed. The `checked` property is already updated.

No `input` event is dispatched (checkbox semantics are discrete).

## Variants & Features

- **Checked state**: Square box receives dark fill (`#333`) and the check indicator (white geometric X) becomes visible.
- **Indeterminate state**: Dark fill with a white horizontal bar (useful for "some children selected" master checkboxes). Setting `indeterminate` does not affect the underlying `checked` value.
- **Custom drawn control**: The visual is a  `var(--size-3)` square using borders, background, and two absolutely positioned SVG icons (one for check, one for indeterminate). No browser-native checkbox appearance leaks through.
- **Toggle behavior**: Clicking the wrapper, pressing Space/Enter on the focused element, or interacting with the hidden input all call `toggle()`, which flips `checked`, clears `indeterminate`, and fires `change`.
- **Form participation**: When `checked` and not disabled, submits the `value` (defaults to "on"). Works correctly inside `<form>` with reset support. The mixin handles `ElementInternals`.
- **Keyboard**: Full keyboard accessibility via the wrapper (`tabindex`, `role="checkbox"`). Space and Enter toggle the state.
- **Indeterminate clearing**: Any user-initiated toggle (click or keyboard) automatically sets `indeterminate = false`.

## Accessibility

- The outer wrapper carries `role="checkbox"`, `aria-checked` (values: `"true"`, `"false"`, or `"mixed"`), and `aria-disabled`.
- A hidden native `<input type="checkbox">` is present for form submission and fallback but is visually suppressed (`tabindex="-1"`) and does not receive direct focus.
- Focus ring (phosphor glow) is applied to the wrapper on keyboard focus.
- Label text in the slot is associated via proximity and click target expansion (the whole row is clickable).
- `user-select: none` prevents accidental text selection on the label.
- Disabled state is properly conveyed.

## Design Notes

`thx-checkbox` is a pure expression of the system's square, minimal, instrumentation aesthetic (DESIGN.md):

- **Geometry**: Perfect square checkbox (`--size-3` ≈ 12–16px depending on Open Props scale) with zero radius. Matches the "square is default" rule.
- **States**: Inactive border uses `--neutral-600`. Checked/indeterminate use dark `#333` fill (high contrast on light surface). The checkmark and indeterminate bar are white strokes with square line caps.
- **Typography**: Label uses Courier New mono at `--font-size-0`. Authors are expected to supply uppercase content in the slot to match labels on `thx-input`, `thx-select`, etc.
- **Focus**: Soft phosphor glow ring (`rgba(166,200,225,0.5)`) instead of a hard outline — consistent with all other form controls.
- **Hover**: Subtle border emphasis only; no color fill until checked.
- **Size & spacing**: Uses the design token spacing (`--size-2` gap between box and label) so it aligns with other compact controls.
- The implementation deliberately avoids native checkbox styling quirks while preserving semantic and form behavior.

## Examples

### Standalone with uppercase label

```html
<thx-checkbox name="confirmed" value="true" checked>
  MISSION CONFIRMED
</thx-checkbox>
```

### Indeterminate "select all" pattern (script example)

```html
<thx-checkbox id="select-all"></thx-checkbox>

<script>
  const master = document.getElementById('select-all');
  master.indeterminate = true;   // shows mixed state
  master.addEventListener('change', () => {
    master.indeterminate = false;
    // propagate to children...
  });
</script>
```

### Disabled state

```html
<thx-checkbox disabled checked>
  ARCHIVE TO VAULT
</thx-checkbox>
```

### Group of checkboxes (manual)

```html
<div style="display: flex; flex-direction: column; gap: 4px;">
  <thx-checkbox name="sys" value="a">ENABLE TELEMETRY</thx-checkbox>
  <thx-checkbox name="sys" value="b">LOG TO BLACK BOX</thx-checkbox>
  <thx-checkbox name="sys" value="c" checked>STREAM TO CONTROL</thx-checkbox>
</div>
```

### Inside a labeled panel

```html
<thx-card label="OPTIONS">
  <thx-checkbox checked>AUTO ESCALATE ON AMBER</thx-checkbox>
  <thx-checkbox>REQUIRE SECOND AUTH</thx-checkbox>
</thx-card>
```

The `thx-checkbox` is the foundation for all boolean toggles in the library. Its square, high-contrast, mono-labeled presentation makes it perfect for dense forms, settings panels, and any interface that must feel like a mechanical switchboard rather than a consumer web UI. It pairs naturally with `thx-switch`, `thx-radio`, and the multi-select components.