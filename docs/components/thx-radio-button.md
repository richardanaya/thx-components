# thx-radio-button

The `<thx-radio-button>` component renders a toggleable button-style radio control in the THX-1138 aesthetic: an uppercase mono label inside a bordered rectangular button that fills with phosphor blue (`#A6C8E1`) and dark text when selected. It provides the visual language of segmented controls and mode selectors found on real instrumentation panels.

It supports three sizes (`sm`, `md`, `lg`) and can be used standalone or, more powerfully, as children of `<thx-radio-group variant="button">` which automatically wires mutual exclusivity, arrow-key navigation, and unified form submission.

## Import

```js
import 'thx-components/src/components/thx-radio-button.js';
```

Via the complete library bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

Standalone (manual management of `checked` state required for mutual exclusion):

```html
<thx-radio-button value="cold" checked size="md">COLD</thx-radio-button>
<thx-radio-button value="scope" size="md">SCOPE</thx-radio-button>
```

Recommended: inside a button-variant radio group (provides automatic grouping and keyboard support):

```html
<thx-radio-group label="DISPLAY PROFILE" value="cold" variant="button">
  <thx-radio-button value="cold">COLD</thx-radio-button>
  <thx-radio-button value="scope">SCOPE</thx-radio-button>
  <thx-radio-button value="black">BLACK</thx-radio-button>
</thx-radio-group>
```

## Properties

| Property   | Type    | Default | Description |
|------------|---------|---------|-------------|
| `checked`  | boolean | `false` | Whether the button is in the active/selected state. Reflected. |
| `disabled` | boolean | `false` | Disables the button (reduced opacity, no interaction). Reflected. |
| `value`    | string  | `''`    | The value submitted to the form when this button is checked. |
| `size`     | string  | `'md'`  | Visual size: `'sm'`, `'md'`, or `'lg'`. |

## Slots

- (Default) — The button label text. Automatically uppercased and letter-spaced by the component's styles. Use short, machine-like words ("COLD", "ARMED", "MAP", "LOG").

## Events

- `change` — Dispatched when the button is activated (becomes checked). Bubbles and composed. `checked` is already `true`.

## Variants & Features

- **Size variants**:
  - `sm`: Compact padding and smaller font — ideal for dense toolbars or data tables.
  - `md` (default): Standard instrument-panel height and padding.
  - `lg`: Larger, more prominent for primary mode selectors.
- **Active state**: Phosphor-blue background (`--atmos-primary`) with dark (`#333`) text and matching border. Inactive state is transparent with secondary gray (`--atmos-secondary`) border and text.
- **Hover**: Subtle blue-tinted background (`rgba(166,200,225,0.1)`) and primary color text lift — never a full fill until selected.
- **Active press**: Slight downward `translateY(1px)` for tactile feedback.
- **Form participation (improved)**: Uses `FormAssociatedMixin` + `ElementInternals`. Only the currently checked button in a logical group submits its `value`. Standalone buttons submit when checked. Full `form.reset()` support via `_defaultChecked` snapshot. The mixin centralizes value sync while the component provides its own `_updateFormValue` / `formResetCallback` overrides for correctness.
- **Focus handling**: The native `<button>` element receives focus. The `focus-visible` mixin applies a soft phosphor glow ring on keyboard focus. Mouse clicks do not produce the ring.
- **Button-group context**: When placed inside `<thx-radio-group variant="button">`, the group wraps them in a single bordered container (segmented look) and handles roving tabindex + arrow keys automatically.
- **No native radio input**: Pure custom button with `role="radio"` and `aria-checked` for semantics.

## Accessibility

- The root element is a `<button role="radio" aria-checked="true/false">`.
- `aria-disabled` is set when the `disabled` property is true.
- Full keyboard support: Space or Enter activates; when inside a `thx-radio-group`, arrow keys (left/right/up/down), Home, and End navigate between enabled buttons.
- Focus ring follows the system's phosphor glow convention exactly (defined once in the focus-visible mixin and applied to all interactive roles).
- Screen readers announce the label, checked state, and disabled state correctly.
- The entire button surface is the hit target.

## Design Notes

`thx-radio-button` is the "active control" counterpart to the quieter square `thx-radio`:

- **Geometry & borders**: Square corners everywhere. Border uses `--atmos-secondary` (#707E91) when inactive and switches to primary blue on selection. Heights are derived from the `--size-*` token scale for perfect alignment with `thx-button` and other controls.
- **Color semantics**: Phosphor blue (`#A6C8E1`) is reserved strictly for the "selected / live / operational" state — matching active tabs, switch tracks, rating fills, and chart accents. This is a core DESIGN.md rule.
- **Typography**: Courier New, uppercase, `--font-letterspacing-4` (generous). The component forces `text-transform: uppercase` so authors can supply mixed or lowercase source text safely.
- **Focus & interaction**: The glow ring and hover states are identical in spirit to every other THX form control. The press animation gives the mechanical "switch throw" feeling without leaving the square aesthetic.
- **Standalone vs grouped**: Standalone buttons are fully functional but require the author to keep only one `checked` at a time. The `thx-radio-group variant="button"` pattern is the recommended way to obtain true radio semantics plus the classic segmented-button visual.
- Fits naturally in control stacks alongside `thx-range`, `thx-color-picker`, and `thx-rating` for rich "specialized inputs" panels.

## Examples

### Segmented display profile selector (ultradashboard)

```html
<thx-radio-group label="DISPLAY PROFILE" value="cold" variant="button">
  <thx-radio-button value="cold">COLD</thx-radio-button>
  <thx-radio-button value="scope">SCOPE</thx-radio-button>
  <thx-radio-button value="black">BLACK</thx-radio-button>
</thx-radio-group>
```

### Standalone size variants in a toolbar

```html
<div style="display: flex; gap: var(--size-2);">
  <thx-radio-button value="low" size="sm" checked>LOW</thx-radio-button>
  <thx-radio-button value="med" size="sm">MED</thx-radio-button>
  <thx-radio-button value="high" size="sm">HIGH</thx-radio-button>
</div>
```

### Large primary action mode selector

```html
<thx-radio-group name="mode" value="armed" variant="button">
  <thx-radio-button value="standby" size="lg">STANDBY</thx-radio-button>
  <thx-radio-button value="armed" size="lg">ARMED</thx-radio-button>
  <thx-radio-button value="override" size="lg" disabled>OVERRIDE</thx-radio-button>
</thx-radio-group>
```

### Programmatic control inside a form

```js
const group = document.querySelector('thx-radio-group[variant="button"]');
group.value = 'scope';           // selects the matching button
group.select('black');           // same + fires change

const btn = document.querySelector('thx-radio-button[value="cold"]');
btn.checked = true;
btn.focus();
```

### Mixed with other controls in a specialized panel

```html
<thx-card label="INSTRUMENTATION">
  <thx-color-picker label="PHOSPHOR TINT"></thx-color-picker>
  <thx-rating name="risk" value="4" max="5"></thx-rating>
  <thx-radio-group label="SCAN MODE" value="continuous" variant="button">
    <thx-radio-button value="single">SINGLE</thx-radio-button>
    <thx-radio-button value="continuous">CONTINUOUS</thx-radio-button>
  </thx-radio-group>
</thx-card>
```

The `thx-radio-button` brings the classic segmented-control / mode-button aesthetic of real control rooms into the web while remaining fully accessible and form-participating. When composed with `thx-radio-group`, it delivers both the visual language and the robust keyboard + submission behavior expected of production THX dashboards. Use it wherever you need clear, high-contrast mode selection that feels like physical push-buttons rather than modern rounded pills.
