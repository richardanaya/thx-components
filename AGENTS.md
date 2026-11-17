# THX components

This library is built on UI SDK `0.1.0-beta.7`. The packages, part names, and events are beta and can change before general availability.

Before using ui-sdk, follow the ui-sdk skill if it is installed, and read `node_modules/@ui-sdk/web/docs/llms.txt`. To build a new component, also search `node_modules/@ui-sdk/web/docs/core.md` by heading, and read `rendering.md` next to it.

THX-only instruments live in `src/primitives` and are registered from `src/elements.ts`. Do not wrap them in Lit. Style with `data-slot` and state attributes in `src/theme/aesthetics.css`. The old-to-new map is `src/catalog.ts`.
