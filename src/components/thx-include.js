// @ts-check

/**
 * @fileoverview THX 1138 styled include component for external content
 * @module thx-include
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} IncludeConfig
 * @property {string} src - URL to fetch content from
 * @property {'html'|'text'|'json'} [mode='html'] - Parsing mode
 * @property {boolean} [allowScripts=false] - Whether to allow script execution
 * @property {number} [refreshInterval=0] - Auto-refresh interval in ms (0 = disabled)
 */

/**
 * THX 1138 styled include component.
 * Fetches and displays external HTML content with clinical styling.
 *
 * @extends {LitElement}
 */
export class ThxInclude extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .include-container {
      position: relative;
    }

    .include-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--neutral-600, #666);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .include-loading::before {
      content: '';
      width: 12px;
      height: 12px;
      border: 2px solid var(--neutral-200, #e0e0e0);
      border-top-color: var(--atmos-primary, #a6c8e1);
      border-radius: 50%;
      margin-right: 8px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .include-error {
      padding: 16px 20px;
      background: rgba(212, 64, 0, 0.1);
      border-left: 3px solid var(--accent-error, #d44000);
      color: var(--accent-error, #d44000);
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    .include-error::before {
      content: 'ERR // ';
      font-weight: 600;
    }

    .include-content {
      font-size: 0.8125rem;
      line-height: 1.6;
    }

    /* CRT variant */
    :host([variant='crt']) .include-container {
      background: var(--crt-bg, #111);
      border: 2px solid var(--crt-border, #2a2a2a);
      padding: 16px;
    }

    :host([variant='crt']) .include-content {
      color: var(--atmos-primary, #a6c8e1);
    }

    /* Panel variant */
    :host([variant='panel']) .include-container {
      background: var(--neutral-100, #fafafa);
      padding: 24px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
    }

    .include-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .include-label {
      font-size: 0.6875rem;
      color: var(--neutral-600, #666);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    .include-refresh {
      font-size: 0.625rem;
      color: var(--atmos-secondary, #707e91);
      cursor: pointer;
      background: none;
      border: 1px solid var(--atmos-secondary, #707e91);
      padding: 4px 8px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .include-refresh:hover {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
      border-color: var(--atmos-primary, #a6c8e1);
    }

    :host([variant='crt']) .include-header {
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    :host([variant='crt']) .include-label {
      color: var(--atmos-secondary, #707e91);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** URL to fetch content from */
      src: { type: String },
      /** Parsing mode: html, text, json */
      mode: { type: String },
      /** Whether to allow script execution */
      allowScripts: { type: Boolean, attribute: 'allow-scripts' },
      /** Auto-refresh interval in ms */
      refreshInterval: { type: Number, attribute: 'refresh-interval' },
      /** Show refresh button */
      showRefresh: { type: Boolean, attribute: 'show-refresh' },
      /** Loading state */
      _loading: { type: Boolean, state: true },
      /** Error message */
      _error: { type: String, state: true },
      /** Fetched content */
      _content: { type: String, state: true },
    };
  }

  constructor() {
    super();
    /** @type {string} */
    this.src = '';
    /** @type {'html'|'text'|'json'} */
    this.mode = 'html';
    /** @type {boolean} */
    this.allowScripts = false;
    /** @type {number} */
    this.refreshInterval = 0;
    /** @type {boolean} */
    this.showRefresh = false;
    /** @type {boolean} */
    this._loading = false;
    /** @type {string|null} */
    this._error = null;
    /** @type {string} */
    this._content = '';
    /** @type {number|null} */
    this._refreshTimer = null;
  }

  /**
   * @param {import('lit').PropertyValues} changedProperties
   * @returns {void}
   */
  updated(changedProperties) {
    if (changedProperties.has('src') && this.src) {
      this.fetchContent();
    }
    if (changedProperties.has('refreshInterval')) {
      this._setupRefreshTimer();
    }
  }

  /**
   * @returns {void}
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
    }
  }

  /**
   * Sets up the auto-refresh timer.
   * @returns {void}
   */
  _setupRefreshTimer() {
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = null;
    }
    if (this.refreshInterval > 0 && this.src) {
      this._refreshTimer = window.setInterval(() => {
        this.fetchContent();
      }, this.refreshInterval);
    }
  }

  /**
   * Fetches content from the src URL.
   * @returns {Promise<void>}
   */
  async fetchContent() {
    if (!this.src) {
      this._error = 'NO SOURCE SPECIFIED';
      return;
    }

    this._loading = true;
    this._error = null;

    try {
      const response = await fetch(this.src);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (this.mode === 'json') {
        const data = await response.json();
        this._content = JSON.stringify(data, null, 2);
      } else {
        this._content = await response.text();
      }
    } catch (/** @type {any} */ error) {
      this._error = error?.message || 'FETCH FAILED';
    } finally {
      this._loading = false;
    }
  }

  /**
   * Gets sanitized content for safe HTML insertion.
   * @returns {string}
   */
  get sanitizedContent() {
    if (this.mode === 'text' || this.mode === 'json') {
      // Escape HTML entities
      return this._content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    if (!this.allowScripts) {
      // Basic script tag removal (production code would need more robust sanitization)
      return this._content.replace(/<script[^>]*>.*?<\/script>/gi, '');
    }

    return this._content;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="include-container" part="base">
        ${this.showRefresh || this.refreshInterval
          ? html`
              <div class="include-header">
                <span class="include-label" part="label">${this.src || 'NO SOURCE'}</span>
                <button class="include-refresh" @click=${this.fetchContent} part="refresh">
                  REFRESH
                </button>
              </div>
            `
          : null}
        ${this._loading
          ? html`<div class="include-loading" part="loading">LOADING</div>`
          : this._error
            ? html`<div class="include-error" part="error">${this._error}</div>`
            : html`
                <div
                  class="include-content"
                  part="content"
                  .innerHTML=${this.mode === 'text' || this.mode === 'json'
                    ? html`<pre>${this.sanitizedContent}</pre>`
                    : this.sanitizedContent}
                ></div>
              `}
      </div>
    `;
  }
}

customElements.define('thx-include', ThxInclude);
