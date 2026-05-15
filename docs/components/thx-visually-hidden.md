# thx-visually-hidden

**THX 1138 styled visually-hidden accessibility utility.**

Hides content from visual display while keeping it fully available to screen readers and other assistive technologies. The classic "visually hidden" pattern with THX-specific enhancements: optional `focusable` mode (becomes visible on focus with phosphor ring), `skip-link` preset, `announce` live-region preset, and a `debug` mode for development. Essential for semantic, AI-friendly interfaces that must remain fully accessible without visual noise.

## Import

```js
import 'thx-components/src/components/thx-visually-hidden.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-visually-hidden>Additional context for screen readers only.</thx-visually-hidden>
```

## Advanced Usage

### Skip Link (Keyboard Users)

```html
<thx-visually-hidden as="skip-link">
  SKIP TO MAIN CONTENT
</thx-visually-hidden>

<main id="main">...</main>
```

### Live Announcement Region

```html
<thx-visually-hidden as="announce" status="warning">
  Critical system override engaged in Sector 4.
</thx-visually-hidden>
```

### Focusable Hidden Control (e.g. for complex widgets)

```html
<thx-visually-hidden focusable>
  Press Enter to activate advanced options.
</thx-visually-hidden>
```

### Debug Mode During Development

```html
<thx-visually-hidden debug>
  This text is visible only while debug is on.
</thx-visually-hidden>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `focusable` | `boolean` | `false` | Makes the element visible and styled when it receives focus or contains focus. |
| `as` | `'default' \| 'skip-link' \| 'announce'` | `'default'` | Preset rendering mode with appropriate ARIA and positioning. |
| `debug` | `boolean` | `false` | Forces the element to be visible with dashed border and "[HIDDEN]" prefix for development. |
| `status` | `'normal' \| 'warning' \| 'error'` | `'normal'` | Color treatment when focused (for focusable mode). |

## Slots

- default: The hidden (or conditionally visible) content.

## Events

- `thx-activate` — dispatched on Enter/Space when the element is focusable (used by skip-link preset).

## ARIA & Semantics

- Default: `role="none"`.
- `as="announce"`: `role="status"`, `aria-live="polite"`.
- Skip link: rendered as `<a href="#main">` with proper keyboard handling.
- Focusable elements receive the library's signature soft phosphor focus ring on `:focus-visible`.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#accessibility) and the visually-hidden section.

- **Classic clip + absolute pattern**: Uses the well-known `clip: rect(0,0,0,0)` + `position:absolute` technique for reliable hiding.
- **Focusable reveal**: When focused, the element becomes a normal static block with background, border, and padding — perfect for "press Enter to..." instructions or skip links.
- **Skip-link preset**: Fixed positioning at top, slides into view on focus with dark institutional styling and " // PRESS ENTER" suffix.
- **Announce preset**: Bottom-right fixed live region with warning icon prefix and CRT-style border — ideal for global status messages.
- **Debug mode**: Renders the content visibly with a dashed phosphor border and explicit "[HIDDEN]" label so developers can verify what is being hidden.
- **AI-friendly**: The component lets LLMs produce fully accessible interfaces by simply wrapping explanatory text or instructions without having to remember the entire CSS clip recipe.
- **Status variants**: Warning and error focus states use the correct accent colors for the message severity.

This utility is the foundation of the library's accessibility story — used internally by many components and recommended for any generated THX interface.

## Related Components

- [thx-tooltip](./thx-tooltip.md)
- [thx-mutation-observer](./thx-mutation-observer.md) — often paired with live announcements
- All form controls and navigation components (they rely on proper labeling and hidden helpers)
