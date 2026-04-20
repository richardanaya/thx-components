// @ts-check

/**
 * @fileoverview THX 1138 styled tab panel component
 * @module thx-tab-panel
 */

import { LitElement, html, css } from 'lit';

/**
 * Tab panel content container
 * THX 1138 style: clinical content areas
 * @element thx-tab-panel
 */
export class ThxTabPanel extends LitElement {
  static styles = css`
    :host {
      display: none;
      padding: 24px;
    }

    :host([active]) {
      display: block;
      animation: panelFadeIn 0.2s ease-out;
    }

    @keyframes panelFadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* CRT variant */
    :host([variant='crt']) {
      padding: 20px;
      background: var(--crt-bg-dark, #0a0a0a);
      color: var(--atmos-primary, #a6c8e1);
    }

    :host([variant='crt']) slot {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Compact variant */
    :host([variant='compact']) {
      padding: 16px 0;
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    id: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Panel ID (must match tab panel attribute) */
    this.id = '';
    /** @type {boolean} Whether this panel is active */
    this.active = false;
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

customElements.define('thx-tab-panel', ThxTabPanel);
