# thx-color-picker

The `<thx-color-picker>` component delivers a compact, THX-1138-styled color selector consisting of a large square swatch (clicking opens the native color picker), an uppercase hex value display, and a curated 4×4 grid of preset colors drawn from the official THX palette (primary phosphor blue, warning amber, error orange-red, neutrals, and CRT blacks).

It is ideal for theme tint selection, phosphor accent customization, status color configuration, or any design-system-aware color choice inside control-room interfaces.

## Import

```js
import 'thx-components/src/components/thx-color-picker.js';
```

Bundle import:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-color-picker label="PHOSPHOR TINT"></thx-color-picker>
```

With explicit initial value and form name:

```html
<thx-color-picker 
  name="accent" 
  label="ACCENT COLOR" 
  value="#d4aa00">
</thx-color-picker>
```

## Properties

| Property   | Type    | Default     | Description |
|------------|---------|-------------|-------------|
| `value`    | string  | `'#a6c8e1'` | Current color as hex string (always uppercase in display). |
| `disabled` | boolean | `false`     | Disables the swatch and presets (reflected). |
| `label`    | string  | `'COLOR'`   | Uppercase mono label shown above the control. |
| `name`     | string  | `''`        | Form field name for submission. |
| `required` | boolean | `false`     | Marks the field required for form validation. |

## Slots

None. The component is self-contained with a fixed preset grid.

## Events

- `change` — Dispatched after the color is updated via the native picker or by clicking any preset swatch. Bubbles and composed. The `value` property is already updated.

## Variants & Features

- **Swatch + native picker**: The large square color swatch (`--size-7` + padding) shows the current color. A hidden `<input type="color">` covers the swatch area; clicking anywhere on the swatch opens the browser's native color dialog. The preview updates live.
- **Uppercase hex readout**: Always-visible mono display showing the hex value in uppercase (e.g. `#A6C8E1`) with a bottom-border treatment that matches other THX inputs.
- **Preset grid**: 16 carefully chosen colors from the THX design tokens:
  - Primary operational: `#a6c8e1`, `#707e91`, `#deffff`
  - Warning / Critical: `#d4aa00`, `#d44000`
  - Neutrals and surfaces: `#333333`, `#666666`, `#fafafa`, `#e0e0e0`, `#cccccc`
  - CRT depths: `#111111`, `#0a0a0a`, `#000000`, `#444444`, `#999999`, `#ffffff`
- **Active preset indication**: The currently selected preset receives a phosphor-blue border + subtle box-shadow ring.
- **Hover states**: Presets brighten their border on hover. Swatch border is consistent with other form controls.
- **Form participation (improved)**: Full support via `FormAssociatedMixin` and `ElementInternals`. The hex `value` is submitted under `name` when not disabled. `form.reset()` restores the initial `_defaultValue` (defaults to phosphor blue). The native color input is used only for the picker UI; form value comes from the custom element's internals.
- **Focus handling**: The swatch container receives focus styling. The focus-visible mixin supplies a phosphor glow ring on keyboard focus of the swatch area. Presets are individually focusable with the same glow treatment.
- **Preset click**: Clicking any preset instantly sets the value, updates the swatch and display, and fires `change` — no dialog required for the curated THX palette.
- **Disabled state**: Swatch, input, display, and all presets receive reduced opacity and `not-allowed` cursor.

## Accessibility

- The swatch area contains the native color input (accessible via keyboard when focused).
- Each preset swatch is a clickable `div` with `title` attribute showing the uppercase hex for tooltip and screen-reader context.
- Focus rings (phosphor glow) appear on the main swatch and on individual preset swatches via the shared focus-visible styles.
- `aria-disabled` semantics are conveyed through styling and the `disabled` property.
- Screen readers announce the label, current hex value (via text content), and can interact with the native color input.
- All interactive regions have adequate hit targets (presets are `--size-5`).

## Design Notes

`thx-color-picker` is the color-selection expression of the THX design system:

- **Palette discipline**: The 16 presets are not arbitrary — they are the exact tokens defined in DESIGN.md and used throughout the library (primary, secondary, warning, error, surface, CRT). This guarantees any color chosen will feel native to the aesthetic.
- **Geometry**: Strict square swatch and square preset tiles. No border-radius. The swatch uses a 2px neutral border exactly like checkboxes and radios.
- **Typography**: Label and hex display use Courier New, uppercase, with the signature letter-spacing of the system. The hex value sits on a light surface with a bottom border, echoing the underline style of `thx-input`.
- **Phosphor emphasis**: The active preset highlight uses `--atmos-primary` border and glow — the same accent used for selected radio-buttons, switch tracks, and rating fills.
- **Live preview**: The swatch itself is the live preview; the hex text provides the machine-readable code. Both update instantly on any change.
- **No custom color wheel**: By delegating the free-form picker to the native `<input type="color">` while providing a strong curated preset grid, the component stays lightweight and guarantees THX-correct colors without reinventing color theory UI.
- **Placement**: Lives naturally in "SPECIALIZED INPUTS" panels alongside `thx-rating`, `thx-range`, and button-style radio groups.

## Examples

### Phosphor tint selector (ultradashboard)

```html
<thx-color-picker id="accent-picker" label="PHOSPHOR TINT"></thx-color-picker>
```

### Warning accent configuration with form submission

```html
<form>
  <thx-color-picker 
    name="warning-color" 
    label="WARNING ACCENT" 
    value="#d4aa00">
  </thx-color-picker>
  <thx-button type="submit">APPLY THEME</thx-button>
</form>
```

### Full preset exploration (all THX colors available)

The component always renders the complete 16-color grid. Authors can rely on it to surface every operational, warning, and surface color defined by the system.

### Disabled picker in a locked configuration panel

```html
<thx-color-picker 
  label="LOCKED THEME" 
  value="#a6c8e1" 
  disabled>
</thx-color-picker>
```

### Programmatic color change and event handling

```js
const picker = document.querySelector('thx-color-picker[label="PHOSPHOR TINT"]');
picker.value = '#d44000';           // updates swatch + hex + form value
picker.addEventListener('change', () => {
  console.log('New accent:', picker.value);
  // e.g. apply to CSS custom property or chart series
  document.documentElement.style.setProperty('--custom-accent', picker.value);
});
picker.focus();
```

### Complete specialized inputs section (ultradashboard style)

```html
<aside class="panel control-stack">
  <div class="panel-label">// SPECIALIZED INPUTS</div>
  
  <thx-color-picker label="PHOSPHOR TINT"></thx-color-picker>
  
  <thx-rating name="risk" value="3" max="5"></thx-rating>
  
  <thx-radio-group label="DISPLAY PROFILE" value="cold" variant="button">
    <thx-radio-button value="cold">COLD</thx-radio-button>
    <thx-radio-button value="scope">SCOPE</thx-radio-button>
    <thx-radio-button value="black">BLACK</thx-radio-button>
  </thx-radio-group>
  
  <thx-range label="SCAN SPEED" value="42" min="0" max="100" show-ticks></thx-range>
</aside>
```

The `<thx-color-picker>` gives any THX interface a first-class, palette-aware color control that feels like part of the instrumentation rather than an afterthought. Its curated presets, live hex display, square aesthetic, and improved form participation make it the perfect companion for `thx-rating`, `thx-range`, and the radio family in control-room dashboards and configuration terminals.
