// @ts-check

/**
 * @fileoverview THX 1138 styled color picker component
 * @module thx-color-picker
 */

import { LitElement, html, css } from 'lit';

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
export class ThxColorPicker extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .color-picker-wrapper {
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

    .input-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .color-swatch {
      width: 40px;
      height: 40px;
      border: 2px solid #999;
      background: white;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.15s;
    }

    .color-swatch:hover {
      border-color: #666;
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
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--neutral-800, #333);
      padding: 0 12px;
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #ccc;
      background: white;
      min-width: 80px;
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
      gap: 4px;
      margin-top: 8px;
    }

    .preset-swatch {
      width: 24px;
      height: 24px;
      border: 1px solid #999;
      cursor: pointer;
      transition: all 0.15s;
    }

    .preset-swatch:hover {
      border-color: #444;
      transform: scale(1.1);
    }

    .preset-swatch.active {
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 0 1px var(--atmos-primary, #a6c8e1);
    }
  `;

  static properties = {
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
  };

  constructor() {
    super();
    /** @type {string} */
    this.value = '#a6c8e1';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {string} */
    this.label = 'COLOR';
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
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
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
