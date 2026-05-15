# thx-menu

The `<thx-menu>` component is a vertical command/navigation list styled for control-room interfaces. Monospace uppercase items, subtle separators, optional section labels, active states with chevrons, and full roving keyboard support. Use standalone as a sidebar, or inside `<thx-dropdown>` / popups for command palettes.

## Usage

```html
<thx-menu label="COMMAND ROUTES" variant="crt">
  <thx-menu-label>SECTOR COMMANDS</thx-menu-label>
  <thx-menu-item active>RUN SECTOR SCAN</thx-menu-item>
  <thx-menu-item>OPEN AUDIT TRAIL</thx-menu-item>
  <thx-menu-item indicator="!" variant="warning">PREPARE ISOLATION</thx-menu-item>
  <thx-menu-item href="#purge">PURGE SIGNAL</thx-menu-item>
</thx-menu>
```

## Properties / Attributes

| Attribute | Type     | Default | Description |
|-----------|----------|---------|-------------|
| `label`   | string   | —       | Optional header (`// LABEL //`). |
| `variant` | `'default' \| 'crt' \| 'compact'` | `'default'` | `crt` adds dark monitor surface + static scanlines + `MENU-01` corner label. `compact` removes borders. |

## Methods

- `focus()`: Focuses the first enabled menu item and establishes roving tabindex.
- `blur()`: Removes focus from any descendant.

## Keyboard Behavior (Roving Focus)

Implements the same improved roving tabindex pattern as `thx-tab-group` and `thx-tree`:

- Single tab stop for the entire menu.
- `ArrowDown` / `ArrowUp`: Move between enabled items (wraps with `getNextRovingIndex`).
- `Home` / `End`: First / last item.
- `Enter` / `Space`: Activates the focused item (calls `activate()` which triggers click / `select` event).
- Robust current-item detection that works across shadow DOM boundaries.

Only enabled (non-disabled) items participate in navigation.

## ARIA Roles & Accessibility

- List container: `role="menu"`
- Items: `role="menuitem"` (or anchor with role when `href` is present)
- Full `focus-visible` phosphor-blue glow rings
- Disabled items receive `tabindex="-1"` and are skipped
- High-contrast forced-colors support

## Slots

- default: `<thx-menu-item>` and `<thx-menu-label>` children.

## Variants

### CRT Variant

Dark theme with scanline overlay, floating `MENU-01` identifier, stronger phosphor hover/selection states.

### Compact

Borderless for embedding inside cards or tight side panels.

## Practical Examples

### Sidebar Navigation (ultradashboard style)

```html
<thx-menu label="COMMAND ROUTES" variant="crt">
  <thx-menu-label>SECTOR COMMANDS</thx-menu-label>
  <thx-menu-item active>Run sector scan</thx-menu-item>
  <thx-menu-item>Open audit trail</thx-menu-item>
  <thx-menu-item indicator="WARN">Prepare isolation</thx-menu-item>
  <thx-menu-item indicator="!">Purge unauthorized signal</thx-menu-item>
</thx-menu>
```

### Menu Inside Dropdown (command palette)

```html
<thx-dropdown>
  <thx-button slot="trigger" caret>OPTIONS</thx-button>
  <thx-menu>
    <thx-menu-item>MONITOR</thx-menu-item>
    <thx-menu-item>OBSERVE</thx-menu-item>
    <thx-menu-item variant="warning">EMERGENCY STOP</thx-menu-item>
  </thx-menu>
</thx-dropdown>
```

### Link Menu Items

```html
<thx-menu-item href="/systems/1138">SYSTEM 1138 STATUS</thx-menu-item>
```

When `href` is provided the item renders as an `<a role="menuitem">`.

## Events (via children)

Menu items dispatch `select` events (see [thx-menu-item](./thx-menu-item.md)). Listen at menu level with event delegation if needed.

## Composition

- Pair with `<thx-menu-label>` for section dividers (`// SECTION //` styling).
- Works inside any popup, drawer, or card.
- Excellent companion to `<thx-tree>` for mixed flat vs hierarchical nav.
- All items support icon slots and indicator badges.

The component follows the THX focus contract and shares the roving focus infrastructure (`getNextRovingIndex` + `_updateRovingTabindex`).

**Related components**: [thx-menu-item](./thx-menu-item.md), [thx-menu-label](./thx-menu-label.md) (auxiliary), [thx-dropdown](./thx-dropdown.md), [thx-tree](./thx-tree.md)