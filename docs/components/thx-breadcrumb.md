# thx-breadcrumb

The `<thx-breadcrumb>` component renders a clean, monospace navigation path using uppercase labels and automatic `/` separators. It follows the THX 1138 clinical aesthetic: subtle gray text, primary blue links with hover underlines and phosphor glows on focus. Use it to show hierarchical location within complex control systems, dashboards, or data hierarchies.

## Usage

```html
<thx-breadcrumb label="PATH">
  <thx-breadcrumb-item href="#central">CENTRAL</thx-breadcrumb-item>
  <thx-breadcrumb-item href="#sector7">SECTOR 7-G</thx-breadcrumb-item>
  <thx-breadcrumb-item current>ULTRA DASHBOARD</thx-breadcrumb-item>
</thx-breadcrumb>
```

The last item (or any with `current`) renders as plain text with `aria-current="page"`. Separators are injected via CSS `::slotted` on all but the final item.

## Properties / Attributes (thx-breadcrumb)

| Attribute | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `label`   | string | —       | Optional prefix label rendered as `// LABEL //` before the path. |

## thx-breadcrumb-item Properties

| Attribute | Type    | Default | Description |
|-----------|---------|---------|-------------|
| `href`    | string  | —       | URL for the item. Renders as `<a>` unless `current` is true. |
| `current` | boolean | false   | Marks the item as the active page. Renders as `<span aria-current="page">`. |

## Slots

- default (on breadcrumb): One or more `<thx-breadcrumb-item>` elements.
- default (on item): The label text for that segment.

## Events

- `breadcrumb-click` (bubbles, composed) on `<thx-breadcrumb-item>`:
  - `detail: { href }`
  - Note: Clicks on `current` items are prevented.

## Keyboard Behavior & Accessibility

- Link items (`href` without `current`) are normal focusable anchors.
- `focus()` on the breadcrumb delegates to the first item.
- Focus rings: clean phosphor-blue glow (shared `focusVisibleStyles`) on the `<a>` elements.
- `aria-current="page"` on the terminal/current item for screen readers.
- All labels forced to monospace uppercase with consistent letter-spacing.
- Separators (`/`) are decorative and do not receive focus.

The component is intentionally lightweight — navigation logic (history, routing) lives in the consuming application.

## Visual Design

- Base color: neutral gray.
- Links: primary blue with subtle bottom border on hover that becomes a phosphor underline + glow.
- Current page: solid neutral-800 text (no link affordance).
- Prefix (when `label` provided): `// PATH //` styling consistent with tree/menu headers.
- Fully responsive (wraps with `flex-wrap`).

## Practical Examples

### Static Dashboard Path (ultradashboard)

```html
<thx-breadcrumb>
  <thx-breadcrumb-item href="#">CENTRAL</thx-breadcrumb-item>
  <thx-breadcrumb-item href="#">SECTOR 7-G</thx-breadcrumb-item>
  <thx-breadcrumb-item current>ULTRA DASHBOARD</thx-breadcrumb-item>
</thx-breadcrumb>
```

### With Prefix Label

```html
<thx-breadcrumb label="NAV">
  <thx-breadcrumb-item href="/systems">SYSTEMS</thx-breadcrumb-item>
  <thx-breadcrumb-item href="/systems/1138">1138</thx-breadcrumb-item>
  <thx-breadcrumb-item current>MONITOR</thx-breadcrumb-item>
</thx-breadcrumb>
```

### Dynamic Breadcrumbs (JS)

```js
const bc = document.querySelector('thx-breadcrumb');
bc.innerHTML = `
  <thx-breadcrumb-item href="#root">ROOT</thx-breadcrumb-item>
  <thx-breadcrumb-item href="#current" current>ACTIVE NODE</thx-breadcrumb-item>
`;
```

## Composition

- Place inside page headers, panel headers, or identity blocks.
- Pairs naturally with `<thx-tree>` (selected path) or `<thx-tab-group>` (current context).
- Works alongside `<thx-menu>` sidebars for full navigation chrome.
- No built-in truncation — for very deep paths, truncate in application logic or use CSS.

The breadcrumb follows the global focus contract (public `focus()`/`blur()`) and uses the same high-quality phosphor focus rings as all other THX interactive elements.

**Related components**: [thx-tree](./thx-tree.md) (for deeper hierarchical navigation), [thx-menu](./thx-menu.md), [thx-tab-group](./thx-tab-group.md)

---

*All navigation components in this batch share the THX 1138 design language: Courier New mono uppercase labels, phosphor active states (#A6C8E1 primary / #DEFFFF tertiary in CRT), clean focus rings, and CRT variants with static scanline overlays.*