# thx-tree-item

The `<thx-tree-item>` represents a single node in a `<thx-tree>`. It supports nesting, expand/collapse toggles, selection states, type icons, status indicators, and level-based indentation. Every aspect is tuned for control-room legibility: uppercase mono labels, phosphor selection, and precise visual hierarchy.

## Usage

Used as direct children (or nested via `slot="children"`) of `<thx-tree>`:

```html
<thx-tree-item value="sector-7" type="sector" expanded>
  SECTOR 7-G
  <thx-tree-item slot="children" value="u1138" type="unit" status="active">
    UNIT 1138 — NOMINAL
  </thx-tree-item>
</thx-tree-item>
```

The item auto-detects children, assigns slots, increments `level`, and inherits `variant`.

## Properties / Attributes

| Attribute      | Type      | Default   | Description |
|----------------|-----------|-----------|-------------|
| `value`        | string    | —         | Identifier for the item (returned in `select` events). |
| `expanded`     | boolean   | false     | Whether children are visible. |
| `selected`     | boolean   | false     | Whether the item is selected (controlled by selection mode on parent tree). |
| `disabled`     | boolean   | false     | Non-interactive. |
| `has-children` | boolean   | (auto)    | Reflects presence of nested items. |
| `level`        | number    | 0         | Nesting depth (auto-set by parent item; drives padding). |
| `variant`      | string    | 'default' | Inherited (`crt` for dark theme). |
| `type`         | string    | 'item'    | Visual type: `folder`, `file`, `sector`, `unit`, `system`. |
| `status`       | string    | 'normal'  | `normal`, `active`, `warning`, `error` (renders status dot). |

## Slots

- default: Label text (glyph + label rendered by component).
- `children` (named): Nested `<thx-tree-item>` elements (auto-managed).

## Events

- `toggle` (bubbles): Fired after `expanded` changes via toggle click or keyboard.
- `select` (bubbles, composed): Fired on selection change.
  - `detail: { value, selected, item: ThxTreeItem }`

## Methods

- `toggle()`: Expand/collapse if the item has children.
- `select()`: Toggle selection (respects parent `selection` mode — single-select clears siblings).
- `focus()` / `blur()`: Delegate to the internal `[role="treeitem"]` surface.

## Keyboard Handling

Primarily driven by the parent `<thx-tree>` (see its docs for full roving + expand/collapse arrows). The item itself handles local `Enter`/`Space` for selection via its own keydown listener.

## ARIA

- `role="treeitem"` on the main interactive div
- `aria-expanded` (when has children)
- `aria-selected`
- `tabindex` managed by tree (roving)
- Children list uses `role="group"`

## Visual Elements

- **Toggle chevron** (`▸`): Rotates 90° when expanded. Only shown on items with children.
- **Type glyph**: Folder/sector/etc. icons always present.
- **Selection bar**: 3px left accent on selected items (cleaner than duplicating toggle icons).
- **Status dot**: Right-aligned, color-coded with glow for active/warning/error.
- **Level padding**: Progressive left indentation (`--size-7` through `--size-10`).

## CRT Variant Styling

When `variant="crt"` (inherited):

- Secondary gray base text
- Tertiary `#DEFFFF` on hover/selected with text-shadow
- Stronger phosphor background tint on selected
- Expanded toggle receives glow

## Practical Patterns

### Status-Aware Sector Tree

```html
<thx-tree-item type="sector" status="warning" expanded>
  SECTOR 9-K — DEGRADED
  <thx-tree-item type="unit" status="error">DRONE-02</thx-tree-item>
</thx-tree-item>
```

### Dynamic Tree Construction (JS)

```js
const tree = document.querySelector('thx-tree');
const item = document.createElement('thx-tree-item');
item.value = 'new-unit';
item.type = 'unit';
item.textContent = 'UNIT 7721';
item.status = 'active';
parentItem.appendChild(item); // auto slot + level wiring on next update
```

After DOM changes, the parent tree’s visible-items logic and roving will pick up the new node on next interaction.

## Composition Notes

- Never use standalone — always inside `<thx-tree>`.
- The item’s `connectedCallback` + `firstUpdated` + slotchange handlers ensure reliable `hasChildren` and level propagation even with dynamic content.
- Works beautifully nested inside tab panels or cards for deep hierarchical control surfaces.

See [thx-tree](./thx-tree.md) for the container, keyboard model, selection modes, and public API.