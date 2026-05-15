# THX Components Documentation

**THX 1138** — A clinical, dystopian web component library built with Lit.

A classless CSS framework + 64 custom elements designed for AI/LLM authoring. Zero runtime dependency. Zero class soup.

## Philosophy

Write semantic HTML. Drop `<thx-*>` elements. Get beautiful, sterile, industrial control-room interfaces with almost no boilerplate.

This documentation is generated to help both humans and AI agents use the library effectively.

## Quick Start

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thx-components/aesthetics.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/thx-components/webcomponents.js"></script>

<thx-card label="STATUS">
  <thx-input label="DESIGNATION" name="id"></thx-input>
  <thx-button variant="primary">CONFIRM</thx-button>
</thx-card>
```

## Component Documentation

### Form Controls
[Category Overview →](categories/forms.md)

- [thx-input](components/thx-input.md)
- [thx-textarea](components/thx-textarea.md)
- [thx-select](components/thx-select.md)
- [thx-multi-select](components/thx-multi-select.md)
- [thx-checkbox](components/thx-checkbox.md)
- [thx-switch](components/thx-switch.md)
- [thx-radio](components/thx-radio.md)
- [thx-radio-button](components/thx-radio-button.md)
- [thx-radio-group](components/thx-radio-group.md)
- [thx-range](components/thx-range.md)
- [thx-rating](components/thx-rating.md)
- [thx-color-picker](components/thx-color-picker.md)

### Buttons & Actions
- [thx-button](components/thx-button.md)
- [thx-icon-button](components/thx-icon-button.md)
- [thx-copy-button](components/thx-copy-button.md)
- [thx-button-group](components/thx-button-group.md)

### Feedback & Status
- [thx-alert](components/thx-alert.md)
- [thx-badge](components/thx-badge.md)
- [thx-tag](components/thx-tag.md)
- [thx-progress-bar](components/thx-progress-bar.md)
- [thx-progress-ring](components/thx-progress-ring.md)
- [thx-spinner](components/thx-spinner.md)
- [thx-skeleton](components/thx-skeleton.md)
- [thx-status-leds](components/thx-status-leds.md)

### Navigation & Structure
[Category Overview →](categories/navigation.md)

- [thx-tab-group](components/thx-tab-group.md)
- [thx-tab](components/thx-tab.md)
- [thx-tab-panel](components/thx-tab-panel.md)
- [thx-tree](components/thx-tree.md)
- [thx-tree-item](components/thx-tree-item.md)
- [thx-menu](components/thx-menu.md)
- [thx-menu-item](components/thx-menu-item.md)
- [thx-breadcrumb](components/thx-breadcrumb.md)
- [thx-breadcrumb-item](components/thx-breadcrumb-item.md)

### Layout & Overlays
[Category Overview →](categories/layout-overlays.md)

- [thx-card](components/thx-card.md)
- [thx-dialog](components/thx-dialog.md)
- [thx-drawer](components/thx-drawer.md)
- [thx-dropdown](components/thx-dropdown.md)
- [thx-popup](components/thx-popup.md)
- [thx-split-panel](components/thx-split-panel.md)
- [thx-details](components/thx-details.md)
- [thx-divider](components/thx-divider.md)
- [thx-carousel](components/thx-carousel.md)
- [thx-image-comparer](components/thx-image-comparer.md)

### Data Visualization & CRT
[Category Overview →](categories/crt-data-viz.md)

- [thx-crt-display](components/thx-crt-display.md)
- [thx-chart-line](components/thx-chart-line.md)
- [thx-chart-bar](components/thx-chart-bar.md)
- [thx-chart-gauge](components/thx-chart-gauge.md)
- [thx-chart-monitors](components/thx-chart-monitors.md)
- [thx-format-bytes](components/thx-format-bytes.md)
- [thx-format-date](components/thx-format-date.md)
- [thx-format-number](components/thx-format-number.md)
- [thx-relative-time](components/thx-relative-time.md)

### Media & Utilities
[Category Overview →](categories/utilities.md)

- [thx-avatar](components/thx-avatar.md)
- [thx-icon](components/thx-icon.md)
- [thx-animated-image](components/thx-animated-image.md)
- [thx-animation](components/thx-animation.md)
- [thx-include](components/thx-include.md)
- [thx-tooltip](components/thx-tooltip.md)
- [thx-visually-hidden](components/thx-visually-hidden.md)
- [thx-mutation-observer](components/thx-mutation-observer.md)
- [thx-resize-observer](components/thx-resize-observer.md)

## Design System

See [DESIGN.md](../DESIGN.md) for the full THX 1138 clinical dystopian design language (tokens, typography, CRT subsystem, do's and don'ts).

## Extending the Library

The library provides reusable primitives:

- `FormAssociatedMixin` — for native form participation
- `focusVisibleStyles` + `FocusVisibleMixin` — consistent keyboard focus
- `crt-effects.js` — centralized scanlines, vignette, and monitor effects

## Contributing / AI Usage

This documentation is intentionally detailed and example-rich so that LLMs can generate correct, on-brand THX interfaces with minimal prompt engineering.

---

*Generated as part of the THX Components improvement effort.*
