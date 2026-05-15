// @ts-check

/**
 * @fileoverview THX 1138 styled color picker component
 * @module thx-color-picker
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { FormAssociatedMixin } from '../mixins/form-associated-mixin.js';
import { focusVisibleStyles } from '../mixins/focus-visible.js';

/**
 * @typedef {Object} ColorPickerProps
 * @property {string} value - The current color value (hex)
 * @property {boolean} disabled - Whether the picker is disabled
 * @property {string} label - The label for the color picker
 */

/**
 * THX 1138 styled color picker component
 * @extends {LitElement}
 */
export class ThxColorPicker extends FormAssociatedMixin(LitElement) {
  static styles = css`
    :host {
      display: inline-block;
    }

    .color-picker-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--size-1);
    }

    .label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-4);
      color: var(--neutral-600, #666);
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: calc(var(--size-2) + var(--size-1));
    }

    .color-swatch {
      width: calc(var(--size-7) + var(--size-2));
      height: calc(var(--size-7) + var(--size-2));
      border: var(--border-size-2) solid var(--neutral-600, #666);
      background: var(--neutral-100, #fafafa);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all var(--duration-quick-2);
    }

    .color-swatch:hover {
      border-color: var(--neutral-600, #666);
    }

    .color-swatch:focus-within {
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    .color-input {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      padding: 0;
      border: none;
    }

    .color-preview {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .value-display {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-2);
      color: var(--neutral-800, #333);
      padding: 0 calc(var(--size-2) + var(--size-1));
      height: calc(var(--size-7) + var(--size-2));
      display: flex;
      align-items: center;
      border-bottom: var(--border-size-2) solid var(--neutral-200, #e0e0e0);
      background: var(--neutral-100, #fafafa);
      min-width: var(--size-10);
      flex: 1;
    }

    :host([disabled]) .color-swatch,
    :host([disabled]) .color-input {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) .value-display {
      opacity: 0.5;
    }

    .swatch-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: var(--size-1);
      margin-top: var(--size-2);
    }

    .preset-swatch {
      width: var(--size-5);
      height: var(--size-5);
      border: var(--border-size-1) solid var(--neutral-600, #666);
      cursor: pointer;
      transition: all var(--duration-quick-2);
    }

    .preset-swatch:hover {
      border-color: var(--neutral-800, #333);
    }

    .preset-swatch.active {
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 0 1px var(--atmos-primary, #a6c8e1);
    }

    .preset-swatch:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring-glow, 0 0 0 2px rgba(166, 200, 225, 0.45));
    }

    ${focusVisibleStyles}
  `;

  static properties = {
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    name: { type: String },
    required: { type: Boolean },
  };

  constructor() {
    super();
    /** @type {string} */
    this.value = '#a6c8e1';
    this._defaultValue = this.value;
    /** @type {boolean} */
    this.disabled = false;
    /** @type {string} */
    this.label = 'COLOR';
    /** @type {string} */
    this.name = '';
    /** @type {boolean} */
    this.required = false;
  }

  firstUpdated() {
    this._defaultValue = this.value;
    this._updateFormValue?.();
  }

  _updateFormValue() {
    this._internals?.setFormValue(this.disabled ? null : this.value);
  }

  formResetCallback() {
    this.value = this._defaultValue;
  }

  /**
   * Preset THX 1138 colors
   * @type {string[]}
   */
  get presetColors() {
    return [
      '#a6c8e1', // atmos-primary
      '#707e91', // atmos-secondary
      '#deffff', // atmos-tertiary
      '#d4aa00', // accent-warning
      '#d44000', // accent-error
      '#333333', // neutral-800
      '#666666', // neutral-600
      '#fafafa', // neutral-100
      '#000000',
      '#ffffff',
      '#444444',
      '#999999',
      '#e0e0e0',
      '#cccccc',
      '#111111',
      '#0a0a0a',
    ];
  }

  /**
   * @param {string} color
   * @returns {void}
   */
  setColor(color) {
    if (this.disabled) return;
    this.value = color;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  /**
   * @param {InputEvent} event
   * @returns {void}
   */
  handleInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this.setColor(target.value);
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="color-picker-wrapper">
        ${this.label ? html`<label class="label">${this.label}</label>` : null}
        <div class="input-row">
          <div class="color-swatch">
            <div class="color-preview" style="background-color: ${this.value}"></div>
            <input
              class="color-input"
              type="color"
              .value=${this.value}
              ?disabled=${this.disabled}
              @input=${this.handleInput}
            />
          </div>
          <div class="value-display">${this.value.toUpperCase()}</div>
        </div>
        <div class="swatch-grid">
          ${this.presetColors.map(
            color => html`
              <div
                class="preset-swatch ${color === this.value ? 'active' : ''}"
                style="background-color: ${color}"
                @click=${() => this.setColor(color)}
                title="${color.toUpperCase()}"
              ></div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-color-picker', ThxColorPicker);
