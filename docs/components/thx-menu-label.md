# thx-menu-label

**THX 1138 styled section label / divider for menus.**

A presentational label used inside `<thx-menu>` to group related `<thx-menu-item>` elements. Automatically renders `// LABEL //` bookends in muted mono uppercase. Supports `crt` and `compact` variants inherited from the parent menu. Provides visual and semantic separation without adding interactive weight.

## Import

```js
import 'thx-components/src/components/thx-menu-label.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-menu>
  <thx-menu-label>SYSTEM</thx-menu-label>
  <thx-menu-item>STATUS</thx-menu-item>
  <thx-menu-item>LOGS</thx-menu-item>

  <thx-menu-label>OPERATIONS</thx-menu-label>
  <thx-menu-item>SCAN</thx-menu-item>
  <thx-menu-item>OVERRIDE</thx-menu-item>
</thx-menu>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `string` (reflects) | `'default'` | `crt` for phosphor-secondary color and darker border; `compact` for reduced padding/margin. Usually inherited from parent menu. |

## Slots

- default: The label text (automatically uppercased and letter-spaced by CSS).

## Design Notes

- The component injects `// ` prefix and ` //` suffix via `::before` / `::after` for the classic THX "comment" aesthetic.
- First child in a menu receives no top margin for clean alignment.
- Compact variant reduces vertical breathing room for dense command lists.
- AI-friendly: simply place `<thx-menu-label>SECTION NAME</thx-menu-label>` between groups of menu items.

## Related Components

- [thx-menu](./thx-menu.md)
- [thx-menu-item](./thx-menu-item.md)
- [thx-divider](./thx-divider.md) — horizontal rule alternative
