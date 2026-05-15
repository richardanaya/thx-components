# thx-carousel-item

**THX 1138 styled carousel slide item component.**

A minimal, semantic wrapper required as a direct child of `<thx-carousel>`. Provides the structural contract for the carousel track (flex: 0 0 100%), optional `label` for accessibility, and clean slot projection for images, figures, custom mission slides, or any content. Styled with the monochrome THX-1138 aesthetic — no visible chrome of its own; all visual treatment lives in the parent carousel or slotted content.

## Import

```js
import 'thx-components/src/components/thx-carousel-item.js';
// or (recommended)
import 'thx-components';
```

Must be used inside a `<thx-carousel>`.

## Basic Usage

```html
<thx-carousel>
  <thx-carousel-item>
    <img src="corridor.jpg" alt="Sedation corridor overview">
  </thx-carousel-item>
  <thx-carousel-item label="Archive vault">
    <figure>
      <img src="vault.jpg" alt="">
      <figcaption>VAULT-07 // 0412</figcaption>
    </figure>
  </thx-carousel-item>
</thx-carousel>
```

## Properties / Attributes

| Attribute | Type     | Default | Description |
|-----------|----------|---------|-------------|
| `label`   | `string` | `''`    | Optional slide identifier. Applied as `aria-label` on the slide group for screen readers. Also useful for future legends or tooltips. |

## Slots

| Slot     | Description |
|----------|-------------|
| (default) | Any content: `<img>`, `<figure>`, custom divs with terminal readouts, charts, or mission visuals. The carousel forces 100% width/height on slotted images via `object-fit: cover`. Figures receive margin reset. |

## Events

None. The item is purely presentational and structural. All navigation events are emitted by the parent `<thx-carousel>`.

## Design Notes

- **Structural contract**: The host applies `flex: 0 0 100%; width: 100%` so each item occupies exactly one carousel viewport. The inner `.carousel-item` mirrors this.
- **Image handling**: `::slotted(img)` receives `width:100%; height:100%; object-fit:cover; display:block` — ideal for full-bleed mission photography or diagrams.
- **Figure support**: `::slotted(figure)` gets `margin:0` so captions sit flush.
- **Accessibility**: When `label` is supplied, the slide receives `role="group"`, `aria-roledescription="slide"`, and the label as `aria-label`. This gives assistive tech clear slide context ("Sedation corridor, slide 2 of 4").
- **No visual styling**: The item itself is transparent. All CRT, border, or label treatment is applied by the parent carousel (arrows, dots, counter, variant). Place high-contrast or phosphor-colored content inside when using `variant="crt"` on the carousel.
- **Clinical tone**: Use the `label` for short machine identifiers ("Sedation corridor", "Observation dome", "VAULT-07"). Content inside should feel like captured instrument feeds or classified imagery.
- **Usage with CRT**: When the parent carousel has `variant="crt"`, children should use dark backgrounds and phosphor text (`#A6C8E1`) for authentic monitor appearance.

## Related Components

- [thx-carousel](./thx-carousel.md) — the required parent that provides navigation, autoplay, and CRT theming.
- For static side-by-side comparison: `thx-image-comparer`.
- For framed monitor display of a carousel: wrap the carousel in `<thx-crt-display>`.

`thx-carousel-item` is intentionally lightweight so authors retain full control over slide visuals while the carousel owns the interaction model and THX-1138 control aesthetics.
