# Navigation & Structure

Navigation components in THX 1138 are command surfaces, not decorative links. Every tab, tree node, menu item, and breadcrumb segment is an operational control that must support rapid keyboard traversal, unambiguous selection state, and seamless integration with the surrounding instrument panel. The system favors single tab-stop roving tabindex patterns, arrow-key activation, and precise mono-uppercase labeling so that an operator wearing gloves or working in low light can still navigate without hesitation.

The navigation suite — tabs for sectioned content, trees for hierarchical facility graphs, menus for command lists, and breadcrumbs for location awareness — shares a common focus architecture and visual language: phosphor glow on focus, left accent bars or chevrons on selection, and strict adherence to the clinical THX-1138 typography and geometry.

## Components

- [thx-tab-group](components/thx-tab-group.md) — Clinical tabbed interface container providing switchable panels with uppercase mono labels, phosphor-blue active underlines/glow, and robust roving tabindex keyboard navigation (arrows, Home/End).
- [thx-tab](components/thx-tab.md) — Individual tab trigger element inside a tab-group; renders as a monospace uppercase button with optional status indicators and focus-visible phosphor treatment.
- [thx-tab-panel](components/thx-tab-panel.md) — Content container paired with a tab; hidden by default and revealed only when its id matches the group's active tab. Receives proper `role="tabpanel"` semantics.
- [thx-tree](components/thx-tree.md) — Hierarchical expandable navigation tree with rich keyboard support, type glyphs, status dots (active/warning/error), left selection bars, and automatic roving tabindex management across visible nodes.
- [thx-tree-item](components/thx-tree-item.md) — Single node inside a tree; supports nesting, expand/collapse, selection, indentation by level, and precise control-room visual hierarchy.
- [thx-menu](components/thx-menu.md) — Vertical command/navigation list styled for sidebars and popups; monospace uppercase items, optional section labels via menu-label, chevrons on active items, and full roving keyboard support.
- [thx-menu-item](components/thx-menu-item.md) — Atomic clickable row inside a menu; supports icons, indicator badges, active state, disabled state, `href` rendering as anchor, and phosphor hover/focus glows.
- [thx-menu-label](components/thx-menu-label.md) — Presentational section divider/label for menus that renders `// LABEL //` bookends in muted mono uppercase; supports `crt` and `compact` variants.
- [thx-breadcrumb](components/thx-breadcrumb.md) — Clean monospace navigation path using uppercase labels and automatic `/` separators; shows hierarchical location with phosphor-blue links and focus glow.
- [thx-breadcrumb-item](components/thx-breadcrumb-item.md) — Individual segment in a breadcrumb trail; renders as link or current-page span with `aria-current`, dispatches `breadcrumb-click`, and participates in separator injection.

## Recipes

### Hierarchical Command Tree + Menu Sidebar

A classic control-room layout: a persistent left sidebar menu for top-level commands alongside a facility tree for deep navigation. Both share the same roving focus model.

```html
<div class="control-layout">
  <thx-menu label="COMMAND CONSOLE" crt>
    <thx-menu-label>PRIMARY</thx-menu-label>
    <thx-menu-item active>OVERVIEW</thx-menu-item>
    <thx-menu-item href="#telemetry">TELEMETRY</thx-menu-item>
    <thx-menu-item>ARCHIVE</thx-menu-item>

    <thx-menu-label>SECTORS</thx-menu-label>
    <thx-menu-item>DOCKING</thx-menu-item>
    <thx-menu-item>VOID OPS</thx-menu-item>
  </thx-menu>

  <thx-tree label="FACILITY GRAPH" selection="single">
    <thx-tree-item label="SECTOR-07" expanded>
      <thx-tree-item label="BAY-A" type="room"></thx-tree-item>
      <thx-tree-item label="BAY-B" type="room" selected></thx-tree-item>
    </thx-tree-item>
    <thx-tree-item label="SECTOR-09" type="sector"></thx-tree-item>
  </thx-tree>
</div>
```

Arrow keys move focus and selection fluidly across the tree while the menu remains independently navigable.

### Tabbed Operational Dashboard with Breadcrumb

Organize dense telemetry into tabs while maintaining location context above.

```html
<thx-breadcrumb>
  <thx-breadcrumb-item href="#root">FACILITY</thx-breadcrumb-item>
  <thx-breadcrumb-item href="#sector07">SECTOR 07</thx-breadcrumb-item>
  <thx-breadcrumb-item>CONTROL</thx-breadcrumb-item>
</thx-breadcrumb>

<thx-tab-group active-tab="telemetry">
  <thx-tab id="overview">OVERVIEW</thx-tab>
  <thx-tab id="telemetry">TELEMETRY</thx-tab>
  <thx-tab id="logs">LOGS</thx-tab>

  <thx-tab-panel id="overview">...</thx-tab-panel>
  <thx-tab-panel id="telemetry">
    <!-- charts and monitors here -->
  </thx-tab-panel>
  <thx-tab-panel id="logs">...</thx-tab-panel>
</thx-tab-group>
```

### Context Command Palette via Dropdown + Menu

A dropdown trigger revealing a full menu of actions (often used inside toolbars or CRT displays).

```html
<thx-dropdown label="ACTIONS">
  <thx-menu>
    <thx-menu-item>INITIATE SCAN</thx-menu-item>
    <thx-menu-item>EXPORT DATA</thx-menu-item>
    <thx-menu-label>ADMIN</thx-menu-label>
    <thx-menu-item>OVERRIDE PROTOCOL</thx-menu-item>
  </thx-menu>
</thx-dropdown>
```

## Cross-Cutting Improvements

- **Roving Focus Improvements**: `thx-tab-group`, `thx-tree`, and `thx-menu` implement a shared, battle-tested roving tabindex pattern (leveraging the `getNextRovingIndex` helper from the focus-visible module). Only one element in the group receives `tabindex="0"` at any time; arrow keys move focus *and* activate the target (for tabs and menus), Home/End jump to extremes, and collapsed tree branches or disabled items are automatically excluded from navigation. After expand/collapse or selection changes, the roving state is automatically repaired. This is one of the most complete keyboard models in the library and critical for operator efficiency.

- **Focus Delegation & Shadow DOM Safety**: All navigation components correctly expose `focus()` and `blur()` methods that delegate into shadow DOM, handle slotted content, and integrate with the global `focusVisibleStyles` for consistent phosphor glow rings even in high-contrast or forced-colors modes.

- **Composition with Overlays**: Tree and menu items are the natural content for `<thx-popup>`, `<thx-dropdown>`, and drawer sidebars. Breadcrumbs provide context above tabbed or tree-driven views. The same visual tokens (mono uppercase, chevrons, selection bars, phosphor accents) are used everywhere for instant recognition.

- **Accessibility Contract**: Proper ARIA roles (`tablist`/`tab`/`tabpanel`, `tree`/`treeitem`, `menu`/`menuitem`), `aria-current`, and live state announcements are maintained automatically.

Use these components together to build the complete navigational skeleton of any THX-1138 control interface. The roving focus system ensures the entire navigation layer remains usable from the keyboard alone.

---

*Category overview for THX Components navigation and structural controls. Designed for high-density command surfaces and LLM-generated operational dashboards.*