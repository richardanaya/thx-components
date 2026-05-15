# Form Controls

The form control components of THX 1138 transform the sterile institutional aesthetic into precise data-entry instrumentation. In the world of THX-1138, operators do not "fill out forms" — they adjust parameters on dedicated consoles using controls that feel like physical dials, switches, and keypads rendered in software. Every label is uppercase monospace, every interaction produces phosphor feedback, and every value participates natively in the host form without framework ceremony.

These components are engineered for dense, high-information control panels where vertical rhythm, keyboard efficiency, and unambiguous state signaling are paramount. The entire suite is built atop the `FormAssociatedMixin`, ensuring zero-drift compatibility with native HTML forms, validation, and submission.

## Components

- [thx-input](components/thx-input.md) — Clinical single-line text entry with uppercase mono label, bottom-border underline, phosphor-blue focus glow, optional prefix/suffix adornments, password visibility toggle, and full FormAssociatedMixin participation.
- [thx-textarea](components/thx-textarea.md) — Multi-line text field supporting autoresize, live character counting, uppercase or sentence-case modes, error/help status rows, and native form behavior for logs, directives, and extended notes.
- [thx-select](components/thx-select.md) — Custom dropdown selector using `<thx-option>` children, with trigger button, full keyboard navigation (arrows, Home/End), ARIA, and precise square control-room styling.
- [thx-multi-select](components/thx-multi-select.md) — Multi-choice dropdown variant supporting array values, checkbox indicators in the list, count badges on the trigger, and repeated FormData entries on native submission.
- [thx-option](components/thx-option.md) — Lightweight, non-visual option element intended exclusively for `<thx-select>` and `<thx-multi-select>`; supplies `value`, `label`, `selected`, and `disabled` state to the parent control.
- [thx-checkbox](components/thx-checkbox.md) — Square custom boolean toggle with dark fill + white geometric indicator, indeterminate state support, and flexible label slot for compact inline flags.
- [thx-switch](components/thx-switch.md) — Sliding on/off toggle featuring a phosphor-blue active track, explicit "ON"/"OFF" state labels, three sizes, and unmistakable visual state for power and mode controls.
- [thx-radio](components/thx-radio.md) — Minimalist square (or rounded variant) radio button with centered dark fill indicator; designed for use inside `<thx-radio-group>` for mutual exclusivity and roving keyboard navigation.
- [thx-radio-button](components/thx-radio-button.md) — Bold segmented button-style radio variant for horizontal or pill-style exclusive choice groups.
- [thx-radio-group](components/thx-radio-group.md) — Authoritative container and state manager for radio selections; provides optional label, vertical/horizontal orientation, arrow-key roving navigation, and full form participation.
- [thx-range](components/thx-range.md) — Fully styled numeric slider with always-visible current-value badge, optional tick marks, min/max/step support, and immediate visual feedback for continuous parameter tuning.
- [thx-rating](components/thx-rating.md) — Precision instrument rating control using filled/half-filled circular phosphor indicators (not consumer stars); supports half-step precision, keyboard navigation, readonly mode, and native form submission.
- [thx-color-picker](components/thx-color-picker.md) — Compact swatch + uppercase hex readout + curated 4×4 preset grid drawn from the official THX palette, with native color picker fallback and complete form integration.

## Recipes

### Building a Dense Monitoring Form

A typical operator console for sector configuration combines text, selection, range, radio, switch, and checkbox controls inside a single labeled card. Status rows align automatically thanks to disciplined help-text spacing.

```html
<thx-card label="SECTOR 07 — MONITORING PARAMETERS">
  <thx-input 
    label="DESIGNATION" 
    name="designation" 
    value="THX-1138" 
    required>
    <span slot="prefix">ID</span>
    <span slot="help-text">Primary operator identifier.</span>
  </thx-input>

  <thx-select label="CLEARANCE LEVEL" name="clearance">
    <thx-option value="alpha" label="ALPHA"></thx-option>
    <thx-option value="beta" label="BETA" selected></thx-option>
    <thx-option value="gamma" label="GAMMA"></thx-option>
  </thx-select>

  <thx-range 
    label="SENSITIVITY" 
    name="sensitivity" 
    min="0" 
    max="100" 
    value="65" 
    show-ticks>
  </thx-range>

  <thx-radio-group label="PROTOCOL" name="protocol" value="standard">
    <thx-radio value="standard">STANDARD</thx-radio>
    <thx-radio value="enhanced">ENHANCED</thx-radio>
    <thx-radio value="silent">SILENT</thx-radio>
  </thx-radio-group>

  <thx-switch label="LIVE TELEMETRY" name="telemetry" checked></thx-switch>

  <thx-checkbox name="audit" checked>ENABLE AUDIT LOG</thx-checkbox>
</thx-card>
```

Submit the containing `<form>` and all values (including array data from multi-select and checked states) are delivered via standard FormData.

### Parameter Tuning Console with Specialized Controls

For visual and quantitative calibration inside a dark CRT instrument housing.

```html
<thx-crt-display label="VISUAL CALIBRATION CONSOLE">
  <thx-range label="CONTRAST" name="contrast" value="80" min="0" max="100"></thx-range>
  <thx-rating 
    label="CONFIDENCE SCORE" 
    name="confidence" 
    value="4.5" 
    precision="0.5" 
    max="5">
  </thx-rating>
  <thx-color-picker 
    label="PHOSPHOR TINT" 
    name="tint" 
    value="#A6C8E1">
  </thx-color-picker>
</thx-crt-display>
```

### Multi-Select Asset Filter with Validation

Ideal for filtering archived footage, active drones, or command targets.

```html
<thx-multi-select 
  label="ACTIVE ASSETS" 
  name="assets" 
  value='["cam-03","drone-07"]' 
  required>
  <thx-option value="cam-03" label="CAM-03 — NORTH PERIMETER"></thx-option>
  <thx-option value="drone-07" label="DRONE-07 — RECON"></thx-option>
  <thx-option value="sensor-12" label="SENSOR-12 — THERMAL"></thx-option>
</thx-multi-select>
```

## Cross-Cutting Improvements

- **FormAssociatedMixin**: All primary form controls (input, textarea, select family, checkbox, switch, radio family, range, rating, color-picker) inherit from the shared `FormAssociatedMixin`. This supplies `static formAssociated = true`, `ElementInternals`, automatic value syncing, `formResetCallback`, `checkValidity()`, `reportValidity()`, and correct omission of disabled values. LLM-authored dense panels therefore submit correctly to any backend with zero additional wiring.

- **Focus Management & Roving Patterns**: Every control implements the THX focus contract (`focus()` / `blur()` public methods) and receives consistent high-contrast phosphor-blue glow rings via the `focusVisibleStyles` mixin. Radio-group and range provide arrow-key fine control; all respect `prefers-reduced-motion`.

- **Status Row Discipline & Vertical Rhythm**: The `help-text` and `errorMessage` rows only occupy vertical space when populated. This guarantees pixel-perfect alignment when mixing `thx-input`, `thx-select`, `thx-range`, and `thx-radio-group` in the same card or panel — essential for clinical density.

- **CRT Context Compatibility**: Form controls render cleanly inside `<thx-crt-display>` or `[crt]`-variant cards and split-panels. Focus rings and active states remain fully visible against dark backgrounds. No special attributes are required on the controls themselves.

These components form the bedrock of any THX-1138 command interface. Place them inside `<thx-card>` or `<thx-crt-display>` elements; wrap the group in a native `<form>` when submission is required.

---

*Category overview for THX Components form instrumentation. Generated to support both human operators and LLM authoring of dense control surfaces.*