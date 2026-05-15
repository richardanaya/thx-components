# thx-alert

**THX 1138 styled alert / status notification component.**

A slab-based status message surface featuring a thick colored left rail, geometric mono icon, uppercase label, and body content. Embodies the institutional, clinical aesthetic of THX-1138: off-white surface with subtle gradient tint, strict mono typography for the label, and restrained use of phosphor, amber, or orange-red only as operational signals. Supports optional dismissible behavior with a clean close affordance.

## Import

```js
import 'thx-components/src/components/thx-alert.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-alert variant="info" open>ALL SYSTEMS NOMINAL</thx-alert>
<thx-alert variant="warning" open label="MED">SEDATION QUEUE RUNNING HOT</thx-alert>
<thx-alert variant="error" open>CRITICAL FAULT IN SECTOR 7</thx-alert>
<thx-alert variant="success" open>ARCHIVE COMPLETE</thx-alert>
```

Note: The `open` attribute is not strictly required in current implementation (visibility is controlled via `hidden` property), but examples in dashboards often include it for clarity.

## Advanced Usage

### Closable Alerts

```html
<thx-alert variant="warning" closable label="REVIEW">
  Manual override recommended before proceeding with batch 1138.
</thx-alert>
```

When the user clicks the close (×) button, the alert sets `hidden=true` and dispatches a `close` event.

### Custom Label vs Default

Each variant has a built-in uppercase label:

- `info` → "NOTICE"
- `warning` → "WARNING"
- `error` → "ERROR"
- `success` → "CONFIRMED"

Override with the `label` attribute:

```html
<thx-alert variant="info" label="SYS">NORTH TUNNEL SCAN COMPLETE</thx-alert>
<thx-alert variant="error" label="SEC">INTRUDER DETECTED — LEVEL 4</thx-alert>
```

### Icons

Icons are geometric primitives rendered via text:

- info: ◆ (diamond)
- warning: ▲ (triangle)
- error: ■ (square)
- success: ● (circle)

These are placed in the icon column and inherit the status color.

### Programmatic Control

```js
const alertEl = document.querySelector('thx-alert');
alertEl.hidden = true; // or remove the element after close event
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'info' \| 'warning' \| 'error' \| 'success'` (reflects) | `'info'` | Determines rail color, icon, default label, and gradient tint. |
| `closable` | `boolean` (reflects) | `false` | Renders a close button (×). Clicking it hides the alert and fires `close`. |
| `label` | `string` | `''` (falls back to variant default) | Overrides the header label (e.g., "SYS", "MED", "SEC"). Always rendered uppercase. |
| `hidden` | `boolean` (reflects) | `false` | When true, the alert renders nothing (display: none via host). Set by close handler. |

## Slots

| Slot | Description |
|------|-------------|
| (default) | The message body. Text is rendered with relaxed casing and normal letter-spacing for readability (`.alert__message`). May contain multiple lines or simple inline markup. |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `close` | (no detail) | Dispatched when the close button is activated (`closable`). Bubbles and composed. The component has already set `hidden = true`. |

## Variants

- **info** (default): Phosphor blue left rail + light blue gradient wash. "NOTICE" / ◆. For operational status updates.
- **warning**: Amber (`#D4AA00`) rail and tint. "WARNING" / ▲. For cautionary but non-fatal conditions.
- **error**: Critical orange-red (`#D44000`) rail. "ERROR" / ■. For faults and failures.
- **success**: Muted phosphor gray rail. "CONFIRMED" / ●. For positive completion states.

All variants share the same off-white slab background, inner shadow, and mono label treatment. Message text relaxes to normal case and tracking.

## Accessibility

- Root container has `role="alert"` and `aria-live="polite"`.
- Icon column is `aria-hidden="true"`.
- Close button has explicit `aria-label="Dismiss alert"`.
- When `hidden`, the element is fully removed from the accessibility tree.
- Message content should be concise. For very long text, consider using a `<thx-dialog>` instead.
- Keyboard: Close button is focusable and activatable via Enter/Space when `closable`.
- Recommended: Use `label` to give context ("SEC", "MED", "SYS") so users scanning multiple alerts understand provenance.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#alerts-and-status).

- **Left rail system**: Thick (`border-size-1 + border-size-2`) colored border on the left provides instant status recognition even in dense lists. Gradient background wash (8% status color) adds depth without chromatic overload.
- **Typography contract**: Label is strictly mono uppercase, 13px, 600 weight, wide tracking. Message body uses normal casing and relaxed spacing for human readability — the only place in the system where prose is allowed to "breathe".
- **Icons**: Pure geometric symbols (diamond, triangle, square, circle) — never emoji or illustrative. They are sized and centered in a fixed 16px column.
- **Closable treatment**: The × affordance is minimal, gray, and only appears on explicit `closable`. Hover darkens text. No animation on dismiss (instant hide).
- **Clinical voice**: Labels like "NOTICE", "WARNING", "ERROR", "CONFIRMED" and short machine-flavored messages ("SEDATION QUEUE RUNNING HOT") reinforce the dystopian control-room tone.
- **No floating cards**: The alert is a slab that sits flush in the layout. Multiple alerts stack naturally with the system's 8px–12px rhythm.
- **Contrast**: Status colors meet AA requirements on the light surface. The message text is secondary gray (`#666`).

Alerts are intended for transient but important system feedback — not for marketing "success" banners or permanent UI chrome.
