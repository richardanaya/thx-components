# thx-mutation-observer

**THX 1138 styled DOM mutation observer with live CRT log.**

A self-contained wrapper that observes attribute, child, and characterData mutations on its slotted content and renders a real-time, scrollable, clinical mutation log in CRT-monitor styling. Includes start/stop controls, entry counter, timestamped entries, and color-coded mutation types. Perfect for debugging live UIs, demonstrating reactivity, or building diagnostic panels inside the THX aesthetic.

## Import

```js
import 'thx-components/src/components/thx-mutation-observer.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-mutation-observer active observe-attributes observe-child-list>
  <div id="observed">
    <thx-badge>INITIAL</thx-badge>
  </div>
</thx-mutation-observer>
```

## Advanced Usage

### Diagnostic Panel in a Dashboard

```html
<thx-crt-display label="MUT-LOG // LIVE OBSERVER">
  <thx-mutation-observer 
    active 
    observe-attributes="true" 
    observe-child-list="true"
    attribute-filter="class,data-status"
    max-entries="50">
    <!-- any dynamic content here -->
    <thx-tag removable>TEST</thx-tag>
  </thx-mutation-observer>
</thx-crt-display>
```

### Observing Form State Changes

Wrap a group of inputs, switches, or a tree and watch attribute and child mutations appear in the phosphor log.

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `active` | `boolean` | `false` | Starts/stops the internal `MutationObserver`. |
| `observe-attributes` | `boolean` (attribute) | `true` | Watch attribute changes. |
| `observe-child-list` | `boolean` (attribute) | `true` | Watch addition/removal of child nodes. |
| `observe-character-data` | `boolean` (attribute) | `false` | Watch text content changes. |
| `attribute-filter` | `string` | `''` | Comma-separated list of attribute names to observe (e.g. `"class,disabled"`). |
| `max-entries` | `number` | `100` | Maximum log rows kept (oldest are dropped). |

## Slots

- default: The content whose mutations are observed. Wrapped in a light panel below the CRT log display.

## Methods

- `clearLog()` — empties the mutation history (also exposed via the CLEAR button).

## Internal Log Format

Each entry shows:
- Timestamp (`HH:MM:SS.mmm`)
- Type abbreviation (`attr`, `child`, `data`)
- Target description (tag#id.class)
- For attribute mutations: `attrName: old → ...`

## Accessibility

- The log is a scrollable region; keyboard users can scroll normally.
- Status LED and "OBSERVING / STANDBY" text provide clear state.
- The observed content remains fully interactive and accessible.
- Mutation entries use semantic structure inside the log.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#utilities) and the observer family.

- **CRT presentation**: The log lives inside a dark monitor frame with static scanlines and vignette (via shared `crt-effects` helpers). Matches `thx-resize-observer` and `thx-crt-display`.
- **Status LED**: Pulsing blue dot when active — consistent with live indicators elsewhere.
- **Controls**: START/STOP and CLEAR buttons use the standard mono uppercase THX button styling.
- **Target description**: Intelligently builds a compact selector (`div#panel.status`) for easy identification.
- **AI-friendly**: Dropping `<thx-mutation-observer active>` around any dynamic THX subtree instantly gives a beautiful live diagnostic log without writing any observer code.
- **Performance**: Uses the native `MutationObserver` API with subtree observation. `max-entries` prevents unbounded memory growth.

Excellent companion for development tools, live demos, and any interface that needs to surface "what just changed in the DOM".

## Related Components

- [thx-resize-observer](./thx-resize-observer.md)
- [thx-include](./thx-include.md)
- [thx-crt-display](./thx-crt-display.md)
- [thx-visually-hidden](./thx-visually-hidden.md)
- [thx-mutation-observer] is the visual counterpart to browser devtools' MutationObserver tab
