# thx-divider

**THX 1138 styled section divider component.**

A minimalist clinical separator line with optional centered mono uppercase label, multiple line styles, spacing presets, vertical orientation support, and a dedicated CRT phosphor variant. Provides clean visual rhythm between dashboard panels, protocol blocks, form sections, or data groups while staying true to the austere, institutional THX-1138 aesthetic. No decorative flourish — only structural seams and precise operational labeling.

## Import

```js
import 'thx-components/src/components/thx-divider.js';
// or
import 'thx-components';
```

## Basic Usage

```html
<thx-divider></thx-divider>

<thx-divider style="margin: var(--size-3) 0"></thx-divider>

<thx-divider label="QUICK FILTERS"></thx-divider>
```

## Advanced Usage

### Line Styles

```html
<thx-divider style="solid"></thx-divider>   <!-- default -->
<thx-divider style="dashed"></thx-divider>
<thx-divider style="inset"></thx-divider>
<thx-divider style="crt"></thx-divider>
```

### Labeled Divider

The label is centered with line segments on both sides — perfect for section titles inside panels.

```html
<thx-divider label="SYSTEM PROTOCOLS"></thx-divider>
<thx-divider label="ARCHIVE STATUS" style="crt"></thx-divider>
```

### Vertical Divider

```html
<div style="display: flex; height: 120px; gap: 16px;">
  <div>LEFT COLUMN</div>
  <thx-divider vertical></thx-divider>
  <div>RIGHT COLUMN</div>
</div>
```

Vertical mode rotates the label (writing-mode vertical) and uses a left border line.

### Spacing Presets

```html
<thx-divider spacing="sm"></thx-divider> <!-- tight -->
<thx-divider spacing="md"></thx-divider> <!-- default -->
<thx-divider spacing="lg"></thx-divider> <!-- generous -->
```

## Properties / Attributes

| Attribute | Type                                      | Default   | Description |
|-----------|-------------------------------------------|-----------|-------------|
| `style`   | `'solid' \| 'dashed' \| 'inset' \| 'crt'` | `'solid'` | Visual treatment of the dividing line. |
| `label`   | `string`                                  | `''`      | Optional centered uppercase label (creates split-line effect). |
| `spacing` | `'sm' \| 'md' \| 'lg'`                    | `'md'`    | Vertical (or horizontal when vertical) margin preset. |
| `vertical`| `boolean` (reflects)                      | `false`   | Renders as a vertical rule instead of horizontal. |

All properties reflect where appropriate and are reactive.

## Slots

None. Content is purely presentational via attributes.

## Events

None. Purely visual / structural component.

## Variants

- **style**:
  - `solid`: Standard subtle gray hairline (`rgba(0,0,0,0.1)`).
  - `dashed`: Dashed variant for lighter visual weight.
  - `inset`: Slightly lighter color + side padding for recessed feel inside cards.
  - `crt`: Phosphor-tinted line (`rgba(166,200,225,0.3)`) with soft glow — for dark/monitor contexts.
- **vertical**: Transforms the component into an inline vertical separator with rotated label support.
- **labeled vs unlabeled**: When `label` is provided, two `<hr>` segments flank the centered mono text.
- **spacing**: Built-in margin classes for consistent dashboard rhythm without external CSS.

## Accessibility

- Root element carries `role="separator"` with `aria-orientation="horizontal"` or `"vertical"`.
- The divider is purely decorative when no label is present; labeled versions communicate section boundaries to assistive tech.
- No interactive behavior — safe to use liberally in dense interfaces.
- Recommended: Use `label` sparingly for major section breaks ("QUICK FILTERS", "SYSTEM PROTOCOLS"). Keep labels short, uppercase, mono-flavored.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#components) (divider-default, divider-subtle).

- **Line treatment**: 1px borders using the established outline colors (`rgba(0,0,0,0.1)` light, `rgba(166,200,225,0.3)` CRT). Never thick or colored for decoration.
- **Labeled divider**: The label uses exact mono uppercase treatment (Courier New, 13px scale, wide 0.14em tracking, secondary gray or primary phosphor in CRT mode). Flanking lines create a classic "section header rule" that feels engineered, not decorative.
- **CRT variant**: The only chromatic treatment — subtle blue glow and tint. Use inside `thx-crt-display`, dark drawers, or when the surrounding surface is already monitor-like.
- **Vertical mode**: Label rotates via `writing-mode: vertical-rl` + `text-orientation: mixed` for perfect alignment with tall side-by-side content.
- **Spacing system**: `sm` (12px), `md` (24px), `lg` (32px) vertical rhythm matches the library's 4px base unit and dashboard panel seams.
- **Clinical tone**: Labels are operational identifiers ("QUICK FILTERS", "ARCHIVE STATUS"). The component reinforces the slab-and-seam philosophy: content is grouped by containment and hairline divisions rather than cards or shadows.
- **No utility-class noise**: Drop the element directly; it brings its own spacing and line styles.

`thx-divider` is the universal seam primitive. It appears throughout dashboard.html and ultradashboard.html between filter groups, protocol lists, and panel sections. For resizable or labeled panes, see [thx-split-panel](./thx-split-panel.md). For collapsible content, see [thx-details](./thx-details.md).
