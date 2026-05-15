# thx-switch

The `<thx-switch>` component is a sliding toggle control in the THX-1138 industrial style. It features a rectangular track that changes from neutral gray to phosphor blue when activated, with a white thumb that slides horizontally. A persistent uppercase state label ("ON" / "OFF" by default, customizable) sits beside the switch for unambiguous machine-readable feedback.

Switches are ideal for power, mode, enable/disable, and live state toggles where the visual "on" state (phosphor fill) must be instantly recognizable. Three sizes (sm, md, lg) and flexible labeling via slots allow it to fit dense instrument panels or larger command strips while maintaining perfect square-adjacent geometry and mono typography.

## Import

```js
import 'thx-components/src/components/thx-switch.js';
```

Via bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-switch name="power" checked>POWER</thx-switch>
```

With explicit labels:

```html
<thx-switch 
  name="recording" 
  checked 
  on-label="REC" 
  off-label="STANDBY">
</thx-switch>
```

## Properties

| Property   | Type    | Default   | Description |
|------------|---------|-----------|-------------|
| `checked`  | boolean | `false`   | Whether the switch is in the "on" position. Reflected as attribute. |
| `disabled` | boolean | `false`   | Disables the switch (reflected). |
| `value`    | string  | `'on'`    | Form value submitted when `checked`. |
| `name`     | string  | `''`      | Form field name. |
| `size`     | string  | `'md'`    | Visual size: `'sm'`, `'md'`, or `'lg'`. |
| `onLabel`  | string  | `'ON'`    | Text displayed in the state label when checked. |
| `offLabel` | string  | `'OFF'`   | Text displayed in the state label when unchecked. |

## Slots

- `label` — Optional descriptive label placed to the left of the switch track (receives the same mono uppercase styling treatment as other form labels).
- (Default) — Additional content placed after the state label (e.g., explanatory text or icons). Rarely used; most labeling goes in the `label` slot or via the always-visible `onLabel`/`offLabel`.

## Events

- `change` — Dispatched after the `checked` state is toggled. Bubbles and composed. The `checked` property is already synchronized.

## Variants & Features

- **Size variants** (`size="sm" | "md" | "lg"`):
  - `sm`: Compact track (suitable for dense tables or lists).
  - `md` (default): Standard instrument-panel size.
  - `lg`: Larger, more prominent toggle for primary actions.
- **State indicator**: The component always renders an uppercase mono `state-label` ("ON" / "OFF" or your custom `onLabel`/`offLabel`) immediately to the right of the track. This explicit text label is a signature of the clinical aesthetic — no ambiguity.
- **Color states**: Off = `--neutral-600` gray track. On = `--atmos-primary` phosphor blue (#A6C8E1) track. The thumb is always bright white and slides with a moderate transition.
- **Form participation**: Behaves identically to `thx-checkbox` for submission. When checked, the `value` is sent; otherwise null. Full reset and ElementInternals support.
- **Keyboard**: The track is focusable (`role="switch"`). Space or Enter toggles the state.
- **Label placement**: The named `label` slot allows a full-width description above or beside the control while the state label remains the authoritative ON/OFF indicator.

## Accessibility

- Track element uses `role="switch"` and `aria-checked`.
- Focus ring (phosphor glow) appears on keyboard focus.
- Entire wrapper row is clickable.
- Disabled state conveyed via `aria-disabled` (inherited) and reduced opacity.
- State label text is always present in the DOM, providing clear textual status for screen readers.
- The hidden native checkbox input ensures correct form semantics.

## Design Notes

The switch is a deliberate departure from checkbox squares while remaining inside the DESIGN.md language:

- **Track & thumb**: Rectangular track with square-cornered white thumb. The sliding motion and phosphor blue "active" fill evoke mechanical toggles and status LEDs in a control room.
- **Typography**: Both the optional `label` slot content and the mandatory state label (`state-label`) are rendered in Courier New, uppercase, with appropriate letter-spacing. The state label uses wider tracking (`--font-letterspacing-4`).
- **Color semantics**: Phosphor blue only for the "live / active / on" state — exactly as specified for operational accents. Gray for the resting state.
- **Explicit labels**: The persistent "ON" / "OFF" text (or custom) fulfills the requirement for alphanumeric, machine-like clarity. No reliance on color alone.
- **Sizes & tokens**: All dimensions and gaps use the design system's `--size-*` scale. The focus glow matches the intensity used on inputs and selects.
- **No indeterminate**: Switches are strictly binary (unlike checkboxes). This keeps the mental model simple for power/mode controls.
- The implementation stays lightweight while delivering the same focus-visible, form, and reset behavior as sibling form components.

## Examples

### Basic power toggle with slotted label

```html
<thx-switch name="main-power" checked size="lg">
  <span slot="label">MAIN REACTOR</span>
</thx-switch>
```

### Compact size with custom state labels

```html
<thx-switch 
  name="stealth" 
  size="sm" 
  on-label="ENGAGED" 
  off-label="DISENGAGED">
  <span slot="label">STEALTH MODE</span>
</thx-switch>
```

### In a dense settings panel

```html
<thx-card label="SYSTEM TOGGLES">
  <div style="display: flex; flex-direction: column; gap: var(--size-3);">
    <thx-switch name="telemetry" checked>TELEMETRY</thx-switch>
    <thx-switch name="autolog" size="sm" on-label="LIVE" off-label="PAUSED">AUTO LOG</thx-switch>
    <thx-switch name="alerts" disabled>CRITICAL ALERTS</thx-switch>
  </div>
</thx-card>
```

### Programmatic control

```js
const sw = document.querySelector('thx-switch[name="recording"]');
sw.checked = true;
sw.onLabel = 'REC';
sw.focus();
sw.addEventListener('change', e => console.log('Recording:', sw.checked));
```

### Mixed with checkbox for comparison

```html
<thx-switch name="mode" checked>ARMED</thx-switch>
<thx-checkbox name="confirm">CONFIRM ARM</thx-checkbox>
```

The `thx-switch` completes the form control suite for binary states. Its phosphor-blue active track, sliding thumb, and explicit uppercase state label make it instantly recognizable as part of the sterile THX-1138 instrumentation language — perfect for power panels, mode selectors, and any live system controls generated by LLM authors. It pairs cleanly with `thx-checkbox` (for multi-item lists) and the various input/select components.