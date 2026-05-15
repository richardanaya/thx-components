# thx-animation

**THX 1138 styled animation primitive for entrance and exit effects.**

A lightweight declarative wrapper that applies a rich set of clinical, CRT-flavored keyframe animations (fade, slide, scale, scan reveal, flicker power-on, typewriter) with full control over duration, easing, direction, and delay. Supports reduced-motion respect. Ideal for revealing panels, log entries, status changes, and typewriter-style terminal text in the dystopian interface.

## Import

```js
import 'thx-components/src/components/thx-animation.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-animation name="fade" direction="in" trigger>
  <thx-alert variant="success">SYSTEM NOMINAL</thx-alert>
</thx-animation>
```

## Advanced Usage

### Slide + Scan Reveal (CRT style)

```html
<thx-animation name="slide" slide-direction="up" direction="in" duration="400" trigger>
  <div class="log-entry">DIRECTIVE 1138 EXECUTED</div>
</thx-animation>

<thx-animation name="scan" direction="in" duration="600" trigger>
  <thx-crt-display>...</thx-crt-display>
</thx-animation>
```

### Typewriter Terminal Text

```html
<thx-animation name="typewriter" duration="1200" trigger>
  <p style="white-space:pre;">ACCESS GRANTED // WELCOME, OPERATOR</p>
</thx-animation>
```

### Flicker Power-On Effect

```html
<thx-animation name="flicker" direction="in" duration="800" trigger>
  <thx-status-leds count="6"></thx-status-leds>
</thx-animation>
```

### Programmatic Control

```html
<thx-animation id="panel-anim" name="scale" direction="in"></thx-animation>

<script>
  const anim = document.getElementById('panel-anim');
  anim.trigger = true; // starts animation
  // or call anim.start()
</script>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `'fade' \| 'slide' \| 'scale' \| 'scan' \| 'flicker' \| 'typewriter'` | `'fade'` | Animation family. |
| `direction` | `'in' \| 'out'` | `'in'` | Entrance or exit. |
| `duration` | `number` (ms) | `300` | Animation length. |
| `easing` | `string` | `'ease-out'` | CSS timing function. |
| `trigger` | `boolean` | `false` | Setting to `true` starts the animation (resets after). |
| `delay` | `number` (ms) | `0` | Delay before animation begins. |
| `fill-mode` | `boolean` (attribute) | `true` | Keeps final state (`forwards` / `both`). |
| `slide-direction` | `'left' \| 'right' \| 'up' \| 'down'` (attribute) | `'up'` | Only applies when `name="slide"`. |
| `animating` | `boolean` (state, read-only) | `false` | Exposed while animation is running. |

## Slots

- default: The content that receives the animation classes and styles.

## Events

- `animationend` — bubbles when the keyframe sequence completes.

## Methods

- `start()` — programmatically begins the animation (sets internal state and forces update).

## Keyboard & Reduced Motion

All animations are disabled inside `@media (prefers-reduced-motion: reduce)`. The component still renders the slotted content instantly.

## Accessibility

- Animation is purely visual enhancement. Content remains fully accessible at all times.
- For critical status changes, ensure the underlying content (alert text, etc.) also uses `aria-live` or other live-region techniques.
- Typewriter animation includes a blinking cursor that respects the theme.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#animations-and-transitions).

- **CRT-specific animations**: `scan` emulates a horizontal reveal (clip-path), `flicker` recreates old CRT power-on instability with multiple opacity keyframes.
- **Typewriter**: Uses `steps()` + blinking border-right cursor in phosphor blue. The `--typewriter-duration` custom property is injected for the steps count.
- **Composability**: Works beautifully with any THX component — cards, alerts, charts, formatters, trees.
- **AI-friendly**: `<thx-animation name="flicker" direction="in" trigger>` around a block is all an LLM needs to produce a dramatic "powering up" reveal that matches the rest of the interface.
- **Trigger pattern**: The `trigger` attribute is the declarative hook. Set it to true (or call `.start()`) from host code or another component.
- **Fill mode**: Keeps the final frame so content doesn't jump back when animation ends.

## Related Components

- [thx-animated-image](./thx-animated-image.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-alert](./thx-alert.md)
- [thx-skeleton](./thx-skeleton.md) — often revealed with animation
- [thx-spinner](./thx-spinner.md)
