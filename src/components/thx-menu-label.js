// @ts-check

/**
 * @fileoverview THX 1138 styled menu label component
 * @module thx-menu-label
 */

import { LitElement, html, css } from 'lit';

/**
 * Menu label for grouping/categorizing menu items
 * THX 1138 style: section dividers with monospace identifiers
 * @element thx-menu-label
 */
export class ThxMenuLabel extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 8px 16px;
      margin-top: 8px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--neutral-600, #666);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    :host::before {
      content: '// ';
    }

    :host::after {
      content: ' //';
    }

    /* First label shouldn't have top margin */
    :host(:first-child) {
      margin-top: 0;
    }

    /* CRT variant */
    :host([variant='crt']) {
      color: var(--atmos-secondary, #707e91);
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    /* Compact variant */
    :host([variant='compact']) {
      padding: 8px 0;
      margin-top: 4px;
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Variant inherited from parent */
    this.variant = 'default';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('thx-menu-label', ThxMenuLabel);
