# thx-icon-button

**THX 1138 styled icon button component.**

A compact, square (or optionally shaped) icon-only control for toolbars, headers, and dense instrumentation panels. Maintains the clinical dystopian THX-1138 aesthetic: monospace-adjacent icon rendering, phosphor glow reserved for primary states, optional CRT scanline overlays, and pulse animation for live/attention states. Ideal for iconographic commands (menu, close, refresh, drawer toggle) where space is at a premium but operational clarity is mandatory.

## Import

```js
import 'thx-components/src/components/thx-icon-button.js';
// Barrel import also registers it
import 'thx-components';
```

## Basic Usage

```html
<thx-icon-button icon="▤" label="Open menu"></thx-icon-button>
<thx-icon-button icon="✕" label="Close panel" variant="ghost"></thx-icon-button>
```

The default icon is a centered dot (`◉`) if no content or `icon` is provided. Prefer explicit geometric symbols or `<thx-icon>` content via slot.

## Advanced Usage

### Variants, Sizes, and Shapes

```html
<thx-icon-button icon="◉" variant="primary" size="md"></thx-icon-button>
<thx-icon-button icon="⚠" variant="warning" size="lg"></thx-icon-button>
<thx-icon-button icon="✕" variant="error" size="sm"></thx-icon-button>
<thx-icon-button icon="↻" variant="secondary" shape="circle"></thx-icon-button>
<thx-icon-button icon="≡" variant="ghost" shape="rounded"></thx-icon-button>
```

### Pulse and CRT Scanlines

Pulse provides a gentle phosphor breathing glow for live status or attention affordance. Scanlines add a subtle static CRT monitor texture.

```html
<thx-icon-button icon="◉" pulse label="Live telemetry"></thx-icon-button>
<thx-icon-button icon="▤" scanlines variant="primary" label="CRT menu"></thx-icon-button>
<thx-icon-button icon="⚠" pulse variant="warning" scanlines></thx-icon-button>
```

### Loading State

Uses `<thx-spinner>` (size="sm") with variant auto-mapped (crt / warning / error).

```html
<thx-icon-button icon="↻" loading label="Refreshing data"></thx-icon-button>
<thx-icon-button variant="error" loading icon="■"></thx-icon-button>
```

### Icon via Slot (advanced)

```html
<thx-icon-button label="Settings">
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65c-.03-.24-.24-.43-.48-.43h-4c-.24 0-.45.19-.48.43l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.02.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.41 1.08.74 1.69.99l.38 2.65c.03.24.24.43.48.43h4c.24 0 .45-.19.48-.43l.38-2.65c.61-.26 1.17-.59 1.69-.99l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.66z"/>
  </svg>
</thx-icon-button>
```

## Properties / Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `icon` | `string` | `undefined` (falls back to `◉`) | Character or symbol rendered when no slotted content. |
| `label` | `string` | `undefined` | Accessible name for `aria-label`. Strongly recommended for screen readers. |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'warning' \| 'error'` | `'primary'` | Color treatment. Primary = phosphor blue; warning/error for status. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Square dimensions: sm ≈ 32px, md ≈ 40px, lg ≈ 48px. |
| `disabled` | `boolean` | `false` | Disables interaction with reduced opacity. |
| `loading` | `boolean` | `false` | Replaces icon with `<thx-spinner size="sm">` + `aria-busy`. |
| `pulse` | `boolean` | `false` | Applies infinite low-intensity phosphor (or amber) breathing glow animation. |
| `shape` | `'square' \| 'rounded' \| 'circle'` | `'square'` | Border radius treatment. `square` enforces the design system default (0 radius). |
| `scanlines` | `boolean` | `false` | Applies static CRT scanline overlay via shared `crt-effects` mixin. |

## Slots

| Slot | Description |
|------|-------------|
| (default) | Icon or custom visual content. Overrides the `icon` property. Accepts text, SVG, or `<thx-icon>`. |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `click` | `MouseEvent` | Standard click event. Suppressed when disabled or loading. |

## Variants

- **primary / secondary / ghost / warning / error**: Consistent with `thx-button` semantics.
- **pulse**: Adds `@keyframes phosphor-pulse` (or amber-pulse) for live indicators (e.g., recording, connected, updating).
- **shape**: `square` (strict 0-radius industrial), `rounded` (micro 2–4px softening), `circle` (for avatar-like or radial controls).
- **scanlines**: Subtle horizontal scan texture for CRT-adjacent surfaces.
- **loading**: Spinner replaces content; variant-matched (crt primary, warning, error).

## Accessibility

- Requires explicit `label` (or meaningful slotted text) for `aria-label`. Without it, falls back to icon or generic "button".
- `focus-visible` phosphor glow ring.
- `aria-busy` during loading.
- Full keyboard operability (Tab / Enter / Space).
- When `pulse` is active for live state, consider pairing with `aria-live` region elsewhere describing the state.
- Icon-only nature demands careful labeling: "Open command drawer", "Toggle CRT filters", "Abort procedure".

## Design Notes

Reference: [DESIGN.md](../../DESIGN.md#buttons) and [Shapes](../../DESIGN.md#shapes), [CRT And Scope Displays](../../DESIGN.md#crt-and-scope-displays).

- **Icon treatment**: Use geometric primitives (◆ ▲ ■ ● ◉ ▤ ≡ ↻ ✕) or simple SVG paths. Avoid emoji or illustrative icons.
- **Phosphor & pulse**: Glow and animation reserved for operational attention (live feed, pending action, warning alert). Pulse intensity is deliberately restrained (2s cycle).
- **CRT subsystem**: `scanlines` + `crt-effects` mixin used only when the icon button sits on or represents a monitor surface.
- **Square priority**: Default shape is strictly square. Rounded/circle variants are explicit exceptions for specific UX needs (e.g., avatar toggles).
- **Loading pattern**: Consistent with `thx-button` — delegates to `<thx-spinner>` with auto variant selection for coherent status signaling.
- **Density**: Designed for toolbars and header command strips where multiple icon buttons sit adjacent. Maintain 8px+ gaps in light surfaces.
- **Typography/mono**: Font stack matches button (Courier New) for any text fallback; icons are centered with perfect vertical alignment.

The component inherits focus management helpers (`focus()`, `blur()`) and participates in the overall zero-dependency, classless THX aesthetic.
