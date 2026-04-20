// @ts-check

/**
 * @fileoverview THX 1138 styled multi-select component
 * @module thx-multi-select
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} MultiSelectOption
 * @property {string} value
 * @property {string} label
 * @property {boolean} disabled
 * @property {boolean} selected
 */

/**
 * THX 1138 styled multi-select component
 * Allows selecting multiple options with checkboxes
 * @extends {LitElement}
 */
export class ThxMultiSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .multi-select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .label {
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--neutral-600, #666);
    }

    .required-indicator {
      color: var(--accent-error, #d44000);
      margin-left: 2px;
    }

    .trigger {
      height: 40px;
      padding: 0 40px 0 12px;
      border: none;
      border-bottom: 2px solid #ccc;
      font-family: inherit;
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

    .trigger:hover {
      border-color: #666;
    }

    .trigger:focus {
      outline: none;
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.3);
    }

    .trigger.open {
      border-color: var(--atmos-primary, #a6c8e1);
    }

    .trigger.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--neutral-200, #e0e0e0);
    }

    .placeholder {
      color: #aaa;
    }

    .selected-text {
      color: var(--neutral-800, #333);
    }

    .arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
      color: var(--neutral-600, #666);
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
      border: 1px solid var(--atmos-primary, #a6c8e1);
      border-top: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      max-height: 250px;
      overflow-y: auto;
      display: none;
    }

    .dropdown.open {
      display: block;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--neutral-800, #333);
      cursor: pointer;
      transition: all 0.15s;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    }

    .option:last-child {
      border-bottom: none;
    }

    .option:hover {
      background: rgba(166, 200, 225, 0.08);
    }

    .option.selected {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    .option.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .checkbox {
      width: 16px;
      height: 16px;
      border: 2px solid #999;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option.selected .checkbox {
      border-color: #444;
      background: #444;
    }

    .checkbox::after {
      content: '';
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) translate(-1px, -1px);
      display: none;
    }

    .option.selected .checkbox::after {
      display: block;
    }

    .no-options {
      padding: 16px;
      text-align: center;
      color: var(--neutral-600, #666);
      font-size: 0.75rem;
    }

    .select-container {
      position: relative;
    }

    .badge-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
      font-size: 0.6875rem;
      font-weight: 600;
      margin-left: 8px;
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      disabled: { type: Boolean, reflect: true },
      required: { type: Boolean },
      open: { type: Boolean, reflect: true },
      value: { type: Array },
    };
  }

  constructor() {
    super();
    /** @type {string} */
    this.label = '';
    /** @type {string} */
    this.placeholder = 'SELECT...';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.required = false;
    /** @type {boolean} */
    this.open = false;
    /** @type {string[]} */
    this.value = /** @type {string[]} */ ([]);
  }

  /**
   * @returns {Element[]}
   */
  get options() {
    const slot = this.renderRoot?.querySelector('slot');
    return Array.from(slot?.assignedElements() || []);
  }

  /**
   * @returns {MultiSelectOption[]}
   */
  get optionData() {
    return this.options.map(el => ({
      value: el.getAttribute('value') || '',
      label: el.textContent?.trim() || '',
      disabled: el.hasAttribute('disabled'),
      selected: this.value.includes(el.getAttribute('value') || ''),
    }));
  }

  /**
   * @returns {string}
   */
  get displayValue() {
    const selected = this.optionData.filter(opt => opt.selected);
    if (selected.length === 0) {
      return this.placeholder;
    }
    if (selected.length === 1) {
      return selected[0].label;
    }
    return `${selected[0].label} +${selected.length - 1}`;
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
  toggleOption(value) {
    const index = this.value.indexOf(value);
    if (index > -1) {
      this.value = this.value.filter(v => v !== value);
    } else {
      this.value = [...this.value, value];
    }
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  /**
   * @param {MouseEvent} e
   * @returns {void}
   */
  handleOptionClick(e) {
    const target = /** @type {Element} */ (e.currentTarget);
    const value = target.getAttribute('data-value') || '';
    this.toggleOption(value);
  }

  /**
   * @param {FocusEvent} e
   * @returns {void}
   */
  handleBlur(e) {
    const relatedTarget = /** @type {Node|null} */ (e.relatedTarget);
    if (relatedTarget && !this.contains(relatedTarget)) {
      this.close();
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const hasValue = this.value.length > 0;
    const selectedCount = this.value.length;

    return html`
      <div class="multi-select-wrapper">
        ${this.label
          ? html`
              <label class="label">
                ${this.label}${this.required
                  ? html`<span class="required-indicator">*</span>`
                  : null}
              </label>
            `
          : null}
        <div class="select-container">
          <div
            class="trigger ${this.disabled ? 'disabled' : ''} ${this.open ? 'open' : ''}"
            tabindex=${this.disabled ? '-1' : '0'}
            @click=${this.toggle}
            @blur=${this.handleBlur}
            role="combobox"
            aria-expanded=${this.open}
            aria-multiselectable="true"
          >
            <span class=${hasValue ? 'selected-text' : 'placeholder'}> ${this.displayValue} </span>
            ${selectedCount > 0 ? html`<span class="badge-count">${selectedCount}</span>` : ''}
            <svg class="arrow ${this.open ? 'open' : ''}" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          <div class="dropdown ${this.open ? 'open' : ''}" role="listbox">
            ${this.options.length === 0
              ? html`<div class="no-options">NO OPTIONS</div>`
              : this.optionData.map(
                  option => html`
                    <div
                      class="option ${option.selected ? 'selected' : ''} ${option.disabled
                        ? 'disabled'
                        : ''}"
                      role="option"
                      aria-selected=${option.selected}
                      data-value=${option.value}
                      @click=${option.disabled ? null : this.handleOptionClick}
                    >
                      <span class="checkbox"></span>
                      <span>${option.label}</span>
                    </div>
                  `
                )}
          </div>
        </div>
        <slot style="display: none;"></slot>
      </div>
    `;
  }
}

customElements.define('thx-multi-select', ThxMultiSelect);
