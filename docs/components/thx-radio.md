# thx-radio

The `<thx-radio>` component is a single, THX-1138-styled radio control rendered as a perfectly square custom input (appearance: none) with a centered filled square indicator when selected. It uses neutral gray borders on a light surface and a dark `#333` fill for the active dot — a minimalist, mechanical expression of the system's instrumentation aesthetic.

It can be used standalone (relying on native `name` attribute grouping for mutual exclusivity) or, preferably, nested inside a `<thx-radio-group>` for managed state, arrow-key navigation, and unified form behavior. A `rounded` variant converts the square radio and indicator into circular form for visual variety in segmented or pill-style interfaces.

## Import

```js
import 'thx-components/src/components/thx-radio.js';
```

Full bundle (includes radio, radio-button, and radio-group):

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

Standalone (native grouping via shared `name`):

```html
<thx-radio name="mode" value="observe" checked>OBSERVE</thx-radio>
<thx-radio name="mode" value="intercept">INTERCEPT</thx-radio>
<thx-radio name="mode" value="isolate">ISOLATE</thx-radio>
```

With the `rounded` variant (circular dot and border):

```html
<thx-radio name="profile" value="standard" rounded checked>STANDARD</thx-radio>
```

## Properties

| Property   | Type    | Default | Description |
|------------|---------|---------|-------------|
| `checked`  | boolean | `false` | Whether this radio is currently selected. Reflected as attribute. |
| `disabled` | boolean | `false` | Disables interaction (faded, non-clickable). Reflected. |
| `value`    | string  | `''`    | The form submission value when selected. |
| `name`     | string  | `''`    | Form field name (used for native grouping and submission). |
| `rounded`  | boolean | `false` | When true, applies `border-radius: var(--radius-round)` to create circular radio and indicator. |

## Slots

- (Default) — Label text or rich content displayed to the right of the radio square. Receives `.label` mono uppercase styling. Recommended to use uppercase for THX consistency (e.g., "OBSERVE", "ARMED").

## Events

- `change` — Dispatched when the radio becomes checked via user interaction (click or keyboard). Bubbles and composed. The `checked` property is already `true`.

No `input` event (discrete selection semantics).

## Variants & Features

- **Square (default)**: Strict zero-radius geometry matching DESIGN.md "square is default" rule. The indicator is a smaller solid square (`--size-2`) centered inside the `--size-3` outer box.
- **Rounded (`rounded`)**: Converts both the outer border and the inner filled indicator to circular (using `--radius-round`, typically 50%). Useful when pairing with pill-shaped controls or for softer visual rhythm in button-like groups.
- **Custom drawn control**: Native `<input type="radio">` is present for semantics and form fallback but is completely restyled (appearance:none, custom ::after for the dot). No browser-native radio chrome leaks through.
- **Form participation (improved)**: Fully participates in native `<form>` submission via the `FormAssociatedMixin` and `ElementInternals`. When checked (and not disabled), submits its `value` under the shared `name`. Supports `form.reset()` correctly and omits value when disabled. Works both standalone and inside `thx-radio-group`.
- **Focus handling**: The clickable wrapper (`.radio-wrapper`) receives `tabindex` and handles keyboard activation. The `focus-visible` mixin supplies a consistent soft phosphor glow (`rgba(166,200,225,0.5)`) on keyboard focus. Mouse interaction does not trigger the heavy ring.
- **Click target**: The entire row (wrapper + label) is clickable; the hidden native input click is stopped to avoid double handling.
- **Standalone vs Grouped**: When used alone with matching `name` attributes, the browser's native radio grouping still works for mutual exclusivity. Inside `thx-radio-group`, the group takes over state management, keyboard roving, and sync.

## Accessibility

- Native `<input type="radio">` provides core semantics (`role="radio"`, `checked` state) for screen readers even though visually overridden.
- The wrapper label element is focusable (`tabindex="0"`) when enabled and responds to Space/Enter for selection.
- `aria-disabled` conveyed via disabled state and reduced opacity.
- Focus ring (phosphor glow) appears only on `:focus-visible` thanks to the focus-visible mixin and styles.
- Label text is associated via DOM proximity and expanded click target; `user-select: none` prevents accidental selection.
- When placed inside `<thx-radio-group>`, the group container provides `role="radiogroup"`, `aria-labelledby`, `aria-required`, and proper arrow-key roving focus.
- Disabled radios are skipped in keyboard navigation inside groups.

## Design Notes

`thx-radio` is a direct embodiment of the square, minimal, control-room aesthetic from DESIGN.md and aesthetics.css:

- **Geometry**: Perfect square (`--size-3` ≈ 14–16px) with zero radius by default. The inner indicator is also square (`--size-2`) — mechanical and precise, never rounded unless `rounded` is explicitly set.
- **States**: Resting border uses `--neutral-600`. Checked state darkens the border to `--neutral-800` and fills the indicator with the same dark tone (high contrast on light surface). Hover provides subtle border emphasis only.
- **Typography**: Label uses Courier New mono at `--font-size-0`, inherits uppercase expectation from authors (consistent with all THX form labels).
- **Focus & feedback**: Soft phosphor-blue glow ring on keyboard focus (defined in focus-visible mixin and applied to `.radio-wrapper`). Matches exactly the treatment on `thx-checkbox`, `thx-switch`, range thumbs, and rating items.
- **Color discipline**: No phosphor blue fill on the control itself (unlike switches or active radio-buttons). The radio remains neutral gray/dark until selected; blue appears only in the focus glow and in the `thx-radio-button` active state or group button variant.
- **Spacing**: Uses `--size-2` gap between radio and label so it aligns perfectly in vertical stacks with checkboxes and switches.
- The implementation deliberately keeps the native input in the DOM (for form + a11y) while completely suppressing its visual appearance, guaranteeing pixel-perfect square controls regardless of browser.

## Examples

### Control-room priority selector (ultradashboard pattern)

```html
<thx-radio-group name="priority" label="PRIORITY" value="observe" required>
  <thx-radio value="observe">OBSERVE</thx-radio>
  <thx-radio value="intercept">INTERCEPT</thx-radio>
  <thx-radio value="isolate">ISOLATE</thx-radio>
</thx-radio-group>
```

### Standalone radios with native grouping

```html
<div style="display: flex; flex-direction: column; gap: 4px;">
  <thx-radio name="transmission" value="secure" checked>SECURE LINK</thx-radio>
  <thx-radio name="transmission" value="open">OPEN CHANNEL</thx-radio>
  <thx-radio name="transmission" value="jammed" disabled>JAMMED</thx-radio>
</div>
```

### Rounded variant in a compact row

```html
<thx-radio name="shape" value="circle" rounded checked>CIRCULAR</thx-radio>
<thx-radio name="shape" value="square" rounded>SQUARE</thx-radio>
```

### Inside a labeled card with help text (via group)

```html
<thx-card label="MISSION PROFILE">
  <thx-radio-group name="profile" label="DISPLAY MODE" value="cold" orientation="horizontal">
    <thx-radio value="cold">COLD</thx-radio>
    <thx-radio value="warm">WARM</thx-radio>
    <thx-radio value="thermal">THERMAL</thx-radio>
  </thx-radio-group>
</thx-card>
```

### Programmatic selection and focus

```js
const radio = document.querySelector('thx-radio[value="isolate"]');
radio.checked = true;           // updates visual + form value
radio.focus();
radio.addEventListener('change', () => {
  console.log('Selected:', radio.value);
});
```

The `<thx-radio>` (and its companion `thx-radio-button` / `thx-radio-group`) deliver the exact sterile, uppercase, square radio experience demanded by THX-1138 control interfaces. Use `thx-radio-group` for production forms to gain arrow navigation and centralized error handling while the individual radios remain lightweight and reusable. It pairs perfectly with `thx-checkbox`, `thx-switch`, `thx-range`, and `thx-select` in any dense instrumentation panel.
