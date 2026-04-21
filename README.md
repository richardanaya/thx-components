# thx-components

THX 1138 web components — a classless CSS framework + 66 custom elements. Zero dependency, zero class soup.

## How it works

1. `aesthetics.css` — bare HTML tags (`<h1>`, `<p>`, `<button>`, etc.) are styled automatically. No utility classes needed.
2. `webcomponents.js` — drop `<thx-*>` custom elements anywhere. Together they produce extremely minimal HTML with no classes and no build step.

## Quick Start

Two files. That's it.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/thx-components/aesthetics.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/thx-components/webcomponents.js"></script>
```

Then use any component:

```html
<h1>Report</h1>
<p>Bare HTML is already styled.</p>
<thx-button variant="primary">CONFIRM</thx-button>
<thx-alert variant="error" open>CRITICAL</thx-alert>
```

## npm

```bash
npm install thx-components
```

```js
import 'thx-components';
```

## License

MIT
