# CRT & Data Visualization

The CRT subsystem is the dark, glowing heart of the THX 1138 aesthetic. While the default surface world is institutional gray and off-white slabs, the monitor world is black, deep charcoal, and phosphor blue — complete with animated scanlines, radial vignette, inset shadows, and the soft electronic hum of a 1970s control room. Every chart, gauge, progress indicator, and image analysis surface belongs inside this vocabulary.

The data visualization components are not decorative charts; they are laboratory and process-control instruments. Line traces look like oscilloscope waveforms, bar readouts resemble rack-mounted process monitors, gauges mimic analog panel meters, and monitor banks deliver "small multiples" at a glance. All visual effects are centralized in the `crt-effects.js` module so that every CRT surface behaves identically and respects `prefers-reduced-motion`.

## Components

- [thx-crt-display](components/thx-crt-display.md) — Foundational self-contained CRT monitor frame that applies thick borders, animated scanlines, radial vignette, and inset shadow to any slotted content; the canonical wrapper for all instrumentation.
- [thx-chart-line](components/thx-chart-line.md) — Canvas-based oscilloscope-style line chart for real-time telemetry, sensor traces, and multi-channel waveforms with clinical mono readouts.
- [thx-chart-bar](components/thx-chart-bar.md) — Compact horizontal bar chart instrument with labeled tracks, phosphor-filled bars, value readouts, and subtle scanline texture.
- [thx-chart-gauge](components/thx-chart-gauge.md) — SVG analog circular panel gauge (270° arc) with tick marks, central digital readout, and automatic warning states for bounded metrics such as load, pressure, or temperature.
- [thx-chart-monitors](components/thx-chart-monitors.md) — Responsive grid of small CRT "small multiples" tiles, each showing label, large glowing value, percentage bar, and optional alert state for at-a-glance multi-channel status.
- [thx-progress-bar](components/thx-progress-bar.md) — Linear progress indicator with four visual variants (including full CRT treatment), indeterminate mode, optional label/value display, and proper ARIA semantics.
- [thx-progress-ring](components/thx-progress-ring.md) — Compact SVG circular progress ring with glowing fill arc, centered value, four variants, and full accessibility; ideal for dense instrument clusters.
- [thx-image-comparer](components/thx-image-comparer.md) — Before/after image comparison tool housed inside an authentic CRT monitor frame with slider handle; intended for clinical, surveillance, forensic, or quality-control analysis.
- [thx-status-leds](components/thx-status-leds.md) — Compact array or grid of small square LEDs supporting normal (blue), warning (amber), and error (red) illumination with appropriate glow; the canonical micro-indicator for channel health matrices.

## Recipes

### Full CRT Instrument Dashboard

A complete monitoring station assembled from a top-level CRT display containing a responsive grid of chart-monitors, a live waveform, multiple gauges, progress rings, and a status LED bank.

```html
<thx-crt-display label="PRIMARY TELEMETRY — SECTOR 07">
  <div class="instrument-grid">
    <thx-chart-monitors count="6" labels='["CAM-1","CAM-2","THERM","PRESS","FLOW","PWR"]'></thx-chart-monitors>

    <thx-chart-line 
      label="WAVEFORM" 
      data="[[0,12],[1,18],[2,9],[3,27],...]" 
      height="120">
    </thx-chart-line>

    <thx-chart-gauge label="CPU LOAD" value="73" warning="85"></thx-chart-gauge>
    <thx-chart-gauge label="CORE TEMP" value="42" unit="C"></thx-chart-gauge>

    <thx-progress-ring value="68" label="SYNC"></thx-progress-ring>
    <thx-progress-bar value="94" label="BUFFER" variant="crt"></thx-progress-bar>

    <thx-status-leds 
      count="8" 
      states='[{"active":true,"state":"normal"},{"active":true,"state":"warning"},...]'>
    </thx-status-leds>
  </div>
</thx-crt-display>
```

All elements inside inherit the dark phosphor environment and reduced-motion respect automatically.

### Telemetry Waveform Monitor with Image Comparer

Side-by-side live trace and forensic image analysis in a split CRT housing.

```html
<thx-crt-display label="ANOMALY ANALYSIS">
  <thx-split-panel crt>
    <div slot="start">
      <thx-chart-line label="SENSOR TRACE" realtime></thx-chart-line>
      <thx-progress-bar value="37" label="DEVIATION" variant="crt"></thx-progress-bar>
    </div>
    <div slot="end">
      <thx-image-comparer 
        before="archive/void-01.jpg" 
        after="archive/classified-01.jpg"
        label="RAW VS ENHANCED">
      </thx-image-comparer>
    </div>
  </thx-split-panel>
</thx-crt-display>
```

### Process Control Panel with Bar Charts and Progress

Rack-style horizontal bars combined with ring progress for a compact engineering bay view.

```html
<thx-crt-display label="PROCESS BAY 12 — STATUS">
  <thx-chart-bar 
    label="THROUGHPUT" 
    data='[{"label":"LINE A","value":94},{"label":"LINE B","value":71}]'>
  </thx-chart-bar>

  <thx-progress-ring value="82" size="lg" label="EFFICIENCY"></thx-progress-ring>
  <thx-progress-ring value="55" label="COOLANT"></thx-progress-ring>
</thx-crt-display>
```

## Cross-Cutting Improvements

- **Centralized CRT Effects**: Every CRT visual treatment — animated scanlines, static scanline overlays, radial vignette, phosphor glow, grid lines, and reduced-motion handling — is sourced from the single `src/styles/crt-effects.js` module (`crtMonitorStyles`, `crtStaticScanlineOverlay`). This guarantees pixel-perfect consistency between `thx-crt-display`, chart variants, progress CRT mode, image-comparer housing, and any custom `[crt]` panel. Dialogs and drawers use only the static overlay variant so they never claim "live monitor" semantics.

- **Instrument Semantics over Decoration**: Charts and progress elements render real numeric values in monospace alongside the graphics. Canvas and SVG implementations are tuned for low CPU cost while still providing crisp phosphor lines and glows. All components expose ARIA progressbar, meter, or img roles with proper live value announcements.

- **Composition with Layout Primitives**: Drop any visualization inside `<thx-crt-display>`, `<thx-card crt>`, `<thx-split-panel crt>`, or `<thx-carousel-item>`. The `thx-status-leds` and monitor tiles pair naturally with `thx-chart-monitors` for dense status walls. Image comparer is frequently used inside drawers or popups for detailed inspection.

- **Focus & Accessibility**: Interactive elements (sliders on image-comparer, focusable gauges when needed) receive the standard phosphor glow via the focus-visible system. All numeric readouts remain screen-reader accessible.

The CRT data visualization layer turns any THX-1138 page into a convincing piece of operational hardware. Use `<thx-crt-display>` as the outer vessel; populate it with charts, rings, bars, and LEDs. The centralized effects module ensures the entire instrument cluster feels like a single physical rack.

---

*Category overview for THX Components CRT subsystem and clinical data visualization instruments. Optimized for real-time telemetry, process monitoring, and forensic analysis surfaces.*