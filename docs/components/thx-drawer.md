# thx-drawer

**THX 1138 styled slide-out drawer component.**

A clinical slide-out panel with CRT monitor aesthetics, featuring a dark overlay, thick-framed off-white (or CRT) content area, phosphor mono header, and precise placement options. Delivers the dystopian control-room language of THX-1138 through inset mechanical motion, static scanline texture, and robust focus trapping. Supports four placements, multiple sizes, optional overlay suppression, and clean show/hide API. Recent improvements center on centralized CRT static effects extraction and consistent keyboard/focus behavior with its dialog sibling.

## Import

```js
import 'thx-components/src/components/thx-drawer.js';
// or
import 'thx-components';
```

The `<thx-drawer>` element auto-registers.

## Basic Usage

```html
<thx-drawer id="log-drawer" header-label="SECTOR LOG" placement="right" size="lg">
  <div>Subject activity log for sector 7-G.</div>
  <thx-input label="QUERY" placeholder="SEARCH LOGS..."></thx-input>
</thx-drawer>

<script>
  document.getElementById('log-drawer').show();
</script>
```

## Advanced Usage

### Placements

```html
<thx-drawer placement="left" header-label="NAVIGATION">...</thx-drawer>
<thx-drawer placement="right" header-label="COMMAND">...</thx-drawer>
<thx-drawer placement="top" header-label="STATUS">...</thx-drawer>
<thx-drawer placement="bottom" header-label="DETAILS">...</thx-drawer>
```

### Sizes (context-aware)

Horizontal (left/right) sizes: `sm` (300px), `md` (400px), `lg` (560px), `xl` (720px), `full` (100%).

Vertical (top/bottom) sizes: `sm` (200px), `md` (300px), `lg` (400px), `xl` (50vh), `full` (100%).

```html
<thx-drawer placement="right" size="xl" header-label="FULL ANALYSIS">...</thx-drawer>
<thx-drawer placement="bottom" size="lg" header-label="INSPECTION PANEL">...</thx-drawer>
```

### No Overlay Mode

For embedded or non-modal slide surfaces (rare):

```html
<thx-drawer no-overlay placement="left" header-label="SIDE PANEL">
  <!-- content appears without backdrop -->
</thx-drawer>
```

### Programmatic API + Toggle Event

```js
const drawer = document.getElementById('command-drawer');
drawer.show();
drawer.hide();
drawer.toggle();

drawer.addEventListener('toggle', (e) => {
  console.log('Drawer is now', drawer.open ? 'open' : 'closed');
});
```

### Rich Content Example (from ultradashboard)

```html
<thx-drawer id="command-drawer" header-label="COMMAND DRAWER" placement="right" size="lg">
  <thx-alert variant="info" open label="DRAWER">Secondary command surface with live controls.</thx-alert>
  <thx-chart-bar id="drawer-bars"></thx-chart-bar>
  <thx-details open>
    <span slot="summary">RECOVERY PROTOCOL</span>
    If sector 9-K escalates...
  </thx-details>
  <thx-button slot="footer" variant="secondary">CLOSE</thx-button>
</thx-drawer>
```

## Properties / Attributes

| Attribute     | Type                                      | Default      | Description |
|---------------|-------------------------------------------|--------------|-------------|
| `open`        | `boolean` (reflects)                      | `false`      | Visibility toggle. Triggers focus capture/restore. |
| `placement`   | `'left' \| 'right' \| 'top' \| 'bottom'`  | `'right'`    | Slide direction and panel anchoring. |
| `size`        | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`  | `'md'`       | Panel dimensions (horizontal vs vertical aware). |
| `header-label`| `string`                                  | `'TERMINAL-1138'` | Phosphor mono label in the CRT header. |
| `no-header`   | `boolean` (reflects)                      | `false`      | Removes header bar and close button. |
| `no-footer`   | `boolean` (reflects)                      | `false`      | Removes footer slot area. |
| `no-overlay`  | `boolean` (reflects)                      | `false`      | Disables dark backdrop and click-to-close; panel remains interactive. |

## Slots

| Slot     | Description |
|----------|-------------|
| (default) | Scrollable body content with generous padding. |
| `footer` | Right-aligned actions. No default buttons are provided (unlike dialog). |

## Events

| Event   | Detail | Description |
|---------|--------|-------------|
| `toggle`| (none) | Dispatched by `show()`, `hide()`, `toggle()`. Bubbles, composed. |

## Variants

- **placement + size matrix**: Full flexibility for sidebars, top inspection bars, bottom detail trays, or full-screen temporary surfaces.
- **no-overlay**: Produces a "recessed panel" effect without modal semantics.
- **CRT texture**: Static low-opacity scanlines via `crtStaticScanlineOverlay('.drawer-panel')` from centralized `crt-effects.js`. In CRT contexts the panel can feel more monitor-like when combined with dark child content.
- **Header treatment**: Identical phosphor glow mono header and hover-promoted close button as `thx-dialog`.

## Accessibility

- Panel carries `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Focus trap + restore identical to dialog (first focusable or panel itself; Tab cycles; Escape closes).
- Close button (`×`) has `aria-label="Close drawer"`.
- Focus-visible glow applied to `.drawer-close` (shared focus-visible system selectors).
- `no-overlay` still keeps the panel focus-trapped when open.
- Keyboard: Full Escape, Tab/Shift+Tab, and activation support. Arrow keys may be used by slotted children.
- When closed, overlay and panel are visually and structurally removed from the tree.
- Recommended: Use clear machine-style `header-label` values. Provide `start-label` / `end-label` style context inside content where helpful.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#dialogs-and-drawers).

- **Overlay**: Slightly lighter `rgba(10, 10, 10, 0.7)` + blur(1px) than dialog to differentiate "side interruption" from centered modal.
- **Panel**: Off-white slab inside `size-2` solid CRT border (`#2A2A2A`), heavy outer shadow. Transform slide from off-screen (translateX/Y ±100%).
- **Header**: Exact match to dialog — dark CRT strip, phosphor label with glow, minimal bordered close affordance.
- **CRT extraction**: Shared static scanline overlay (opacity ~0.03) pulled from `src/styles/crt-effects.js`. Ensures visual consistency across all overlay primitives while respecting `prefers-reduced-motion`.
- **Motion**: Ease-out translate transition (moderate-2 duration) — feels like a physical drawer or rack sliding into place.
- **Divider & footer**: Hairline top border on footer; consistent right-aligned action spacing.
- **No floating**: The panel is always anchored to a viewport edge. When `no-overlay` the visual weight still comes from the thick CRT frame and shadow.
- **Clinical tone**: Labels like "SECTOR LOG", "COMMAND DRAWER", "TERMINAL-1138". Content should feel like diagnostic panels or protocol surfaces.

Drawers complement dialogs for secondary, longer-lived contextual surfaces (logs, filters, multi-step forms). See [thx-dialog](./thx-dialog.md) and [thx-popup](./thx-popup.md) for related overlay patterns. The split-panel and details components often live comfortably inside drawers.
