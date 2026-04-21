# THX 1138 Web Components

A clinical, dystopian web component system built with [Lit](https://lit.dev). Inspired by the sci-fi aesthetic of THX 1138 — brutalist layouts, CRT displays, monochrome typography with cool blue atmospheric accents.

80+ components across feedback, navigation, forms, data visualization, overlays, and utilities. Zero runtime dependencies — everything is vendored and self-contained.

## Quick Start

### CDN (zero build)

Drop these two lines in any HTML page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thx-components/aesthetics.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/thx-components/webcomponents.js"></script>
```

Then use components directly:

```html
<thx-alert variant="error" open>CRITICAL — CHECK REQUIRED</thx-alert>
<thx-button variant="primary">CONFIRM</thx-button>
```

### npm

```bash
npm install thx-components
```

Import all components at once:

```js
import 'thx-components';
```

Or import the stylesheet for classless typography + design tokens:

```html
<link rel="stylesheet" href="./node_modules/thx-components/aesthetics.css" />
```

### Tree-shaking individual components

```js
import { ThxButton, ThxCard, ThxAlert } from 'thx-components/src/components/index.js';
```

## What ships

| Package file          | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `webcomponents.js`    | Import once — registers all 66 custom elements          |
| `aesthetics.css`      | Design tokens + Open Props + classless framework styles |
| `src/components/*.js` | Individual component modules                            |
| `vendor/lit.js`       | Vendored Lit runtime (~16KB)                            |

### Design tokens (CSS custom properties)

```css
:root {
  /* Neutrals */
  --neutral-100: #fafafa;
  --neutral-200: #e0e0e0;
  --neutral-600: #666;
  --neutral-800: #333;

  /* CRT atmosphere */
  --atmos-primary: #a6c8e1;
  --atmos-secondary: #707e91;
  --atmos-tertiary: #deffff;

  /* Alerts */
  --accent-warning: #d4aa00;
  --accent-error: #d44000;

  /* CRT display colors */
  --crt-bg: #111;
  --crt-bg-dark: #0a0a0a;
  --crt-border: #2a2a2a;
}
```

Open Props provides sizing, borders, shadows, fonts, easings, durations, and z-index. Colors and font families are THX 1138 specific.

## Component categories

### Feedback & Display

`thx-alert`, `thx-badge`, `thx-card`, `thx-crt-display`, `thx-divider`, `thx-icon`, `thx-progress-bar`, `thx-progress-ring`, `thx-skeleton`, `thx-spinner`, `thx-tag`

### Navigation

`thx-breadcrumb`, `thx-breadcrumb-item`, `thx-button-group`, `thx-details`, `thx-menu`, `thx-menu-item`, `thx-menu-label`, `thx-tab-group`, `thx-tab`, `thx-tab-panel`, `thx-tree`, `thx-tree-item`

### Forms & Inputs

`thx-button`, `thx-checkbox`, `thx-color-picker`, `thx-copy-button`, `thx-input`, `thx-multi-select`, `thx-option`, `thx-radio`, `thx-radio-button`, `thx-radio-group`, `thx-range`, `thx-rating`, `thx-select`, `thx-switch`, `thx-textarea`

### Overlays & Popups

`thx-dialog`, `thx-drawer`, `thx-dropdown`, `thx-icon-button`, `thx-image-comparer`, `thx-popup`, `thx-tooltip`

### Charts & Visualizations

`thx-chart-bar`, `thx-chart-gauge`, `thx-chart-line`, `thx-chart-monitors`, `thx-status-leds`

### Utilities & Formatters

`thx-animated-image`, `thx-animation`, `thx-avatar`, `thx-carousel`, `thx-carousel-item`, `thx-format-bytes`, `thx-format-date`, `thx-format-number`, `thx-include`, `thx-mutation-observer`, `thx-relative-time`, `thx-resize-observer`, `thx-split-panel`, `thx-visually-hidden`

## Local development

```bash
git clone https://github.com/richardanaya/thx-components.git
cd thx-components
npm install
npm run typecheck    # Check types with tsc
npm run format       # Prettier all the things
```

## License

MIT
