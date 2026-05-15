# thx-icon

**THX 1138 styled icon component with built-in symbol library.**

Renders a curated set of clinical, monochrome SVG icons (check, close, warning, arrows, user, monitor, database, etc.) in consistent sizing and color tokens. Supports `currentColor`, phosphor primary/secondary, warning, and error tints. `custom` mode allows arbitrary slotted SVG while still applying size and color classes. Essential for buttons, menu items, status indicators, and control labels.

## Import

```js
import 'thx-components/src/components/thx-icon.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-icon name="check" size="md" color="primary"></thx-icon>
<thx-icon name="warning" color="warning"></thx-icon>
<thx-icon name="close" size="sm"></thx-icon>
```

## Advanced Usage

### Inside Buttons and Menu Items

```html
<thx-button>
  <thx-icon slot="prefix" name="refresh"></thx-icon>
  RESCAN SECTOR
</thx-button>

<thx-menu-item>
  <thx-icon slot="icon" name="power"></thx-icon>
  EMERGENCY SHUTDOWN
</thx-menu-item>
```

### Custom Slotted Icon (with thx-icon wrapper for sizing/color)

```html
<thx-icon name="custom" size="lg" color="secondary">
  <svg viewBox="0 0 24 24"><path d="...custom path..."/></svg>
</thx-icon>
```

### Icon-Only Status or Toolbar

```html
<div class="toolbar">
  <thx-icon-button>
    <thx-icon name="search"></thx-icon>
  </thx-icon-button>
  <thx-icon-button>
    <thx-icon name="settings"></thx-icon>
  </thx-icon-button>
</div>
```

## Built-in Icon Library (selected)

`check`, `close`, `warning`, `error`, `info`, `arrowRight/Left/Up/Down`, `menu`, `search`, `settings`, `user`, `dashboard`, `more`, `plus`, `minus`, `refresh`, `download`, `upload`, `copy`, `delete`, `edit`, `eye`, `eyeOff`, `lock`, `unlock`, `link`, `monitor`, `power`, `bell`, `calendar`, `clock`, `database`, `wifi`, `wifiOff`, `star`, `starOutline`, `filter`, `sort`, `folder`, `file`, `mail`, `phone`, `home`, `location`, `print`, `share`, `help`.

Use `name="custom"` + slotted SVG for anything else.

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `string` | `''` | Icon identifier from the built-in library or `"custom"`. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Preset dimensions (12–28px range). |
| `color` | `'current' \| 'primary' \| 'secondary' \| 'warning' \| 'error'` | `'current'` | Applies the corresponding CSS custom property color. |
| `label` | `string` | `''` | Accessible `aria-label`. Falls back to `name` when omitted. |

## Slots

- default (only when `name="custom"`): The raw `<svg>` or icon markup. The wrapper still applies size and color classes.

## Events

None.

## Accessibility

- Every icon receives `role="img"` and an `aria-label` (either the explicit `label` or the `name`).
- The inner SVG is marked `aria-hidden="true"` so the label on the span is the sole announcement.
- Use meaningful names (`"refresh sector scan"`) when the icon is the primary affordance.
- Color is never the sole indicator — pair with visible text or `thx-badge`/`thx-tag`.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#icons-and-symbols).

- **Monochrome contract**: All icons are stroked/filled with `currentColor` and inherit the chosen color token. No multi-color icons.
- **Square geometry**: Icons are sized in the same `--size-*` scale as other controls for perfect alignment in toolbars and rows.
- **CRT glow**: Primary color icons inside CRT contexts receive a soft drop-shadow glow automatically.
- **AI-friendly**: `<thx-icon name="check" color="primary">` is the only markup needed — the component ships the correct SVG path and applies perfect styling.
- **Custom path**: When the built-in set is insufficient, `name="custom"` + slotted SVG still benefits from the size/color system and accessibility wiring.
- **Usage density**: `sm` for tight button groups and menu rows; `md` is the default for most labels; `lg`/`xl` for hero or prominent status.

`thx-icon` is the atomic visual language primitive used by virtually every interactive component in the library.

## Related Components

- [thx-icon-button](./thx-icon-button.md)
- [thx-button](./thx-button.md)
- [thx-menu-item](./thx-menu-item.md)
- [thx-avatar](./thx-avatar.md)
- [thx-badge](./thx-badge.md)
- [thx-tooltip](./thx-tooltip.md) — frequently used to label icon-only controls
