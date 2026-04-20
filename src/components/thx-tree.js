// @ts-check

/**
 * @fileoverview THX 1138 styled tree navigation component
 * @module thx-tree
 */

import { LitElement, html, css } from 'lit';

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
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .tree-header {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
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
      gap: 8px;
    }

    .tree-control {
      font-size: 0.5625rem;
      padding: 4px 8px;
      background: transparent;
      border: 1px solid var(--atmos-secondary, #707e91);
      color: var(--atmos-secondary, #707e91);
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-family: inherit;
    }

    .tree-control:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
    }

    .tree-list {
      list-style: none;
      margin: 0;
      padding: 8px 0;
    }

    ::slotted(thx-tree-item) {
      display: block;
    }

    /* CRT variant */
    :host([variant='crt']) {
      background: var(--crt-bg, #111);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    :host([variant='crt']) .tree-header {
      background: transparent;
      color: var(--atmos-secondary, #707e91);
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    :host([variant='crt'])::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(166, 200, 225, 0.04) 2px,
        rgba(166, 200, 225, 0.04) 4px
      );
      pointer-events: none;
      z-index: 10;
    }

    :host([variant='crt']) .crt-label {
      position: absolute;
      top: 4px;
      right: 8px;
      font-size: 0.625rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      z-index: 15;
    }

    /* Compact variant */
    :host([variant='compact']) {
      border: none;
      box-shadow: none;
      background: transparent;
    }

    :host([variant='compact']) .tree-header {
      background: transparent;
      padding: 8px 0;
    }

    /* Selection mode indicator */
    :host([selection='single']) .tree-header::after {
      content: ' // SINGLE SELECT';
    }

    :host([selection='multiple']) .tree-header::after {
      content: ' // MULTI SELECT';
    }
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
      <ul class="tree-list" role="tree">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('thx-tree', ThxTree);
