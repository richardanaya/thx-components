# thx-copy-button

**THX 1138 styled copy-to-clipboard button.**

A specialized action button that copies a provided string value to the system clipboard with immediate visual confirmation. Maintains the austere THX-1138 control-room language: uppercase mono labels ("COPY", "COPIED"), square geometry, and status-aware spinner during async clipboard write. On success, the button briefly transforms (dark fill + checkmark + custom success text) before returning to idle. Emits `copy` and `error` events for integration with surrounding UI state.

## Import

```js
import 'thx-components/src/components/thx-copy-button.js';
import 'thx-components'; // barrel also works
```

## Basic Usage

```html
<thx-copy-button value="THX-1138-SECTOR-07"></thx-copy-button>
<thx-copy-button value="LDS-77-CLASSIFIED" variant="secondary" copy-text="COPY TOKEN"></thx-copy-button>
```

## Advanced Usage

### Custom Labels and Duration

```html
<thx-copy-button 
  value="REPORT-1138-2026-05-14" 
  copy-text="COPY ID" 
  success-text="COPIED TO CLIPBOARD" 
  feedback-duration="1500">
</thx-copy-button>
```

### With Other Components

```html
<div class="control-row">
  <thx-input value="A6C8E1-PHOSPHOR-KEY"></thx-input>
  <thx-copy-button value="A6C8E1-PHOSPHOR-KEY" variant="ghost"></thx-copy-button>
</div>

<!-- In forms or command panels -->
<thx-button type="submit" variant="primary">COMMIT</thx-button>
<thx-copy-button value="BATCH-0420-EXECUTED" variant="secondary"></thx-copy-button>
<thx-tag>PENDING</thx-tag>
```

### Error Handling via Events

```html
<thx-copy-button 
  id="secure-copy" 
  value="SENSITIVE-TOKEN-1138"
  @copy=${handleCopySuccess}
  @error=${handleCopyError}>
</thx-copy-button>
```

```js
function handleCopySuccess() {
  console.log('Clipboard write succeeded — value is now in system buffer.');
}
function handleCopyError(e) {
  console.error('Clipboard access denied or unavailable.');
}
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `string` | `''` | The text content written to `navigator.clipboard.writeText()`. Required for operation. |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual treatment (warning/error not exposed as copy actions are typically neutral or secondary). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Matches `thx-button` sizing. |
| `disabled` | `boolean` | `false` | Prevents copy action. |
| `loading` | `boolean` | `false` | (Internal during clipboard operation) Shows `thx-spinner`. Can be observed but rarely set manually. |
| `successText` | `string` | `'COPIED'` | Label shown during the brief success feedback state. |
| `copyText` | `string` | `'COPY'` | Default idle label. |
| `feedbackDuration` | `number` (ms) | `2000` | How long the success state (dark background + check + successText) persists before reset. |

## Slots

None. Content is fully controlled by the component (icon + label). The label toggles between `copyText` and `successText`.

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `copy` | (no detail) | Fired after successful `navigator.clipboard.writeText(value)`. Bubbles, composed. |
| `error` | (no detail) | Fired when clipboard write fails (permission denied, insecure context, etc.). Bubbles, composed. |

The internal implementation also sets internal `_showSuccess` state for  the feedback window.

## Variants

- **primary**: Standard phosphor blue copy affordance.
- **secondary**: Muted phosphor for secondary actions in dense panels.
- **ghost**: Minimal until hover; useful next to inputs or within text flows.
- **size-sm/md/lg**: Consistent with sibling button components.
- **loading** (transient): Spinner appears only while `navigator.clipboard` promise is pending.
- **success** (transient,  `feedbackDuration`): Dark fill (`#333`), white text, checkmark SVG, `successText`.

## Accessibility

- Uses native `<button>` with dynamic `title` ("Copy to clipboard" / "Copied!").
- `aria-busy` during the clipboard write operation.
- Keyboard fully supported.
- Success state is visual + label change; screen readers will announce the updated button text.
- In secure or restricted environments (e.g., some iframes), the `error` event allows fallback UI (e.g., manual select + instruct user to press Ctrl+C).
- Recommended pattern: Place immediately adjacent to the value being copied (e.g., after a read-only identifier display) so the association is obvious.

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#buttons) and [Badges, Tags, And Pills](../../DESIGN.md#badges-tags-and-pills).

- **Clipboard UX**: Success state uses dark institutional fill (`neutral-800`) with inverted text to create strong "task completed" signal without using success green (the palette reserves chromatic color strictly for status semantics).
- **Icons**: Inline SVG copy icon (two overlapping squares) and checkmark polyline. Stroke-based, currentColor, perfectly scaled.
- **Feedback timing**: 2s default is long enough for user to register success yet short enough not to leave stale UI. Configurable for longer review needs.
- **Loading improvement**: Uses the same `<thx-spinner size="sm" variant="crt|...">` pattern introduced across the button family for coherent async affordance.
- **Mono uppercase contract**: Both `copyText` and `successText` are rendered in the component's built-in uppercase mono style. Pass uppercase strings for best visual match ("COPY ID", "ARCHIVED").
- **Clinical precision**: Designed for copying machine identifiers, sector codes, batch tokens, and cryptographic material — never casual user strings. The component feels like part of the instrumentation, not a "share" widget.
- **Error resilience**: Gracefully handles environments without clipboard API; developers should listen to `error` to surface fallback instructions.

The copy button participates in the same focus, hover, and active mechanical language as `thx-button` and `thx-icon-button`.
