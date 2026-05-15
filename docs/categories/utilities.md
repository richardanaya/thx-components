# Utilities & Glue Components

The utilities layer of THX 1138 supplies the invisible but essential "glue" that makes AI-authored, dynamic, and fully accessible control-room pages possible with almost no boilerplate. These components handle formatting of numbers, dates, and bytes in clinical monospace styles; live observation of DOM changes and element resizing with built-in CRT diagnostic readouts; declarative animation; external content inclusion; contextual help via tooltips; accessibility primitives; and consistent visual representation of entities via avatars and icons.

Because they are implemented as custom elements, an LLM can drop `<thx-format-number>`, `<thx-include>`, or `<thx-resize-observer>` directly into generated markup and receive correctly styled, live-updating, accessible output without writing a single line of JavaScript. They embody the library's core promise: write semantic HTML, drop the element, obtain sterile industrial instrumentation.

## Components

- [thx-format-number](components/thx-format-number.md) — Renders numbers in clean monospace clinical formats (decimal, percent, currency, exponential, engineering K/M/G, or signature `crt` scientific `1.23E+03` style); splits value and unit into CSS parts for theming.
- [thx-format-date](components/thx-format-date.md) — Renders dates in standardized uppercase monospace clinical formats (`short`, `medium`, `long`, `full`, `iso`, `unix`, or signature `crt` `// 14 MAY 2026 //` style) with optional label prefix.
- [thx-format-bytes](components/thx-format-bytes.md) — Zero-JS human-readable byte (or bit) counts in strict monospace uppercase clinical style; splits value/unit into parts and supports CRT framing.
- [thx-relative-time](components/thx-relative-time.md) — Live "time since" / "time until" display in narrow, short, or long formats with automatic smart-interval updates, aging variants, pulsing indicator, and badge presentation.
- [thx-avatar](components/thx-avatar.md) — Compact square/rounded/circular image or initials placeholder with optional status dot; supports `crt` variant for phosphor-tinted monitor framing and graceful image-to-initials fallback.
- [thx-icon](components/thx-icon.md) — Curated library of clinical monochrome SVG icons (check, close, warning, arrows, user, monitor, database, etc.) with consistent sizing and THX color tokens; supports `custom` slotted SVG and `currentColor`.
- [thx-animation](components/thx-animation.md) — Declarative wrapper applying clinical CRT-flavored keyframe animations (fade, slide, scale, scan reveal, flicker power-on, typewriter) with full duration/easing/delay control and reduced-motion respect.
- [thx-animated-image](components/thx-animated-image.md) — Semantic image wrapper applying monochrome filter, fixed aspect ratios, hover scale, loading shimmer, and optional full CRT monitor treatment via centralized crt-effects.
- [thx-include](components/thx-include.md) — Fetches remote HTML, text, or JSON and renders inside a clinical mono container; supports auto-refresh, manual refresh, loading spinner, error rail, CRT/panel variants, and optional script stripping.
- [thx-tooltip](components/thx-tooltip.md) — Lightweight accessible tooltip with configurable placement, delay, warning/error variants, optional label prefix, rich HTML content, and full CRT scanline texture.
- [thx-visually-hidden](components/thx-visually-hidden.md) — Classic visually-hidden accessibility utility with THX enhancements: `focusable` mode (visible on focus with phosphor ring), `skip-link` and `announce` live-region presets, and `debug` mode.
- [thx-mutation-observer](components/thx-mutation-observer.md) — Self-contained DOM mutation observer that renders a real-time scrollable clinical CRT log of attribute/child/characterData changes with start/stop controls and color-coded entries.
- [thx-resize-observer](components/thx-resize-observer.md) — Element resize observer that continuously reports width/height/rect in a beautiful CRT-style digital readout; includes resizable demo area, aspect-ratio calculation, and history.

## Recipes

### Live Telemetry Dashboard with Formatters and Observers

Combine formatters for clean readouts, include for external status fragments, and the two observers (one for live debugging, one for responsive layout) inside a CRT panel.

```html
<thx-crt-display label="LIVE TELEMETRY FEED">
  <div class="metrics">
    <thx-format-number value="1247.83" notation="engineering" unit="kW"></thx-format-number>
    <thx-format-bytes value="45873291" unit="MB"></thx-format-bytes>
    <thx-format-date value="2026-05-14T14:33:00Z" format="crt" show-label="LAST SYNC"></thx-format-date>
    <thx-relative-time value="2026-05-14T14:20:00Z" format="narrow" badge></thx-relative-time>
  </div>

  <thx-include 
    src="/api/status-fragment" 
    refresh="30s" 
    crt>
  </thx-include>

  <!-- Debug panel -->
  <thx-mutation-observer crt>
    <div id="live-data">...</div>
  </thx-mutation-observer>

  <thx-resize-observer>
    <div class="responsive-panel">...</div>
  </thx-resize-observer>
</thx-crt-display>
```

### Accessible Command Surface with Tooltip and Visually Hidden

Provide context help and skip links without visual clutter.

```html
<thx-button>
  EXECUTE
  <thx-tooltip placement="top" label="WARNING">This action cannot be undone.</thx-tooltip>
</thx-button>

<thx-visually-hidden focusable>
  <a href="#main">Skip to main instrumentation</a>
</thx-visually-hidden>

<thx-visually-hidden announce>
  System status updated: all sectors nominal.
</thx-visually-hidden>
```

### Animated Entrance Sequence for Status Panels

Use the animation primitive together with icon and avatar for polished, on-brand reveals.

```html
<thx-animation animation="scan-reveal" duration="600ms" delay="100ms">
  <thx-card label="OPERATOR">
    <thx-avatar src="operators/thx-1138.jpg" status="active" crt></thx-avatar>
    <thx-icon name="monitor" size="lg"></thx-icon>
    <span>THX-1138 — ONLINE</span>
  </thx-card>
</thx-animation>

<thx-animation animation="typewriter" duration="1200ms">
  <thx-format-date value="2026-05-14T09:41:00Z" format="crt"></thx-format-date>
</thx-animation>
```

## Cross-Cutting Improvements

- **Zero-JS Formatting Power**: The four formatter components (`format-number`, `format-date`, `format-bytes`, `relative-time`) require no JavaScript from the author. They accept ISO strings or numeric values and emit perfectly styled, part-split, CRT-compatible output. This is the primary reason LLM-generated dashboards look instantly authentic.

- **Live Observers as First-Class UI Elements**: Both `mutation-observer` and `resize-observer` are not merely APIs — they are visual diagnostic instruments with their own CRT-framed readouts, history, and controls. Drop them into a page during development or expose them permanently in advanced operator consoles.

- **Declarative Animation & Media**: `thx-animation` and `thx-animated-image` centralize the clinical keyframe library (including CRT-specific flicker and scan effects) while respecting `prefers-reduced-motion`. `thx-animated-image` reuses the same `crt-effects` module used by the visualization layer.

- **Accessibility & Inclusion Primitives**: `visually-hidden` (with focusable/skip/announce/debug modes), `tooltip`, and `include` (with script-stripping) give authors the exact tools needed to satisfy WCAG while staying inside the THX visual language. `thx-icon` and `thx-avatar` guarantee consistent symbol and entity representation.

- **Composition Glue**: Icons slot into buttons, menu-items, tree-items, and labels. Avatars appear in cards and lists. Tooltips attach to any focusable element. Include and animation wrap arbitrary content. Observers wrap live regions. Formatters are dropped inline anywhere a value must be shown.

These components are what allow an AI to generate a complete, production-grade, accessible THX-1138 interface from a high-level description in a single pass. They are the difference between "it looks like a demo" and "it feels like a real control room."

---

*Category overview for THX Components utilities, formatters, observers, and accessibility glue. The layer that makes dense, dynamic, LLM-authored instrumentation practical.*