// @ts-check

/**
 * @fileoverview THX 1138 styled radio button component
 * @module thx-radio
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} RadioProps
 * @property {boolean} checked - Whether the radio is checked
 * @property {boolean} disabled - Whether the radio is disabled
 * @property {string} value - The radio value
 * @property {string} name - The radio name (group)
 */

/**
 * THX 1138 styled radio button component
 * @extends {LitElement}
 */
export class ThxRadio extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .radio-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    input[type='radio'] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid var(--neutral-600, #666);
      border-radius: 50%;
      background: white;
      cursor: pointer;
      transition: all 0.15s;
      margin: 0;
      position: relative;
    }

    input[type='radio']:hover {
      border-color: var(--neutral-600, #666);
    }

    input[type='radio']:checked {
      border-color: var(--neutral-800, #333);
    }

    input[type='radio']:checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: var(--neutral-800, #333);
      border-radius: 50%;
    }

    input[type='radio']:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    .label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.8125rem;
      color: var(--neutral-800, #333);
      user-select: none;
    }

    :host([disabled]) .label {
      color: var(--neutral-600, #666);
    }
  `;

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    name: { type: String },
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
    this.name = '';
  }

  /**
   * @returns {void}
   */
  select() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: true, value: this.value, name: this.name },
      })
    );
  }

  /**
   * @param {MouseEvent} _event
   * @returns {void}
   */
  handleClick(_event) {
    this.select();
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {void}
   */
  handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  handleChange(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    if (target.checked) {
      this.select();
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <label
        class="radio-wrapper"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <input
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          .value=${this.value}
          .name=${this.name}
          @click=${(/** @type {MouseEvent} */ e) => e.stopPropagation()}
          @change=${this.handleChange}
        />
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}

customElements.define('thx-radio', ThxRadio);
