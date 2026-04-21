# thx-components

THX 1138 web components — a classless CSS framework + 66 custom elements, designed for AI/LLM authoring. Zero dependency, zero class soup.

## For AI agents (and humans who hate boilerplate)

Most CSS frameworks drown you in utility classes:

```html
<!-- Tailwind: 47 classes, 1,400 tokens of noise -->
<div
  class="flex flex-col gap-2 p-4 bg-neutral-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
></div>
```

This is a **classless CSS framework**. Write semantic HTML and it already looks beautiful. Drop a `<thx-*>` element and it slots right in. No classes to memorize, no design tokens to juggle, no 47-class incantations.

**Why this matters for AI:** LLMs generate beautiful dashboards and websites with dramatically less HTML/CSS boilerplate. You write `<section>`, `<h1>`, `<button>`, `<thx-card>` — not a wall of `class="..."`. Output is smaller, faster, and cleaner.

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
