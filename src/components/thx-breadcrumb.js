// @ts-check

/**
 * @fileoverview THX 1138 styled breadcrumb container component
 * @module thx-breadcrumb
 */

import { LitElement, html, css } from 'lit';

/**
 * Breadcrumb container component for navigation path display
 * THX 1138 style: monochrome, uppercase labels, monospace fonts
 * @element thx-breadcrumb
 */
export class ThxBreadcrumb extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--neutral-600, #666);
    }

    ::slotted(thx-breadcrumb-item:not(:last-child))::after {
      content: '/';
      margin: 0 8px;
      color: var(--neutral-600, #666);
    }

    /* Navigation path prefix */
    .breadcrumb-prefix {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      color: var(--neutral-600, #666);
      margin-right: 12px;
      letter-spacing: 0.15em;
    }

    .breadcrumb-prefix::before {
      content: '// ';
    }

    .breadcrumb-prefix::after {
      content: ' //';
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    label: { type: String },
  };

  constructor() {
    super();
    /** @type {string} Label prefix for the breadcrumb path */
    this.label = '';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      ${this.label ? html`<span class="breadcrumb-prefix">${this.label}</span>` : ''}
      <slot></slot>
    `;
  }
}

customElements.define('thx-breadcrumb', ThxBreadcrumb);
