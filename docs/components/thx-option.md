# thx-option

**THX 1138 styled option element for select controls.**

A lightweight, non-visual (by default) option component intended for use inside `<thx-select>` and `<thx-multi-select>`. Provides `value`, `label`, `selected`, and `disabled` state that the parent select reads to build its dropdown and trigger display. The element itself is `display:none` unless selected in certain contexts (primarily internal coordination).

## Import

```js
import 'thx-components/src/components/thx-option.js';
import 'thx-components';
```

## Basic Usage (inside a select)

```html
<thx-select label="PRIORITY">
  <thx-option value="low">LOW</thx-option>
  <thx-option value="normal" selected>NORMAL</thx-option>
  <thx-option value="high" disabled>HIGH</thx-option>
</thx-select>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `string` | `''` | The value submitted with the form / returned by the parent select. |
| `label` | `string` | `''` | Optional explicit label text. Falls back to trimmed textContent or `value`. |
| `selected` | `boolean` (reflects) | `false` | Marks the option as currently chosen. |
| `disabled` | `boolean` (reflects) | `false` | Prevents selection in the parent control. |

## Slots

- default: The visible label text for the option (read by parent).

## Methods / Getters

- `displayLabel` — computed getter returning the best available label string.

## Design Notes

- This component is primarily an internal primitive for the form-associated select family.
- It participates in the form value by being read by the parent `<thx-select>` or `<thx-multi-select>`.
- When used standalone it has almost no visual presence (intentionally hidden).
- Authors normally declare options declaratively inside the select rather than manipulating `thx-option` directly via script.

## Related Components

- [thx-select](./thx-select.md)
- [thx-multi-select](./thx-multi-select.md)
- [thx-radio](./thx-radio.md) / [thx-radio-group](./thx-radio-group.md) — similar option-like children
