// @ts-check

/**
 * @fileoverview THX 1138 styled button component
 * @module thx-button
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} ButtonProps
 * @property {string} variant - The button variant (primary, secondary, warning, error, outline-primary, outline-secondary, outline-warning, ghost)
 * @property {string} size - The button size (sm, md, lg)
 * @property {boolean} disabled - Whether the button is disabled
 * @property {boolean} loading - Whether the button shows loading state
 * @property {string} type - The button type (button, submit, reset)
 */

/**
 * THX 1138 styled button component
 * @extends {LitElement}
 */
export class ThxButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      border: none;
      cursor: pointer;
      transition: all 0.15s;
      position: relative;
      overflow: hidden;
      font-weight: 600;
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Sizes */
    .size-sm {
      padding: 6px 12px;
      font-size: 0.5625rem;
      height: 28px;
    }

    .size-md {
      padding: 10px 20px;
      font-size: 0.6875rem;
      height: 40px;
    }

    .size-lg {
      padding: 14px 28px;
      font-size: 0.75rem;
      height: 48px;
    }

    /* Grouped - for use in button groups */
    :host([grouped]) {
      display: block;
    }

    :host([grouped]) button {
      border-radius: 0;
      width: 100%;
      height: 36px;
      padding: 8px 16px;
    }

    :host([grouped]) .size-sm {
      height: 28px;
      padding: 6px 12px;
    }

    :host([grouped]) .size-lg {
      height: 44px;
      padding: 12px 24px;
    }

    /* Primary */
    .variant-primary {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    .variant-primary:hover:not(:disabled) {
      background: var(--atmos-tertiary, #deffff);
      box-shadow: 0 0 15px rgba(166, 200, 225, 0.5);
    }

    /* Secondary */
    .variant-secondary {
      background: var(--atmos-secondary, #707e91);
      color: var(--neutral-100, #fafafa);
    }

    .variant-secondary:hover:not(:disabled) {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    /* Warning */
    .variant-warning {
      background: var(--accent-warning, #d4aa00);
      color: var(--neutral-800, #333);
    }

    .variant-warning:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(212, 170, 0, 0.5);
    }

    /* Error */
    .variant-error {
      background: var(--accent-error, #d44000);
      color: var(--neutral-100, #fafafa);
    }

    .variant-error:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(212, 64, 0, 0.5);
    }

    /* Outline variants */
    .variant-outline-primary {
      background: transparent;
      color: var(--atmos-primary, #a6c8e1);
      border: 1px solid var(--atmos-primary, #a6c8e1);
    }

    .variant-outline-primary:hover:not(:disabled) {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    .variant-outline-secondary {
      background: transparent;
      color: var(--atmos-secondary, #707e91);
      border: 1px solid var(--atmos-secondary, #707e91);
    }

    .variant-outline-secondary:hover:not(:disabled) {
      background: var(--atmos-secondary, #707e91);
      color: var(--neutral-100, #fafafa);
    }

    .variant-outline-warning {
      background: transparent;
      color: var(--accent-warning, #d4aa00);
      border: 1px solid var(--accent-warning, #d4aa00);
    }

    .variant-outline-warning:hover:not(:disabled) {
      background: var(--accent-warning, #d4aa00);
      color: var(--neutral-800, #333);
    }

    /* Ghost */
    .variant-ghost {
      background: transparent;
      color: var(--neutral-600, #666);
      border: 1px solid transparent;
    }

    .variant-ghost:hover:not(:disabled) {
      color: var(--atmos-primary, #a6c8e1);
      border-color: var(--atmos-primary, #a6c8e1);
    }

    /* Loading state */
    .loading {
      pointer-events: none;
    }

    .loading::after {
      content: '';
      width: 12px;
      height: 12px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      margin-left: 8px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    button:active:not(:disabled) {
      transform: translateY(1px);
    }
  `;

  static properties = {
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean },
    loading: { type: Boolean },
    type: { type: String },
    /** When true, adjusts styling for use in button groups */
    grouped: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} */
    this.variant = 'primary';
    /** @type {string} */
    this.size = 'md';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.loading = false;
    /** @type {string} */
    this.type = 'button';
    /** @type {boolean} */
    this.grouped = false;
  }

  /**
   * @param {MouseEvent} event
   * @returns {void}
   */
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      })
    );
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const classes = `size-${this.size} variant-${this.variant} ${this.loading ? 'loading' : ''}`;
    return html`
      <button
        class=${classes}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('thx-button', ThxButton);
