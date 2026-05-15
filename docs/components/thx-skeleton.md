# thx-skeleton

**THX 1138 styled loading skeleton / placeholder.**

Provides clean, clinical loading states for text blocks, circles, and rectangles with shimmer or pulse animation. Supports a dedicated `crt` variant with phosphor scanlines and breathing glow. Used to reserve space and maintain visual rhythm while content is fetched — essential for perceived performance in dense instrument panels and data-heavy interfaces.

## Import

```js
import 'thx-components/src/components/thx-skeleton.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-skeleton variant="text" lines="4" animated></thx-skeleton>

<thx-skeleton variant="rect" width="100%" height="120px"></thx-skeleton>

<thx-skeleton variant="circle" size="lg"></thx-skeleton>
```

## Advanced Usage

### CRT Monitor Loading State

```html
<thx-crt-display label="TELEMETRY // LOADING">
  <thx-skeleton variant="crt" animated effect="pulse" width="100%" height="180px"></thx-skeleton>
</thx-crt-display>
```

### Mixed Content Placeholder

```html
<div>
  <thx-skeleton variant="circle" size="md"></thx-skeleton>
  <thx-skeleton variant="text" lines="2"></thx-skeleton>
  <thx-skeleton variant="rect" width="60%"></thx-skeleton>
</div>
```

### Avatar + Metadata Loading

```html
<thx-skeleton variant="circle" size="lg"></thx-skeleton>
<thx-skeleton variant="text" lines="3"></thx-skeleton>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'text' \| 'circle' \| 'rect' \| 'crt'` (reflects) | `'text'` | Shape family. `crt` is a special rect with phosphor styling. |
| `lines` | `number` | `3` | Number of text skeleton lines (only for `variant="text"`). Last line is 80% width. |
| `animated` | `boolean` (reflects) | `true` | Enables animation. |
| `effect` | `'shimmer' \| 'pulse'` | `'shimmer'` | Animation style. |
| `width` | `string` (CSS) | `''` | Custom width for rect/circle. |
| `height` | `string` (CSS) | `''` | Custom height (ignored for text variant). |

## Slots

None. Purely presentational placeholders.

## Accessibility

- The skeleton container carries `aria-hidden="true"` and `aria-label="Loading"`.
- It never receives focus.
- When content finishes loading, replace the skeleton with real semantic content (headings, labels, etc.) so screen readers receive meaningful information.
- Color and motion are never the sole indicators — the shape and placement communicate the structure of the forthcoming content.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#loading-states-and-skeletons).

- **Shimmer**: Classic left-to-right highlight sweep (institutional gray on light, softer blue on CRT).
- **Pulse**: Subtle opacity breathing; CRT variant adds a soft glow that intensifies.
- **CRT variant**: Uses phosphor-tinted background + static scanline overlay + dedicated `crtPulse` keyframe with box-shadow.
- **Text lines**: Last line auto-shrinks to 80% for a more natural paragraph feel.
- **AI-friendly**: `<thx-skeleton variant="text" lines="5">` or `<thx-skeleton variant="crt" width="100%" height="200px">` is the only markup needed for polished loading states that perfectly match the final UI.
- **Size presets**: `sm / md / lg / xl` heights available for rect/circle via the height or size classes.
- **Consistency**: Matches the exact border-radius and spacing language used by cards, badges, and other components.

Skeletons keep the interface feeling "alive" and structurally stable during network latency — a hallmark of high-quality clinical dashboards.

## Related Components

- [thx-spinner](./thx-spinner.md)
- [thx-animation](./thx-animation.md) — often used to reveal content after skeleton
- [thx-crt-display](./thx-crt-display.md)
- [thx-avatar](./thx-avatar.md) — circle skeletons are perfect avatar placeholders
- [thx-chart-monitors](./thx-chart-monitors.md) — charts frequently show skeleton while data loads
