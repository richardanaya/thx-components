// @ts-check

/**
 * @fileoverview THX 1138 styled menu container component
 * @module thx-menu
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { crtStaticScanlineOverlay } from '../styles/crt-effects.js';
import { focusVisibleStyles, getNextRovingIndex } from '../mixins/focus-visible.js';

/**
 * Menu container for navigation lists
 * THX 1138 style: clinical, border-separated, monospace labels
 * @element thx-menu
 */
export class ThxMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--neutral-100, #fafafa);
      border: var(--border-size-1) solid rgba(0, 0, 0, 0.08);
      box-shadow: var(--inner-shadow-0);
      min-width: 200px;
    }

    .menu-header {
      padding: calc(var(--size-2) + var(--size-1)) var(--size-3);
      border-bottom: var(--border-size-1) solid rgba(0, 0, 0, 0.08);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-5);
      color: var(--neutral-600, #666);
      background: rgba(0, 0, 0, 0.02);
    }

    .menu-header::before {
      content: '// ';
    }

    .menu-header::after {
      content: ' //';
    }

    .menu-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ::slotted(thx-menu-label) {
      display: block;
    }

    ::slotted(thx-menu-item) {
      display: block;
    }

    /* CRT display variant */
    :host([variant='crt']) {
      background: var(--crt-bg, #111);
      border: calc(var(--size-2) + var(--size-1)) solid var(--crt-border, #2a2a2a);
      border-radius: var(--size-1);
      box-shadow: inset 0 0 var(--size-4) rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    :host([variant='crt']) .menu-header {
      background: transparent;
      color: var(--atmos-secondary, #707e91);
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    /* CRT scanline for variant=crt (shared) */
    ${crtStaticScanlineOverlay(':host([variant="crt"])', { opacity: 0.04 })}

    :host([variant='crt']) .crt-label {
      position: absolute;
      top: var(--size-1);
      right: var(--size-2);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-4);
      z-index: calc(var(--layer-2) + 5);
    }

    /* Compact variant */
    :host([variant='compact']) {
      border: none;
      box-shadow: none;
      background: transparent;
    }

    :host([variant='compact']) .menu-header {
      background: transparent;
      padding: var(--size-2) 0;
      border-bottom: var(--border-size-1) solid rgba(0, 0, 0, 0.06);
    }

    ${focusVisibleStyles}
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    label: { type: String },
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Header label text */
    this.label = '';
    /** @type {string} Variant: default, crt, compact */
    this.variant = 'default';
  }

  /**
   * Public focus: focuses first enabled menu item.
   * @returns {void}
   */
  focus() {
    const items = this._getItems();
    if (!items.length) return;
    const first = items[0];
    first.focus?.();
    this._updateRovingTabindex(first);
  }

  /**
   * Public blur.
   * @returns {void}
   */
  blur() {
    const activeEl = document.activeElement;
    if (activeEl && (this.contains(activeEl) || this.shadowRoot?.contains(activeEl))) {
      activeEl.blur();
    }
  }

  /**
   * Roving tabindex: only one menuitem gets 0, making menu a single tab stop.
   * @param {HTMLElement|null} [focusedItem]
   * @returns {void}
   * @private
   */
  _updateRovingTabindex(focusedItem = null) {
    const items = this._getItems();
    if (!items.length) return;
    const target = focusedItem || items[0];
    items.forEach(item => {
      const isTarget = item === target;
      item.setAttribute('tabindex', isTarget ? '0' : '-1');
    });
  }

  firstUpdated() {
    this._updateRovingTabindex();
  }

  /** @returns {HTMLElement[]} */
  _getItems() {
    return /** @type {HTMLElement[]} */ (
      Array.from(this.querySelectorAll('thx-menu-item')).filter(
        item => !(/** @type {HTMLElement & {disabled?: boolean}} */ (item).disabled)
      )
    );
  }

  /**
   * @param {HTMLElement|undefined} item
   * @returns {void}
   */
  _focusItem(item) {
    if (!item) return;
    item.focus?.();
    this._updateRovingTabindex(item);
  }

  /**
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  _handleKeydown(e) {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '];
    if (!keys.includes(e.key)) return;

    const items = this._getItems();
    if (items.length === 0) return;

    // Find current roving focused item
    let currentIndex = items.findIndex(item => {
      const activeEl = document.activeElement;
      if (item === activeEl) return true;
      if (item.shadowRoot?.activeElement) return true;
      const inner = item.renderRoot?.querySelector('[role="menuitem"]');
      return inner && (inner === activeEl || activeEl === item);
    });
    if (currentIndex < 0) currentIndex = 0;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const currentItem = /** @type {HTMLElement & {activate?: () => void}|undefined} */ (
        items[currentIndex]
      );
      currentItem?.activate?.();
      return;
    }

    e.preventDefault();

    let direction;
    if (e.key === 'Home') direction = 'first';
    else if (e.key === 'End') direction = 'last';
    else if (e.key === 'ArrowDown') direction = 'next';
    else direction = 'prev';

    const result = getNextRovingIndex(items, currentIndex, direction);
    const nextItem = /** @type {HTMLElement} */ (/** @type {unknown} */ (result.item || items[result.index]));
    if (nextItem) {
      this._focusItem(nextItem);
      this._updateRovingTabindex(nextItem);
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      ${this.variant === 'crt' ? html`<span class="crt-label">MENU-01</span>` : ''}
      ${this.label ? html`<div class="menu-header">${this.label}</div>` : ''}
      <ul class="menu-list" role="menu" @keydown="${this._handleKeydown}">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('thx-menu', ThxMenu);
