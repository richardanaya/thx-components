# thx-tab

The `<thx-tab>` element is the individual clickable trigger inside a `<thx-tab-group>`. It renders as a monospace uppercase button with phosphor-blue active underline/glow and optional status indicators — the canonical "control surface" tab affordance in the THX 1138 design system.

## Usage

Always used as a direct child of `<thx-tab-group>` with the `slot="tab"` and a matching `panel` attribute:

```html
<thx-tab-group active-tab="status">
  <thx-tab slot="tab" panel="status" active>STATUS</thx-tab>
  <thx-tab slot="tab" panel="telemetry">TELEMETRY</thx-tab>
</thx-tab-group>
```

## Properties / Attributes

| Attribute   | Type      | Default | Description |
|-------------|-----------|---------|-------------|
| `panel`     | string    | —       | **Required.** The ID of the `<thx-tab-panel>` this tab activates. |
| `active`    | boolean   | false   | Whether this tab is currently selected (controlled by parent group). |
| `disabled`  | boolean   | false   | Prevents interaction and removes from keyboard roving order. |
| `closable`  | boolean   | false   | Shows an `✕` close affordance that fires `tab-close`. |
| `indicator` | string    | —       | Optional badge text (e.g. `"LIVE"`, `"12"`, `"!"`, `"WARN"`). Auto-colors warning/error variants. |
| `variant`   | string    | 'default' | Inherited from parent `thx-tab-group` (`crt` for dark phosphor styling). |

## Slots

- `icon` (named): Optional icon or glyph preceding the label (recommended 16–20px).
- default: The tab label text (automatically uppercased via CSS).

## Events

- `tab-click` (bubbles, composed): Fired on click (before panel activation).
  - `detail: { panel: string }`
- `tab-close` (bubbles, composed): Fired when the close `✕` is clicked (only if `closable`).
  - `detail: { panel: string }`

## Keyboard & Focus

- Renders an internal `<button role="tab">`.
- `tabindex` is managed by the parent `thx-tab-group` (roving: `0` only on active tab).
- `focus()` / `blur()` methods delegate cleanly to the inner button.
- Receives the shared high-contrast phosphor glow focus ring on `:focus-visible`.

## ARIA

- `role="tab"`
- `aria-selected="true/false"`
- `aria-controls` = the panel ID
- When `disabled`, `tabindex="-1"` and `pointer-events: none`

## Variants & Indicators

### CRT Styling (via parent)

When the group has `variant="crt"`:

- Inactive tabs use secondary gray.
- Active tabs use tertiary `#DEFFFF` with text-shadow glow.
- Hover background is stronger phosphor tint.

### Indicator Badges

```html
<thx-tab slot="tab" panel="feed" indicator="LIVE">FEED</thx-tab>
<thx-tab slot="tab" panel="alerts" indicator="!">ALERTS</thx-tab>
<thx-tab slot="tab" panel="logs" indicator="WARN">LOGS</thx-tab>
```

- Default: secondary pill
- `"!"` or containing `"WARN"` / `"ERR"`: warning amber or error red

### Closable Tabs

```html
<thx-tab slot="tab" panel="temp" closable>TEMP SESSION</thx-tab>
```

Handle `tab-close` on the tab (or listen at group level) to remove the tab + panel and select a fallback.

## Visual Design

- Font: `Courier New`, uppercase, generous letter-spacing.
- Active state: primary underline + soft glow pseudo-element.
- Hover: subtle primary wash.
- Disabled: 40% opacity, no pointer events.
- All interactive surfaces participate in the global `focusVisibleStyles` contract for consistent phosphor-blue glow rings.

## Composition

Designed exclusively for use inside `<thx-tab-group>`. The parent manages activation, roving tabindex, and ARIA relationships.

See the [thx-tab-group](./thx-tab-group.md) documentation for full keyboard, placement, and controlled examples.

**Related**: [thx-tab-panel](./thx-tab-panel.md)