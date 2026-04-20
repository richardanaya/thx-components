// @ts-check

/**
 * @fileoverview THX 1138 styled select dropdown component
 * @module thx-select
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} SelectProps
 * @property {string} value - The selected value
 * @property {string} placeholder - The placeholder text
 * @property {string} label - The select label
 * @property {boolean} disabled - Whether the select is disabled
 * @property {boolean} required - Whether the select is required
 * @property {boolean} open - Whether the dropdown is open
 */

/**
 * @typedef {Object} OptionData
 * @property {string} value
 * @property {string} label
 * @property {boolean} disabled
 */

/**
 * THX 1138 styled select component
 * @extends {LitElement}
 */
export class ThxSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .label {
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

    .select-trigger {
      height: 40px;
      padding: 0 40px 0 12px;
      border: none;
      border-bottom: 2px solid var(--neutral-200, #e0e0e0);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: white;
      color: var(--neutral-800, #333);
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;
      width: 100%;
      box-sizing: border-box;
    }

    .select-trigger:hover {
      border-color: var(--neutral-600, #666);
    }

    .select-trigger:focus {
      outline: none;
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.3);
    }

    .select-trigger.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--neutral-200, #e0e0e0);
    }

    .select-trigger.open {
      border-color: var(--atmos-primary, #a6c8e1);
    }

    .placeholder {
      color: var(--neutral-600, #666);
    }

    .selected-value {
      color: var(--neutral-800, #333);
    }

    .arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      transition: transform 0.2s;
      pointer-events: none;
    }

    .arrow.open {
      transform: translateY(-50%) rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--neutral-200, #e0e0e0);
      border-top: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    .option {
      padding: 10px 12px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--neutral-800, #333);
      cursor: pointer;
      transition: background 0.15s;
    }

    .option:hover:not(.disabled) {
      background: var(--neutral-200, #e0e0e0);
    }

    .option.selected {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    .option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .no-options {
      padding: 12px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.75rem;
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      text-align: center;
    }
  `;

  static properties = {
    value: { type: String },
    placeholder: { type: String },
    label: { type: String },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean },
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} */
    this.value = '';
    /** @type {string} */
    this.placeholder = 'SELECT...';
    /** @type {string} */
    this.label = '';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.required = false;
    /** @type {boolean} */
    this.open = false;
  }

  /**
   * @returns {OptionData[]}
   */
  get options() {
    const slot = this.renderRoot?.querySelector('slot');
    const elements = slot?.assignedElements() || [];
    return elements.map(el => ({
      value: el.getAttribute('value') || '',
      label: el.getAttribute('label') || el.textContent?.trim() || '',
      disabled: el.hasAttribute('disabled'),
    }));
  }

  /**
   * @returns {string}
   */
  get selectedLabel() {
    const option = this.options.find(opt => opt.value === this.value);
    return option?.label || '';
  }

  /**
   * @returns {void}
   */
  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
  }

  /**
   * @returns {void}
   */
  close() {
    this.open = false;
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  select(value) {
    const option = this.options.find(opt => opt.value === value);
    if (option?.disabled) return;

    this.value = value;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  /**
   * @param {FocusEvent} _event
   * @returns {void}
   */
  handleBlur(_event) {
    // Delay to allow click events on dropdown to process
    setTimeout(() => {
      this.close();
    }, 150);
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {void}
   */
  handleKeyDown(event) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this.navigateOption(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.open) {
          this.navigateOption(-1);
        }
        break;
    }
  }

  /**
   * @param {number} direction
   * @returns {void}
   */
  navigateOption(direction) {
    const enabledOptions = this.options.filter(opt => !opt.disabled);
    const currentIndex = enabledOptions.findIndex(opt => opt.value === this.value);
    const newIndex = Math.max(0, Math.min(enabledOptions.length - 1, currentIndex + direction));
    if (enabledOptions[newIndex]) {
      this.select(enabledOptions[newIndex].value);
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const hasValue = this.value !== '';
    const displayValue = hasValue ? this.selectedLabel : this.placeholder;

    return html`
      <div class="select-wrapper">
        ${this.label
          ? html`
              <label class="label">
                ${this.label}${this.required
                  ? html`<span class="required-indicator">*</span>`
                  : null}
              </label>
            `
          : null}
        <div
          class="select-trigger ${this.disabled ? 'disabled' : ''} ${this.open ? 'open' : ''}"
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.toggle}
          @blur=${this.handleBlur}
          @keydown=${this.handleKeyDown}
          role="combobox"
          aria-expanded=${this.open}
          aria-haspopup="listbox"
        >
          <span class=${hasValue ? 'selected-value' : 'placeholder'}>${displayValue}</span>
          <svg class="arrow ${this.open ? 'open' : ''}" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <div class="dropdown ${this.open ? 'open' : ''}" role="listbox">
          ${this.options.length === 0
            ? html`<div class="no-options">NO OPTIONS</div>`
            : this.options.map(
                option => html`
                  <div
                    class="option ${option.value === this.value ? 'selected' : ''} ${option.disabled
                      ? 'disabled'
                      : ''}"
                    role="option"
                    aria-selected=${option.value === this.value}
                    @click=${() => this.select(option.value)}
                  >
                    ${option.label}
                  </div>
                `
              )}
        </div>
        <slot style="display: none;"></slot>
      </div>
    `;
  }
}

customElements.define('thx-select', ThxSelect);
