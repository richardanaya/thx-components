# thx-menu-item

The `<thx-menu-item>` is the atomic clickable row inside a `<thx-menu>`. Supports text labels, icon slots, indicator badges, active selection state (with leading chevron), disabled state, and optional `href` (renders as anchor). All in strict control-room mono uppercase with phosphor hover and focus glows.

## Usage

```html
<thx-menu>
  <thx-menu-item active>VERIFY CREDENTIALS</thx-menu-item>
  <thx-menu-item disabled>OVERRIDE SYSTEM</thx-menu-item>
  <thx-menu-item indicator="!" href="#emergency">EMERGENCY STOP</thx-menu-item>
  <thx-menu-item>
    <thx-icon slot="icon" name="scan"></thx-icon>
    INITIATE SCAN
  </thx-menu-item>
</thx-menu>
```

## Properties / Attributes

| Attribute  | Type    | Default | Description |
|------------|---------|---------|-------------|
| `href`     | string  | —       | If present, renders as `<a>` link (still `role="menuitem"`). |
| `active`   | boolean | false   | Applies primary background + left chevron (`▸`). |
| `disabled` | boolean | false   | 40% opacity, non-interactive. |
| `variant`  | string  | 'default' | `crt` for dark phosphor styling (inherited from menu). |
| `indicator`| string  | —       | Badge text. Special handling for `"!"` (error) and strings containing `"WARN"`. |

## Slots

- `icon` (named): 16–20px icon or glyph.
- default: Primary label text (uppercased by CSS).

## Events

- `select` (bubbles, composed): Fired on click (unless disabled).
  - `detail: { href, active }`

The parent menu’s keyboard `Enter`/`Space` calls the item’s `activate()` method which programmatically clicks the inner element.

## Methods

- `focus()` / `blur()`: Target the inner `[role="menuitem"]`.
- `activate()`: Triggers the click handler (used by menu keyboard nav).

## ARIA

- `role="menuitem"` (on the `<a>` or `<div>`)
- `tabindex` managed by parent menu’s roving system (`0` for one item, `-1` for others)

## Visual States

- **Default**: Clean mono row with subtle bottom border.
- **Hover**: Primary tint background + blue text.
- **Active**: Full primary fill, dark text, leading `▸` chevron, extra left padding.
- **Disabled**: Reduced opacity.
- **Indicator**: Right-aligned pill (secondary, warning amber, or error red).
- **CRT mode**: Stronger hover glows, tertiary text on active, subtle borders.

## Keyboard Focus

Receives the library’s signature soft phosphor-blue glow ring (`box-shadow` with `--atmos-primary`) on `:focus-visible`. No outline.

## Link vs Button Semantics

- With `href`: Renders `<a href="...">` — follows normal link behavior while participating in menu ARIA and roving.
- Without `href`: Renders `<div role="menuitem">` — purely command style. Use the `select` event to handle action.

## Practical Examples

### Command Menu with Indicators

```html
<thx-menu-item indicator="LIVE" active>RUN SECTOR SCAN</thx-menu-item>
<thx-menu-item indicator="WARN">PREPARE ISOLATION</thx-menu-item>
<thx-menu-item indicator="!">PURGE SIGNAL</thx-menu-item>
```

### Icon + Label

```html
<thx-menu-item>
  <span slot="icon">▦</span>
  FACILITY MAP
</thx-menu-item>
```

### Active State in Sidebar

Set `active` on the current route item (usually managed by the consuming application on navigation).

## Composition

Always a child of `<thx-menu>`. Can be mixed with `<thx-menu-label>` for grouped command lists.

See [thx-menu](./thx-menu.md) for container behavior, keyboard model, CRT styling, and sidebar examples.

**Related**: [thx-menu-label](./thx-menu-label.md) (section headers)