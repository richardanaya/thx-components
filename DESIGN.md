# THX 1138 Terminal Interface — DESIGN.md

A sterile, dystopian 1971 sci-fi aesthetic inspired by George Lucas's THX 1138. This design system captures the clinical, surveillance-state visual language of the film's underground society — CRT monitors, monochrome displays, and oppressive minimalism.

---

## 1. Visual Theme & Atmosphere

### Design Philosophy

- **Clinical Minimalism**: Stark whites, greys, and blacks. No decorative elements.
- **Surveillance State**: Interfaces feel like monitoring stations — cold, functional, authoritarian.
- **1970s Retro-Futurism**: CRT phosphor glow, analog oscilloscope displays, scanline effects.
- **Oppressive Order**: Everything is numbered, labeled, and tracked. No organic warmth.

### Mood & Density

- **Mood**: Cold, sterile, controlled, dystopian
- **Density**: Medium — structured layouts with plenty of whitespace but purposeful
- **Visual Weight**: Heavy borders, blocky forms, geometric precision

---

## 2. Color Palette & Roles

### Neutral Colors (Foundation)

| Token           | Value     | Role                         |
| --------------- | --------- | ---------------------------- |
| `--neutral-100` | `#fafafa` | Primary background, cards    |
| `--neutral-200` | `#e0e0e0` | Page background, surfaces    |
| `--neutral-600` | `#666`    | Secondary text, muted labels |
| `--neutral-800` | `#333`    | Primary text, headings       |

### Atmospheric Colors (CRT Phosphor)

| Token               | Value     | Role                               |
| ------------------- | --------- | ---------------------------------- |
| `--atmos-primary`   | `#a6c8e1` | CRT phosphor glow, active elements |
| `--atmos-secondary` | `#707e91` | Dimmed phosphor, grid lines        |
| `--atmos-tertiary`  | `#deffff` | Highlight, brightest glow          |

### Accent Colors (Status)

| Token              | Value     | Role                           |
| ------------------ | --------- | ------------------------------ |
| `--accent-warning` | `#d4aa00` | Amber warning LED, alerts      |
| `--accent-error`   | `#d44000` | Critical errors, non-compliant |

### CRT Display Colors (Dark Theme)

| Token           | Value     | Role                                  |
| --------------- | --------- | ------------------------------------- |
| `--crt-bg`      | `#111`    | Primary CRT monitor background        |
| `--crt-bg-dark` | `#0a0a0a` | Darker variant (scope displays)       |
| `--crt-border`  | `#2a2a2a` | CRT monitor bezel/frame               |
| `--crt-grid`    | `#333`    | Monitor bank grid, secondary surfaces |

### Usage Patterns

- **Surfaces**: White backgrounds (`--neutral-100`) with subtle borders
- **CRT Displays**: Black backgrounds (`#0a0a0a`, `#111`) with phosphor glow
- **Text**: Primary dark (`--neutral-800`) on light surfaces
- **Interactive**: Blue phosphor (`--atmos-primary`) for active states
- **Alerts**: Amber (`--accent-warning`) for warnings, red (`--accent-error`) for critical

---

## 3. Typography Rules

### Font Families

| Token            | Value                                            | Usage                       |
| ---------------- | ------------------------------------------------ | --------------------------- |
| `--font-display` | `'Helvetica Neue', Helvetica, Arial, sans-serif` | Headings, display text      |
| `--font-body`    | `'Helvetica Neue', Helvetica, Arial, sans-serif` | Body text, paragraphs       |
| `--font-mono`    | `'Courier New', Courier, monospace`              | Data, labels, terminal text |

### Type Scale

| Element    | Size      | Weight | Letter-Spacing | Case      |
| ---------- | --------- | ------ | -------------- | --------- |
| H1         | 1.75rem   | 300    | 0.1em          | uppercase |
| H2         | 1.25rem   | 400    | 0.08em         | uppercase |
| H3         | 1rem      | 600    | 0.06em         | uppercase |
| H4         | 0.875rem  | 600    | 0.05em         | uppercase |
| H5         | 0.8125rem | 500    | 0.04em         | uppercase |
| H6         | 0.75rem   | 500    | 0.03em         | uppercase |
| Body       | 0.875rem  | 400    | normal         | normal    |
| Mono Label | 0.6875rem | 500    | 0.1em          | uppercase |
| Data       | 0.8125rem | 400    | 0.05em         | uppercase |

### Typography Patterns

- **Headings**: All uppercase, wide letter-spacing, lightweight
- **Labels**: Monospace, uppercase, tracking 0.1em
- **Data**: Monospace, uppercase, slight tracking
- **Body**: Normal case, system font

---

## 4. Component Stylings

### Buttons

**Primary Button**

```
background: var(--atmos-primary);
color: var(--neutral-800);
border: none;
padding: 10px 20px;
font-family: var(--font-mono);
font-size: 0.6875rem;
text-transform: uppercase;
letter-spacing: 0.12em;
```

**Secondary Button**

```
background: var(--atmos-secondary);
color: var(--neutral-100);
border: none;
```

**Outline Button**

```
background: transparent;
border: 1px solid var(--atmos-primary);
color: var(--atmos-primary);
```

**Ghost Button**

```
background: transparent;
border: 1px solid transparent;
color: var(--neutral-600);
```

### Badges

```
padding: 4px 10px;
font-family: var(--font-mono);
font-size: 0.625rem;
text-transform: uppercase;
letter-spacing: 0.1em;
border: 1px solid transparent;
```

**Badge Variants**

- Primary: Blue phosphor fill
- Secondary: Darker blue fill
- Warning: Amber fill
- Error: Red fill
- Inactive: Outline only
- Pulse: Animated pulsing (LIVE indicator)

### Cards / Sections

```
background: var(--neutral-100);
padding: 32px;
border: none;
box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
position: relative;
```

**Section Title**

```
font-family: var(--font-mono);
font-size: 0.75rem;
text-transform: uppercase;
letter-spacing: 0.15em;
color: var(--neutral-600);
border-bottom: 1px solid rgba(0, 0, 0, 0.08);
```

### CRT Displays

**Container**

```
background: #111;
border: 12px solid #2a2a2a;
border-radius: 4px;
position: relative;
overflow: hidden;
box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
```

**Scanlines Effect**

```
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(166, 200, 225, 0.04) 2px,
  rgba(166, 200, 225, 0.04) 4px
);
```

**Vignette**

```
background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
```

### Form Inputs

```
height: 40px;
padding: 0 12px;
border: none;
border-bottom: 2px solid #ccc;
font-family: var(--font-mono);
font-size: 0.875rem;
text-transform: uppercase;
letter-spacing: 0.05em;
background: white;
```

**Focus State**

```
border-color: var(--neutral-800);
outline: none;
```

### Radio & Checkbox

```
appearance: none;
width: 18px;
height: 18px;
border: 2px solid #999;
background: white;
cursor: pointer;
```

**Radio Checked**

```
border-color: #444;
border-radius: 50%;
```

**Checkbox Checked**

```
border-color: #444;
background: #444;
```

---

## 5. Layout Principles

### Spacing Scale

| Token     | Value | Usage                    |
| --------- | ----- | ------------------------ |
| Space XS  | 4px   | Tight gaps, icon padding |
| Space SM  | 8px   | Between related elements |
| Space MD  | 12px  | Form element gaps        |
| Space LG  | 16px  | Section internal spacing |
| Space XL  | 24px  | Between sections         |
| Space 2XL | 32px  | Card padding             |
| Space 3XL | 40px  | Page padding             |

### Grid System

- **Container**: max-width 900px, centered
- **Sections**: Full width, vertical stack with 1px gap
- **Form Grid**: 2-column layout for inputs
- **Monitor Bank**: 4-column grid for CRT displays

### Layout Patterns

- **Section Stack**: Vertical sections with subtle borders
- **Card Within Section**: White cards on grey background
- **CRT Overlay**: Dark displays with phosphor content
- **Input Row**: Flex row with gap 12px

---

## 6. Depth & Elevation

### Shadow System

| Level        | Value                              | Usage            |
| ------------ | ---------------------------------- | ---------------- |
| Inset Border | `inset 0 0 0 1px rgba(0,0,0,0.06)` | Cards, sections  |
| CRT Inner    | `inset 0 0 20px rgba(0,0,0,0.5)`   | Monitor displays |
| Glow Blue    | `0 0 15px rgba(166,200,225,0.5)`   | Hover states     |
| Glow Amber   | `0 0 15px rgba(212,170,0,0.5)`     | Warning hover    |

### Elevation Philosophy

- **Flat Design**: Minimal shadows, mostly inset
- **CRT Glow**: Phosphor elements have subtle glow
- **No Float**: Elements don't "float" — they stack or border

---

## 7. Do's and Don'ts

### ✅ Do

- Use uppercase text for all labels and headings
- Use monospace fonts for data and technical content
- Include wide letter-spacing on headers
- Use the blue phosphor color for active/interactive states
- Add scanline effects to CRT-style displays
- Keep corners sharp (no border-radius on most elements)
- Use section titles with "// PREFIX //" format
- Include terminal-style labels ("LDS-1138", "ANALOG-03")

### ❌ Don't

- Use rounded corners on buttons or cards
- Use bright colors outside the phosphor palette
- Use lowercase for headings or labels
- Add decorative gradients or shadows
- Use organic shapes or curves
- Mix in warm colors (oranges, warm greens)
- Use playful or friendly typography
- Add illustrations or decorative graphics

---

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Value     | Behavior                         |
| ---------- | --------- | -------------------------------- |
| Mobile     | < 600px   | Single column, stacked layout    |
| Tablet     | 600-900px | 2-column where applicable        |
| Desktop    | > 900px   | Full layout, max-width container |

### Responsive Patterns

- **Form Grid**: Collapses to single column on mobile
- **Monitor Bank**: 4-col → 2-col → 1-col
- **Typography**: Scales down slightly on mobile
- **Spacing**: Reduces by ~20% on mobile

### Touch Targets

- Minimum 44px height for buttons
- Minimum 40px height for inputs
- 8px minimum spacing between touch elements

---

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background: #fafafa
Page: #e0e0e0
CRT Black: #0a0a0a, #111
CRT Phosphor: #a6c8e1
CRT Dim: #707e91
Warning: #d4aa00
Error: #d44000
Text: #333
Muted: #666
```

### Ready-to-Use Prompts

**Generate a CRT Display**

> "Create a CRT monitor display with black background (#0a0a0a), 12px dark grey border, blue phosphor text (#a6c8e1), scanline overlay effect, and vignette shadow. Include a header label like 'TERMINAL-01' in monospace uppercase."

**Generate a Form Section**

> "Create a form section with white background, inset border shadow, monospace uppercase labels, bottom-border-only inputs (2px #ccc), and primary blue phosphor buttons. Use 12px gap between rows."

**Generate a Monitor Bank**

> "Create a 4-column grid of small CRT monitors (4:3 aspect ratio) with black backgrounds, blue phosphor content (#a6c8e1), scanline effects, and small progress bars at the bottom. Label each 'CAM-01', 'CAM-02', etc."

**Generate Status Badges**

> "Create status badges in THX 1138 style: monospace uppercase, letter-spacing 0.1em. Variants: blue (normal), amber (warning), red (critical), outline (inactive). Small 4px padding, 10px horizontal."

---

## Design Token Quick Reference

### CSS Variables

```css
:root {
  /* Neutrals */
  --neutral-100: #fafafa;
  --neutral-200: #e0e0e0;
  --neutral-600: #666;
  --neutral-800: #333;

  /* Atmospheric */
  --atmos-primary: #a6c8e1;
  --atmos-secondary: #707e91;
  --atmos-tertiary: #deffff;

  /* Accents */
  --accent-warning: #d4aa00;
  --accent-error: #d44000;

  /* Typography */
  --font-display: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
}
```

---

_THX 1138 (1971) — A film by George Lucas. Production Design by Michael D. Haller._
