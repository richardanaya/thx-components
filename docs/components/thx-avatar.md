# thx-avatar

**THX 1138 styled avatar / user or entity representation.**

Compact square (default), rounded, or circular image or initials placeholder with optional status dot. Follows the strict THX mono-uppercase, phosphor-tinted CRT aesthetic in `crt` variant. Perfect for personnel lists, operator consoles, user cards, and system-entity indicators. Supports interactive hover states and graceful fallback from image to initials.

## Import

```js
import 'thx-components/src/components/thx-avatar.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-avatar name="DR. ALYX VANCE" size="md"></thx-avatar>
<!-- shows "AV" initials -->

<thx-avatar image="/avatars/crew-07.png" name="OPS-07" size="lg" shape="circle"></thx-avatar>

<thx-avatar name="SYSTEM" status="online" variant="crt"></thx-avatar>
```

## Advanced Usage

### Status Indicators

```html
<thx-avatar name="SECTOR LEAD" status="online" size="sm"></thx-avatar>
<thx-avatar name="ANALYST" status="away" size="sm"></thx-avatar>
<thx-avatar name="MAINT" status="busy" size="sm"></thx-avatar>
<thx-avatar name="OFFLINE" status="offline" size="sm"></thx-avatar>
```

### In Lists and Headers

```html
<div class="crew-row">
  <thx-avatar name="COMMANDER" size="md" shape="square" interactive></thx-avatar>
  <div>
    <strong>COMMANDER 1138</strong>
    <thx-badge variant="primary">ON DUTY</thx-badge>
  </div>
</div>
```

### CRT Styled for Monitor Panels

```html
<thx-avatar 
  name="AI CORE" 
  variant="crt" 
  shape="rounded" 
  size="lg">
</thx-avatar>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `image` | `string` | `''` | URL of avatar image. Falls back to initials on error or absence. |
| `name` | `string` | `''` | Full name used for `aria-label` and for generating 1–2 letter uppercase initials. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` (reflects) | `'md'` | Preset dimensions and font scaling. |
| `shape` | `'square' \| 'rounded' \| 'circle'` (reflects) | `'square'` | Geometry. Square is the THX default. |
| `variant` | `'default' \| 'crt' \| 'outline'` (reflects) | `'default'` | `crt` uses phosphor tint + static scanlines. `outline` is border-only. |
| `status` | `'online' \| 'away' \| 'busy' \| 'offline'` | `''` | Shows a small status dot in the bottom-right corner with appropriate color. |
| `interactive` | `boolean` (reflects) | `false` | Adds hover glow and pointer cursor for clickable avatars. |

## Slots

None. Image or initials are rendered internally; status dot is also internal.

## CSS Parts

The component exposes no explicit `part` attributes in current implementation (future enhancement possible). Style via host or attribute selectors.

## Events

None. Use `interactive` + a parent click handler or wrap in a button/link for actions.

## Variants & Shapes

- **square** (default): Hard 0-radius — institutional and precise.
- **rounded**: Subtle 4px radius.
- **circle**: Fully round — best reserved for human photos when a softer feel is desired.
- **crt**: Phosphor-blue tinted background, static scanline texture (via `crtStaticScanlineOverlay`), glow on hover.
- **outline**: Transparent with border; useful for "unselected" or secondary entities.
- **status dots**: Blue (online/nominal), Amber (away), Red (busy/error), Gray (offline).

## Accessibility

- The root element carries `role="img"` and `aria-label` derived from the `name` attribute (falls back to "Avatar").
- When `image` is present, the `<img>` has empty `alt` (the label lives on the container).
- Status dot is purely decorative.
- For interactive avatars, ensure the parent or wrapping element is a `<button>` or `<a>` and provides proper labeling.
- Keyboard users: interactive avatars receive focus-visible phosphor glow via the library mixin.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (avatars fall under personnel / entity indicators in control-room UIs).

- **Initials generation**: Automatically takes first letter of each word and limits to two characters (e.g. "DR. ALYX VANCE" → "AV").
- **Image error handling**: On load failure the component clears the image and falls back to initials instantly.
- **CRT scanlines**: Applied only to square and rounded CRT avatars (circle variant keeps clean phosphor fill).
- **Status positioning**: Dot is positioned absolutely; square avatars receive a slight negative offset so the dot sits on the border.
- **AI-friendly**: `<thx-avatar name="..." status="online" size="sm">` is all that is required — the system produces correct initials, status color, and styling without any extra markup or logic.
- **Density**: Designed for tight racks, tables, and header bars. `xs` and `sm` sizes are especially compact.

Avatars complete the identity layer alongside `thx-badge`, `thx-tag`, and `thx-icon`.

## Related Components

- [thx-icon](./thx-icon.md)
- [thx-badge](./thx-badge.md)
- [thx-tag](./thx-tag.md)
- [thx-tooltip](./thx-tooltip.md) — often paired to show full name on hover
- [thx-menu-item](./thx-menu-item.md) — avatars appear inside menu rows in some dashboards
