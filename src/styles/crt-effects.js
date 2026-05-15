// @ts-check

/**
 * @fileoverview Shared CRT / monitor visual effects for THX 1138 components
 * @module styles/crt-effects
 *
 * Centralizes scanlines, vignette, phosphor glow, scope grid, and reduced-motion handling.
 *
 * DESIGN.md contract:
 *   - Full animated CRT effects belong **only on explicit display/monitor surfaces**
 *     (thx-crt-display, card[crt], chart-monitors, observers, etc.).
 *   - Dialogs, drawers, popups, progress bars, etc. may use the *static* overlay variants
 *     on their dark header/panel for visual consistency, but should not claim "monitor" semantics.
 *   - Always respect `prefers-reduced-motion`.
 *
 * Usage examples:
 *   import { crtMonitorStyles, crtStaticScanlineOverlay } from '../styles/crt-effects.js';
 *   static styles = css`
 *     ${crtMonitorStyles}
 *     .my-panel { ... }
 *   `;
 *
 *   // For static decorative overlays (works directly inside css``):
 *   static styles = css`
 *     ${crtStaticScanlineOverlay('.dialog-header', { opacity: 0.03 })}
 *     ${crtStaticVignetteOverlay('.dialog-header')}
 *   `;
 */

import { css, unsafeCSS } from '../../vendor/lit.js';

/**
 * Full animated CRT monitor frame + scanlines + vignette + scope grid variant.
 * Use on components that represent literal display surfaces.
 * Includes @keyframes scanlines and reduced-motion media query (once).
 */
export const crtMonitorStyles = css`
  .crt-display,
  .crt-surface {
    background: var(--crt-bg, #111);
    border: calc(var(--size-2) + var(--size-1)) solid var(--crt-border, #2a2a2a);
    border-radius: var(--size-1);
    box-shadow: inset 0 0 var(--size-4) rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
    color: var(--atmos-primary, #a6c8e1);
  }

  .crt-display::before,
  .crt-surface::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(166, 200, 225, 0.04) 2px,
      rgba(166, 200, 225, 0.04) var(--size-1)
    );
    pointer-events: none;
    z-index: var(--layer-2);
    animation: scanlines var(--duration-pause, 4s) linear infinite;
  }

  .crt-display::after,
  .crt-surface::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
    z-index: calc(var(--layer-2) + 1);
  }

  /* Scope / oscilloscope grid variant (no animation) */
  .crt-display.scope,
  .crt-surface.scope {
    background: var(--crt-bg-dark, #0a0a0a);
  }

  .crt-display.scope::before,
  .crt-surface.scope::before {
    background-image:
      linear-gradient(rgba(166, 200, 225, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(166, 200, 225, 0.08) 1px, transparent 1px);
    background-size: var(--size-4) var(--size-4);
    animation: none;
  }

  .crt-content {
    position: relative;
    z-index: var(--layer-1);
  }

  .crt-label {
    position: absolute;
    top: calc(var(--size-2) + var(--size-1));
    right: var(--size-3);
    font-family: var(--font-mono, 'Courier New', Courier, monospace);
    font-size: var(--font-size-00, 10px);
    letter-spacing: var(--font-letterspacing-5);
    color: var(--atmos-secondary, #707e91);
    text-transform: uppercase;
    z-index: calc(var(--layer-2) + 2);
    pointer-events: none;
  }

  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .crt-display::before,
    .crt-surface::before {
      animation: none;
    }
  }
`;

/**
 * Static (non-animated) horizontal scanline overlay.
 * Use for subtle CRT texture on headers, panels, progress tracks, etc.
 *
 * Can be used directly inside a `css` tagged template:
 *
 *   static styles = css`
 *     ${crtStaticScanlineOverlay('.my-panel', { opacity: 0.05 })}
 *   `;
 *
 * @param {string} selector
 * @param {{opacity?: number, z?: string|number}} [options]
 */
export function crtStaticScanlineOverlay(selector = '.crt-overlay', { opacity = 0.04, z = 'var(--layer-2)' } = {}) {
  const op = opacity.toFixed(3);
  const cssText = `
    ${selector}::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(166, 200, 225, ${op}) 2px,
        rgba(166, 200, 225, ${op}) var(--size-1)
      );
      pointer-events: none;
      z-index: ${z};
    }
  `;
  return unsafeCSS(cssText);
}

/**
 * Static vignette overlay.
 *
 * Can be used directly inside a `css` tagged template.
 *
 * @param {string} selector
 * @param {{opacity?: number, z?: string|number}} [options]
 */
export function crtStaticVignetteOverlay(selector = '.crt-overlay', { opacity = 0.4, z = 'calc(var(--layer-2) + 1)' } = {}) {
  const op = opacity.toFixed(2);
  const cssText = `
    ${selector}::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 50%,
        rgba(0, 0, 0, ${op}) 100%
      );
      pointer-events: none;
      z-index: ${z};
    }
  `;
  return unsafeCSS(cssText);
}

/**
 * Simple phosphor text glow helper (text-shadow).
 *
 * Can be used directly inside a `css` tagged template.
 *
 * @param {number} [blur=2]
 */
export function phosphorTextShadow(blur = 2) {
  const cssText = `
    text-shadow: 0 0 var(--size-${blur}) rgba(166, 200, 225, 0.6);
  `;
  return unsafeCSS(cssText);
}

/**
 * Pre-composed static scanline + vignette for common decorative panels.
 */
export const crtDecorativeOverlay = css`
  ${crtStaticScanlineOverlay(':host, .crt-panel', { opacity: 0.03 })}
  ${crtStaticVignetteOverlay(':host, .crt-panel', { opacity: 0.35 })}
`;

// Re-export for convenience
export const crtEffects = {
  crtMonitorStyles,
  crtStaticScanlineOverlay,
  crtStaticVignetteOverlay,
  crtDecorativeOverlay,
  phosphorTextShadow,
};

export default crtEffects;