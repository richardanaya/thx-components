// @ts-check

/**
 * @fileoverview THX 1138 styled tree navigation component
 * @module thx-tree
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { crtStaticScanlineOverlay } from '../styles/crt-effects.js';
import { focusVisibleStyles, getNextRovingIndex } from '../mixins/focus-visible.js';

// Forward declaration for type checking
/** @typedef {import('./thx-tree-item.js').ThxTreeItem} ThxTreeItem */

/**
 * Tree container for hierarchical data display
 * THX 1138 style: clinical hierarchical structure
 * @element thx-tree
 */
export class ThxTree extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--neutral-100, #fafafa);
      border: var(--border-size-1) solid rgba(0, 0, 0, 0.08);
      box-shadow: var(--inner-shadow-0);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .tree-header {
      padding: calc(var(--size-2) + var(--size-1)) var(--size-3);
      border-bottom: var(--border-size-1) solid rgba(0, 0, 0, 0.08);
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-5);
      color: var(--neutral-600, #666);
      background: rgba(0, 0, 0, 0.02);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tree-header::before {
      content: '// ';
    }

    .tree-header::after {
      content: ' //';
    }

    .tree-controls {
      display: flex;
      gap: var(--size-2);
    }

    .tree-control {
      font-size: var(--font-size-00);
      padding: var(--size-1) var(--size-2);
      background: transparent;
      border: var(--border-size-1) solid var(--atmos-secondary, #707e91);
      color: var(--atmos-secondary, #707e91);
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-4);
      font-family: inherit;
    }

    .tree-control:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
    }

    .tree-list {
      list-style: none;
      margin: 0;
      padding: var(--size-2) 0;
    }

    ::slotted(thx-tree-item) {
      display: block;
    }

    /* CRT variant */
    :host([variant='crt']) {
      background: var(--crt-bg, #111);
      border: calc(var(--size-2) + var(--size-1)) solid var(--crt-border, #2a2a2a);
      border-radius: var(--size-1);
      box-shadow: inset 0 0 var(--size-4) rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    :host([variant='crt']) .tree-header {
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

    :host([variant='compact']) .tree-header {
      background: transparent;
      padding: var(--size-2) 0;
    }

    /* Selection mode indicator */
    :host([selection='single']) .tree-header::after {
      content: ' // SINGLE SELECT';
    }

    :host([selection='multiple']) .tree-header::after {
      content: ' // MULTI SELECT';
    }

    ${focusVisibleStyles}
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    label: { type: String },
    variant: { type: String, reflect: true },
    selection: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Tree header label */
    this.label = '';
    /** @type {string} Variant: default, crt, compact */
    this.variant = 'default';
    /** @type {string} Selection mode: none, single, multiple */
    this.selection = 'none';
  }

  firstUpdated() {
    // Initialize roving tabindex so tree is single tab-stop
    this._updateRovingTabindex();
  }

  /**
   * Public focus: focuses the first visible item (or selected) for keyboard entry.
   * @returns {void}
   */
  focus() {
    const items = this._getVisibleItems();
    if (!items.length) return;
    // Prefer a selected one, else first
    const preferred = items.find(i => i.selected) || items[0];
    preferred.focus?.();
    this._updateRovingTabindex(preferred);
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
   * Ensure only one visible treeitem has tabindex=0 (roving), others -1.
   * Makes tree keyboard navigation first-class (single tab stop).
   * @param {ThxTreeItem|null} [focusedItem]
   * @returns {void}
   * @private
   */
  _updateRovingTabindex(focusedItem = null) {
    const items = this._getVisibleItems();
    if (!items.length) return;
    const target = focusedItem || items.find(i => i.selected) || items[0];
    items.forEach(item => {
      const thxItem = /** @type {ThxTreeItem} */ (/** @type {unknown} */ (item));
      thxItem.setAttribute('tabindex', thxItem === target ? '0' : '-1');
    });
  }

  /** @returns {ThxTreeItem[]} */
  _getVisibleItems() {
    const items = Array.from(this.querySelectorAll('thx-tree-item')).filter(
      item => !(/** @type {ThxTreeItem} */ (/** @type {unknown} */ (item)).disabled)
    );
    return /** @type {ThxTreeItem[]} */ (
      items.filter(item => {
        let parent = item.parentElement?.closest('thx-tree-item');
        while (parent) {
          if (!(/** @type {ThxTreeItem} */ (/** @type {unknown} */ (parent)).expanded))
            return false;
          parent = parent.parentElement?.closest('thx-tree-item');
        }
        return true;
      })
    );
  }

  /**
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  _handleKeydown(e) {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End', 'Enter', ' '];
    if (!keys.includes(e.key)) return;

    const items = this._getVisibleItems();
    if (items.length === 0) return;

    // Robust current index detection for roving
    let currentIndex = items.findIndex(item => {
      const activeEl = document.activeElement;
      if (item === activeEl) return true;
      if (item.shadowRoot?.activeElement) return true;
      const div = item.renderRoot?.querySelector('[role="treeitem"]');
      return div && (div === activeEl || activeEl === item);
    });
    if (currentIndex < 0) {
      currentIndex = items.findIndex(i => i.selected);
      if (currentIndex < 0) currentIndex = 0;
    }

    const current = items[currentIndex];
    e.preventDefault();

    if (e.key === 'Enter' || e.key === ' ') {
      current.select();
      return;
    }

    if (e.key === 'ArrowRight') {
      if (current.hasChildren && !current.expanded) {
        current.toggle();
        // After expand, visible items may change; re-init roving
        this.updateComplete.then(() => {
          const newItems = this._getVisibleItems();
          const next = newItems.find(i => i === current) || newItems[0];
          this._focusItem(next);
          this._updateRovingTabindex(next);
        });
      } else {
        const nextIdx = Math.min(currentIndex + 1, items.length - 1);
        this._focusItem(items[nextIdx]);
        this._updateRovingTabindex(items[nextIdx]);
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      if (current.hasChildren && current.expanded) {
        current.toggle();
        this._updateRovingTabindex(current);
      } else {
        const parent = /** @type {ThxTreeItem|null} */ (
          /** @type {unknown} */ (current.parentElement?.closest('thx-tree-item'))
        );
        const target = parent || current;
        this._focusItem(target);
        this._updateRovingTabindex(target);
      }
      return;
    }

    let direction;
    if (e.key === 'Home') direction = 'first';
    else if (e.key === 'End') direction = 'last';
    else if (e.key === 'ArrowDown') direction = 'next';
    else direction = 'prev';

    const result = getNextRovingIndex(items, currentIndex, direction);
    const nextItem = /** @type {ThxTreeItem} */ (/** @type {unknown} */ (result.item || items[result.index]));
    if (nextItem) {
      this._focusItem(nextItem);
      this._updateRovingTabindex(nextItem);
    }
  }

  /**
   * @param {ThxTreeItem|undefined|null} item
   * @returns {void}
   */
  _focusItem(item) {
    if (!item) return;
    item.focus?.();
    // Ensure roving is set so only this one is in tab order
    this._updateRovingTabindex(item);
  }

  /**
   * Expand all tree items
   * @returns {void}
   */
  expandAll() {
    const items = this.querySelectorAll('thx-tree-item');
    items.forEach(item => {
      const treeItem = /** @type {ThxTreeItem} */ (/** @type {unknown} */ (item));
      treeItem.expanded = true;
    });
  }

  /**
   * Collapse all tree items
   * @returns {void}
   */
  collapseAll() {
    const items = this.querySelectorAll('thx-tree-item');
    items.forEach(item => {
      const treeItem = /** @type {ThxTreeItem} */ (/** @type {unknown} */ (item));
      treeItem.expanded = false;
    });
  }

  /**
   * Get selected items
   * @returns {Array<ThxTreeItem>}
   */
  getSelectedItems() {
    const items = this.querySelectorAll('thx-tree-item');
    return Array.from(items)
      .map(item => /** @type {ThxTreeItem} */ (/** @type {unknown} */ (item)))
      .filter(item => item.selected);
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      ${this.variant === 'crt' ? html`<span class="crt-label">TREE-01</span>` : ''}
      ${this.label
        ? html`
            <div class="tree-header">
              <span>${this.label}</span>
              <div class="tree-controls">
                <button class="tree-control" @click="${this.expandAll}">Expand</button>
                <button class="tree-control" @click="${this.collapseAll}">Collapse</button>
              </div>
            </div>
          `
        : ''}
      <ul class="tree-list" role="tree" @keydown="${this._handleKeydown}">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('thx-tree', ThxTree);
