// @ts-check

/**
 * @fileoverview Focus-visible styles and helpers for THX 1138 components
 * @module mixins/focus-visible
 *
 * Provides a consistent, high-contrast primary glow focus ring for keyboard users.
 * Matches the clinical THX-1138 aesthetic (phosphor blue glow, no heavy rings).
 *
 * Every interactive thx-* component MUST:
 *   - Include `focusVisibleStyles` in its `static styles`
 *   - Use `:focus-visible` (never bare `:focus` when hiding outline)
 *   - Implement a public `focus()` method that delegates to the primary interactive element
 *
 * Global tokens are defined in aesthetics.css (:root --focus-ring-*).
 */

import { css } from '../../vendor/lit.js';

/**
 * Reusable focus-visible styles fragment.
 * Apply to :host(:focus-visible) [part~="base"], buttons, roles, etc.
 *
 * The glow uses --atmos-primary with a soft outer blur for CRT/monitor feel.
 */
export const focusVisibleStyles = css`
  /* Primary interactive surface inside the component */
  :host(:focus-visible) [part~="base"],
  :host(:focus-visible) button,
  :host(:focus-visible) [role="button"],
  :host(:focus-visible) [role="tab"],
  :host(:focus-visible) [role="menuitem"],
  :host(:focus-visible) [role="treeitem"],
  :host(:focus-visible) .select-trigger,
  :host(:focus-visible) .trigger,
  :host(:focus-visible) .radio-wrapper,
  :host(:focus-visible) .checkbox,
  :host(:focus-visible) .switch,
  :host(:focus-visible) .range-track,
  :host(:focus-visible) input[type="range"],
  :host(:focus-visible) .rating,
  :host(:focus-visible) .rating-items,
  :host(:focus-visible) .carousel-arrow,
  :host(:focus-visible) .carousel-dot,
  :host(:focus-visible) .dialog-close,
  :host(:focus-visible) .drawer-close,
  :host(:focus-visible) .tag-remove {
    outline: none;
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--atmos-primary, #a6c8e1) 35%, transparent),
      0 0 var(--size-2, 8px) rgba(166, 200, 225, 0.45);
    transition: box-shadow var(--duration-quick-2, 0.1s);
  }

  /* Fallback for browsers without :focus-visible support or when forced */
  :host(:focus) [part~="base"]:not(:focus-visible),
  :host(:focus) button:not(:focus-visible) {
    /* Keep subtle or none — mouse focus should not show heavy ring */
    box-shadow: none;
  }

  /* High-contrast mode support */
  @media (forced-colors: active) {
    :host(:focus-visible) [part~="base"],
    :host(:focus-visible) button,
    :host(:focus-visible) [role="button"],
    :host(:focus-visible) [role="tab"] {
      outline: 2px solid Highlight;
      outline-offset: 2px;
      box-shadow: none;
    }
  }
`;

/**
 * Simple roving tabindex helper (can be expanded into a full controller later).
 * Call from _handleKeydown in tab-group, tree, menu, radio-group, etc.
 *
 * @param {HTMLElement[]} items - focusable items in DOM order
 * @param {number} currentIndex
 * @param {'next'|'prev'|'first'|'last'} direction
 * @returns {{index: number, item: HTMLElement|null}}
 */
export function getNextRovingIndex(items, currentIndex, direction) {
  const enabledItems = items.filter((el) => !el.hasAttribute('disabled') && !el.disabled);
  if (!enabledItems.length) return { index: -1, item: null };

  let nextIndex = currentIndex;

  switch (direction) {
    case 'next':
      nextIndex = (currentIndex + 1) % enabledItems.length;
      break;
    case 'prev':
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
      break;
    case 'first':
      nextIndex = 0;
      break;
    case 'last':
      nextIndex = enabledItems.length - 1;
      break;
    default:
      break;
  }

  return {
    index: nextIndex,
    item: enabledItems[nextIndex] || null,
  };
}

/**
 * FocusVisibleMixin — optional behavior mixin.
 * Provides a default focus() implementation and keyboard helpers.
 *
 * Most components will still want custom focus delegation (e.g. to inner input or [role=...]).
 */
export const FocusVisibleMixin = (superclass) =>
  class extends superclass {
    /**
     * Default focus delegation. Override in subclass for better targeting.
     * @returns {void}
     */
    focus() {
      // Try common targets
      const target =
        this.renderRoot?.querySelector('[part~="base"]') ||
        this.renderRoot?.querySelector('button, input, [role="button"], [tabindex]:not([tabindex="-1"])');

      if (target instanceof HTMLElement) {
        target.focus();
      } else {
        super.focus?.();
      }
    }

    /**
     * @returns {void}
     */
    blur() {
      const active = this.renderRoot?.activeElement || document.activeElement;
      if (active instanceof HTMLElement && this.renderRoot?.contains(active)) {
        active.blur();
      } else {
        super.blur?.();
      }
    }
  };

export default { focusVisibleStyles, FocusVisibleMixin, getNextRovingIndex };