// @ts-check

/**
 * @fileoverview THX 1138 styled tag component for labels and categories.
 * @module thx-tag
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} TagConfig
 * @property {string} variant - Tag variant: 'default' | 'primary' | 'secondary' | 'outline'
 * @property {boolean} removable - Whether the tag can be removed
 * @property {string} size - Tag size: 'sm' | 'md'
 * @property {string} tagPrefix - Optional prefix text
 */

/**
 * Tag component for labels, categories, and metadata.
 * Styled with THX 1138 monospace uppercase aesthetic.
 *
 * @extends {LitElement}
 */
export class ThxTag extends LitElement {
  /** @type {import('lit').CSSResult} */
  static styles = css`
    :host {
      display: inline-flex;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid transparent;
      transition: all 0.15s;
      line-height: 1;
      cursor: default;
    }

    .tag--sm {
      padding: 3px 8px;
      font-size: 0.5625rem;
    }

    .tag--md {
      padding: 4px 10px;
      font-size: 0.625rem;
    }

    .tag--default {
      background: var(--neutral-200, #e0e0e0);
      color: var(--neutral-800, #333);
      border-color: var(--neutral-200, #e0e0e0);
    }

    .tag--primary {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
      border-color: var(--atmos-primary, #a6c8e1);
    }

    .tag--secondary {
      background: var(--atmos-secondary, #707e91);
      color: var(--neutral-100, #fafafa);
      border-color: var(--atmos-secondary, #707e91);
    }

    .tag--outline {
      background: transparent;
      color: var(--neutral-600, #666);
      border-color: var(--neutral-600, #666);
    }

    .tag--outline:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
    }

    .tag__remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      padding: 0;
      margin: -2px -4px -2px 0;
      background: none;
      border: none;
      cursor: pointer;
      color: currentColor;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.75rem;
      line-height: 1;
      opacity: 0.6;
      transition: opacity 0.15s;
    }

    .tag__remove:hover {
      opacity: 1;
    }

    .tag__remove:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    /* Prefix styling */
    .tag__prefix {
      color: var(--neutral-600, #666);
      font-weight: 400;
    }

    .tag--primary .tag__prefix,
    .tag--secondary .tag__prefix {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** Tag variant: 'default' | 'primary' | 'secondary' | 'outline' */
      variant: { type: String, reflect: true },
      /** Whether the tag can be removed */
      removable: { type: Boolean, reflect: true },
      /** Tag size: 'sm' | 'md' */
      size: { type: String, reflect: true },
      /** Optional prefix text (renamed to avoid conflict with HTMLElement.prefix) */
      tagPrefix: { type: String, attribute: 'tag-prefix' },
    };
  }

  constructor() {
    super();
    /** @type {string} */
    this.variant = 'default';
    /** @type {boolean} */
    this.removable = false;
    /** @type {string} */
    this.size = 'md';
    /** @type {string} */
    this.tagPrefix = '';
  }

  /**
   * Handle remove button click.
   * @returns {void}
   * @private
   */
  _handleRemove() {
    this.dispatchEvent(
      new CustomEvent('thx-remove', {
        bubbles: true,
        composed: true,
        detail: { tag: this },
      })
    );
  }

  /**
   * Render the tag component.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const classes = {
      tag: true,
      [`tag--${this.variant}`]: true,
      [`tag--${this.size}`]: true,
    };

    const classString = Object.entries(classes)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return html`
      <span class="${classString}">
        ${this.tagPrefix ? html`<span class="tag__prefix">${this.tagPrefix}</span>` : null}
        <slot></slot>
        ${this.removable
          ? html`
              <button
                class="tag__remove"
                @click=${this._handleRemove}
                aria-label="Remove tag"
                type="button"
              >
                ×
              </button>
            `
          : null}
      </span>
    `;
  }
}

customElements.define('thx-tag', ThxTag);
