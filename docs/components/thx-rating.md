# thx-rating

The `<thx-rating>` component provides a THX-1138 styled rating / score control using filled, half-filled, and empty circular indicators (not traditional stars) in phosphor blue. It supports integer or half-step precision, size variants, readonly and disabled modes, live value display, full keyboard navigation, and native form participation.

Perfect for risk scores, quality assessments, priority ratings, or any 0–N evaluation that must feel like a precise instrument dial rather than a consumer star widget.

## Import

```js
import 'thx-components/src/components/thx-rating.js';
```

Bundle:

```js
import 'thx-components/webcomponents.js';
```

## Basic Usage

```html
<thx-rating name="risk" value="3" max="5"></thx-rating>
```

With half precision and larger size:

```html
<thx-rating 
  name="quality" 
  value="3.5" 
  max="5" 
  precision="0.5" 
  size="lg">
</thx-rating>
```

Readonly display (no interaction):

```html
<thx-rating value="4" max="5" readonly></thx-rating>
```

## Properties

| Property   | Type    | Default | Description |
|------------|---------|---------|-------------|
| `value`    | number  | `0`     | Current rating (clamped 0–max, stepped by precision). |
| `max`      | number  | `5`     | Maximum number of rating circles. |
| `readonly` | boolean | `false` | Prevents user changes but still displays the value (reflected). |
| `disabled` | boolean | `false` | Completely disables interaction and reduces opacity (reflected). |
| `precision`| number  | `1`     | Step size: `1` (whole numbers) or `0.5` (halves supported). |
| `size`     | string  | `'md'`  | Visual size: `'sm'`, `'md'`, or `'lg'`. |
| `name`     | string  | `''`    | Form field name. |
| `required` | boolean | `false` | Marks as required for form validation. |

## Slots

None. The value display (`3/5` or `3.5/5`) is rendered automatically to the right of the circles.

## Events

- `change` — Dispatched after the rating value is updated by user click or keyboard. Bubbles and composed. The `value` property is already synchronized.

## Variants & Features

- **Precision modes**:
  - `precision="1"` (default): Only whole numbers. Clicking any circle sets exactly that integer value.
  - `precision="0.5"`: Clicking the left half of a circle sets the half value; right half sets the full. Visual half-fill uses a CSS gradient.
- **Size variants**:
  - `sm`: Compact  `--size-3` circles.
  - `md` (default): `--size-4` circles.
  - `lg`: `--size-6` circles — prominent for dashboards.
- **Visual states**:
  - Filled: Solid phosphor blue (`--atmos-primary`) with drop-shadow glow.
  - Half: Left half blue via linear gradient, right transparent, blue stroke.
  - Empty: Transparent fill + `--neutral-600` stroke (outline only).
- **Hover feedback**: Enabled items scale 1.1× on hover for clear affordance.
- **Value display**: Always visible formatted readout (e.g. `3.5/5`) using mono uppercase styling. Automatically adjusts decimal places based on precision.
- **Form participation (improved)**: Uses `FormAssociatedMixin` + `ElementInternals`. Submits the numeric `value` (as string) when not disabled. `form.reset()` restores the captured `_defaultValue`. Supports `required`.
- **Focus handling**: The `.rating-items` container is focusable (`tabindex`, `role="slider"`). The focus-visible mixin provides a soft phosphor glow ring on keyboard focus. Public `focus()` / `blur()` methods delegate to the container.
- **Keyboard navigation** (when focused):
  - ArrowRight / ArrowUp: Increase by `precision`.
  - ArrowLeft / ArrowDown: Decrease by `precision`.
  - Home: Set to 0.
  - End: Set to `max`.
- **Half-click logic**: Precise hit-testing on the circle's bounding rect determines left vs right half for 0.5 precision.
- **SVG rendering**: Circles are inline SVG for crisp scaling and the half-fill is achieved with a shared `<linearGradient>` definition.

## Accessibility

- Container uses `role="slider"`, `aria-valuemin="0"`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (e.g. "3.5 of 5"), `aria-disabled`, and `aria-readonly`.
- All interactive circles are inside the single focusable element (roving not needed; value changes directly).
- Focus ring (phosphor glow) appears on `:focus-visible`.
- Disabled/readonly states are announced.
- Screen readers receive the current value, max, and any name/label context from surrounding form elements.
- Click targets are the full circle areas; no tiny hit regions.

## Design Notes

`thx-rating` uses circular indicators (chosen for mechanical precision and easy half-fill rendering) while staying true to the THX square-adjacent, high-contrast language:

- **Circles vs stars**: Deliberately not star-shaped — the clean geometric circle matches the square radio/checkbox aesthetic and is easier to half-fill with gradients while remaining crisp at all sizes.
- **Phosphor accent**: Filled and half states use `--atmos-primary` (#A6C8E1) with a soft drop-shadow glow (`rgba(166,200,225,0.5)`) — the same glow language used for focus rings and active states everywhere.
- **Empty state**: Subtle outline only (no fill) keeps the resting state quiet and institutional.
- **Typography**: The value badge (`3/5`) is mono, uppercase, and right-aligned with a consistent `--size-2` gap.
- **Sizing**: Token-driven (`--size-3/4/6`) guarantees alignment with other compact controls (checkboxes, small switches, radio buttons).
- **No external icons**: Pure SVG generated in-template for zero dependency and perfect theme color inheritance.
- **Control-room feel**: The combination of glow, scale hover, and explicit numeric readout makes the component feel like a physical rotary selector or LED bar rather than a web rating widget.

## Examples

### Risk score in specialized inputs panel (ultradashboard)

```html
<thx-rating name="risk" label="RISK SCORE" value="3" max="5"></thx-rating>
```

Note: the label in the example above is rendered by the parent card/panel; the component itself shows only the circles + value text.

### Half-step quality rating (large)

```html
<thx-rating 
  name="quality" 
  value="4.0" 
  max="5" 
  precision="0.5" 
  size="lg">
</thx-rating>
```

### Readonly score display inside a results card

```html
<thx-card label="MISSION EVALUATION">
  <div style="display: flex; align-items: center; gap: var(--size-3);">
    <span class="mono-label">OVERALL RATING</span>
    <thx-rating value="4" max="5" readonly size="md"></thx-rating>
  </div>
</thx-card>
```

### Disabled rating (form locked)

```html
<thx-rating 
  name="final-score" 
  value="5" 
  max="5" 
  disabled>
</thx-rating>
```

### Interactive with change listener and form context

```html
<thx-rating id="score" name="score" value="2" max="5" precision="0.5"></thx-rating>

<script>
  const rating = document.getElementById('score');
  rating.addEventListener('change', () => {
    console.log('New rating:', rating.value);
  });
  rating.focus();
</script>
```

### Mixed with radio-group and range in a control stack

```html
<thx-radio-group name="profile" label="PROFILE" value="cold" variant="button">
  <thx-radio-button value="cold">COLD</thx-radio-button>
  <thx-radio-button value="thermal">THERMAL</thx-radio-button>
</thx-radio-group>

<thx-range label="THRESHOLD" value="65" min="0" max="100" show-ticks></thx-range>

<thx-rating name="confidence" value="4" max="5" precision="1"></thx-rating>
```

The `thx-rating` component gives LLM-generated control interfaces a precise, glowing, instrument-like rating control that feels native to the THX-1138 universe. Its circular indicators, half-precision support, keyboard-first design, and improved form participation make it ideal for any scoring or evaluation surface in a sterile dashboard or terminal. It complements `thx-range`, `thx-color-picker`, and the radio family perfectly.
