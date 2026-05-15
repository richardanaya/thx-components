# thx-image-comparer

**THX 1138 styled CRT-framed before/after image comparer.**

`<thx-image-comparer>` is a before/after image comparison tool presented inside an authentic CRT monitor housing. It is intended for clinical, surveillance, forensic, or quality-control analysis — exactly the kind of "raw vs classified" or "facility vs void" visual inspection an operator would perform on a dedicated analysis station.

## Instrument Aesthetic & CRT Presentation

The entire component is a self-contained dark CRT surface:

- Thick `#2a2a2a` border, small radius, deep inset shadow.
- Full static CRT treatment using the centralized helpers:
  - `crtStaticScanlineOverlay` (subtle horizontal lines).
  - `crtStaticVignetteOverlay` (edge darkening).
- Base and overlay images receive a deliberate clinical filter: `grayscale(20%) contrast(1.1)`.
- Phosphor blue divider line with strong glow and double-arrow handle.
- Upper labels (`BEFORE` / `AFTER` or custom) in muted mono with subtle dark background.
- Bottom status bar in the classic HUD style: `"ANALYSIS MODE: COMPARE"` + live `"OFFSET: 042%"` readout.

The result feels like a dedicated image analysis console rather than a web UI widget.

## Properties

| Property      | Attribute       | Default     | Description |
|---------------|-----------------|-------------|-------------|
| `beforeSrc`   | `before-src`    | —           | URL of the left/base image |
| `afterSrc`    | `after-src`     | —           | URL of the right/overlay image |
| `beforeLabel` | `before-label`  | `"BEFORE"`  | Text for left label |
| `afterLabel`  | `after-label`   | `"AFTER"`   | Text for right label (receives brighter styling) |
| `position`    | —               | `50`        | Initial slider position (0–100) |
| `height`      | —               | `"300px"`   | Intrinsic height (applied to host) |
| `showLabels`  | `show-labels`   | `true`      | Toggle the top BEFORE/AFTER badges |
| `showStatus`  | `show-status`   | `true`      | Toggle the bottom analysis HUD bar |

All image and label props are reactive; changing `position` updates the clip and status live.

## Interaction & Controls

- **Drag**: Click or touch the vertical divider or its phosphor handle (`◀ ▶`) and drag horizontally.
- **Click anywhere**: Jumps the divider to that location.
- **Keyboard**: The divider handle is a focusable `role="slider"`:
  - Arrow Left/Right: ±1%
  - Shift + Arrow or Page Up/Down: ±10%
  - Home: 0%
  - End: 100%
- Smooth real-time `clip-path` update on the overlay image.
- Dispatches `change` (during drag) and `changeend` (on release) events with current position.

## Accessibility (Excellent)

The divider is a fully accessible slider:

```html
<div role="slider"
     aria-label="Image comparison slider"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-valuenow="42"
     aria-valuetext="42%"
     tabindex="0">
```

- Keyboard navigation fully implemented.
- ARIA values update live.
- Labels and status bar provide additional context.
- Images carry proper `alt` text from the label props.

This is one of the most accessible comparison components in any design system.

## Centralized CRT Effects

```js
import { crtStaticScanlineOverlay, crtStaticVignetteOverlay } from '../styles/crt-effects.js';
```

Applied at construction with tuned opacity:

- Scanlines: `opacity: 0.04`
- Vignette: `opacity: 0.4`

Higher z-index layering ensures the overlays sit above the images but below the interactive divider and HUD elements.

## Practical Control-Room Examples

### Facility Inspection Station (from index.html)

```html
<thx-image-comparer
  before-src="https://...facility.jpg"
  after-src="https://...void.jpg"
  before-label="FACILITY"
  after-label="VOID"
  style="max-width: 600px; height: 250px">
</thx-image-comparer>
```

### Raw vs Classified Analysis (ultradashboard)

```html
<thx-divider label="BEFORE / AFTER ANALYSIS"></thx-divider>
<thx-image-comparer
  id="image-comparer"
  before-label="RAW"
  after-label="CLASSIFIED"
  position="42"
  show-status
  style="display: block; height: 280px">
</thx-image-comparer>
```

Update position programmatically:

```js
comparer.position = 65;
```

### Inside a Larger CRT Display

```html
<thx-crt-display label="RAW-17" variant="scope">
  <thx-image-comparer ... style="height: 320px"></thx-image-comparer>
</thx-crt-display>
```

The outer CRT frame + inner CRT texture creates a powerful nested instrument effect.

## Events

- `change`: Fires continuously while dragging (bubbles, composed).
- `changeend`: Fires once on mouse/touch release with `{detail: {position}}`.

Useful for syncing other readouts or saving the final analysis offset.

## Reduced-Motion Support

- No animations on the slider or clip (pure transform/clip-path driven by user input).
- The static scanlines and vignette are unaffected by motion preferences.
- Any parent CRT scanline animation is separately disabled by the media query in `crtMonitorStyles`.

## Styling & Theming Notes

- Container background and frame are hard-wired to CRT tokens (`--crt-bg`, `--crt-border`).
- Divider and handle use `--atmos-primary` with intense glow on hover.
- Labels use the signature mono uppercase + letter-spacing treatment.
- Status bar is a dark translucent strip with phosphor value readout.
- Images are forced to `object-fit: cover` and clinical filter — do not override unless you need a different aesthetic.

## Best Practices

- Provide meaningful `before-label` / `after-label` that describe the analysis context ("RAW" / "ENHANCED", "PRE" / "POST", "CAMERA" / "PROCESSED").
- Always keep `show-status` on for operational use — the live offset percentage is extremely useful.
- Set an explicit `height` (or style height) — the component needs it for proper layout.
- For very wide images, the component works best at moderate heights (220–320 px) so the slider remains easy to manipulate.

`thx-image-comparer` is the capstone of the Batch visualization components. It turns a common UI pattern (before/after) into a convincing piece of analysis hardware. When used alongside the CRT display wrapper, line charts, gauges, and monitor banks, it completes a fully believable control-room environment in the browser.