# thx-tab-group

The `<thx-tab-group>` component delivers a clinical, control-room tabbed interface for organizing content into switchable panels. Designed for THX 1138 aesthetics: sterile grays, phosphor blue (`#A6C8E1`) active states with subtle glow, uppercase monospace (`Courier New`) labels, and clean square geometry. Perfect for dashboards, monitoring stations, and operational control surfaces.

## Usage

Basic structure uses a named slot for tabs and the default slot for panels:

```html
<thx-tab-group active-tab="overview">
  <thx-tab slot="tab" panel="overview">OVERVIEW</thx-tab>
  <thx-tab slot="tab" panel="controls">CONTROLS</thx-tab>
  <thx-tab slot="tab" panel="audit" indicator="WARN">AUDIT</thx-tab>

  <thx-tab-panel id="overview">
    System status nominal. All subsystems reporting green.
  </thx-tab-panel>
  <thx-tab-panel id="controls">
    <!-- form controls, charts, etc. -->
  </thx-tab-panel>
  <thx-tab-panel id="audit">
    <!-- audit log content -->
  </thx-tab-panel>
</thx-tab-group>
```

## Properties / Attributes

| Attribute     | Type                  | Default   | Description |
|---------------|-----------------------|-----------|-------------|
| `active-tab`  | string                | (first)   | ID of the currently active tab panel. Controls which panel is visible and which tab is active. |
| `variant`     | `'default' \| 'crt' \| 'compact'` | `'default'` | Visual style. `crt` applies dark monitor background, scanline overlay, and phosphor accents. `compact` removes borders for inline use. |
| `placement`   | `'top' \| 'bottom' \| 'start' \| 'end'` | `'top'` | Tab bar position relative to panels. `start`/`end` render vertical tab bars on the side. |

All properties are reflected as attributes.

## Slots

- `tab` (named): Place one or more `<thx-tab>` elements here. These form the clickable tab bar.
- default: Place `<thx-tab-panel>` elements here. Panels are shown/hidden based on `active-tab`.

## Events

- `tab-change` (bubbles, composed): Fired when the active tab changes via user interaction or `selectTab()`.
  - `detail: { activeTab: string }` — the new panel ID.

## Methods

- `selectTab(panelId: string)`: Programmatically activate a panel by ID. Updates tabs, panels, and dispatches `tab-change`.
- `focus()`: Focuses the active (or first enabled) tab for keyboard entry. Excellent for roving focus integration.
- `blur()`: Blurs any focused element within the group.

## Keyboard Behavior (Improved Roving Focus)

The tab group implements robust **roving tabindex** navigation (via the shared `getNextRovingIndex` helper from `focus-visible` mixin):

- Only the **active tab** receives `tabindex="0"`; all others receive `tabindex="-1"`.
- Arrow keys (`ArrowRight`/`ArrowDown` = next, `ArrowLeft`/`ArrowUp` = prev) move focus **and automatically activate** the target tab (selects the panel).
- `Home` / `End`: Jump to first/last enabled tab and activate it.
- Focus management gracefully handles shadow DOM delegation and fallback detection of the inner `[role="tab"]` button.
- This single-tab-stop pattern makes the entire tab group behave like a native control while providing arrow-key fluidity typical of desktop applications.

The improved detection logic in `_handleKeydown` correctly identifies the current focused tab even when focus lands inside the tab's shadow root or on the host.

## ARIA Roles & Accessibility

- Container: `role="tablist"` on the tab navigation bar.
- Each `<thx-tab>` renders a `button[role="tab"]` with:
  - `aria-selected="true/false"`
  - `aria-controls` pointing to the panel ID
  - Proper `tabindex` for roving
- Each `<thx-tab-panel>` receives `role="tabpanel"` (set in `connectedCallback`) and `aria-labelledby` referencing the controlling tab's ID.
- Disabled tabs are non-focusable and skipped in roving navigation.
- Full `focus-visible` phosphor glow rings (soft blue outer glow) on keyboard focus for high visibility without mouse artifacts.
- Supports forced-colors / high-contrast mode.

## Variants

### CRT Variant

```html
<thx-tab-group variant="crt" active-tab="systems">
  <!-- tabs and panels -->
</thx-tab-group>
```

Dark `#111` / `#0a0a0a` surfaces, subtle static scanlines, tertiary `#DEFFFF` active text with glow. Ideal for embedded monitor-style sections within larger dark dashboards.

### Compact Variant

Removes container borders and soft background for tight integration with other panels.

### Placement Variants

- `placement="bottom"`: Tabs appear below panels (column-reverse layout).
- `placement="start"`: Vertical tabs on the left.
- `placement="end"`: Vertical tabs on the right.

Vertical placements use `flex-direction: column` on the tab nav and adjust borders accordingly.

## Practical Examples

### Controlled Tabs (External State)

```html
<thx-tab-group id="main-tabs" active-tab="live" @tab-change="handleTabChange">
  ...
</thx-tab-group>

<script>
  function handleTabChange(e) {
    console.log('Switched to:', e.detail.activeTab);
    // Sync external state, URL hash, analytics, etc.
  }

  // Programmatic control
  document.getElementById('main-tabs').selectTab('audit');
</script>
```

### Closable Tabs with Indicators

```html
<thx-tab slot="tab" panel="feed" indicator="LIVE" closable>FEED</thx-tab>
<thx-tab slot="tab" panel="alerts" indicator="!" closable>ALERTS</thx-tab>
```

Listen for `tab-close` events on individual tabs to remove them from the DOM and update `active-tab` if necessary.

### Vertical Sidebar Tabs (`placement="start"`)

```html
<thx-tab-group placement="start" variant="compact" active-tab="sensors">
  <thx-tab slot="tab" panel="sensors">SENSORS</thx-tab>
  <thx-tab slot="tab" panel="actuators">ACTUATORS</thx-tab>
  ...
</thx-tab-group>
```

### CRT Monitor Tabs (from ultradashboard)

Real-world usage with live indicators:

```html
<thx-tab-group active-tab="overview" variant="crt">
  <thx-tab slot="tab" panel="overview" indicator="LIVE">OVERVIEW</thx-tab>
  <thx-tab slot="tab" panel="forms" indicator="12">CONTROL</thx-tab>
  <thx-tab slot="tab" panel="media" indicator="SCAN">MEDIA</thx-tab>
  <thx-tab slot="tab" panel="audit" indicator="WARN">AUDIT</thx-tab>
  ...
</thx-tab-group>
```

## Styling Notes

- Tab labels are forced `text-transform: uppercase` and monospace.
- Active state uses a phosphor underline + glow (`::after` pseudo on active tab).
- Hover uses soft primary tint.
- All focus rings are phosphor-blue glows via the shared `focusVisibleStyles`.
- CRT variant inherits scanline overlay from `crtStaticScanlineOverlay`.
- No utility classes required — fully semantic and classless.

## Composition

Composes cleanly with:
- `<thx-tab>` and `<thx-tab-panel>` (required children)
- Other THX nav components (`thx-tree`, `thx-menu`) inside panels for hierarchical or command interfaces.
- Forms, charts, and status elements within panels.

The tab group itself participates in the global focus management contract (public `focus()`/`blur()` methods).

---

**Related components**: [thx-tab](./thx-tab.md), [thx-tab-panel](./thx-tab-panel.md), [thx-tree](./thx-tree.md), [thx-menu](./thx-menu.md)