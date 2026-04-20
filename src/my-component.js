// @ts-check

/**
 * @fileoverview A custom Lit-based web component with TypeScript JSDoc annotations.
 * @module my-component
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} GreetingConfig
 * @property {string} name - The name to greet
 * @property {number} [repeatCount] - Number of times to repeat the greeting
 */

/**
 * @typedef {import('lit').PropertyDeclaration} PropertyDeclaration
 * @typedef {import('lit').PropertyValues} PropertyValues
 * @typedef {import('lit').CSSResult} CSSResult
 * @typedef {import('lit').TemplateResult} TemplateResult
 * @typedef {import('lit').EventPart} EventPart
 */

/**
 * A greeting component that displays a customizable hello message.
 *
 * @extends {LitElement}
 */
export class MyGreeting extends LitElement {
  /** @type {CSSResult} */
  static styles = css`
    :host {
      display: block;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #f0f0f0;
      padding: 40px;
    }
    .card {
      background: #fafafa;
      padding: 32px;
      max-width: 520px;
      position: relative;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
    }
    .card::before {
      content: 'TERMINAL LDS-1138';
      position: absolute;
      top: 12px;
      right: 16px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.625rem;
      color: #bbb;
      letter-spacing: 0.15em;
    }
    .card::after {
      content: '';
      position: absolute;
      inset: 4px;
      border: 1px solid rgba(0, 0, 0, 0.04);
      pointer-events: none;
    }
    .greeting {
      color: #333;
      font-size: 0.875rem;
      font-weight: 400;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-family: 'Courier New', Courier, monospace;
    }
    .input-row {
      display: flex;
      gap: 12px;
      align-items: center;
      background: rgba(0, 0, 0, 0.02);
      padding: 12px;
      margin: 0 -12px;
    }
    .input-row input {
      flex: 1;
      height: 36px;
      padding: 0 12px;
      border: none;
      border-bottom: 2px solid #ccc;
      font-size: 0.875rem;
      font-family: 'Courier New', Courier, monospace;
      background: white;
      box-sizing: border-box;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: border-color 0.2s;
    }
    .input-row input::placeholder {
      color: #aaa;
      text-transform: uppercase;
    }
    .input-row input:focus {
      outline: none;
      border-color: #666;
    }
    .input-row button {
      height: 36px;
      padding: 0 20px;
      background: #e0e0e0;
      color: #333;
      border: none;
      border-bottom: 2px solid #bbb;
      font-size: 0.6875rem;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      box-sizing: border-box;
      transition: all 0.15s;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .input-row button:hover {
      background: #d5d5d5;
      border-color: #999;
    }
    .input-row button:active {
      background: #c0c0c0;
      border-color: #666;
      transform: translateY(1px);
    }
    .text-examples {
      margin-top: 28px;
      padding-top: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }
    .display-text {
      font-size: 1.5rem;
      font-weight: 300;
      color: #333;
      margin: 0 0 16px 0;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }
    .body-text {
      font-size: 0.8125rem;
      font-weight: 400;
      color: #777;
      line-height: 1.8;
      margin: 0 0 16px 0;
    }
    .mono-text {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.75rem;
      background: white;
      padding: 3px 8px;
      border-bottom: 1px solid #ddd;
      color: #444;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .mono-block {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.75rem;
      background: white;
      padding: 16px 20px;
      border-left: 2px solid #ccc;
      color: #555;
      margin: 0;
      overflow-x: auto;
      line-height: 1.6;
      letter-spacing: 0.05em;
    }
    .scanline {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.02) 2px,
        rgba(0, 0, 0, 0.02) 4px
      );
      pointer-events: none;
      opacity: 0.5;
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** The name to display in the greeting */
      name: { type: String },
      /** Counter for clicks */
      clickCount: { type: Number, state: true },
    };
  }

  constructor() {
    super();
    /** @type {string} The name to greet */
    this.name = 'THX';
    /** @type {number} Click counter */
    this.clickCount = 0;
    /** @type {string} Current input value */
    this.inputValue = '';
  }

  /**
   * Handles click events on the greeting.
   * @param {MouseEvent} _event - The click event
   * @returns {void}
   */
  handleClick(_event) {
    this.clickCount++;
  }

  /**
   * Generates a greeting message.
   * @param {string} targetName - The name to greet
   * @returns {string} The formatted greeting
   */
  getGreeting(targetName) {
    return `Hello, ${targetName}!`;
  }

  /**
   * Handles input changes.
   * @param {InputEvent} event - The input event
   * @returns {void}
   */
  handleInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this.inputValue = target.value;
  }

  /**
   * Updates the greeting name from input.
   * @returns {void}
   */
  updateName() {
    if (this.inputValue.trim()) {
      this.name = this.inputValue.trim();
      this.inputValue = '';
      this.clickCount = 0;
    }
  }

  /**
   * Renders the component.
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <div class="card">
        <div class="scanline"></div>
        <div class="greeting" @click=${this.handleClick}>
          SECTOR: ${this.name} ${this.clickCount > 0 ? html` | CYCLES: ${this.clickCount}` : null}
        </div>
        <div class="input-row">
          <input
            type="text"
            placeholder="INPUT DESIGNATION..."
            .value=${this.inputValue}
            @input=${this.handleInput}
            @keydown=${/** @param {KeyboardEvent} e */ e => e.key === 'Enter' && this.updateName()}
          />
          <button @click=${this.updateName}>Execute</button>
        </div>
        <div class="text-examples">
          <p class="display-text">Monitor Display</p>
          <p class="body-text">
            Subject <span class="mono-text">${this.name}</span> logged. All data streams observed.
            Work performance indices nominal. Proceed with designated function.
          </p>
          <pre class="mono-block">
PREFIX: ${this.name}
TYPE: EB-844
STATE: NORMAL
CYCLES: ${this.clickCount}
CONSUMER INDEX: 1138</pre
          >
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('my-greeting', MyGreeting);
