# thx-dialog

**THX 1138 styled modal dialog component.**

A clinical, dystopian modal interruption surface featuring a dark CRT-framed off-white panel, phosphor mono header label, static scanline texture, and robust focus trapping. Embodies the institutional control-room aesthetic of THX-1138: heavy dark overlay with backdrop blur, thick CRT border housing a light slab body, uppercase mono labels with subtle glow, and mechanical scale-in animation. Supports configurable sizes, optional header/footer, and clean programmatic control via methods. Recent improvements include centralized CRT static effects extraction and enhanced keyboard/focus management.

## Import

```js
import 'thx-components/src/components/thx-dialog.js';
// or full library
import 'thx-components';
```

The element `<thx-dialog>` auto-registers on import.

## Basic Usage

```html
<thx-dialog id="confirm-dialog" header-label="CONFIRM ACTION" size="md">
  <p>Proceed with subject monitoring protocol in sector 7-G?</p>
  <thx-button slot="footer" variant="primary">CONFIRM</thx-button>
  <thx-button slot="footer" variant="secondary">CANCEL</thx-button>
</thx-dialog>

<script>
  document.getElementById('confirm-dialog').show();
</script>
```

## Advanced Usage

### Programmatic Control

Use the `show()`, `hide()`, and `toggle()` methods (preferred over direct attribute mutation for proper focus and scroll handling):

```js
const dialog = document.querySelector('thx-dialog');
dialog.show();   // opens + traps focus + locks body scroll
dialog.hide();   // closes + restores previous focus
dialog.toggle();
```

The `open` attribute/property also works and reflects:

```html
<thx-dialog open header-label="ALERT-1138">...</thx-dialog>
```

### Sizes

```html
<thx-dialog size="sm" header-label="SHORT">Compact confirmation.</thx-dialog>
<thx-dialog size="md" header-label="STANDARD">Default operational width.</thx-dialog>
<thx-dialog size="lg" header-label="DETAILED">Wider content surface for forms or logs.</thx-dialog>
```

### Minimal Headerless or Footerless

```html
<thx-dialog no-header no-footer open>
  <thx-alert variant="warning" open label="CRITICAL">Immediate evacuation required.</thx-alert>
</thx-dialog>
```

### Custom Footer and thx-confirm Event

When using the default (non-slotted) footer, the built-in CONFIRM button dispatches a `thx-confirm` custom event:

```html
<thx-dialog id="order-dialog" header-label="ORDER-ISSUANCE">
  <thx-alert variant="warning" open label="VERIFY">This command will be logged.</thx-alert>
  <p>Directive target: sector 7-G.</p>
</thx-dialog>

<script>
  const dlg = document.getElementById('order-dialog');
  dlg.addEventListener('thx-confirm', () => {
    console.log('Order confirmed');
    dlg.hide();
  });
</script>
```

Slotted footer content completely replaces the default buttons.

### Integration with Other Components

Dialogs commonly host alerts, forms, charts, or split content while preserving the clinical tone.

## Properties / Attributes

| Attribute    | Type                          | Default     | Description |
|--------------|-------------------------------|-------------|-------------|
| `open`       | `boolean` (reflects)          | `false`     | Controls visibility of the overlay and panel. Setting triggers focus management and body scroll lock. |
| `header-label` | `string`                    | `'ALERT-1138'` | Uppercase mono label rendered in the dark CRT header strip (text-shadow glow applied). |
| `size`       | `'sm' \| 'md' \| 'lg'`        | `'md'`      | Panel width: `sm` ≈ 400px, `md` ≈ 600px, `lg` ≈ 800px (capped at 90vw). |
| `no-header`  | `boolean` (reflects)          | `false`     | Hides the CRT header bar entirely (including close button). |
| `no-footer`  | `boolean` (reflects)          | `false`     | Hides the footer area and default buttons. |

All properties are reactive. Use attribute form (`header-label="..."`) or property (`.headerLabel = '...'`) .

## Slots

| Slot     | Description |
|----------|-------------|
| (default) | Main dialog body content. Receives standard padding and scrollable overflow. Use for prose, forms, alerts, or other THX components. |
| `footer` | Action buttons or controls aligned right. When empty, a default CANCEL + CONFIRM pair is provided (CONFIRM emits `thx-confirm`). Buttons in footer are automatically spaced. |

## Events

| Event        | Detail                  | Description |
|--------------|-------------------------|-------------|
| `toggle`     | (none)                  | Fired on `show()` / `hide()` / `toggle()` (and open attribute change). Bubbles and composed. |
| `thx-confirm`| (none)                  | Dispatched only when the *default* (non-slotted) CONFIRM button is clicked. Use for quick confirm flows. Bubbles and composed. |

## Variants

- **size-sm / md / lg**: Controls container width for different content densities.
- **no-header / no-footer**: Remove structural sections while keeping the framed panel aesthetic.
- **CRT texture**: Subtle static scanlines (low opacity) are applied via centralized `crtStaticScanlineOverlay` utility. No full animated CRT semantics — the dialog remains a light-surface interruption in the institutional gray world.

The component participates in the shared CRT effects system extracted to `src/styles/crt-effects.js` for consistency across overlays (dialog, drawer, dropdown, popup).

## Accessibility

- Root panel uses `role="dialog"` + `aria-modal="true"` with `aria-labelledby` pointing to the header label.
- Full focus trap: Tab cycles only within dialog focusable elements (buttons, inputs, etc.); Shift+Tab reverses. Container receives fallback focus.
- Escape key always closes the dialog when open.
- Previous focus is captured on open and restored on close (robust `isConnected` check).
- Body `overflow: hidden` prevents background scrolling while open.
- Close button (`×`) has explicit `aria-label="Close dialog"`.
- Focus-visible styling applied to `.dialog-close` (phosphor glow ring via shared focus-visible system).
- When closed, the entire overlay is removed from the accessibility tree via `visibility: hidden` + `opacity`.
- Keyboard: Full support for Tab, Shift+Tab, Escape, and activation of slotted interactive children.
- Recommended: Provide descriptive `header-label` values (e.g. "ORDER-ISSUANCE", "CONFIRM ACTION") for screen reader announcements.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#dialogs-and-drawers).

- **Overlay treatment**: `rgba(10, 10, 10, 0.85)` + `backdrop-filter: blur(2px)` creates the "machine interruption" without complete blackout. Matches the sterile control-room void.
- **Panel housing**: Off-white surface (`#FAFAFA`) inside a thick (`size-3`) dark CRT border (`#2A2A2A`), small radius, double inset shadow + outer depth shadow. Never floats freely.
- **Header**: Full-width CRT dark strip (`#111111`) with phosphor-blue (`#A6C8E1`) mono uppercase label (Courier New, 13px-ish, wide tracking + soft glow text-shadow). Close button is minimal square with border accent that promotes to primary on hover.
- **CRT extraction**: Uses `crtStaticScanlineOverlay('.dialog-container', { opacity: 0.03 })` from the centralized `crt-effects.js` module. Provides faint repeating phosphor lines and reduced-motion respect without claiming full monitor semantics (unlike `thx-crt-display`).
- **Motion**: Scale from `0.95` → `1` on open; short moderate-duration transitions. Mechanical, not bouncy or playful.
- **Footer**: Subtle top hairline divider, right-aligned actions with consistent gap. Default buttons use inline mono uppercase styling matching the system.
- **Clinical voice**: Header labels are machine identifiers ("ALERT-1138", "ORDER-ISSUANCE"). Content should remain terse and operational.
- **Layout contract**: Max 90vh height with internal body scroll. Widths align with DESIGN.md dialog recommendations.

Dialogs are for focused, high-stakes interruptions — confirmations, command issuance, critical alerts — never for transient toasts or persistent UI chrome. Pair with `thx-alert` inside for status signaling.

See also: [thx-drawer](./thx-drawer.md) (slide-out sibling), [thx-popup](./thx-popup.md).
