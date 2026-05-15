# thx-button-group

**THX 1138 styled button group component.**

A container that visually and semantically joins a series of related `<thx-button>` (or native `<button>`) elements into a single segmented control. Enforces the clinical THX-1138 aesthetic: hairline shared borders, zero-radius individual buttons, unified background slab, and hover/active states that feel like radio or mode selectors on an industrial panel. Automatically injects the `grouped` attribute onto child `thx-button` instances for correct internal styling.

## Import

```js
import 'thx-components/src/components/thx-button-group.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-button-group>
  <thx-button variant="primary" grouped>MONITOR</thx-button>
  <thx-button variant="outline-primary" grouped>OBSERVE</thx-button>
  <thx-button variant="outline-primary" grouped>REPORT</thx-button>
</thx-button-group>
```

## Advanced Usage

### Sizes

The group accepts `size` which propagates to children.

```html
<thx-button-group size="sm">
  <thx-button grouped>DAY</thx-button>
  <thx-button grouped>NIGHT</thx-button>
</thx-button-group>

<thx-button-group size="lg">
  <thx-button variant="secondary" grouped>LOW</thx-button>
  <thx-button variant="secondary" grouped>MED</thx-button>
  <thx-button variant="secondary" grouped>HIGH</thx-button>
</thx-button-group>
```

### With Native Buttons

The group also styles bare `<button>` children for hybrid use cases.

```html
<thx-button-group>
  <button type="button">AUTO</button>
  <button type="button" active>MANUAL</button>
  <button type="button" disabled>LOCKED</button>
</thx-button-group>
```

Note: For native buttons, use `active` class or attribute for selected state styling. The group applies `!important` overrides to ensure consistency.

### Mixed with Other Controls

```html
<div class="command-strip">
  <thx-button-group size="sm">
    <thx-button variant="ghost" grouped>◀</thx-button>
    <thx-button variant="ghost" grouped>▶</thx-button>
  </thx-button-group>
  <thx-badge variant="pulse">LIVE</thx-badge>
</div>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` (reflects) | `'md'` | Controls height and padding of all grouped children. `sm` uses tighter metrics; `lg` increases vertical presence. |

The component has no other public properties. Child management is handled via `slotchange`.

## Slots

| Slot | Description |
|------|-------------|
| (default) | One or more `<thx-button>` (with `grouped` recommended) or native `<button>` elements. Order is preserved left-to-right. |

The component listens for `slotchange` and automatically sets `grouped=""` on any discovered `<thx-button>` descendants (case-insensitive tag match).

## Events

None. The group is a pure presentational container. Interaction events originate from the child buttons.

## Accessibility

- The group itself has no ARIA role by default. When representing a mutually exclusive choice (e.g., tabs, modes), consider wrapping in a `role="radiogroup"` or `role="tablist"` container and marking the active child with `aria-checked` or `aria-selected`.
- Individual buttons retain full keyboard focus and activation.
- When using native `<button active>`, ensure you also manage `aria-pressed="true"` for the selected member.
- Visual active state (primary fill + inset shadow) is provided by the group CSS when a child has the `active` attribute or class.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#buttons), [Shapes](../../DESIGN.md#shapes).

- **Joined control language**: Hairline secondary-color borders (`#707e91`) between segments. Last child has no right border. Hover promotes segments to phosphor blue tint.
- **Active/selected**: Primary phosphor fill + subtle inner glow. Use the `active` attribute (or `.active` class on native buttons) to indicate current selection.
- **No radius**: All children forced to `border-radius: 0`. The group itself receives a thin outer border and inner shadow for slab presence.
- **Size propagation**: `size="sm"` and `size="lg"` override child metrics via `::slotted()` selectors for perfect alignment in dense instrument strips.
- **THX-button integration**: When children are `<thx-button>`, the `grouped` attribute triggers special CSS rules inside the button itself (full width, adjusted padding, no individual radius).
- **Clinical use cases**: Mode selectors ("MON / TUE / WED"), priority pickers, pagination, view toggles, or any linear set of mutually related actions.
- **Contrast with button bar**: Unlike free-floating buttons, the group communicates "these options are part of one decision surface."

The component is intentionally lightweight — its power comes from the automatic child augmentation and the strict visual language enforced by `aesthetics.css` + the button family.
