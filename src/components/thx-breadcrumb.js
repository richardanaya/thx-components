// @ts-check

/**
 * @fileoverview THX 1138 styled breadcrumb container component
 * @module thx-breadcrumb
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { focusVisibleStyles } from '../mixins/focus-visible.js';

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
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-4);
      color: var(--neutral-600, #666);
    }

    ::slotted(thx-breadcrumb-item:not(:last-child))::after {
      content: '/';
      margin: 0 var(--size-2);
      color: var(--neutral-600, #666);
    }

    /* Navigation path prefix */
    .breadcrumb-prefix {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      color: var(--neutral-600, #666);
      margin-right: calc(var(--size-2) + var(--size-1));
      letter-spacing: var(--font-letterspacing-5);
    }

    .breadcrumb-prefix::before {
      content: '// ';
    }

    .breadcrumb-prefix::after {
      content: ' //';
    }

    ${focusVisibleStyles}
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
   * Focus the first breadcrumb item (link) for keyboard navigation.
   * @returns {void}
   */
  focus() {
    const first = this.querySelector('thx-breadcrumb-item');
    first?.focus?.();
  }

  /**
   * Blur any focused descendant item.
   * @returns {void}
   */
  blur() {
    const activeEl = document.activeElement;
    if (activeEl && (this.contains(activeEl) || this.shadowRoot?.contains(activeEl))) {
      activeEl.blur();
    }
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
