// @ts-check

/**
 * @fileoverview THX 1138 styled modal dialog component
 * @module thx-dialog
 * @description A clinical, dystopian dialog with CRT-style overlay aesthetics
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} DialogState
 * @property {boolean} open - Whether the dialog is currently open
 * @property {string} headerLabel - The dialog header label (e.g., "ALERT-1138")
 * @property {'sm'|'md'|'lg'} size - Dialog size variant
 */

export class ThxDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .dialog-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s,
        visibility 0.2s;
    }

    .dialog-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .dialog-container {
      background: var(--neutral-100, #fafafa);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow:
        inset 0 0 0 1px rgba(0, 0, 0, 0.06),
        0 0 40px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      transform: scale(0.95);
      transition: transform 0.2s;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }

    .dialog-overlay.open .dialog-container {
      transform: scale(1);
    }

    .dialog-container.sm {
      width: min(400px, 90vw);
    }

    .dialog-container.md {
      width: min(600px, 90vw);
    }

    .dialog-container.lg {
      width: min(800px, 90vw);
    }

    /* CRT scanline effect overlay */
    .dialog-container::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(166, 200, 225, 0.03) 2px,
        rgba(166, 200, 225, 0.03) 4px
      );
      pointer-events: none;
      z-index: 10;
    }

    .dialog-header {
      background: var(--crt-bg, #111);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #333;
      position: relative;
      z-index: 5;
    }

    .dialog-label {
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 0.625rem;
      color: var(--atmos-primary, #a6c8e1);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      text-shadow: 0 0 4px rgba(166, 200, 225, 0.5);
    }

    .dialog-close {
      width: 28px;
      height: 28px;
      background: transparent;
      border: 1px solid var(--atmos-secondary, #707e91);
      color: var(--atmos-secondary, #707e91);
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
      padding: 0;
    }

    .dialog-close:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 8px rgba(166, 200, 225, 0.4);
    }

    .dialog-body {
      padding: 24px 20px;
      overflow-y: auto;
      flex: 1;
      position: relative;
      z-index: 5;
    }

    .dialog-footer {
      padding: 16px 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      position: relative;
      z-index: 5;
    }

    ::slotted([slot='footer']) {
      display: flex;
      gap: 12px;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    headerLabel: { type: String, attribute: 'header-label' },
    size: { type: String },
    noHeader: { type: Boolean, attribute: 'no-header' },
    noFooter: { type: Boolean, attribute: 'no-footer' },
  };

  constructor() {
    super();
    /** @type {boolean} */
    this.open = false;
    /** @type {string} */
    this.headerLabel = 'ALERT-1138';
    /** @type {'sm'|'md'|'lg'} */
    this.size = 'md';
    /** @type {boolean} */
    this.noHeader = false;
    /** @type {boolean} */
    this.noFooter = false;
  }

  /**
   * Opens the dialog
   * @returns {void}
   */
  show() {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: true } })
    );
  }

  /**
   * Closes the dialog
   * @returns {void}
   */
  hide() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: false } })
    );
  }

  /**
   * Toggles dialog visibility
   * @returns {void}
   */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Handles click on overlay background
   * @param {MouseEvent} e - Click event
   * @returns {void}
   */
  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.hide();
    }
  }

  /**
   * Handles keyboard events for accessibility
   * @param {KeyboardEvent} e - Keyboard event
   * @returns {void}
   */
  _handleKeydown(e) {
    if (e.key === 'Escape' && this.open) {
      this.hide();
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div
        class="dialog-overlay ${this.open ? 'open' : ''}"
        @click=${this._handleOverlayClick}
        @keydown=${this._handleKeydown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabindex="-1"
      >
        <div class="dialog-container ${this.size}">
          ${!this.noHeader
            ? html`
                <div class="dialog-header">
                  <span class="dialog-label" id="dialog-title">${this.headerLabel}</span>
                  <button
                    class="dialog-close"
                    @click=${this.hide}
                    aria-label="Close dialog"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              `
            : ''}
          <div class="dialog-body">
            <slot></slot>
          </div>
          ${!this.noFooter
            ? html`
                <div class="dialog-footer">
                  <slot name="footer">
                    <button
                      class="btn btn-secondary"
                      @click=${this.hide}
                      style="
                        height: 36px;
                        padding: 0 20px;
                        background: var(--atmos-secondary, #707e91);
                        color: var(--neutral-100, #fafafa);
                        border: none;
                        font-family: var(--font-mono, 'Courier New', monospace);
                        font-size: 0.625rem;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        cursor: pointer;
                        transition: all 0.15s;
                      "
                      type="button"
                    >
                      CANCEL
                    </button>
                    <button
                      class="btn btn-primary"
                      @click=${() =>
                        this.dispatchEvent(
                          new CustomEvent('thx-confirm', { bubbles: true, composed: true })
                        )}
                      style="
                        height: 36px;
                        padding: 0 20px;
                        background: var(--atmos-primary, #a6c8e1);
                        color: var(--neutral-800, #333);
                        border: none;
                        font-family: var(--font-mono, 'Courier New', monospace);
                        font-size: 0.625rem;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        cursor: pointer;
                        transition: all 0.15s;
                      "
                      type="button"
                    >
                      CONFIRM
                    </button>
                  </slot>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-dialog', ThxDialog);
