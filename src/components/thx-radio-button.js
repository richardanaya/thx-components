// @ts-check

/**
 * @fileoverview THX 1138 styled radio button (button style) component
 * @module thx-radio-button
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} RadioButtonProps
 * @property {boolean} checked - Whether the radio button is checked
 * @property {boolean} disabled - Whether the radio button is disabled
 * @property {string} value - The radio button value
 * @property {string} size - The size (sm, md, lg)
 */

/**
 * THX 1138 styled radio button component with button appearance
 * @extends {LitElement}
 */
export class ThxRadioButton extends LitElement {
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
      border: 1px solid var(--atmos-secondary, #707e91);
      cursor: pointer;
      transition: all 0.15s;
      background: transparent;
      color: var(--atmos-secondary, #707e91);
    }

    button:hover:not(:disabled) {
      background: rgba(166, 200, 225, 0.1);
      color: var(--atmos-primary, #a6c8e1);
    }

    button.active {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
      border-color: var(--atmos-primary, #a6c8e1);
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

    button:active:not(:disabled) {
      transform: translateY(1px);
    }
  `;

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    size: { type: String },
  };

  constructor() {
    super();
    /** @type {boolean} */
    this.checked = false;
    /** @type {boolean} */
    this.disabled = false;
    /** @type {string} */
    this.value = '';
    /** @type {string} */
    this.size = 'md';
  }

  /**
   * @returns {void}
   */
  select() {
    if (this.disabled) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: true, value: this.value },
      })
    );
  }

  /**
   * @returns {void}
   */
  handleClick() {
    this.select();
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const classes = `size-${this.size} ${this.checked ? 'active' : ''}`;
    return html`
      <button
        class=${classes}
        ?disabled=${this.disabled}
        role="radio"
        aria-checked=${this.checked}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('thx-radio-button', ThxRadioButton);
