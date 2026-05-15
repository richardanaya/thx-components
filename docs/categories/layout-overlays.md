# Layout & Overlays

Layout and overlay components provide the structural vocabulary for composing THX-1138 control-room interfaces. Cards and split-panels form the primary surfaces; dividers and details create rhythm and progressive disclosure; carousels deliver sequential mission content; dialogs, drawers, dropdowns, and popups supply the modal and transient command surfaces required when an operator must be interrupted or given focused options.

All of these elements share the same austere geometry, mono-uppercase labeling, and — where appropriate — CRT monitor treatment via the centralized effects system. Overlays never feel like consumer modals; they feel like heavy mechanical housings lowered over the main instrumentation slab. Focus trapping, escape handling, and keyboard navigation are first-class on every overlay.

## Components

- [thx-card](components/thx-card.md) — Foundational sterile panel container providing labeled surface slabs (with optional `label` header in uppercase mono), `crt` variant for dark monitor framing with scanlines/vignette, and hoverable states; the universal building block for instrument clusters.
- [thx-dialog](components/thx-dialog.md) — Clinical modal interruption surface with dark CRT-framed off-white panel, phosphor mono header, static scanline texture, robust focus trapping, configurable sizes, and mechanical scale-in animation.
- [thx-drawer](components/thx-drawer.md) — Clinical slide-out panel with CRT aesthetics, thick-framed content area, phosphor header, four placement options, focus trapping, and static scanline overlay; sibling to dialog with consistent keyboard behavior.
- [thx-dropdown](components/thx-dropdown.md) — Compact clinical command surface that presents a dark CRT-styled menu panel on trigger activation; supports declarative `items` or slotted children, rotating caret, and clean outside-click + keyboard dismissal.
- [thx-popup](components/thx-popup.md) — Flexible positioned popup surface with extensive placement control, optional arrow, modal backdrop variant, full CRT monitor treatment (scanlines + vignette), and robust outside-click handling.
- [thx-split-panel](components/thx-split-panel.md) — Two-pane clinical layout instrument with draggable divider, percentage labels, full keyboard-accessible resizing (arrows, Home/End, Page keys), ARIA separator semantics, and optional CRT dark variant.
- [thx-carousel](components/thx-carousel.md) — Precise instrument-grade cycling display for mission slides or sequential telemetry; features autoplay with pause-on-interaction, arrow/dot navigation, live counter, loop mode, and full CRT dark-monitor variant.
- [thx-carousel-item](components/thx-carousel-item.md) — Minimal semantic wrapper required as direct child of carousel; provides structural flex contract, optional `label` for accessibility, and clean slot projection for images or custom content.
- [thx-divider](components/thx-divider.md) — Minimalist clinical separator line with optional centered mono uppercase label, multiple line styles, spacing presets, vertical orientation, and dedicated CRT phosphor variant.
- [thx-details](components/thx-details.md) — Clinical expandable disclosure section featuring mono uppercase summary row, rotating chevron, left status rail on open, and subtle phosphor glow; fully custom implementation (not native `<details>`) for precise control-room styling.

## Recipes

### Instrument Panel Composition using Card, Split-Panel, and Carousel

A primary monitoring surface built from labeled cards, a resizable split view, and a mission carousel — all inside or alongside a CRT frame.

```html
<thx-crt-display label="SECTOR 07 — PRIMARY CONSOLE">
  <thx-card label="OVERVIEW">
    <thx-carousel autoplay interval="8000" crt>
      <thx-carousel-item label="Facility Overview">
        <img src="facility/overview.jpg" alt="Wide view of Sector 07">
      </thx-carousel-item>
      <thx-carousel-item label="Void Perimeter">
        <img src="facility/perimeter.jpg" alt="Perimeter scan">
      </thx-carousel-item>
    </thx-carousel>
  </thx-card>

  <thx-split-panel crt>
    <div slot="start">
      <thx-card label="LEFT TELEMETRY" hoverable>
        <!-- charts or monitors -->
      </thx-card>
    </div>
    <div slot="end">
      <thx-card label="RIGHT ANALYSIS" hoverable>
        <!-- details or progress -->
      </thx-card>
    </div>
  </thx-split-panel>

  <thx-divider label="PROTOCOL LOG" crt></thx-divider>
</thx-crt-display>
```

### Modal Confirmation Sequence with Dialog and Drawer

Use dialog for critical irreversible actions and drawer for detailed configuration or logs.

```html
<thx-button variant="error" onclick="document.getElementById('confirm').show()">TERMINATE SECTOR</thx-button>

<thx-dialog id="confirm" label="CONFIRM TERMINATION" size="sm">
  <p>This action will place Sector 07 in permanent lockdown. All active assets will be recalled.</p>
  <thx-button-group slot="footer">
    <thx-button>ABORT</thx-button>
    <thx-button variant="error">CONFIRM TERMINATION</thx-button>
  </thx-button-group>
</thx-dialog>

<thx-button onclick="document.getElementById('config').show()">OPEN CONFIG DRAWER</thx-button>

<thx-drawer id="config" label="ADVANCED CONFIGURATION" placement="end" size="lg">
  <thx-details>
    <span slot="summary">NETWORK PROTOCOLS</span>
    <!-- nested controls -->
  </thx-details>
  <thx-divider></thx-divider>
  <!-- more settings -->
</thx-drawer>
```

### Contextual Command Surfaces with Dropdown and Popup

A toolbar button that opens a full command menu via dropdown, plus contextual info popups attached to status elements.

```html
<thx-dropdown label="QUICK ACTIONS">
  <thx-menu>
    <thx-menu-item>INITIATE RECON</thx-menu-item>
    <thx-menu-item>REQUEST BACKUP</thx-menu-item>
    <thx-menu-label>ADMIN</thx-menu-label>
    <thx-menu-item>OVERRIDE LOCK</thx-menu-item>
  </thx-menu>
</thx-dropdown>

<span id="status">NOMINAL</span>
<thx-popup anchor="status" placement="bottom" label="SYSTEM STATUS">
  All 14 nodes reporting within tolerance.<br>
  Last anomaly: 14 MAY 2026 // 09:12
</thx-popup>
```

### Progressive Disclosure with Details and Dividers inside Cards

```html
<thx-card label="MISSION DIRECTIVES">
  <thx-details open>
    <span slot="summary">PRIMARY OBJECTIVE</span>
    <p>Maintain containment integrity of Sector 07.</p>
  </thx-details>
  <thx-divider label="SECONDARY PROTOCOLS"></thx-divider>
  <thx-details>
    <span slot="summary">CONTINGENCY A</span>
    <!-- content -->
  </thx-details>
</thx-card>
```

## Cross-Cutting Improvements

- **Modal & Focus Trapping**: Both `thx-dialog` and `thx-drawer` implement robust focus trapping, Escape dismissal, and body-scroll lock. They share the same internal focus-management primitives and CRT static overlay treatment, guaranteeing consistent keyboard and visual behavior whether the surface slides or scales.

- **Centralized CRT Effects on Overlays**: Dialog, drawer, dropdown, popup, carousel (CRT variant), split-panel (CRT), and divider (CRT) all consume the static scanline + vignette overlays from `crt-effects.js`. This keeps every dark "monitor" surface visually coherent while the full animated `crtMonitorStyles` are reserved for live display containers.

- **Composition Patterns**: 
  - Primary surfaces: `<thx-card>` (with or without `crt`) and `<thx-split-panel>`.
  - Rhythm: `<thx-divider>` and `<thx-details>`.
  - Sequential content: `<thx-carousel>` + `<thx-carousel-item>`.
  - Transient commands: dropdown and popup for non-modal, dialog/drawer for modal.
  - All compose cleanly inside or around `<thx-crt-display>` and with navigation components (menus inside drawers, trees inside split panels).

- **Keyboard & Accessibility**: Every overlay and layout primitive supports the THX focus contract. Dividers and details are fully keyboard operable. Carousel navigation receives focus-visible glow. ARIA roles, labels, and `aria-modal` where appropriate are maintained automatically. The `label` attribute on card, dialog, drawer, and carousel is rendered as the canonical uppercase mono header.

These components let authors (human or LLM) assemble complete, multi-layered control-room interfaces from a small, consistent vocabulary. Start with cards and split-panels for the main canvas, add dividers and details for organization, layer carousels for sequential data, and use the overlay family for any action that must command the operator's full attention.

---

*Category overview for THX Components layout containers and overlay surfaces. The structural grammar of the clinical dystopian interface.*