# thx-tag

**THX 1138 styled tag / removable label component.**

A removable or static category label with optional prefix, used for metadata, filter chips, and classification in clinical interfaces. Strict adherence to the THX-1138 aesthetic: monospace uppercase text, square or near-square geometry, restrained palette, and a minimal remove affordance (×) that appears only when `removable`. Emits a `thx-remove` custom event on removal for parent-driven list management.

## Import

```js
import 'thx-components/src/components/thx-tag.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-tag>SEDATION</thx-tag>
<thx-tag variant="primary">ARCHIVE</thx-tag>
<thx-tag variant="outline" removable>OVERRIDE</thx-tag>
```

## Advanced Usage

### Removable Tags with Prefix

```html
<thx-tag removable tag-prefix="CAT">DIRECTIVE-1138</thx-tag>
<thx-tag removable variant="secondary" size="sm">BATCH-0420</thx-tag>
```

### Handling Removal

```html
<thx-tag id="tag-1" removable>SECTOR-7</thx-tag>
```

```js
document.getElementById('tag-1').addEventListener('thx-remove', (e) => {
  const tag = e.detail.tag;
  console.log('User requested removal of', tag.textContent);
  // Remove from DOM or update parent state
  tag.remove();
});
```

### In Context (Filter Chips, Metadata)

```html
<div class="tag-rack">
  <thx-tag removable>SEDATION</thx-tag>
  <thx-tag removable>ARCHIVE</thx-tag>
  <thx-tag variant="primary" tag-prefix="SYS">NOMINAL</thx-tag>
</div>
```

Tags work well alongside `thx-badge`, `thx-button`, and inside dialogs or panels.

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'outline'` (reflects) | `'default'` | Color treatment. `default` is light gray slab; `primary`/`secondary` use phosphor fills; `outline` is border-only with hover promotion. |
| `removable` | `boolean` (reflects) | `false` | Shows the × remove button on the right. Clicking it dispatches `thx-remove`. |
| `size` | `'sm' \| 'md'` (reflects) | `'md'` | Typography and padding scale. Both sizes are compact; `sm` reduces font slightly. |
| `tag-prefix` | `string` (attribute `tag-prefix`) | `''` | Optional dimmed prefix rendered before the main slot content (e.g., "CAT", "SYS", "ID"). Uses secondary gray or semi-transparent white on colored fills. |

## Slots

| Slot | Description |
|------|-------------|
| (default) | The main tag label text. Automatically uppercased via CSS. |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `thx-remove` | `{ tag: ThxTag }` | Custom event fired when the remove button is clicked (`removable`). `detail.tag` references the element instance. Bubbles and composed. The component does **not** remove itself — the consumer is responsible for DOM or state mutation. |

## Variants

- **default**: Neutral light gray fill (`#E0E0E0`), dark text. For passive metadata.
- **primary**: Phosphor blue fill, dark text.
- **secondary**: Muted phosphor fill, light text.
- **outline**: Transparent with gray border; hover gains phosphor border and text color.
- **removable**: Adds a small × button (currentColor, opacity 0.6 → 1 on hover) with focus ring.
- **size-sm / md**: Minor scale adjustment for dense vs standard layouts.
- **tag-prefix**: Renders a dimmed label segment (e.g., "CAT:") before the slotted content.

## Accessibility

- The remove button (when present) has `aria-label="Remove tag"` and is a native `<button type="button">`.
- Focus ring on the remove control uses phosphor glow.
- Tags themselves are not focusable (cursor: default). If tags need to be interactive (e.g., clickable filters), wrap them or use a different pattern.
- When a tag is removed via keyboard (Enter/Space on the ×), the `thx-remove` event allows the parent to manage focus restoration (e.g., move focus to previous tag or next control).
- Prefix + label combination should be understandable when read by screen readers (the prefix is not hidden).

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#badges-tags-and-pills).

- **Prefix pattern**: The `tag-prefix` (rendered as `.tag__prefix`) is deliberately lower-contrast. It provides machine context ("CAT", "SYS", "ID", "SEAL") without competing with the primary label. On colored variants the prefix becomes a semi-transparent white.
- **Remove affordance**: Tiny 12px × button with negative margins for tight packing. Opacity treatment keeps it from dominating the tag until hovered. Never shown unless `removable`.
- **No auto-removal**: The component deliberately emits an event rather than mutating the DOM. This gives parent code (often AI-generated lists or filter state) full control.
- **Typography & shape**: Matches the badge family — mono uppercase, 0.14em tracking. Default shape is square-edged; only the remove button introduces a slight visual exception.
- **Use cases**: Filter active chips, applied categories on a record, classification labels on log entries, removable directive tags in a command panel.
- **Palette discipline**: Primary/secondary fills match button and badge language. Outline variant is useful for "available but not yet selected" tags.
- **Density**: Designed to live in horizontal racks with 4–8px gaps. Multiple removable tags feel like a physical tag board in a control room.

Tags complete the small-label family (`thx-badge` for status, `thx-tag` for categorized/removable metadata) in the THX-1138 system.
