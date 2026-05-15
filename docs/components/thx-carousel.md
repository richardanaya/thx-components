# thx-carousel

**THX 1138 styled image / content carousel component.**

A precise, instrument-grade cycling display for mission slides, gallery views, or sequential telemetry visuals. Features autoplay with intelligent pause-on-interaction, arrow and dot navigation, live counter, loop mode, and a full CRT dark-monitor variant. Delivers the clinical, dystopian control-room aesthetic of THX-1138 through mono labels, phosphor accents on CRT, focus-visible navigation, and mechanical transitions. Uses `<thx-carousel-item>` children exclusively.

## Import

```js
import 'thx-components/src/components/thx-carousel.js';
import 'thx-components/src/components/thx-carousel-item.js';
// or
import 'thx-components';
```

## Basic Usage

```html
<thx-carousel show-arrows show-dots style="max-width: 600px">
  <thx-carousel-item>
    <div style="height: 240px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #a6c8e1; font-family: var(--font-mono);">
      SEDATION CORRIDOR
    </div>
  </thx-carousel-item>
  <thx-carousel-item>
    <div style="height: 240px; background: #222; display: flex; align-items: center; justify-content: center; color: #a6c8e1; font-family: var(--font-mono);">
      ARCHIVE VAULT
    </div>
  </thx-carousel-item>
</thx-carousel>
```

## Advanced Usage

### Full Featured (from ultradashboard)

```html
<thx-carousel
  autoplay
  interval="4800"
  loop
  show-arrows
  show-dots
  variant="crt"
>
  <thx-carousel-item label="Sedation corridor">
    <div class="mission-slide">...</div>
  </thx-carousel-item>
  <thx-carousel-item label="Archive vault">
    <div class="mission-slide">...</div>
  </thx-carousel-item>
  <thx-carousel-item label="Observation dome">
    <div class="mission-slide">...</div>
  </thx-carousel-item>
</thx-carousel>
```

### Autoplay Behavior

- Starts automatically when `autoplay` is true.
- Pauses on mouse enter, focus within the carousel, or manual navigation.
- Resumes on mouse leave or focus out.
- Resets timer after any user interaction.
- Interval is configurable in milliseconds (default 5000).

### Navigation Methods

```js
const car = document.querySelector('thx-carousel');
car.next();
car.prev();
car.goToSlide(2); // 0-based

car.addEventListener('slidechange', (e) => {
  console.log(`Slide ${e.detail.index + 1} / ${e.detail.total}`);
});
```

### Labels for Accessibility & Counter

Use the `label` attribute on each `<thx-carousel-item>` — it sets `aria-label` on the slide and improves screen reader announcements.

### CRT Variant

```html
<thx-carousel variant="crt" ...>
```

Applies dark monitor backgrounds to arrows and dots, phosphor text, hover glows, and active dot emphasis — perfect inside `thx-crt-display` or dark dashboard panels.

## Properties / Attributes

| Attribute   | Type                          | Default     | Description |
|-------------|-------------------------------|-------------|-------------|
| `loop`      | `boolean` (reflects)          | `false`     | When true, navigation wraps from last to first (and vice-versa). |
| `autoplay`  | `boolean` (reflects)          | `false`     | Enables automatic advance at the `interval`. |
| `interval`  | `number`                      | `5000`      | Autoplay delay in milliseconds. |
| `show-dots` | `boolean` (reflects)          | `true`      | Renders clickable dot navigation below the viewport (`role="tablist"`). |
| `show-arrows`| `boolean` (reflects)         | `true`      | Renders previous/next arrow buttons. |
| `variant`   | `'default' \| 'crt'`          | `'default'` | Visual theme. `crt` applies dark monitor styling to controls. |
| `activeIndex`| `number` (internal state)    | `0`         | Current slide (0-based). Can be read or set. |

## Slots

| Slot     | Description |
|----------|-------------|
| (default) | Must contain one or more `<thx-carousel-item>` elements. The track applies horizontal flex + translate transform. |

## Events

| Event        | Detail                        | Description |
|--------------|-------------------------------|-------------|
| `slidechange`| `{ index: number, total: number }` | Fired after any navigation (arrow, dot, autoplay, method). Bubbles, composed. |

## Variants

- **default** vs **crt**: Light controls (gray borders) vs dark CRT monitor controls with phosphor accents and glow on hover/active.
- **loop**: Enables infinite cycling.
- **autoplay + interval**: Timed slideshow with smart pause/resume.
- **show-arrows / show-dots**: Independent toggle of navigation affordances. Counter ("1 / 3") is always present in the bottom-right.
- **Focus-visible on controls**: Arrows (`.carousel-arrow`) and dots (`.carousel-dot`) receive phosphor glow rings on keyboard focus (covered by shared focus-visible system).

## Accessibility

- Root has `role="region"` + `aria-roledescription="carousel"`.
- Each slide (`thx-carousel-item` inner div) uses `role="group"` + `aria-roledescription="slide"` + optional `aria-label` from the item's `label` attribute.
- Arrow buttons have explicit `aria-label="Previous slide"` / `"Next slide"`.
- Dots use `role="tab"` + `aria-selected` + `aria-label="Go to slide N"`.
- Full keyboard support: arrows and dots are focusable and activatable.
- Focus-visible styling (phosphor glow) on `.carousel-arrow` and `.carousel-dot` via the library-wide focus system.
- Autoplay intelligently pauses on focusin so keyboard users are not interrupted.
- Counter provides visual + programmatic current position.
- Recommended: Always supply meaningful `label` on each `thx-carousel-item`. Keep slide content high-contrast (especially in CRT variant). Avoid very rapid intervals.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (CRT displays, layout, navigation).

- **Viewport & track**: Classic translateX carousel implementation. Each item is forced to 100% width via `::slotted(thx-carousel-item)`.
- **Arrows**: Square industrial buttons with mono font, positioned flush left/right. Hover darkens background; disabled state reduces opacity. CRT variant inverts to near-black with phosphor text and soft glow on hover.
- **Dots**: Minimal 8px squares, border-only when inactive, filled when active. CRT active state adds primary fill + glow. Tablist semantics for screen readers.
- **Counter**: Bottom-right pill with mono "N / TOTAL" — always visible, styled to match the current variant (light or dark CRT).
- **CRT extraction**: No direct import of crt-effects here, but the variant styles deliberately echo the monitor aesthetic (dark fills, phosphor, glows) for visual harmony with `thx-crt-display` and other instruments.
- **Motion**: Single moderate-duration ease transition on the track. Respects reduced-motion users (no special overrides needed beyond the global tokens).
- **Clinical tone**: Counter and labels use strict uppercase mono. Slide content inside items is expected to be high-signal visuals or terminal readouts ("SEDATION CORRIDOR", "OBSERVATION DOME").
- **Integration**: Frequently placed inside dashboard panels or `thx-crt-display`. The `label` on items can be used for both ARIA and potential future thumbnail legends.

Carousel is the dedicated media/sequence display primitive. Pair with [thx-carousel-item](./thx-carousel-item.md). For static image comparison see `thx-image-comparer`. For full monitor framing, wrap the carousel in `<thx-crt-display>`.
