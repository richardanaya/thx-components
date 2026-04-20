// @ts-check

/**
 * @fileoverview THX 1138 styled textarea component
 * @module thx-textarea
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} TextareaProps
 * @property {string} value - The textarea value
 * @property {string} placeholder - The placeholder text
 * @property {string} label - The textarea label
 * @property {boolean} disabled - Whether the textarea is disabled
 * @property {boolean} readonly - Whether the textarea is readonly
 * @property {boolean} required - Whether the textarea is required
 * @property {number} rows - Number of visible text lines
 * @property {number} cols - Visible width in average character widths
 * @property {number} minlength - Minimum length
 * @property {number} maxlength - Maximum length
 * @property {boolean} autoresize - Whether to auto-resize based on content
 * @property {string} resize - Resize behavior (none, both, horizontal, vertical)
 */

/**
 * THX 1138 styled textarea component
 * @extends {LitElement}
 */
export class ThxTextarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .textarea-wrapper {
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

    textarea {
      padding: 12px;
      border: none;
      border-bottom: 2px solid var(--neutral-200, #e0e0e0);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: white;
      color: var(--neutral-800, #333);
      transition:
        border-color 0.2s,
        box-shadow 0.2s;
      width: 100%;
      box-sizing: border-box;
      line-height: 1.6;
    }

    textarea::placeholder {
      color: var(--neutral-600, #666);
    }

    textarea:focus {
      outline: none;
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.3);
    }

    textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--neutral-200, #e0e0e0);
    }

    textarea:read-only {
      background: var(--neutral-200, #e0e0e0);
    }

    /* Resize variants */
    .resize-none {
      resize: none;
    }

    .resize-both {
      resize: both;
    }

    .resize-horizontal {
      resize: horizontal;
    }

    .resize-vertical {
      resize: vertical;
    }

    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .char-count {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .char-count.warning {
      color: var(--accent-warning, #d4aa00);
    }

    .char-count.error {
      color: var(--accent-error, #d44000);
    }

    .help-text {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--neutral-600, #666);
    }

    .help-text.error {
      color: var(--accent-error, #d44000);
    }
  `;

  static properties = {
    value: { type: String },
    placeholder: { type: String },
    label: { type: String },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean },
    rows: { type: Number },
    cols: { type: Number },
    minlength: { type: Number },
    maxlength: { type: Number },
    autoresize: { type: Boolean },
    resize: { type: String },
    errorMessage: { type: String },
    showCharCount: { type: Boolean },
  };

  constructor() {
    super();
    /** @type {string} */
    this.value = '';
    /** @type {string} */
    this.placeholder = '';
    /** @type {string} */
    this.label = '';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.readonly = false;
    /** @type {boolean} */
    this.required = false;
    /** @type {number} */
    this.rows = 4;
    /** @type {number} */
    this.cols = 20;
    /** @type {number} */
    this.minlength = -1;
    /** @type {number} */
    this.maxlength = -1;
    /** @type {boolean} */
    this.autoresize = false;
    /** @type {string} */
    this.resize = 'vertical';
    /** @type {string} */
    this.errorMessage = '';
    /** @type {boolean} */
    this.showCharCount = false;
  }

  /**
   * @returns {HTMLTextAreaElement|null}
   */
  get textareaElement() {
    return /** @type {HTMLTextAreaElement|null} */ (this.renderRoot?.querySelector('textarea'));
  }

  /**
   * @param {InputEvent} event
   * @returns {void}
   */
  handleInput(event) {
    const target = /** @type {HTMLTextAreaElement} */ (event.target);
    this.value = target.value;

    if (this.autoresize) {
      this.autoResize(target);
    }

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
    const target = /** @type {HTMLTextAreaElement} */ (event.target);
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, originalEvent: event },
      })
    );
  }

  /**
   * @param {HTMLTextAreaElement} element
   * @returns {void}
   */
  autoResize(element) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  /**
   * @returns {void}
   */
  focus() {
    this.textareaElement?.focus();
  }

  /**
   * @returns {void}
   */
  blur() {
    this.textareaElement?.blur();
  }

  /**
   * @returns {number}
   */
  get charCount() {
    return this.value.length;
  }

  /**
   * @returns {string}
   */
  get charCountClass() {
    if (this.maxlength > 0) {
      const ratio = this.charCount / this.maxlength;
      if (ratio >= 1) return 'error';
      if (ratio >= 0.9) return 'warning';
    }
    return '';
  }

  /**
   * @returns {string}
   */
  get charCountText() {
    if (this.maxlength > 0) {
      return `${this.charCount}/${this.maxlength}`;
    }
    return `${this.charCount}`;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="textarea-wrapper">
        ${this.label
          ? html`
              <label class="label">
                ${this.label}${this.required
                  ? html`<span class="required-indicator">*</span>`
                  : null}
              </label>
            `
          : null}
        <textarea
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .rows=${this.rows}
          .cols=${this.cols}
          minlength=${this.minlength >= 0 ? this.minlength : undefined}
          maxlength=${this.maxlength >= 0 ? this.maxlength : undefined}
          class="resize-${this.resize}"
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
        <div class="status-row">
          ${this.errorMessage
            ? html`<span class="help-text error">${this.errorMessage}</span>`
            : html`<span class="help-text"><slot name="help-text"></slot></span>`}
          ${this.showCharCount
            ? html`<span class="char-count ${this.charCountClass}">${this.charCountText}</span>`
            : null}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-textarea', ThxTextarea);
