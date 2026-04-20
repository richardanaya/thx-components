// @ts-check

/**
 * @fileoverview THX 1138 styled status LED array component
 * @module thx-status-leds
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} LEDStatus
 * @property {boolean} active
 * @property {'normal'|'warning'|'error'} [state='normal']
 */

/**
 * THX 1138 styled status LED array component
 * @extends {LitElement}
 */
export class ThxStatusLeds extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .status-array {
      display: flex;
      gap: 4px;
      justify-content: center;
      padding: 16px 0;
    }

    .status-led {
      width: 8px;
      height: 8px;
      background: #333;
      border: 1px solid #444;
      transition: all 0.2s ease;
    }

    .status-led.active {
      background: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 6px rgba(166, 200, 225, 0.8);
    }

    .status-led.warning {
      background: var(--accent-warning, #d4aa00);
      box-shadow: 0 0 6px rgba(212, 170, 0, 0.8);
    }

    .status-led.error {
      background: var(--accent-error, #d44000);
      box-shadow: 0 0 6px rgba(212, 64, 0, 0.8);
    }

    .led-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.5625rem;
      color: var(--atmos-secondary, #707e91);
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 8px;
      letter-spacing: 0.1em;
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      leds: { type: Array },
      count: { type: Number },
      label: { type: String },
    };
  }

  constructor() {
    super();
    /** @type {LEDStatus[]} */
    this.leds = /** @type {LEDStatus[]} */ ([]);
    this.count = 8;
    this.label = '';
  }

  /**
   * @returns {LEDStatus[]}
   */
  get _ledArray() {
    if (this.leds && this.leds.length > 0) {
      return this.leds;
    }
    return Array(this.count)
      .fill(null)
      .map((_, i) => ({
        active: i < this.count / 2,
        state: 'normal',
      }));
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const leds = this._ledArray;

    return html`
      <div>
        ${this.label ? html`<div class="led-label">${this.label}</div>` : ''}
        <div class="status-array">
          ${leds.map(
            led => html` <div class="status-led ${led.active ? led.state || 'active' : ''}"></div> `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-status-leds', ThxStatusLeds);
