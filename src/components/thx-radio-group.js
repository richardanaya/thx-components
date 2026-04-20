// @ts-check

/**
 * @fileoverview THX 1138 styled radio group component
 * @module thx-radio-group
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} RadioGroupProps
 * @property {string} value - The currently selected value
 * @property {string} name - The name of the radio group
 * @property {string} label - The group label
 * @property {string} orientation - Layout orientation (horizontal, vertical)
 * @property {boolean} disabled - Whether the entire group is disabled
 * @property {boolean} required - Whether selection is required
 */

/**
 * @typedef {Object} RadioOption
 * @property {string} value
 * @property {string} label
 * @property {boolean} [disabled]
 */

/**
 * THX 1138 styled radio group component
 * @extends {LitElement}
 */
export class ThxRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .group-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--neutral-600, #666);
    }

    .required-indicator {
      color: var(--accent-error, #d44000);
      margin-left: 2px;
    }

    .radio-container {
      display: flex;
      gap: 16px;
    }

    .orientation-horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .orientation-vertical {
      flex-direction: column;
    }

    :host([disabled]) {
      opacity: 0.5;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .radio-option input[type='radio'] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid #999;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      transition: all 0.15s;
      margin: 0;
    }

    .radio-option input[type='radio']:hover {
      border-color: #666;
    }

    .radio-option input[type='radio']:checked {
      border-color: #444;
    }

    .radio-option input[type='radio']:checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #444;
      border-radius: 50%;
    }

    .radio-option input[type='radio']:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    .radio-option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .radio-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.8125rem;
      color: var(--neutral-800, #333);
      user-select: none;
    }

    .radio-option.disabled .radio-label {
      color: var(--neutral-600, #666);
    }

    /* Button style variant */
    .button-group {
      display: inline-flex;
      border: 1px solid var(--atmos-secondary, #707e91);
    }

    .button-group .radio-option {
      display: flex;
      padding: 8px 16px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      background: transparent;
      color: var(--atmos-secondary, #707e91);
      border-right: 1px solid var(--atmos-secondary, #707e91);
      cursor: pointer;
      transition: all 0.15s;
      margin: 0;
    }

    .button-group .radio-option:last-child {
      border-right: none;
    }

    .button-group .radio-option:hover:not(.disabled) {
      background: rgba(166, 200, 225, 0.1);
      color: var(--atmos-primary, #a6c8e1);
    }

    .button-group .radio-option.selected {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }
  `;

  static properties = {
    value: { type: String },
    name: { type: String },
    label: { type: String },
    orientation: { type: String },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean },
    variant: { type: String },
  };

  constructor() {
    super();
    /** @type {string} */
    this.value = '';
    /** @type {string} */
    this.name = '';
    /** @type {string} */
    this.label = '';
    /** @type {string} */
    this.orientation = 'vertical';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.required = false;
    /** @type {string} */
    this.variant = 'default';
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  select(value) {
    if (this.disabled) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, name: this.name },
      })
    );
  }

  /**
   * @returns {RadioOption[]}
   */
  get options() {
    const slot = this.renderRoot?.querySelector('slot');
    const elements = slot?.assignedElements() || [];
    return elements.map(el => ({
      value: el.getAttribute('value') || '',
      label: el.textContent?.trim() || '',
      disabled: el.hasAttribute('disabled'),
    }));
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const isButtonVariant = this.variant === 'button';

    return html`
      <div class="group-wrapper" role="radiogroup" aria-labelledby="group-label">
        ${this.label
          ? html`
              <label class="group-label" id="group-label">
                ${this.label}${this.required
                  ? html`<span class="required-indicator">*</span>`
                  : null}
              </label>
            `
          : null}
        <div
          class="radio-container ${isButtonVariant
            ? 'button-group'
            : `orientation-${this.orientation}`}"
        >
          <slot
            @slotchange=${() => this.requestUpdate()}
            @change=${(/** @type {CustomEvent} */ e) => {
              e.stopPropagation();
              const detail = /** @type {{value: string}} */ (e.detail);
              this.select(detail.value);
            }}
          ></slot>
          ${!this.querySelector('thx-radio, thx-radio-button')
            ? html` <!-- Default radio options if no child elements provided --> `
            : null}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-radio-group', ThxRadioGroup);
