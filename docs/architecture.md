# Architecture

THX 1138 is a classless control-room theme on top of [UI SDK](https://ui-sdk.dev), the Vercel Labs beta released 12 November 2026. Version **0.1.0-beta.7** is pinned in `package.json`. The framework, part APIs, and behavior can change before general availability. See the [beta terms](https://vercel.com/docs/release-phases/public-beta-agreement).

## Why this SDK

UI SDK is the product named “UI SDK”: a library of behaviors (`createRovingFocus`, `createPopup`, `createSelection`, `bindDrag`, and the rest of `@ui-sdk/core`) plus the same parts in React, Vue, Svelte, Solid, and Web Components. This repository uses the Web Components adapter because the project is HTML authored for people and agents, not a React application.

Other Vercel betas that are not this SDK:

- [Chat SDK](https://vercel.com/changelog/chat-sdk) (`chat`, February 2026) is a multi-platform bot framework.
- [AI Elements](https://vercel.com/changelog/introducing-ai-elements) is a set of AI-chat React components.
- [json-render](https://vercel.com/changelog/json-render-and-chat-sdk-agents) (November 2026) streams generated cards into Chat SDK.

## How a component is built

1. A **primitive** from `definePrimitive` holds state, an api, and slots. Slots set `data-slot`, ARIA, and events. Behaviors from `@ui-sdk/core` do focus, drag, and change reporting.
2. `createParts` from `@ui-sdk/web` turns those slots into custom elements. `wrappedButton` and `wrappedChild` put the behavior on the native control inside the tag.
3. `@ui-sdk/core/web.css` supplies structure in the `ui-sdk` cascade layer. `src/theme/aesthetics.css` overrides `--ui-*` tokens and adds the THX and CRT surfaces. Unlayered rules win, and they keep `[hidden]` parts hidden.
4. `createAgent` from `@ui-sdk/web/agent` reads the page and calls component actions. `observe` from `@ui-sdk/core/observe` reports changes. DOM-only watchers remain `thx-resize-observer` and `thx-mutation-observer`.

`src/register.ts` imports every UI SDK component entry, then the THX elements. Importing `thx-components` does that registration.

Primitives are framework-agnostic. This package ships the Web Components adapter only. Another adapter can call `createParts` on the same primitives. Published `.d.ts` files type the stable surface (catalog, formatters, `createAgent`, `observe`). The primitive factories are exported at runtime; UI SDK's factory type is not portable in declaration emit, so those exports are typed `unknown`. Use the TypeScript source in this repo when another adapter needs the full factory type.

## What you write

```html
<link rel="stylesheet" href="thx-components/aesthetics.css" />
<script type="module">
  import 'thx-components';
</script>

<ui-button>
  <button type="button" data-variant="primary">Confirm</button>
</ui-button>

<thx-crt variant="scope" label="LDS-1138">
  <thx-crt-screen>
    <thx-scope-line label="Alpha" default-value="12,40,28,66"></thx-scope-line>
  </thx-crt-screen>
</thx-crt>
```

A bundler has to resolve the packages. The published `aesthetics.css` inlines `@ui-sdk/core/web.css` so a plain `<link>` works after `npm run build`. There is no Lit runtime and no shadow DOM.

## Old to new

| Former element        | Now                            | Kind      | SDK concept                                                  |
| --------------------- | ------------------------------ | --------- | ------------------------------------------------------------ |
| thx-alert             | thx-alert                      | primitive | dismissible status region                                    |
| thx-animated-image    | thx-frames                     | primitive | timed frame parts                                            |
| thx-animation         | thx-presence                   | primitive | named entrance; SDK popups already use `data-starting-style` |
| thx-avatar            | ui-avatar                      | sdk       | image with fallback                                          |
| thx-badge             | thx-badge                      | primitive | status chip                                                  |
| thx-breadcrumb        | thx-breadcrumb                 | primitive | `createRovingFocus`                                          |
| thx-breadcrumb-item   | thx-breadcrumb-item            | primitive | roving link                                                  |
| thx-button            | ui-button                      | sdk       | button, including pending actions                            |
| thx-button-group      | ui-toolbar                     | sdk       | one tab stop                                                 |
| thx-card              | thx-card                       | primitive | labeled surface                                              |
| thx-carousel          | ui-carousel                    | sdk       | scroll viewport                                              |
| thx-carousel-item     | ui-carousel-item               | sdk       | carousel item                                                |
| thx-chart-bar         | thx-scope-bar                  | primitive | phosphor bars                                                |
| thx-chart-gauge       | thx-scope-gauge                | primitive | phosphor gauge                                               |
| thx-chart-line        | thx-scope-line                 | primitive | phosphor line                                                |
| thx-chart-monitors    | thx-scope-monitors             | primitive | stacked channels                                             |
| thx-checkbox          | ui-checkbox                    | sdk       | checkbox                                                     |
| thx-color-picker      | ui-color-picker                | sdk       | color area and sliders                                       |
| thx-copy-button       | thx-copy-button                | primitive | press copies, `data-copied`                                  |
| thx-crt-display       | thx-crt                        | primitive | monitor frame                                                |
| thx-details           | ui-collapsible                 | sdk       | disclosure                                                   |
| thx-dialog            | ui-dialog                      | sdk       | modal popup                                                  |
| thx-divider           | ui-separator                   | sdk       | separator                                                    |
| thx-drawer            | ui-drawer                      | sdk       | edge sheet                                                   |
| thx-dropdown          | ui-menu                        | sdk       | menu                                                         |
| thx-format-bytes      | thx-format-bytes               | primitive | formatted bytes                                              |
| thx-format-date       | thx-format-date                | primitive | formatted date                                               |
| thx-format-number     | thx-format-number              | primitive | formatted number                                             |
| thx-icon              | inline SVG                     | content   | icons are content                                            |
| thx-icon-button       | ui-button                      | sdk       | named button                                                 |
| thx-image-comparer    | thx-comparer                   | primitive | `bindDrag` split                                             |
| thx-include           | thx-include                    | primitive | fetched text or HTML                                         |
| thx-input             | ui-field + ui-input            | sdk       | labeled native input                                         |
| thx-menu              | ui-menu                        | sdk       | menu                                                         |
| thx-menu-item         | ui-menu-item                   | sdk       | menu item                                                    |
| thx-menu-label        | ui-menu-group-label            | sdk       | group label                                                  |
| thx-multi-select      | ui-select `[multiple]`         | sdk       | multiple selection                                           |
| thx-mutation-observer | thx-mutation-observer          | primitive | DOM mutations; component changes use `observe()`             |
| thx-option            | ui-select-item                 | sdk       | option                                                       |
| thx-popup             | ui-popover                     | sdk       | popover                                                      |
| thx-progress-bar      | ui-progress                    | sdk       | progress                                                     |
| thx-progress-ring     | ui-meter `[data-variant=ring]` | sdk       | `--meter-value` sweep                                        |
| thx-radio             | ui-radio                       | sdk       | radio                                                        |
| thx-radio-button      | ui-segmented-control           | sdk       | segmented choice                                             |
| thx-radio-group       | ui-radio-group                 | sdk       | radio group                                                  |
| thx-range             | ui-slider                      | sdk       | slider                                                       |
| thx-rating            | ui-rating                      | sdk       | rating                                                       |
| thx-relative-time     | thx-relative-time              | primitive | relative time                                                |
| thx-resize-observer   | thx-resize-observer            | primitive | element box                                                  |
| thx-select            | ui-select                      | sdk       | select popup                                                 |
| thx-skeleton          | thx-skeleton                   | primitive | placeholder                                                  |
| thx-spinner           | thx-spinner                    | primitive | status glyph; tasks use `ui-progress`                        |
| thx-split-panel       | ui-resizable                   | sdk       | resizable panels                                             |
| thx-status-leds       | thx-leds                       | primitive | status lamps                                                 |
| thx-switch            | ui-switch                      | sdk       | switch                                                       |
| thx-tab               | ui-tabs-tab                    | sdk       | tab                                                          |
| thx-tab-group         | ui-tabs                        | sdk       | tabs                                                         |
| thx-tab-panel         | ui-tabs-panel                  | sdk       | tab panel                                                    |
| thx-tag               | thx-tag                        | primitive | removable token; fields of tokens use `ui-token-input`       |
| thx-textarea          | ui-textarea                    | sdk       | textarea                                                     |
| thx-tooltip           | ui-tooltip                     | sdk       | tooltip                                                      |
| thx-tree              | ui-tree                        | sdk       | tree                                                         |
| thx-tree-item         | ui-tree-item                   | sdk       | tree item                                                    |
| thx-visually-hidden   | thx-visually-hidden            | primitive | visually hidden text                                         |

The machine-readable copy of this table is `componentMap` in `src/catalog.ts`.

## Breaking changes

- Lit, shadow DOM, and the `Thx*` classes are gone.
- Tags that UI SDK already implements are now `ui-*` parts. A button is `<ui-button><button data-variant="primary">`, not `<thx-button variant="primary">`.
- Charts are single-series phosphor scopes (a line may take a `secondary` list). The old multi-series canvas options are not carried over.
- `thx-icon` is not an element. Draw an SVG.
- `thx-include` accepts `http`, `https`, and same-page relative URLs. `mode="html"` assigns `innerHTML`. The default mode is text.
- There is no CDN drop-in of a single `webcomponents.js`. Consumers install the pinned SDK packages and bundle the entry. The demo is that bundle.

## Beta surface that may move

Pinned packages: `@ui-sdk/core@0.1.0-beta.7` and `@ui-sdk/web@0.1.0-beta.7`.

Expect change in part tag names, the `data-*` state attributes, popup positioning, form value shapes, `createAgent` / `observe`, and `createParts` options. THX primitives follow the same beta kernel (`definePrimitive`, `createChange`, `createRovingFocus`, `bindDrag`), so they move with it.
