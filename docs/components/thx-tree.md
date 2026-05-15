# thx-tree

The `<thx-tree>` component provides a hierarchical, expandable navigation tree with rich keyboard support. It embodies control-room precision: monospace uppercase labels, left selection bars on active items, type glyphs, status dots (active/warning/error), and phosphor glows. Ideal for facility graphs, sector hierarchies, file explorers, or command structures in THX 1138 interfaces.

## Usage

```html
<thx-tree label="FACILITY GRAPH" selection="single" variant="compact">
  <thx-tree-item value="core" type="system" expanded selected>
    CENTRAL CORE
    <thx-tree-item slot="children" value="sector-7g" type="sector" expanded>
      SECTOR 7-G
      <thx-tree-item slot="children" value="unit-1138" type="unit" status="active">
        UNIT 1138
      </thx-tree-item>
    </thx-tree-item>
  </thx-tree-item>
</thx-tree>
```

Children are automatically slotted and indented by level. The parent tree manages roving tabindex and visibility filtering for collapsed branches.

## Properties / Attributes

| Attribute   | Type     | Default | Description |
|-------------|----------|---------|-------------|
| `label`     | string   | —       | Optional header label (renders `// LABEL //` with Expand/Collapse buttons). |
| `variant`   | `'default' \| 'crt' \| 'compact'` | `'default'` | `crt` = dark monitor + static scanlines + CRT label. `compact` = borderless. |
| `selection` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection mode. `single` enforces exclusive selection; header reflects mode. |

## Methods

- `focus()`: Focuses the first visible item or a selected one. Sets roving tabindex.
- `expandAll()` / `collapseAll()`: Batch toggle all items (useful for "Expand All" toolbar buttons).
- `getSelectedItems()`: Returns array of currently selected `ThxTreeItem` instances.

## Keyboard Behavior (Rich Roving + Tree Semantics)

The tree implements one of the most complete keyboard models in the library (single tab-stop via roving tabindex on visible items only):

- **ArrowUp / ArrowDown**: Move focus between visible items (respects collapsed branches via `_getVisibleItems`).
- **ArrowRight**:
  - On collapsed parent → expands it and focuses first child.
  - On expanded parent or leaf → moves to next sibling.
- **ArrowLeft**:
  - On expanded parent → collapses it.
  - On leaf or collapsed → moves focus to parent (or stays).
- **Home / End**: First / last visible item.
- **Enter / Space**: Selects the focused item (respects selection mode).
- After expand/collapse, roving tabindex and focus are automatically repaired in `updateComplete`.

The `_handleKeydown` + `_updateRovingTabindex` + `_getVisibleItems` (which walks up parent chain checking `expanded`) deliver excellent hierarchical navigation — the "improved roving focus" pattern shared with tab-group and menu.

## ARIA Roles & Accessibility

- Root list: `role="tree"`
- Items: `role="treeitem"` with:
  - `aria-expanded="true/false"` (only when `hasChildren`)
  - `aria-selected="true/false"`
- Children container: `role="group"`
- Proper `tabindex` roving (only one visible item at `0`)
- Disabled items filtered from navigation and selection
- Full phosphor focus-visible glow rings on the treeitem surface
- High-contrast mode support via `focusVisibleStyles`

## Slots & Children

- Default slot: Top-level `<thx-tree-item>` elements.
- Each `thx-tree-item` may contain nested items via the `children` named slot (auto-assigned by the item’s `_setupChildren` logic).

Levels are automatically incremented (`level="1"`, `"2"`, etc.) and drive left padding.

## Variants & Selection Modes

### CRT Variant

```html
<thx-tree label="FACILITY GRAPH" variant="crt" selection="single">
  ...
</thx-tree>
```

Dark background, static CRT scanline overlay, tertiary glows on selected/expanded states, and a floating `TREE-01` label in the corner.

### Selection Modes

- `selection="single"`: Only one item selectable at a time (classic tree nav). Header suffix shows `// SINGLE SELECT`.
- `selection="multiple"`: Independent toggling. Header shows `// MULTI SELECT`.
- `selection="none"`: Pure expansion/display (no selection styling or state).

Selected items receive:
- Primary blue background (light theme) or translucent phosphor (CRT)
- Left 3px selection bar (avoids icon collision)
- In CRT: tertiary text + glow

## Practical Examples

### Facility Graph (from ultradashboard)

```html
<thx-tree label="FACILITY GRAPH" selection="single" variant="compact">
  <thx-tree-item value="central" type="system" expanded selected>
    CENTRAL CORE
    <thx-tree-item slot="children" value="sector-7g" type="sector" expanded>
      SECTOR 7-G
      <thx-tree-item slot="children" value="unit-1138" type="unit" status="normal">UNIT 1138</thx-tree-item>
      <thx-tree-item slot="children" value="unit-3417" type="unit" status="warning">UNIT 3417</thx-tree-item>
    </thx-tree-item>
    <thx-tree-item slot="children" value="sector-9k" type="sector" status="error">SECTOR 9-K</thx-tree-item>
  </thx-tree-item>
</thx-tree>
```

### Controlled Tree with Events

```html
<thx-tree id="nav-tree" selection="single" @select="onTreeSelect">
  ...
</thx-tree>

<script>
  function onTreeSelect(e) {
    const { value, selected, item } = e.detail;
    if (selected) {
      console.log('Navigating to sector', value);
      // load panel content, update URL, etc.
    }
  }
</script>
```

Use `item.expanded = true` or call `expandAll()` from toolbar buttons.

## Type Icons & Status

Built-in glyphs (folder ▦, file ▪, sector ▣, unit ●, system ◈). Status dots in the label row: active (primary glow), warning (amber), error (red).

## Composition

Excellent as a sidebar navigator alongside `<thx-menu>`, or nested inside `<thx-tab-panel>` or `<thx-card>`.

The tree fully implements the THX focus contract (`focus()`, `blur()`) and participates in the roving focus system.

**Related components**: [thx-tree-item](./thx-tree-item.md), [thx-menu](./thx-menu.md), [thx-tab-group](./thx-tab-group.md)