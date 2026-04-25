---
version: alpha
name: THX Components
description: Clinical, dystopian, classless web component design system with sterile surfaces, industrial geometry, and phosphor CRT accents.
colors:
  primary: '#A6C8E1'
  on-primary: '#333333'
  secondary: '#707E91'
  on-secondary: '#111111'
  tertiary: '#DEFFFF'
  neutral-100: '#FAFAFA'
  neutral-200: '#E0E0E0'
  neutral-600: '#666666'
  neutral-800: '#333333'
  background: '#E0E0E0'
  surface: '#FAFAFA'
  on-surface: '#333333'
  on-surface-variant: '#666666'
  outline: '#CCCCCC'
  outline-variant: '#BBBBBB'
  crt-bg: '#111111'
  crt-bg-dark: '#0A0A0A'
  crt-border: '#2A2A2A'
  crt-grid: '#333333'
  warning: '#D4AA00'
  on-warning: '#333333'
  error: '#D44000'
  on-error: '#FFFFFF'
typography:
  display-xl:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 60px
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: 0.16em
  display-lg:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: 0.12em
  headline-md:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0.1em
  heading-sm:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.08em
  body-md:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  label-md:
    fontFamily: 'Courier New, Courier, monospace'
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.14em
  label-sm:
    fontFamily: 'Courier New, Courier, monospace'
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.12em
  mono-data:
    fontFamily: 'Courier New, Courier, monospace'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.08em
  mono-tiny:
    fontFamily: 'Courier New, Courier, monospace'
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.16em
rounded:
  none: 0px
  micro: 2px
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  container: 900px
  dashboard: 1280px
  wide: 1560px
components:
  page-canvas:
    backgroundColor: '{colors.background}'
    textColor: '{colors.neutral-800}'
  body-background:
    backgroundColor: '{colors.neutral-200}'
    textColor: '{colors.neutral-800}'
  section-surface:
    backgroundColor: '{colors.neutral-100}'
    textColor: '{colors.neutral-800}'
  metadata-text:
    textColor: '{colors.on-surface-variant}'
    typography: '{typography.label-sm}'
  muted-label:
    textColor: '{colors.neutral-600}'
    typography: '{typography.label-sm}'
  divider-default:
    backgroundColor: '{colors.outline}'
    height: 1px
  divider-subtle:
    backgroundColor: '{colors.outline-variant}'
    height: 1px
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    height: 40px
    padding: 8px 16px
  button-primary-hover:
    backgroundColor: '{colors.tertiary}'
    textColor: '{colors.on-primary}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    height: 40px
    padding: 8px 16px
  button-warning:
    backgroundColor: '{colors.warning}'
    textColor: '{colors.on-warning}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    height: 40px
    padding: 8px 16px
  button-error:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    typography: '{typography.label-md}'
    rounded: '{rounded.none}'
    height: 40px
    padding: 8px 16px
  card-surface:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: 32px
  card-crt:
    backgroundColor: '{colors.crt-bg}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: 16px
  scope-display:
    backgroundColor: '{colors.crt-bg-dark}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: 24px
  crt-frame:
    backgroundColor: '{colors.crt-border}'
    textColor: '{colors.primary}'
    rounded: '{rounded.sm}'
    padding: 8px
  crt-grid-line:
    backgroundColor: '{colors.crt-grid}'
    height: 1px
  input-field:
    backgroundColor: '#FFFFFF'
    textColor: '{colors.on-surface}'
    typography: '{typography.mono-data}'
    rounded: '{rounded.none}'
    height: 40px
    padding: 0 12px
  alert-info:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.none}'
    padding: 16px
  badge-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.none}'
    padding: 4px 8px
  badge-pill:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: 4px 8px
  dialog-panel:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: 24px
---

# Design System: THX Components

## Overview

This design system embodies clinical dystopian instrumentation: blank institutional surfaces, strict alphanumeric labeling, square industrial controls, and rare phosphor glow used only when the interface behaves like a monitor.

The visual source is the sterile world of THX-1138: white and gray voids, industrial corridors, impersonal identifiers, uniform costume logic, and cold machine interfaces. In UI terms, that becomes a system where decoration is removed, hierarchy comes from containment and typography, and color appears only as operational signal.

The design must feel authored by a control room, not a marketing site. It should be legible, austere, and slightly oppressive without becoming unusable. The classless CSS layer makes bare semantic HTML look designed; custom elements extend that same language without utility-class noise.

Key characteristics:

- Neutral gray page canvas with off-white panel slabs.
- Helvetica-derived display/body text paired with Courier-style uppercase control text.
- High letter spacing, all-caps labels, and alphanumeric interface phrasing.
- Square or near-square geometry; rounded corners are exceptions, not defaults.
- Phosphor blue is the primary operational accent, not a decorative brand wash.
- Amber and orange-red are reserved for warning and critical states.
- CRT and oscilloscope surfaces form a dark sub-system with scanlines, grid overlays, inset shadows, and soft glow.
- Components should be usable through semantic HTML and custom elements with minimal class authorship.

## Colors

The palette is intentionally narrow. The default world is gray-on-gray institutional minimalism; the dark CRT world is black with blue phosphor. Chromatic colors communicate state.

### Surface Roles

- **Background (`#E0E0E0`)**: The page canvas. It should feel like painted institutional concrete, not a pure white website background.
- **Surface (`#FAFAFA`)**: Panels, cards, sections, controls, and content slabs. This is the dominant reading surface.
- **White (`#FFFFFF`)**: Inputs and code fields when a brighter affordance is needed.
- **Dark CRT (`#111111`)**: Monitor panels, terminal surfaces, dialog headers, charts, and scope displays.
- **Deep CRT (`#0A0A0A`)**: Oscilloscope and denser terminal interiors.
- **CRT Border (`#2A2A2A`)**: Thick monitor frames and modal machine housings.

### Text Roles

- **Primary Text (`#333333`)**: Headings, KPI values, button text on light accents, and main content.
- **Secondary Text (`#666666`)**: Labels, metadata, body text, timestamps, placeholders, and quiet utility copy.
- **Inverse Text (`#FAFAFA` / `#FFFFFF`)**: Text on error and dark fills. Use true white for critical orange when strict AA contrast is required.
- **Phosphor Text (`#A6C8E1`)**: Active CRT text, selected navigation states, live metrics, and focus emphasis.

### Accent Roles

- **Phosphor Blue (`#A6C8E1`)**: Primary action fill, active tab line, focus glow, success/normal operational status, and CRT text.
- **Muted Phosphor (`#707E91`)**: Secondary action fill, inactive CRT labels, quiet status states. Use near-black text on this fill for strict AA contrast.
- **Hot Phosphor (`#DEFFFF`)**: Hover and high-energy CRT emphasis. Use sparingly.
- **Warning Amber (`#D4AA00`)**: Warning badges, heat-map cells, and caution states.
- **Critical Orange (`#D44000`)**: Error states, destructive actions, critical metrics, and fault indicators.

### Borders And Dividers

- Use black alpha borders on light surfaces: `rgba(0, 0, 0, 0.06)` for subtle dividers, `rgba(0, 0, 0, 0.1)` for structural boundaries, and `#CCCCCC` for form control underlines.
- Use phosphor alpha borders on CRT surfaces: `rgba(166, 200, 225, 0.08)` for quiet grid lines and `rgba(166, 200, 225, 0.16)` for panel frames.
- Avoid decorative colored borders. Borders should communicate panel seams, selected state, focus, or status.

## Typography

Typography is the primary visual identity. Display and prose use a stark neo-grotesque stack; operational text uses monospaced uppercase labels.

### Font Families

- **Display and Body**: `Helvetica Neue, Helvetica, Arial, sans-serif`.
- **Operational Mono**: `Courier New, Courier, monospace`.
- **OpenType Features**: No custom feature set is required. The identity comes from uppercase transformation, letter spacing, and weight restraint.

### Hierarchy

| Role        | Font            | Size | Weight | Line Height | Letter Spacing | Use                                          |
| ----------- | --------------- | ---: | -----: | ----------: | -------------: | -------------------------------------------- |
| Display XL  | Helvetica stack | 60px |    300 |        0.95 |         0.16em | Large terminal identity, hero titles         |
| Display LG  | Helvetica stack | 48px |    300 |           1 |         0.12em | Page titles, major KPI values                |
| Headline MD | Helvetica stack | 24px |    400 |        1.15 |          0.1em | Section headings                             |
| Heading SM  | Helvetica stack | 16px |    600 |         1.3 |         0.08em | Small headings and dense group labels        |
| Body MD     | Helvetica stack | 16px |    400 |         1.6 |         normal | Main prose and component content             |
| Body SM     | Helvetica stack | 14px |    400 |        1.45 |         normal | Dense dashboard content                      |
| Label MD    | Courier stack   | 13px |    600 |           1 |         0.14em | Buttons, tabs, labels, badges                |
| Label SM    | Courier stack   | 12px |    600 |           1 |         0.12em | Metadata, timestamps, captions               |
| Mono Data   | Courier stack   | 16px |    400 |         1.6 |         0.08em | Terminal rows, input values, diagnostic data |
| Mono Tiny   | Courier stack   | 11px |    600 |           1 |         0.16em | Watermarks, panel codes, micro labels        |

### Principles

- Use uppercase for headings, labels, buttons, tabs, badges, control copy, and machine identifiers.
- Use body case for human-readable paragraphs, alert messages, and long descriptions unless the surface is explicitly terminal-like.
- Use low display weights (`300` to `400`) for large text. Heavy display type breaks the sterile filmic tone.
- Use `600` for mono labels and small controls so expanded letter spacing remains legible.
- Letter spacing should increase as text becomes more operational. Labels may be wide; body copy should not be tracked out.
- Alphanumeric identifiers should feel systematic: short prefixes, numeric suffixes, slashes, double colons, and panel codes are appropriate when content needs machine flavor.

## Layout

The layout is slab-based and grid-driven. Screens should feel assembled from panels on an industrial backplane.

### Spacing System

- Base unit: `4px`.
- Common rhythm: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
- Use `4px` for seams between dense dashboard panels.
- Use `16px` to `24px` for standard component interiors.
- Use `32px` for section slabs and large cards.
- Avoid ornamental whitespace. Empty space should feel like institutional void, not lifestyle minimalism.

### Containers And Grids

- Default documentation/content width: `900px` centered.
- Standard dashboard width: up to `1280px`.
- Wide monitoring dashboard width: up to `1560px`.
- Use CSS grid for dashboards, with narrow seams and white/off-white panel children.
- Use two-column and four-column layouts when data density matters; collapse to one column on mobile.
- Panel grids may use a faint grid backplane, but the grid must be low contrast and mechanical.

### Responsive Behavior

- At widths below `1180px`, complex hero, media, terminal, and form grids collapse to one column.
- At widths below `760px`, KPI and sensor grids collapse from two columns to one column.
- Command strips and headers should wrap rather than shrink controls below usable touch targets.
- Keep touch targets at least `32px` high for small controls and `40px` high for primary controls.

## Elevation & Depth

Depth is conveyed through inset shadows, hairline seams, panel contrast, and CRT glow. Avoid floating card shadows in the default light system.

| Level        | Treatment                                                      | Use                                   |
| ------------ | -------------------------------------------------------------- | ------------------------------------- |
| Canvas       | `#E0E0E0` with no shadow                                       | Page background                       |
| Slab         | `#FAFAFA` with subtle inner shadow                             | Sections, panels, cards               |
| Divided Slab | Slab plus `rgba(0,0,0,0.06)` dividers                          | Dense lists and dashboards            |
| Active Light | Phosphor border or underline plus `rgba(166,200,225,0.3)` glow | Focus, selected tabs, active controls |
| CRT Recess   | `#111111`, thick `#2A2A2A` frame, inset shadow                 | Monitor panels and dark displays      |
| Dialog       | Dark overlay plus framed light panel with CRT header           | Modal interruptions                   |

Shadow philosophy:

- Light surfaces should look pressed into a controlled environment, not floating above it.
- Dark monitor surfaces should look recessed behind glass.
- Glow belongs to active phosphor states only. If everything glows, the system stops feeling operational.
- Use scanlines, vignette, and grid overlays only on explicit display surfaces.

## Shapes

The shape language is hard-edged, industrial, and mostly orthogonal.

- **Square (`0px`)**: Default for buttons, inputs, panels, badges, tabs, lists, range sliders, and checkboxes.
- **Micro (`2px`)**: Rare optical correction for tiny framed details.
- **Small (`4px`)**: CRT monitor frames, dialogs, and dark display housings.
- **Medium (`8px`)**: Use only when a third-party embedded surface or media preview needs mild softening.
- **Full (`9999px`)**: Only for explicit pill badges or circular status/avatar elements.

Do not mix rounded and square controls casually. Rounded elements should have semantic purpose: status pills, avatars, radio controls, or CRT housings.

## Components

### Buttons

Buttons are uppercase mono controls with no radius. Primary buttons use phosphor blue fill and dark text; secondary buttons use muted phosphor fill with near-black text when strict contrast is required.

- Default height: `40px`.
- Small height: `24px`; large height: `48px`.
- Padding: `8px 16px` for default, `12px 24px` for large.
- Active state: translate down by `1px`.
- Disabled state: opacity `0.4` to `0.5`; preserve layout.
- Primary hover: hot phosphor background and soft blue glow.
- Warning/error hover: keep fill stable and add status-colored glow.
- Ghost controls should be transparent with quiet gray text until hover.

### Cards And Panels

Default cards are off-white slabs with inner shadow, optional header divider, and mono uppercase labels. They should not use rounded corners or floating shadows.

- Standard padding: `32px` for content cards, `16px` to `24px` for dense dashboard panels.
- Header labels: mono, uppercase, `12px` to `13px`, wide letter spacing.
- Hoverable cards may add a subtle inner shadow plus phosphor glow, never a large drop shadow.
- Inner border decorations should be faint, usually `rgba(0,0,0,0.04)` on light surfaces.

### CRT And Scope Displays

CRT displays are a separate dark-mode subsystem, not a global theme.

- Background: `#111111` or `#0A0A0A`.
- Frame: thick `#2A2A2A`, usually `8px` to `12px`.
- Text: phosphor blue, mono, uppercase.
- Effects: repeating horizontal scanlines, radial vignette, inset shadow.
- Scope variant: blue grid overlay at `16px` intervals.
- Always respect `prefers-reduced-motion` by disabling scanline animation.

### Inputs And Forms

Inputs are terminal fields embedded in light slabs.

- Background: white.
- Border: no full box; use `2px` bottom border.
- Focus: phosphor border plus `0 0 0 2px rgba(166, 200, 225, 0.3)`.
- Text: mono, uppercase by default for short control fields.
- Textareas may use normal casing for observational notes or long prose.
- Labels are mono uppercase with wide tracking and secondary gray color.

### Alerts And Status

Alerts use a light slab, mono uppercase label, and a thick left status rail.

- Info rail: phosphor blue.
- Warning rail: amber.
- Error rail: orange-red.
- Success/confirmed rail: muted phosphor.
- Message text may relax to normal casing for readability.
- Icons should be geometric primitives: diamond, triangle, square, circle.

### Badges, Tags, And Pills

Badges are compact mono labels. Default badges are square; pill badges must be explicitly requested.

- Padding: `4px 8px`.
- Font: mono `12px` or `13px`, weight `600`, uppercase.
- Primary: phosphor blue fill.
- Secondary: muted phosphor fill.
- Inactive: transparent fill with gray border.
- Pulse is allowed only for live state indicators, and should use low-intensity opacity animation.

### Navigation

Tabs and navigation items are mono uppercase controls. Active state is a phosphor underline with a small glow.

- Hover: blue text and `rgba(166, 200, 225, 0.05)` background.
- Active: blue text, blue bottom border, subtle glow.
- CRT variant: muted blue inactive text and hot phosphor active text with text shadow.
- Avoid decorative navigation icons unless they are operational primitives.

### Dialogs And Drawers

Dialogs are interruptions from the machine.

- Overlay: `rgba(10, 10, 10, 0.85)` plus a subtle blur.
- Panel: off-white slab inside a thick dark CRT frame.
- Header: dark CRT strip with phosphor mono label.
- Motion: scale from `0.95` to `1`; keep transitions short and mechanical.
- Widths: approximately `400px`, `600px`, and `800px` with `90vw` maximum.

### Charts And Data Displays

Charts should look like instruments, not business analytics decoration.

- Use phosphor blue for normal traces.
- Use amber for caution traces and orange-red for critical traces.
- Use thin grid lines with low opacity.
- Prefer monospace labels, tick marks, and compact legends.
- Keep chart chrome square and restrained.

## Do's and Don'ts

### Do

- Do start from semantic HTML and component tags before adding custom classes.
- Do use off-white panels on a gray institutional canvas.
- Do use monospaced uppercase labels for controls, metadata, tabs, badges, and machine identifiers.
- Do reserve phosphor blue for active, primary, focus, live, and CRT states.
- Do use amber and orange-red only for warning, critical, destructive, or fault states.
- Do keep edges square unless a component has a clear status or display-housing reason to be rounded.
- Do make dense dashboards with grid seams and panel slabs instead of ornamental cards.
- Do disable CRT motion effects for reduced-motion users.

### Don't

- Don't use saturated color decoratively across backgrounds, illustrations, or large panels.
- Don't use soft lifestyle gradients in the default light system.
- Don't apply rounded corners to every component by default.
- Don't use heavy drop shadows on light cards.
- Don't set long paragraphs in uppercase or tracked mono; reserve that treatment for operational copy.
- Don't make CRT scanlines a global page effect. They belong only to monitor-like surfaces.
- Don't introduce playful iconography, emoji, or hand-drawn elements.
- Don't make the interface warmer than the content demands; warmth should come from clarity and usefulness, not color softness.

## Agent Prompt Guide

Quick reference:

- Background: `#E0E0E0`.
- Surface: `#FAFAFA`.
- Primary text: `#333333`.
- Secondary text: `#666666`.
- Primary CTA and active state: `#A6C8E1`.
- Hover/high-energy phosphor: `#DEFFFF`.
- Warning: `#D4AA00`.
- Error: `#D44000`.
- CRT background: `#111111`.

Example hero prompt:

```text
Create a sterile control-room hero on a #E0E0E0 canvas with a #FAFAFA slab. Use a 48px Helvetica Neue headline, weight 300, uppercase, letter-spacing 0.12em, color #333333. Add a Courier New eyebrow at 12px, weight 600, letter-spacing 0.16em, color #666666. Use square phosphor-blue primary controls and no decorative gradients.
```

Example component prompt:

```text
Design a square status card with #FAFAFA background, subtle inner shadow, 32px padding, and a mono uppercase label at 12px with 0.14em tracking. Use #333333 for the main value, #666666 for metadata, and #A6C8E1 only for active or live state emphasis.
```

Example CRT prompt:

```text
Create a CRT display panel with #111111 background, 8px #2A2A2A frame, 4px radius, inset black shadow, Courier New phosphor-blue text, low-opacity horizontal scanlines, radial vignette, and reduced-motion support that disables scanline animation.
```

Iteration guide:

1. Start with the neutral slab system before adding CRT effects.
2. Use mono uppercase only where the UI is acting like a machine control.
3. Keep color semantic: blue is operational, amber is warning, orange-red is critical.
4. Prefer seams, underlines, and inset shadows over floating elevation.
5. Remove any styling that makes the system feel friendly, playful, glossy, or generic SaaS.
