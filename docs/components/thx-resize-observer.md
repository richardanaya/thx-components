# thx-resize-observer

**THX 1138 styled element resize observer with live dimension monitor.**

Wraps content and continuously reports width, height, and optional detailed rect measurements in a beautiful CRT-style digital readout. Features a resizable content area (by default), real-time grid of dimensions, aspect-ratio calculation, history, and active monitoring LED. The visual twin of the native `ResizeObserver` API rendered in clinical control-room language.

## Import

```js
import 'thx-components/src/components/thx-resize-observer.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-resize-observer active>
  <div style="width: 300px; height: 200px; background: #222;">
    Resizable content (drag corner)
  </div>
</thx-resize-observer>
```

## Advanced Usage

### Detailed Measurement Dashboard

```html
<thx-resize-observer active detailed resizable>
  <!-- charts, images, or complex layouts here -->
  <thx-chart-line style="width:100%; height: 280px;"></thx-chart-line>
</thx-resize-observer>
```

### Inside a CRT Instrument Bank

```html
<thx-crt-display label="DIM-MON-02 // VIEWPORT">
  <thx-resize-observer active>
    <thx-animated-image ...></thx-animated-image>
  </thx-resize-observer>
</thx-crt-display>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `active` | `boolean` | `false` | Starts/stops the `ResizeObserver`. |
| `resizable` | `boolean` | `true` | Applies `resize: both; overflow: hidden` to the content slot container. |
| `detailed` | `boolean` | `false` | Shows the four-corner TOP/LEFT/BOTTOM/RIGHT readout grid. |

## Slots

- default: The content whose size is being observed. The wrapper panel below the dimension display is itself resizable when the attribute is set.

## Internal Readouts

- Large WIDTH / HEIGHT phosphor values
- Live status bar showing W / H / AR (aspect ratio)
- Optional detailed rect measurements
- History of last 10 size changes (internal)

## Accessibility

- Dimension values are plain text and announced.
- The resizable container supports native browser resize handles.
- Status LED and "MONITORING / STANDBY" text give clear visual state.
- Content inside the slot remains fully accessible.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#utilities).

- **CRT monitor aesthetic**: Identical visual language to `thx-mutation-observer` — dark frame, scanlines, vignette, phosphor typography.
- **Aspect ratio**: Automatically computed and displayed to two decimal places in the status bar.
- **Detailed mode**: Reveals the full `contentRect` coordinates — useful for precise layout debugging.
- **Resizable by default**: The content slot has `resize: both` so users (or demo scripts) can drag to trigger live updates.
- **AI-friendly**: `<thx-resize-observer active>` around any element instantly produces a live dimension instrument without any ResizeObserver code or UI work.
- **Performance**: Uses the efficient native `ResizeObserver`. History is capped at 10 entries.

Perfect for responsive design testing, chart containers, image viewers, and any situation where you want to surface "the element is currently X by Y pixels" in a beautiful, on-brand way.

## Related Components

- [thx-mutation-observer](./thx-mutation-observer.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-animated-image](./thx-animated-image.md)
- [thx-chart-*](./thx-chart-line.md) family — often placed inside resize observers
