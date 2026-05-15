# thx-breadcrumb-item

**THX 1138 styled breadcrumb segment.**

An individual node in a `<thx-breadcrumb>` trail. Renders either as a phosphor-blue link (when `href` is present and not current) or as a muted current-page span (`aria-current="page"`). Automatically participates in the parent breadcrumb's separator injection. Supports focus delegation and dispatches `breadcrumb-click` for custom routing.

## Import

```js
import 'thx-components/src/components/thx-breadcrumb-item.js';
import 'thx-components';
```

## Basic Usage (inside breadcrumb)

```html
<thx-breadcrumb>
  <thx-breadcrumb-item href="#home">HOME</thx-breadcrumb-item>
  <thx-breadcrumb-item href="#sector-07">SECTOR 07</thx-breadcrumb-item>
  <thx-breadcrumb-item current>CORE DUMP</thx-breadcrumb-item>
</thx-breadcrumb>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `href` | `string` | `''` | When present and not `current`, renders an `<a>` link. |
| `current` | `boolean` (reflects) | `false` | Marks this as the active / final page (renders as `<span aria-current="page">`). |

## Slots

- default: The label text (uppercased, mono, letter-spaced).

## Methods

- `focus()` / `blur()` — delegate focus to the inner anchor or host.

## Events

- `breadcrumb-click` — bubbles with `{ detail: { href } }` when a non-current link is activated.

## Accessibility

- Current page receives `aria-current="page"`.
- Links receive proper focus-visible phosphor glow (via `focusVisibleStyles` mixin).
- Keyboard users can tab through the trail; Enter activates the link.

## Design Notes

- The parent `<thx-breadcrumb>` injects the `>` or `/` separator via CSS on all but the last item.
- Current items are darker/neutral; links are primary blue with underline hover.
- AI-friendly: declarative `<thx-breadcrumb-item href="..." current>LAST</thx-breadcrumb-item>` produces correct semantics and styling.

## Related Components

- [thx-breadcrumb](./thx-breadcrumb.md)
- [thx-menu-item](./thx-menu-item.md)
- [thx-tab](./thx-tab.md)
