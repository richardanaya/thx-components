# thx-include

**THX 1138 styled external content fetcher / include component.**

Fetches remote HTML, plain text, or JSON and renders it inside a clinical mono container. Supports optional auto-refresh, manual refresh button, loading spinner, error rail styling, and CRT/panel variants. Provides light script-stripping when `allow-scripts` is false. Useful for pulling live logs, status fragments, external directives, or JSON telemetry into the interface.

## Import

```js
import 'thx-components/src/components/thx-include.js';
import 'thx-components';
```

## Basic Usage

```html
<thx-include src="https://status.example.com/fragment.html" mode="html"></thx-include>
```

## Advanced Usage

### CRT Styled Live Log Panel

```html
<thx-include 
  src="/api/logs/recent" 
  mode="text" 
  variant="crt" 
  refresh-interval="30000"
  show-refresh>
</thx-include>
```

### JSON Telemetry Renderer

```html
<thx-include 
  src="/api/metrics/current" 
  mode="json" 
  variant="panel">
</thx-include>
```

### Error Handling & Refresh

The component surfaces HTTP errors and network failures in a red left-rail error block. A refresh button (when enabled) allows manual re-fetch.

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | `string` | `''` | URL to fetch. Changing it triggers a new fetch. |
| `mode` | `'html' \| 'text' \| 'json'` | `'html'` | How to interpret the response body. |
| `allow-scripts` | `boolean` (attribute) | `false` | When false, strips `<script>` tags and `on*` / `javascript:` handlers (light sanitization). |
| `refresh-interval` | `number` (ms) | `0` | Auto-refresh period. `0` disables. |
| `show-refresh` | `boolean` (attribute) | `false` | Shows a header with source label + manual REFRESH button. |
| `variant` | `'default' \| 'crt' \| 'panel'` (reflects) | `'default'` | Visual container style. |

## Slots

None. Content is fetched and injected.

## Internal State (observable)

- `_loading` — shows animated "LOADING" with spinner.
- `_error` — shows red error rail with message.
- `_content` — the processed body.

## Events

None emitted directly; listen to standard fetch lifecycle via `updated` or by observing the DOM.

## Variants

- **default**: Light institutional container.
- **crt**: Dark monitor frame with phosphor text (ideal for log streams).
- **panel**: Elevated light panel with inner shadow, good for dashboard cards.
- **show-refresh + header**: Displays source URL + REFRESH control in a mono header bar.

## Accessibility

- Loading state is announced via the visible "LOADING" text.
- Error messages are clearly styled with color and left border.
- When embedding HTML, ensure the fetched fragment itself follows THX accessibility guidelines (headings, labels, focus management).
- The refresh button is a native `<button>` with proper text.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#utilities).

- **Light sanitization**: Script tags are removed and event handlers stripped when `allow-scripts=false`. This is **not** a full sanitizer — treat remote HTML as trusted within your threat model.
- **JSON pretty-print**: In `json` mode the content is stringified with 2-space indentation inside a `<pre>`.
- **Header label**: Shows the `src` URL (or "NO SOURCE") when refresh controls are visible.
- **AI-friendly**: `<thx-include src="..." mode="text" variant="crt" refresh-interval="15000">` lets an LLM pull live external data into a perfect-looking terminal panel without writing any fetch or render code.
- **Auto-refresh management**: Timer is cleaned up on disconnect and re-established when `refresh-interval` or `src` changes.
- **Error presentation**: Matches the left-rail error pattern used by other status components (amber/red accents).

Useful for composing dashboards from multiple micro-services or external status endpoints while staying inside the THX visual language.

## Related Components

- [thx-crt-display](./thx-crt-display.md)
- [thx-mutation-observer](./thx-mutation-observer.md)
- [thx-format-date](./thx-format-date.md) — often used to timestamp included log lines
- [thx-spinner](./thx-spinner.md) — internal loading indicator
