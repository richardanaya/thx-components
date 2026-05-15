# thx-animated-image

**THX 1138 styled image container with CRT surveillance effects.**

A semantic image wrapper that applies the signature clinical dystopian aesthetic: optional monochrome filter, fixed aspect ratios, hover scale, loading shimmer, and full CRT monitor treatment (dark frame, scanlines, vignette, phosphor desaturation) via the centralized `crt-effects` module. Perfect for security feeds, archived footage, evidence panels, and "monitor wall" compositions.

## Import

```js
import 'thx-components/src/components/thx-animated-image.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-animated-image 
  src="/surveillance/sector-07.jpg" 
  alt="Sector 07 corridor" 
  aspect-ratio="16:9">
</thx-animated-image>
```

## Advanced Usage

### CRT Monitor Style Feed

```html
<thx-animated-image 
  src="/live/cam-03.jpg" 
  alt="Main airlock" 
  variant="crt" 
  label="CAM-03 // LIVE">
</thx-animated-image>
```

### Scope / Grayscale Evidence Viewer

```html
<thx-animated-image 
  src="/archive/incident-0420.png" 
  variant="scope" 
  monochrome 
  aspect-ratio="4:3">
</thx-animated-image>
```

### Interactive Gallery Tile

```html
<thx-animated-image 
  src="..." 
  interactive 
  aspect-ratio="1:1" 
  @click=${openLightbox}>
</thx-animated-image>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | `string` | `''` | Image URL. Shows loading state while absent. |
| `alt` | `string` | `''` | Accessible alt text (also used for `aria-label`). |
| `variant` | `'default' \| 'crt' \| 'scope'` (reflects) | `'default'` | `crt` = dark frame + phosphor desat + animated scanlines; `scope` = deeper grid overlay. |
| `scanlines` | `boolean` (reflects) | `false` | Force static scanline overlay (auto-enabled on crt/scope). |
| `vignette` | `boolean` (reflects) | `false` | Force vignette (auto-enabled on crt). |
| `monochrome` | `boolean` (reflects) | `false` | Applies strong grayscale + contrast filter. |
| `aspect-ratio` | `'auto' \| '1:1' \| '4:3' \| '16:9'` (attribute) | `'auto'` | Enforces container ratio. |
| `label` | `string` | `''` | Upper-right mono identifier (e.g. "CAM-07"). Auto-supplied in CRT mode. |
| `interactive` | `boolean` (reflects) | `false` | Hover scale + pointer + stronger glow on CRT variants. |
| `loading` | `boolean` (reflects, internal) | `false` | Exposed for observation; component manages shimmer while `!src`. |

## Slots

None. The `<img>` is rendered internally.

## Events

- `load` — bubbles when the inner image successfully loads.
- `error` — bubbles on image load failure.

## Variants

- **default**: Neutral light container, optional monochrome.
- **crt**: Full monitor treatment — dark bg, thick border, phosphor-tinted desaturated image, animated scanlines + vignette via `crtMonitorStyles`.
- **scope**: Oscilloscope-style deeper background, static grid, heavier vignette.
- **monochrome**: Grayscale + boosted contrast (works on all variants).
- **interactive**: Subtle scale transform on hover; stronger phosphor glow on CRT/scope.

## Accessibility

- The container receives `role="img"` (or `role="button"` when `interactive`) with `aria-label` from `alt`.
- The internal `<img>` carries the real `alt` attribute.
- When `interactive`, the element is focusable (`tabindex="0"`) and participates in normal tab order.
- Loading and error states are communicated via the visual shimmer / error styling; consider `aria-busy` on parent when batch-loading many images.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#media--utilities) and CRT subsystem.

- **Centralized effects**: Uses `crtMonitorStyles`, `crtStaticScanlineOverlay`, and `crtStaticVignetteOverlay` for consistency with `thx-crt-display`, progress bars, and mutation observers.
- **Label positioning**: Absolute top-right mono text, automatically muted in CRT mode.
- **Loading shimmer**: Horizontal gradient animation on the container while the image is absent or loading.
- **AI-friendly**: A single `<thx-animated-image src="..." variant="crt" aspect-ratio="16:9" label="FEED-01">` produces a perfect surveillance-style image tile with zero extra classes or CSS.
- **Object-fit**: Images always cover the container — ideal for uniform grids.
- **Pairing**: Frequently placed inside `thx-crt-display` for extra frame depth, or used standalone as "monitor tiles" in a wall layout.

## Related Components

- [thx-crt-display](./thx-crt-display.md)
- [thx-animation](./thx-animation.md) — for entrance effects on image reveals
- [thx-image-comparer](./thx-image-comparer.md) — side-by-side before/after
- [thx-carousel-item](./thx-carousel-item.md) — images inside carousels
