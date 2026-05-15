# thx-badge

**THX 1138 styled badge / status indicator component.**

A compact, square (or pill) mono uppercase label used for status, categorization, and metadata. Follows the strict THX-1138 visual language: zero or full-radius only when semantically justified (pills for status "pills"), phosphor or warning/error fills reserved for meaning, and an optional pulsing variant for live data. Supports icon-only mode for ultra-dense telemetry readouts.

## Import

```js
import 'thx-components/src/components/thx-badge.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-badge>LIVE</thx-badge>
<thx-badge variant="primary">NOMINAL</thx-badge>
<thx-badge variant="warning">CHECK</thx-badge>
<thx-badge variant="error">CRITICAL</thx-badge>
```

## Advanced Usage

### Pulse (Live Indicators)

```html
<thx-badge variant="pulse">LIVE</thx-badge>
<thx-badge variant="pulse">UPDATING</thx-badge>
<thx-badge variant="warning" pill>PENDING</thx-badge>
```

### Pill and Icon-Only

```html
<thx-badge pill>SEALED</thx-badge>
<thx-badge variant="secondary" pill>BATCH 0420</thx-badge>

<!-- Icon-only badges for compact status -->
<thx-badge variant="primary" icon-only>◆</thx-badge>
<thx-badge variant="warning" icon-only>▲</thx-badge>
<thx-badge variant="error" icon-only>■</thx-badge>
```

### With Slotted Icons / Graphics

```html
<thx-badge variant="success">
  <svg ...></svg> OK
</thx-badge>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'warning' \| 'error' \| 'inactive' \| 'pulse' \| 'success'` (reflects) | `'primary'` | Color and animation treatment. `pulse` applies the breathing opacity animation on primary blue. `success` uses a translucent phosphor tint. |
| `pill` | `boolean` (reflects) | `false` | Applies `border-radius: 9999px` (full). Use only for explicit "pill" semantics; default is square. |
| `icon-only` | `boolean` (reflects, attribute `icon-only`) | `false` | Forces fixed 20px square size with zero padding. Ideal for pure symbol status (◆, ▲, ●). |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Badge text or icon content. Text is automatically uppercased and letter-spaced. SVG or images receive sized styling. |

## Events

None. Badges are non-interactive presentational elements.

## Variants

- **primary** (default): Solid phosphor blue fill, dark text.
- **secondary**: Muted phosphor gray fill, light text.
- **warning**: Amber fill.
- **error**: Critical orange-red fill with white text.
- **inactive**: Transparent with gray border and text (for "off" or archival states).
- **pulse**: Primary blue + infinite 2s opacity pulse (0.6–1.0). Use for live / streaming / connected indicators.
- **success**: Low-opacity phosphor background with phosphor text (subtle positive confirmation).
- **pill**: Forces rounded shape regardless of variant.
- **icon-only**: Square micro-badge (no text expected).

## Accessibility

- Purely decorative or status-oriented. When conveying meaning, ensure surrounding text or `aria-label` on a parent provides context.
- For live pulsing badges, pair with an `aria-live` region or visually hidden text describing the state ("Live telemetry active").
- No focus or keyboard behavior (not a button).
- Color is never the sole indicator — the label text ("LIVE", "CRITICAL") or icon always carries the semantic load.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#badges-tags-and-pills).

- **Shape contract**: Default is strictly square (`rounded: none`). `pill` is the explicit exception and should be used sparingly — primarily for status "pills" or category chips that need to feel softer.
- **Color semantics**: Phosphor blue = normal / active / nominal. Amber = caution. Orange-red = fault. Gray inactive = offline / archived. Success variant is a quiet positive (translucent) rather than a loud green.
- **Pulse animation**: Low-intensity opacity only (never scale or bright glow) to avoid visual fatigue. 2-second cycle. Reserved for truly live data.
- **Typography**: 12–13px mono, 600 weight, 0.14em–0.16em tracking, uppercase. Fits perfectly beside KPIs or in data tables.
- **Icon-only mode**: 20×20px fixed. Perfect for micro status columns in monitor grids (e.g., a column of colored diamonds indicating per-row health).
- **Slotted media**: SVGs and images are automatically sized to ~14px with right margin (removed in icon-only). Use `currentColor` for automatic tinting.
- **Density**: Designed to sit in "badge racks" and data rows without adding visual weight. Padding 4px 8px.

Badges are the micro-label workhorse of the THX system — use them for machine identifiers, state flags, and live indicators, never for decorative flair.
