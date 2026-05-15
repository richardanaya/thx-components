# thx-details

**THX 1138 styled disclosure / accordion component.**

A clinical expandable section featuring a mono uppercase summary row, rotating chevron indicator, left status rail that activates on open, and subtle phosphor glow. Delivers the austere, institutional expandable behavior expected in THX-1138 control interfaces — protocol lists, log entries, configuration blocks, or any hierarchical information that must remain collapsed by default. Fully custom implementation (no native `<details>` element) for precise styling and event control.

## Import

```js
import 'thx-components/src/components/thx-details.js';
// or
import 'thx-components';
```

## Basic Usage

```html
<thx-details>
  <span slot="summary">PROTOCOL 0420-A - INCIDENT VERIFICATION</span>
  All breaking alerts require cross-reference with minimum 2 independent sources before elevation to CRITICAL status.
</thx-details>

<thx-details open>
  <span slot="summary">PROTOCOL 0420-B - SOURCE RANKING</span>
  Tier 1: AP, Reuters, AFP. Tier 2: BBC, NYT, WaPo.
</thx-details>
```

## Advanced Usage

### Suffix Label

```html
<thx-details suffix="0420-A">
  <span slot="summary">INCIDENT VERIFICATION</span>
  ...
</thx-details>
```

The suffix appears right-aligned in muted mono (e.g. protocol or reference codes).

### Disabled State

```html
<thx-details disabled>
  <span slot="summary">CLASSIFIED — LEVEL 5</span>
  Content is redacted.
</thx-details>
```

### Programmatic Toggle + Event

```js
const det = document.querySelector('thx-details');
det.open = true;        // or det.toggle()
det.addEventListener('details-toggle', (e) => {
  console.log('Now open:', e.detail.open);
});
```

Method `toggle()` respects the `disabled` flag.

### Nesting and Composition

Details work well inside drawers, cards, or split panels. Multiple adjacent `thx-details` create clean protocol or log accordions.

```html
<thx-details open>
  <span slot="summary">RECOVERY PROTOCOL</span>
  If sector 9-K escalates, isolate transit line...
</thx-details>
```

## Properties / Attributes

| Attribute | Type               | Default | Description |
|-----------|--------------------|---------|-------------|
| `open`    | `boolean` (reflects) | `false` | Expanded state. When true, content is visible and left rail + glow activate. |
| `disabled`| `boolean` (reflects) | `false` | Prevents toggling; dims the summary. |
| `suffix`  | `string`           | `''`    | Optional right-aligned mono code or reference (e.g. "0420-A"). |

## Slots

| Slot      | Description |
|-----------|-------------|
| `summary` | The clickable header label. Rendered in mono uppercase. Default fallback text: "PROTOCOL DETAILS". |
| (default) | The expandable body content. Only rendered when `open`. Receives standard padding and secondary text color. |

## Events

| Event           | Detail             | Description |
|-----------------|--------------------|-------------|
| `details-toggle`| `{ open: boolean }`| Fired after any toggle (click or `.toggle()`). Bubbles, composed. |

## Variants

- **open / closed**: Visual contract is the primary state — left phosphor border, background wash, rotated chevron (▸ → ▼), summary color + text-shadow glow, and bottom hairline on the summary.
- **disabled**: Reduced opacity, no pointer events, not-allowed cursor on summary.
- **suffix**: Right-aligned metadata without affecting the toggle affordance.

No CRT variant (this component lives in the light institutional slab world), but it pairs beautifully inside `thx-crt-display` or dark drawers when needed.

## Accessibility

- Summary row is the interactive target (click handler prevents default and calls toggle).
- Chevron is purely decorative (no separate ARIA needed).
- When open, content appears immediately in DOM (no hidden attribute tricks).
- Keyboard: Summary is focusable via Tab (as part of normal flow) and activatable with Enter/Space. Full keyboard support for the toggle action.
- Focus-visible: The summary row receives appropriate glow treatment through the global focus system when focused via keyboard.
- Disabled state is properly communicated (pointer-events none + opacity).
- No native `<details>` semantics are used; the component provides its own ARIA-friendly behavior via the custom toggle.
- Recommended: Use clear, uppercase, protocol-style summary text. The `suffix` is ideal for short alphanumeric identifiers that aid scanning.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (layout, alerts-and-status, navigation).

- **Left rail system**: On open, a thick phosphor-blue (`#A6C8E1`) left border appears together with a 3% blue background wash — instant visual "active section" signal consistent with alerts and selected navigation.
- **Chevron indicator**: `▸` character rotates 90° on open with color promotion to primary. Pure geometric, no images.
- **Typography**: Summary is strictly mono uppercase, 13px scale, 600 weight, wide tracking. Body content relaxes to normal font-size and line-height for readability (secondary gray text).
- **Glow on open**: Subtle text-shadow on the summary label when expanded — the only place soft glow is used on light surfaces for "live/selected" emphasis.
- **Hover treatment**: Summary text and chevron both promote to phosphor on hover, reinforcing interactivity.
- **Spacing contract**: Generous internal padding, consistent with the 4px rhythm system. Margins between stacked details are built-in.
- **Clinical voice**: "PROTOCOL 0420-A", "RECOVERY PROTOCOL", "INCIDENT VERIFICATION". The component is purpose-built for procedural, hierarchical, or reference material that must stay compact until needed.
- **No floating or cards**: The details element is a flush slab with a left accent rail — sits naturally in lists, panels, or drawers.

`thx-details` is the standard disclosure primitive for the library. Use it for any expandable protocol, log entry, or configuration block. Frequently appears inside `thx-drawer` and `thx-split-panel` content areas. See dashboard.html and ultradashboard.html for real-world protocol lists.
