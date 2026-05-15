# thx-popup

**THX 1138 styled positioned popup / tooltip-like overlay component.**

A flexible clinical popup surface with extensive placement control, optional arrow pointer, modal backdrop variant, and full CRT monitor treatment (scanlines + vignette). Provides the precise, instrument-panel language of THX-1138 for contextual notes, classified info, or transient command surfaces. Supports slotted custom triggers, header title with close, body content, and footer actions. Recent improvements emphasize centralized CRT effects (both scanline and vignette overlays) and robust outside-click dismissal.

## Import

```js
import 'thx-components/src/components/thx-popup.js';
// or
import 'thx-components';
```

## Basic Usage

```html
<thx-popup title="CLASSIFIED NOTE" placement="top" arrow>
  <thx-button slot="trigger" variant="outline-primary">OPEN POPUP</thx-button>
  <p style="color: var(--atmos-primary); font-family: var(--font-mono)">
    Subject 1138-A cleared for transit at 0412.
  </p>
  <thx-button slot="footer" variant="secondary">ACK</thx-button>
</thx-popup>
```

## Advanced Usage

### Trigger Slot

Any element can be placed in `slot="trigger"`. The popup toggles on trigger click. A default phosphor primary button is provided when no trigger slot is used.

```html
<thx-popup>
  <span slot="trigger" style="cursor: pointer; text-decoration: underline;">Hover or click for details</span>
  <!-- popup content -->
</thx-popup>
```

### Rich Placement Control

12 placement values for pixel-perfect positioning relative to the trigger:

```html
<thx-popup placement="top">...</thx-popup>
<thx-popup placement="top-start">...</thx-popup>
<thx-popup placement="top-end">...</thx-popup>
<thx-popup placement="bottom-start">...</thx-popup>
<!-- ... bottom, left-*, right-* variants -->
```

The `distance` property (default 8) controls the gap in pixels.

### Modal vs Non-Modal

```html
<thx-popup modal title="CONFIRMATION" placement="bottom">
  <!-- dark backdrop + click outside closes -->
</thx-popup>
```

Non-modal (default) popups close only on outside click or explicit hide / close button.

### Minimal / No Header or Close

```html
<thx-popup no-header no-close arrow placement="right">
  <div slot="trigger">?</div>
  <p>Quick fact without chrome.</p>
</thx-popup>
```

### Programmatic Control

```js
const popup = document.querySelector('thx-popup');
popup.show();
popup.hide();
popup.toggle();
popup.addEventListener('toggle', ...);
```

## Properties / Attributes

| Attribute   | Type (many placement strings)                          | Default     | Description |
|-------------|--------------------------------------------------------|-------------|-------------|
| `open`      | `boolean` (reflects)                                   | `false`     | Popup visibility. |
| `placement` | `'top'\|'bottom'\|'left'\|'right'` + `*-start` / `*-end` variants | `'bottom'` | Precise positioning of the popup relative to trigger. |
| `title`     | `string`                                               | `'TERMINAL-1138'` | Mono header title (hidden when `no-header`). |
| `arrow`     | `boolean`                                              | `true`      | Shows the 45° pointer triangle aligned to trigger. |
| `modal`     | `boolean`                                              | `false`     | Adds a full-screen dark backdrop that closes on click. |
| `no-header` | `boolean` (reflects)                                   | `false`     | Hides the title bar. |
| `no-close`  | `boolean` (reflects)                                   | `false`     | Hides the × close button in header. |
| `distance`  | `number`                                               | `8`         | Pixel gap between trigger and popup edge. |

## Slots

| Slot     | Description |
|----------|-------------|
| `trigger`| The element that toggles the popup. Falls back to a default "OPEN" button. |
| (default)| Main body content inside the popup (receives body padding and normal font for readability). |
| `footer` | Action row at bottom (border-top hairline). |

## Events

| Event   | Detail | Description |
|---------|--------|-------------|
| `toggle`| (none) | Fired by `show()`/`hide()`/`toggle()` and trigger interaction. Bubbles, composed. |

## Variants

- **placement + arrow**: 12 positions with automatically rotated/positioned arrow for classic tooltip or callout feel.
- **modal**: Full interruption mode with backdrop (useful for important notes).
- **CRT + vignette**: Dark `#111` panel with thick CRT border, static scanlines (`crtStaticScanlineOverlay`), and radial vignette (`crtStaticVignetteOverlay`) both extracted from `src/styles/crt-effects.js`. Produces authentic phosphor monitor pop-up.
- **Header treatment**: Phosphor title + optional close button with hover promotion (identical language to dialog/drawer).
- **Footer**: Consistent right-aligned action spacing.

## Accessibility

- Popup content uses `role="dialog"` + `aria-modal` (true only in modal mode).
- Close button has `aria-label="Close popup"`.
- Focus-visible styles target `.popup-close` (shared focus system).
- Outside click (or backdrop) dismissal respects composed path.
- Keyboard: Trigger button fully accessible; Escape implicitly handled via outside-click logic when focus leaves; Tab works inside slotted content.
- When closed, popup is hidden via opacity/visibility and does not occupy space in tab order.
- Recommended: Keep titles short machine identifiers. Use `arrow` for clear association with the triggering element. Provide sufficient body text contrast (phosphor on dark).

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (elevation, CRT displays, dialogs).

- **Positioning engine**: Pure CSS absolute positioning with pre-computed inline styles per placement. No external library. Arrow is a rotated square with border accents to create the pointer illusion.
- **CRT aesthetics**: Combines both scanline *and* vignette overlays from the centralized effects module — the only overlay component that applies the full vignette treatment for extra depth on small pop surfaces.
- **Trigger integration**: The wrapper `<span class="popup-trigger">` captures clicks and contains the slotted trigger. Default fallback button matches primary action styling (phosphor fill, mono uppercase).
- **Visual hierarchy**: Header uses exact same CRT strip + glow label language as dialog and drawer. Body relaxes slightly to body font for longer notes while staying mono-friendly.
- **Reduced-motion**: All transitions are quick-duration; CRT layers respect `prefers-reduced-motion` via the shared stylesheet.
- **No heavy shadows on light**: The popup lives in the dark CRT subsystem, so it receives the strong drop shadow appropriate for dark panels.
- **Clinical tone**: Titles like "CLASSIFIED NOTE", "TERMINAL-1138". Content is terse, alphanumeric, operational.

Popup is ideal for inline explanations, status callouts, or lightweight confirmation surfaces that don't warrant a full dialog or drawer. See [thx-dialog](./thx-dialog.md), [thx-drawer](./thx-drawer.md), and [thx-dropdown](./thx-dropdown.md) for the larger overlay family.
