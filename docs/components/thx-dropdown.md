# thx-dropdown

**THX 1138 styled dropdown menu component.**

A compact clinical command surface that presents a dark CRT-styled menu panel on trigger activation. Features a mono uppercase trigger button with rotating caret, optional header label inside the menu, item selection state with chevron, and support for both declarative `items` data and slotted children. Delivers the sterile, operational aesthetic of THX-1138: dark monitor-like menu with phosphor text, subtle static scanlines, and precise hover/selection states. Recent improvements include CRT effects extraction and clean outside-click + keyboard dismissal.

## Import

```js
import 'thx-components/src/components/thx-dropdown.js';
// or
import 'thx-components';
```

## Basic Usage (Declarative Items)

```html
<thx-dropdown
  id="mode-dropdown"
  label="MODE"
  header-label="SURVEILLANCE MODE"
></thx-dropdown>

<script type="module">
  document.getElementById('mode-dropdown').items = [
    { value: 'observe', label: 'OBSERVE' },
    { value: 'intercept', label: 'INTERCEPT' },
    { value: 'isolate', label: 'ISOLATE', variant: 'warning' },
    { value: 'purge', label: 'PURGE', variant: 'error' },
  ];
</script>
```

## Advanced Usage

### Programmatic Selection & Events

```js
const dd = document.getElementById('mode-dropdown');
dd.select('intercept');

dd.addEventListener('select', (e) => {
  console.log('Selected value:', e.detail.value, 'item:', e.detail.item);
});
dd.addEventListener('toggle', () => { /* open/close */ });
```

Methods: `show()`, `hide()`, `toggle()`, `select(value)`.

### Placement Variants

```html
<thx-dropdown placement="bottom" ...></thx-dropdown> <!-- default -->
<thx-dropdown placement="top" ...></thx-dropdown>
<thx-dropdown placement="left" ...></thx-dropdown>
<thx-dropdown placement="right" ...></thx-dropdown>
```

### Disabled State

```html
<thx-dropdown disabled label="LOCKED" header-label="RESTRICTED"></thx-dropdown>
```

### Using Slotted Content (Custom Items)

The default slot inside the menu accepts any content. For simple cases you can provide raw items via the `items` array (recommended). For advanced markup, slot children that receive the `dropdown-item` styling context or use `<thx-menu>` / `<thx-menu-item>` for richer command lists (see related docs).

```html
<thx-dropdown label="ACTIONS" header-label="PROTOCOLS">
  <div class="dropdown-item" data-value="scan">RUN SECTOR SCAN</div>
  <div class="dropdown-item warning" data-value="warn">EMERGENCY STOP</div>
</thx-dropdown>
```

(Note: when using custom slotted children, selection state and `value` syncing must be managed manually or via the `select` event.)

### Integration Pattern

Commonly paired with `thx-button` (external) or used standalone as a mode/status selector in command bars. See ultradashboard for live surveillance mode example.

## Properties / Attributes

| Attribute     | Type                                      | Default       | Description |
|---------------|-------------------------------------------|---------------|-------------|
| `open`        | `boolean` (reflects)                      | `false`       | Menu visibility. |
| `value`       | `string`                                  | `undefined`   | Currently selected item value (drives selected styling and display label). |
| `placement`   | `'bottom' \| 'top' \| 'left' \| 'right'`  | `'bottom'`    | Menu flyout direction relative to trigger. |
| `label`       | `string`                                  | `'SELECT...'` | Text shown on the trigger button when no value is selected. |
| `header-label`| `string`                                  | `'OPTIONS'`   | Optional uppercase header inside the menu (rendered as `// HEADER //`). Empty string hides it. |
| `disabled`    | `boolean` (reflects)                      | `false`       | Disables trigger and menu interaction. |
| `items`       | `Array<{value: string, label: string, disabled?: boolean, variant?: 'default'\|'warning'\|'error'}>` | `[]` | Declarative data source. When present, renders styled option rows. |

## Slots

| Slot     | Description |
|----------|-------------|
| (default) | Content inside the CRT menu panel. When `items` is empty, slotted elements (or generated rows) appear here. Supports custom `dropdown-item` styled divs or other controls. |

## Events

| Event   | Detail                              | Description |
|---------|-------------------------------------|-------------|
| `toggle`| (none)                              | Fired on open/close via methods or trigger click. Bubbles, composed. |
| `select`| `{ value: string, item: object }`   | Fired when an item (from `items` array) is chosen. `select()` method also emits it. Bubbles, composed. |

## Variants

- **placement**: Four cardinal directions for the menu panel.
- **items variants**: Individual items can use `variant: 'warning'` (amber) or `'error'` (critical orange) for status signaling.
- **selected state**: Active item shows `>` prefix and hotter phosphor text (`#DEFFFF`).
- **CRT menu surface**: Dark `#111` background with thick `#2A2A2A` border, box shadow, and `crtStaticScanlineOverlay` (extracted from `crt-effects.js`).
- **Trigger states**: Default light button; open state inverts to dark CRT with phosphor text and 180° caret rotation. Hover promotes border/glow.
- **Header**: Optional `// HEADER //` divider label in muted secondary phosphor.

## Accessibility

- Trigger is a native `<button>` with `aria-haspopup="listbox"` and `aria-expanded`.
- Menu panel uses `role="listbox"` with `aria-label` from header-label.
- Generated items use `role="option"` + `aria-selected`.
- Focus management: clicking outside or Escape (via document listener) closes the menu.
- Focus-visible styles apply to the trigger (`.trigger` / `.dropdown-trigger` covered by shared mixin selectors) and menu items.
- Keyboard: Trigger is fully keyboard accessible (Enter/Space opens, arrows may be handled by slotted children). Tab moves naturally; outside click dismisses.
- Disabled state properly sets `disabled` attribute and reduces opacity.
- Recommended: Keep labels short, uppercase, machine-flavored ("OBSERVE", "ISOLATE"). Use `header-label` for context ("SURVEILLANCE MODE").

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md) (navigation, buttons, CRT displays).

- **Trigger button**: Square industrial control — mono uppercase, wide tracking, height matching other 40px controls. Caret (▼) rotates on open. Open state adopts full CRT dark surface for visual continuity with the menu.
- **Menu panel**: Recessed monitor aesthetic — deep background, thick border, soft shadow. Static scanlines (via centralized `crt-effects`) give texture without animation overload. Max-height scroll for long lists.
- **Item treatment**: Phosphor text on dark, generous padding, hover background wash (blue or status tint). Selected state adds chevron prefix and tertiary highlight. Warning/error items receive appropriate chromatic accents while staying within the narrow palette.
- **CRT extraction**: `crtStaticScanlineOverlay('.dropdown-menu')` ensures the dropdown menu shares the same subtle phosphor line treatment as dialog, drawer, and popup.
- **Typography contract**: All text is strictly `Courier New` mono, uppercase, letter-spaced. Header uses smaller tracking and muted color.
- **Clinical voice**: "SELECT...", "OPTIONS", "NO DATA AVAILABLE" (empty state). Never friendly marketing language.
- **No decorative excess**: The component is self-contained and inline-block. Pairs naturally with command bars, toolbars, or next to `thx-icon-button`.

Dropdown serves as a lightweight mode or action selector. For richer vertical command lists, combine with `<thx-menu>` and `<thx-menu-item>` (see those docs). Related: [thx-popup](./thx-popup.md) for tooltip-style popovers.
