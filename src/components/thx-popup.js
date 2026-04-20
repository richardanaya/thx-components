// @ts-check

/**
 * @fileoverview THX 1138 styled popup component
 * @module thx-popup
 * @description A clinical popup/positioned overlay with CRT aesthetics
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} PopupState
 * @property {boolean} open - Whether the popup is open
 * @property {'top'|'bottom'|'left'|'right'|'top-start'|'top-end'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'} placement - Popup placement
 * @property {boolean} arrow - Whether to show an arrow
 * @property {boolean} modal - Whether the popup is modal (with backdrop)
 */

export class ThxPopup extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .popup-trigger {
      display: inline-flex;
    }

    .popup-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.5);
      backdrop-filter: blur(1px);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.15s,
        visibility 0.15s;
    }

    .popup-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .popup-content {
      position: absolute;
      background: var(--crt-bg, #111);
      border: 8px solid var(--crt-border, #2a2a2a);
      border-radius: 2px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.15s,
        visibility 0.15s;
      min-width: 200px;
      max-width: 400px;
    }

    .popup-content.open {
      opacity: 1;
      visibility: visible;
    }

    /* CRT scanline effect */
    .popup-content::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(166, 200, 225, 0.04) 2px,
        rgba(166, 200, 225, 0.04) 4px
      );
      pointer-events: none;
      z-index: 10;
    }

    /* Vignette */
    .popup-content::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%);
      pointer-events: none;
      z-index: 11;
    }

    /* Arrow */
    .popup-arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--crt-border, #2a2a2a);
      transform: rotate(45deg);
      z-index: -1;
    }

    .popup-content.top .popup-arrow,
    .popup-content.top-start .popup-arrow,
    .popup-content.top-end .popup-arrow {
      bottom: -10px;
      border-bottom: 2px solid #2a2a2a;
      border-right: 2px solid #2a2a2a;
    }

    .popup-content.bottom .popup-arrow,
    .popup-content.bottom-start .popup-arrow,
    .popup-content.bottom-end .popup-arrow {
      top: -10px;
      border-top: 2px solid #2a2a2a;
      border-left: 2px solid #2a2a2a;
    }

    .popup-content.left .popup-arrow,
    .popup-content.left-start .popup-arrow,
    .popup-content.left-end .popup-arrow {
      right: -10px;
      border-top: 2px solid #2a2a2a;
      border-right: 2px solid #2a2a2a;
    }

    .popup-content.right .popup-arrow,
    .popup-content.right-start .popup-arrow,
    .popup-content.right-end .popup-arrow {
      left: -10px;
      border-bottom: 2px solid #2a2a2a;
      border-left: 2px solid #2a2a2a;
    }

    /* Center arrow horizontally for top/bottom placements */
    .popup-content.top .popup-arrow,
    .popup-content.bottom .popup-arrow {
      left: 50%;
      margin-left: -6px;
    }

    /* Position arrow at start/end */
    .popup-content.top-start .popup-arrow,
    .popup-content.bottom-start .popup-arrow {
      left: 20px;
    }

    .popup-content.top-end .popup-arrow,
    .popup-content.bottom-end .popup-arrow {
      right: 20px;
      left: auto;
    }

    /* Center arrow vertically for left/right placements */
    .popup-content.left .popup-arrow,
    .popup-content.right .popup-arrow {
      top: 50%;
      margin-top: -6px;
    }

    /* Position arrow at start/end */
    .popup-content.left-start .popup-arrow,
    .popup-content.right-start .popup-arrow {
      top: 20px;
    }

    .popup-content.left-end .popup-arrow,
    .popup-content.right-end .popup-arrow {
      bottom: 20px;
      top: auto;
    }

    .popup-header {
      padding: 12px 16px;
      border-bottom: 1px solid #333;
      position: relative;
      z-index: 5;
    }

    .popup-title {
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 0.625rem;
      color: var(--atmos-primary, #a6c8e1);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin: 0;
      text-shadow: 0 0 4px rgba(166, 200, 225, 0.5);
    }

    .popup-body {
      padding: 16px;
      font-family: var(--font-body, 'Helvetica Neue', sans-serif);
      font-size: 0.875rem;
      color: var(--neutral-100, #fafafa);
      position: relative;
      z-index: 5;
    }

    .popup-body ::slotted(*) {
      margin: 0;
    }

    .popup-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: transparent;
      border: 1px solid var(--atmos-secondary, #707e91);
      color: var(--atmos-secondary, #707e91);
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 0.75rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
      padding: 0;
      z-index: 15;
    }

    .popup-close:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
    }

    .popup-footer {
      padding: 12px 16px;
      border-top: 1px solid #333;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      position: relative;
      z-index: 5;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { type: String },
    title: { type: String },
    arrow: { type: Boolean },
    modal: { type: Boolean },
    noHeader: { type: Boolean, attribute: 'no-header' },
    noClose: { type: Boolean, attribute: 'no-close' },
    distance: { type: Number },
  };

  constructor() {
    super();
    /** @type {boolean} */
    this.open = false;
    /** @type {'top'|'bottom'|'left'|'right'|'top-start'|'top-end'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'} */
    this.placement = 'bottom';
    /** @type {string} */
    this.title = 'TERMINAL-1138';
    /** @type {boolean} */
    this.arrow = true;
    /** @type {boolean} */
    this.modal = false;
    /** @type {boolean} */
    this.noHeader = false;
    /** @type {boolean} */
    this.noClose = false;
    /** @type {number} */
    this.distance = 8;

    /** @type {(e: MouseEvent) => void} */
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  /**
   * Opens the popup
   * @returns {void}
   */
  show() {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: true } })
    );
  }

  /**
   * Closes the popup
   * @returns {void}
   */
  hide() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: false } })
    );
  }

  /**
   * Toggles popup visibility
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
   * Handles click outside to close
   * @param {MouseEvent} e - Click event
   * @returns {void}
   */
  _handleClickOutside(e) {
    if (this.open && !this.contains(/** @type {Node} */ (e.target))) {
      this.hide();
    }
  }

  /**
   * Gets computed popup position styles
   * @returns {string}
   */
  _getPositionStyles() {
    const distance = this.distance;
    const placements = {
      top: `bottom: calc(100% + ${distance}px); left: 50%; transform: translateX(-50%);`,
      'top-start': `bottom: calc(100% + ${distance}px); left: 0;`,
      'top-end': `bottom: calc(100% + ${distance}px); right: 0;`,
      bottom: `top: calc(100% + ${distance}px); left: 50%; transform: translateX(-50%);`,
      'bottom-start': `top: calc(100% + ${distance}px); left: 0;`,
      'bottom-end': `top: calc(100% + ${distance}px); right: 0;`,
      left: `right: calc(100% + ${distance}px); top: 50%; transform: translateY(-50%);`,
      'left-start': `right: calc(100% + ${distance}px); top: 0;`,
      'left-end': `right: calc(100% + ${distance}px); bottom: 0;`,
      right: `left: calc(100% + ${distance}px); top: 50%; transform: translateY(-50%);`,
      'right-start': `left: calc(100% + ${distance}px); top: 0;`,
      'right-end': `left: calc(100% + ${distance}px); bottom: 0;`,
    };
    return placements[this.placement] || placements.bottom;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const positionStyles = this._getPositionStyles();

    return html`
      ${this.modal
        ? html`
            <div class="popup-overlay ${this.open ? 'open' : ''}" @click=${() => this.hide()}></div>
          `
        : ''}

      <span class="popup-trigger" @click=${this.toggle}>
        <slot name="trigger">
          <button
            style="
              height: 36px;
              padding: 0 16px;
              background: var(--atmos-primary, #a6c8e1);
              color: var(--neutral-800, #333);
              border: none;
              font-family: var(--font-mono, 'Courier New', monospace);
              font-size: 0.625rem;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              cursor: pointer;
            "
            type="button"
          >
            OPEN
          </button>
        </slot>
      </span>

      <div
        class="popup-content ${this.placement} ${this.open ? 'open' : ''}"
        style="${positionStyles}"
        role="dialog"
        aria-modal="${this.modal}"
      >
        ${this.arrow ? html`<div class="popup-arrow"></div>` : ''}
        ${!this.noHeader
          ? html`
              <div class="popup-header">
                <h3 class="popup-title">${this.title || 'TERMINAL-1138'}</h3>
                ${!this.noClose
                  ? html`
                      <button
                        class="popup-close"
                        @click=${this.hide}
                        aria-label="Close popup"
                        type="button"
                      >
                        ×
                      </button>
                    `
                  : ''}
              </div>
            `
          : ''}

        <div class="popup-body">
          <slot></slot>
        </div>

        <div class="popup-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('thx-popup', ThxPopup);
