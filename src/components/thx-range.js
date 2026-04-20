// @ts-check

/**
 * @fileoverview THX 1138 styled range slider component
 * @module thx-range
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} RangeProps
 * @property {number} value - The current value
 * @property {number} min - The minimum value
 * @property {number} max - The maximum value
 * @property {number} step - The step increment
 * @property {boolean} disabled - Whether the slider is disabled
 * @property {string} label - The label text
 * @property {boolean} showValue - Whether to show the current value
 * @property {string} valueFormat - Format string for value display
 */

/**
 * THX 1138 styled range slider component
 * @extends {LitElement}
 */
export class ThxRange extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .range-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--neutral-600, #666);
    }

    .value-display {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.8125rem;
      color: var(--neutral-800, #333);
      background: var(--neutral-200, #e0e0e0);
      padding: 2px 8px;
      min-width: 40px;
      text-align: center;
    }

    .slider-container {
      position: relative;
      display: flex;
      align-items: center;
      height: 24px;
    }

    input[type='range'] {
      width: 100%;
      height: 8px;
      appearance: none;
      background: var(--neutral-200, #e0e0e0);
      outline: none;
      cursor: pointer;
      margin: 0;
      padding: 0;
      vertical-align: middle;
      position: relative;
      z-index: 2;
    }

    input[type='range']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Webkit slider thumb - margin-top centers 18px thumb on 8px track */
    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--neutral-800, #333);
      cursor: pointer;
      border: none;
      border-radius: 0;
      transition: all 0.15s;
      margin-top: -5px;
      position: relative;
      z-index: 3;
    }

    input[type='range']::-webkit-slider-thumb:hover {
      background: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 8px rgba(166, 200, 225, 0.6);
    }

    input[type='range']:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    /* Webkit slider runnable track */
    input[type='range']::-webkit-slider-runnable-track {
      height: 8px;
      background: var(--neutral-200, #e0e0e0);
      border: none;
    }

    /* Firefox slider thumb */
    input[type='range']::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: var(--neutral-800, #333);
      cursor: pointer;
      border: none;
      border-radius: 0;
      transition: all 0.15s;
      position: relative;
      z-index: 3;
    }

    input[type='range']::-moz-range-thumb:hover {
      background: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 8px rgba(166, 200, 225, 0.6);
    }

    /* Firefox slider track */
    input[type='range']::-moz-range-track {
      height: 8px;
      background: var(--neutral-200, #e0e0e0);
      border: none;
    }

    input[type='range']::-moz-range-progress {
      height: 8px;
      background: var(--atmos-secondary, #707e91);
      border: none;
    }

    .ticks {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      padding: 0 9px;
    }

    .tick {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.5625rem;
      color: var(--neutral-600, #666);
      text-transform: uppercase;
    }

    .progress-bar {
      position: absolute;
      height: 8px;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      background: var(--atmos-secondary, #707e91);
      pointer-events: none;
      z-index: 1;
    }
  `;

  static properties = {
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    showValue: { type: Boolean },
    valueFormat: { type: String },
    showTicks: { type: Boolean },
    tickCount: { type: Number },
  };

  constructor() {
    super();
    /** @type {number} */
    this.value = 50;
    /** @type {number} */
    this.min = 0;
    /** @type {number} */
    this.max = 100;
    /** @type {number} */
    this.step = 1;
    /** @type {boolean} */
    this.disabled = false;
    /** @type {string} */
    this.label = '';
    /** @type {boolean} */
    this.showValue = true;
    /** @type {string} */
    this.valueFormat = '{value}';
    /** @type {boolean} */
    this.showTicks = false;
    /** @type {number} */
    this.tickCount = 5;
  }

  /**
   * @returns {string}
   */
  get formattedValue() {
    return this.valueFormat.replace('{value}', String(this.value));
  }

  /**
   * @returns {number[]}
   */
  get tickValues() {
    const ticks = [];
    const range = this.max - this.min;
    for (let i = 0; i <= this.tickCount; i++) {
      ticks.push(Math.round(this.min + (range * i) / this.tickCount));
    }
    return ticks;
  }

  /**
   * @returns {number}
   */
  get progressPercentage() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  /**
   * @param {InputEvent} event
   * @returns {void}
   */
  handleInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this.value = Number(target.value);
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, originalEvent: event },
      })
    );
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  handleChange(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this.value = Number(target.value);
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, originalEvent: event },
      })
    );
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="range-wrapper">
        <div class="label-row">
          ${this.label ? html`<label class="label">${this.label}</label>` : null}
          ${this.showValue ? html`<span class="value-display">${this.formattedValue}</span>` : null}
        </div>
        <div class="slider-container">
          <div class="progress-bar" style="width: ${this.progressPercentage}%"></div>
          <input
            type="range"
            .min=${this.min}
            .max=${this.max}
            .step=${this.step}
            .value=${this.value}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
        </div>
        ${this.showTicks
          ? html`
              <div class="ticks">
                ${this.tickValues.map(tick => html`<span class="tick">${tick}</span>`)}
              </div>
            `
          : null}
      </div>
    `;
  }
}

customElements.define('thx-range', ThxRange);
