// @ts-check

/**
 * @fileoverview THX 1138 styled breadcrumb item component
 * @module thx-breadcrumb-item
 */

import { LitElement, html, css } from 'lit';

/**
 * Individual breadcrumb item with link or text
 * THX 1138 style: clinical navigation paths
 * @element thx-breadcrumb-item
 */
export class ThxBreadcrumbItem extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    a {
      color: var(--atmos-primary, #a6c8e1);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.15s;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    a:hover {
      color: var(--atmos-tertiary, #deffff);
      border-bottom-color: var(--atmos-primary, #a6c8e1);
      text-shadow: 0 0 8px rgba(166, 200, 225, 0.5);
    }

    span {
      color: var(--neutral-800, #333);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Separator injected by parent */
    ::after {
      content: '';
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    href: { type: String },
    current: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} URL for link items */
    this.href = '';
    /** @type {boolean} Whether this is the current/active item */
    this.current = false;
  }

  /**
   * Handle click events
   * @param {MouseEvent} e
   * @returns {void}
   */
  _handleClick(e) {
    if (this.current) {
      e.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('breadcrumb-click', {
        bubbles: true,
        composed: true,
        detail: { href: this.href },
      })
    );
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    if (this.current || !this.href) {
      return html`<span aria-current="page"><slot></slot></span>`;
    }

    return html`
      <a href="${this.href}" @click="${this._handleClick}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('thx-breadcrumb-item', ThxBreadcrumbItem);
