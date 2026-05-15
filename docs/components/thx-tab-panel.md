# thx-tab-panel

The `<thx-tab-panel>` is the content container that pairs with a `<thx-tab>` inside a `<thx-tab-group>`. It is hidden by default and revealed only when its `id` matches the group's `active-tab`.

## Usage

```html
<thx-tab-group active-tab="overview">
  <thx-tab slot="tab" panel="overview">OVERVIEW</thx-tab>
  <thx-tab-panel id="overview">
    <p>Real-time system telemetry and incident feed.</p>
    <!-- any content: forms, charts, trees, etc. -->
  </thx-tab-panel>
</thx-tab-group>
```

## Properties / Attributes

| Attribute | Type     | Default | Description |
|-----------|----------|---------|-------------|
| `id`      | string   | —       | **Required for matching.** Must exactly match the `panel` attribute on the corresponding `<thx-tab>`. |
| `active`  | boolean  | false   | Controlled by parent group. When true, the panel becomes visible (`display: block`). |
| `variant` | string   | 'default' | Inherited from parent (`crt` applies dark background and mono styling to content). |

## Slots

- default: Arbitrary content (the panel body). Receives fade-in animation on activation.

## ARIA

- `role="tabpanel"` (automatically set in `connectedCallback`)
- `aria-labelledby` points to the ID of the controlling `<thx-tab>` (set by parent during `_updateTabs`)

## Variants

### CRT Variant

```html
<thx-tab-panel id="systems" variant="crt">
  <!-- content rendered in dark phosphor palette with mono uppercase text -->
</thx-tab-panel>
```

- Dark `#0a0a0a` background
- Primary blue text
- Uppercase mono font applied to slotted content
- Ideal for embedding monitor-style readouts

### Compact Variant

Reduces padding for denser layouts.

## Keyboard & Focus

The panel itself is not focusable by default. Keyboard users navigate **via the tabs** (roving arrows in the group). Once inside the panel, normal tab order applies to focusable children.

The parent group’s `focus()` method lands focus on the active tab, not the panel.

## Animation

Active panels receive a gentle `panelFadeIn` keyframe (opacity + subtle translateY) for smooth transitions between sections — consistent with clinical control-room polish.

## Best Practices

- Always provide a unique `id` that matches a tab’s `panel` value.
- Place complex navigation (trees, menus) or data displays inside panels.
- Use the CRT variant when the entire tab group is `variant="crt"` for visual cohesion.
- Panels support any THX components: charts, inputs, cards, nested trees, etc.

## Related Components

- [thx-tab-group](./thx-tab-group.md) — required parent that orchestrates visibility and roving focus.
- [thx-tab](./thx-tab.md) — the trigger that targets this panel by ID.

**Example of full controlled tab set** (see thx-tab-group docs for advanced patterns including vertical placement and closable tabs).