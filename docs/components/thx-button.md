# thx-button

**THX 1138 styled button component.**

A stark, square-geometry action control for clinical dystopian interfaces. Renders as a fully uppercase, monospaced control label in the institutional THX-1138 aesthetic: zero-radius edges, precise phosphor accents reserved strictly for primary/active states, and mechanical press feedback. Designed for command issuance, confirmations, and system operations where every control must feel authored by a control room rather than a marketing surface.

## Import

```js
// Full library (registers all elements)
import 'thx-components';

// Selective import (recommended for minimal bundles)
import 'thx-components/src/components/thx-button.js';
```

The component registers the custom element `<thx-button>` automatically on import.

## Basic Usage

```html
<thx-button>CONFIRM</thx-button>
<thx-button variant="primary">EXECUTE ORDER</thx-button>
<thx-button variant="secondary" size="sm">CANCEL</thx-button>
```

## Advanced Usage

### Variants and Sizes

```html
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <thx-button variant="primary">PRIMARY</thx-button>
  <thx-button variant="secondary">SECONDARY</thx-button>
  <thx-button variant="warning">WARNING</thx-button>
  <thx-button variant="error">CRITICAL</thx-button>
  <thx-button variant="outline-primary">OUTLINE PRIMARY</thx-button>
  <thx-button variant="outline-secondary">OUTLINE SECONDARY</thx-button>
  <thx-button variant="outline-warning">OUTLINE WARNING</thx-button>
  <thx-button variant="ghost">GHOST</thx-button>
</div>

<div style="display: flex; gap: 8px; align-items: center; margin-top: 12px;">
  <thx-button size="sm">SMALL</thx-button>
  <thx-button size="md">MEDIUM</thx-button>
  <thx-button size="lg">LARGE</thx-button>
</div>
```

### Loading State (with thx-spinner)

The `loading` attribute replaces button content with a matching `thx-spinner` (crt, warning, or error variant automatically selected from the button variant). The button becomes disabled and `aria-busy="true"`.

```html
<thx-button loading>PROCESSING</thx-button>
<thx-button variant="warning" loading>ANALYZING</thx-button>
<thx-button variant="error" loading>TERMINATING</thx-button>
```

### Form Participation

```html
<form>
  <thx-button type="submit" variant="primary">COMMIT DIRECTIVE</thx-button>
  <thx-button type="reset" variant="ghost">RESET FIELDS</thx-button>
</form>
```

### Button Groups

When placed inside `<thx-button-group>`, buttons automatically receive the `grouped` attribute for seamless joined styling (no gaps, shared borders).

```html
<thx-button-group>
  <thx-button variant="primary" grouped>MONITOR</thx-button>
  <thx-button variant="outline-primary" grouped>OBSERVE</thx-button>
  <thx-button variant="outline-primary" grouped>REPORT</thx-button>
</thx-button-group>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'warning' \| 'error' \| 'outline-primary' \| 'outline-secondary' \| 'outline-warning' \| 'ghost'` | `'primary'` | Visual style. Primary uses phosphor blue fill. Warning and error use status colors. Outline variants are transparent with colored borders. Ghost is minimal until hover. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control height and typography scale. `sm` = 32px-ish, `md` = 40px, `lg` = 48px. |
| `disabled` | `boolean` | `false` | Disables interaction. Opacity reduced to 0.4–0.5; preserves layout. |
| `loading` | `boolean` | `false` | Shows `thx-spinner` (size="sm", variant auto-matched) and sets `aria-busy="true"`. Content slot is hidden. Prevents clicks. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type for form submission behavior. |
| `grouped` | `boolean` (reflects) | `false` | Internal flag set by `<thx-button-group>`. Adjusts padding, width, and removes individual radius for seamless grouping. |

All properties are reflected where appropriate. Set via attribute (`variant="error"`) or property (`.variant = 'error'`).

## Slots

| Slot | Description |
|------|-------------|
| (default) | Button label content. Recommended: uppercase alphanumeric strings using Courier New mono (e.g., "EXECUTE", "SECTOR-07"). Content is automatically uppercased via CSS. |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `click` | `MouseEvent` | Standard click. Prevented automatically when `disabled` or `loading`. Bubbles and composed. |

No custom events are emitted by the component.

## Variants

- **primary** (default): Phosphor blue fill (`#A6C8E1`), dark text. Hover: hot phosphor (`#DEFFFF`) + soft glow.
- **secondary**: Muted phosphor gray fill, light text. Hover promotes to primary.
- **warning**: Amber (`#D4AA00`) for cautionary actions.
- **error**: Critical orange-red (`#D44000`).
- **outline-***: Border-only versions of the above; hover fills the color.
- **ghost**: Transparent with gray text; hover reveals phosphor border and text.
- **size-sm / md / lg**: Compact to expansive control heights.
- **loading**: Replaces label with status-matched spinner. Ideal for async operations (network, validation, batch processing).

## Accessibility

- Native `<button>` semantics under the hood.
- `focus-visible` styling with phosphor glow ring (`0 0 0 2px rgba(166,200,225,0.45)`).
- `aria-busy="true"` during loading state.
- `disabled` state properly communicated; clicks are programmatically prevented.
- Keyboard: Full `Tab`, `Enter`, and `Space` support via native button.
- Recommended: Use clear imperative labels ("CONFIRM SECTOR CLEAR", "ABORT PROCEDURE") rather than vague "OK".
- When used as submit/reset in forms, `type` ensures correct native behavior.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#buttons)

- **Square geometry**: Zero border-radius (`rounded: none`). Exceptions only via grouping or explicit parent context.
- **Typography**: `Courier New` (or `var(--font-mono)`), `text-transform: uppercase`, `letter-spacing: 0.14em`, weight 600. Label MD scale.
- **Phosphor restriction**: Blue (`#A6C8E1`) and hot phosphor (`#DEFFFF`) reserved exclusively for primary actions, focus, and active states. Amber and orange-red strictly for warning/error semantics. Never decorative.
- **Press feedback**: `translateY(1px)` on `:active:not(:disabled)`.
- **Loading integration**: Leverages `<thx-spinner>` (new pattern) with automatic variant mapping (`crt` for neutral/primary, `warning`, `error`). Spinner size="sm" ensures compact fit.
- **Grouped mode**: Works seamlessly with `thx-button-group` for segmented controls (e.g., day selectors, mode switches) — borders merge, no visual seams.
- **Hover treatment**: Primary receives glow; warning/error receive status-colored glows only. Ghost gains phosphor outline.
- **Clinical tone**: Labels should feel like machine identifiers — short, alphanumeric, imperative, uppercase. Avoid friendly marketing language.

The component participates in the classless system: bare `<button>` elements receive base styling from `aesthetics.css`, while `<thx-button>` provides the enhanced semantic + loading + variant surface.
