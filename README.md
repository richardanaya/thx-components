# thx-components

THX 1138, rebuilt on [Vercel UI SDK](https://ui-sdk.dev) **0.1.0-beta.7** (public beta, 12 November 2026).

The page is still a classless control room: concrete canvas, Helvetica, Courier labels, phosphor only where the interface is a monitor. Keyboard, focus, selection, popups, and ARIA come from UI SDK behaviors. You bring this theme.

UI SDK is in beta. Part names, events, and behavior can change before general availability. This package pins the versions it was built against. Read [docs/architecture.md](docs/architecture.md) before depending on an API.

## Install

```bash
npm install thx-components
```

That installs `@ui-sdk/web` and `@ui-sdk/core` at `0.1.0-beta.7`.

```ts
import 'thx-components';
import 'thx-components/aesthetics.css';
```

`import "thx-components"` registers the UI SDK custom elements and the THX primitives. The root import has no component namespace; each SDK component is its own entry, which the register module imports for you.

```html
<h1>Report</h1>
<p>Bare HTML is already on the concrete canvas.</p>

<ui-button>
  <button type="button" data-variant="primary">Confirm</button>
</ui-button>

<ui-field name="designation">
  <ui-field-label>Designation</ui-field-label>
  <ui-input><input value="THX 1138" /></ui-input>
</ui-field>

<thx-crt variant="scope" label="LDS-1138">
  <thx-crt-label>LDS-1138</thx-crt-label>
  <thx-crt-screen>
    <thx-scope-line label="Alpha" default-value="12,40,28,66"></thx-scope-line>
  </thx-crt-screen>
</thx-crt>
```

Style state with the attributes the parts already set (`data-pressed`, `data-open`, `data-checked`, `data-copied`, `data-variant`), not with a class for every state. The theme maps `--ui-*` to the THX palette. Square corners are `--ui-radius: 0`.

## Agents

```ts
import { createAgent, observe } from 'thx-components';

const agent = createAgent();
agent.snapshot();
await agent.act({
  steps: [{ ref: 'Designation', action: 'setValue', args: ['SEN-5241'] }],
});

observe(change => console.log(change));
```

Create the agent once in the browser. It sees components that are already mounted and ones created later.

## Primitives

THX-only behavior lives in `src/primitives` as `definePrimitive` definitions: alerts, badges, tags, copy button, breadcrumb, CRT frame, scopes, lamps, formatters, comparer, frames, include, presence, skeleton, spinner, and the two DOM observers. `src/elements.ts` registers their tags. The same primitives can be rendered by another UI SDK adapter; this package ships Web Components.

The map from the old Lit elements is in [docs/architecture.md](docs/architecture.md) and `componentMap` from `thx-components/catalog`.

## Demo

```bash
npm install
npm run dev
```

The terminal is `demo/index.html`.

## Check

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm test` starts the demo and runs Playwright against it. `npm run test:unit` checks the formatters and that all 64 former elements are mapped.

## License

MIT. UI SDK is Apache-2.0.
