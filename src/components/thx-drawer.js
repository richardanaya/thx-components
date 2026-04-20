// @ts-check

/**
 * @fileoverview THX 1138 styled slide-out drawer component
 * @module thx-drawer
 * @description A clinical slide-out panel with CRT monitor aesthetics
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} DrawerState
 * @property {boolean} open - Whether the drawer is currently open
 * @property {'left'|'right'|'top'|'bottom'} placement - Drawer placement
 * @property {'sm'|'md'|'lg'|'xl'|'full'} size - Drawer size variant
 */

export class ThxDrawer extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 10, 10, 0.7);
      backdrop-filter: blur(1px);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.3s,
        visibility 0.3s;
    }

    .drawer-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .drawer-panel {
      position: fixed;
      background: var(--neutral-100, #fafafa);
      border: 8px solid var(--crt-border, #2a2a2a);
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: transform 0.3s ease-out;
    }

    /* CRT scanline effect */
    .drawer-panel::before {
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

    /* Left placement */
    .drawer-panel.left {
      left: 0;
      top: 0;
      bottom: 0;
      border-right-width: 8px;
      border-left-width: 0;
      transform: translateX(-100%);
    }

    .drawer-overlay.open .drawer-panel.left {
      transform: translateX(0);
    }

    /* Right placement */
    .drawer-panel.right {
      right: 0;
      top: 0;
      bottom: 0;
      border-left-width: 8px;
      border-right-width: 0;
      transform: translateX(100%);
    }

    .drawer-overlay.open .drawer-panel.right {
      transform: translateX(0);
    }

    /* Top placement */
    .drawer-panel.top {
      top: 0;
      left: 0;
      right: 0;
      border-bottom-width: 8px;
      border-top-width: 0;
      transform: translateY(-100%);
    }

    .drawer-overlay.open .drawer-panel.top {
      transform: translateY(0);
    }

    /* Bottom placement */
    .drawer-panel.bottom {
      bottom: 0;
      left: 0;
      right: 0;
      border-top-width: 8px;
      border-bottom-width: 0;
      transform: translateY(100%);
    }

    .drawer-overlay.open .drawer-panel.bottom {
      transform: translateY(0);
    }

    /* Size variants for left/right */
    .drawer-panel.left.sm,
    .drawer-panel.right.sm {
      width: 300px;
    }

    .drawer-panel.left.md,
    .drawer-panel.right.md {
      width: 400px;
    }

    .drawer-panel.left.lg,
    .drawer-panel.right.lg {
      width: 560px;
    }

    .drawer-panel.left.xl,
    .drawer-panel.right.xl {
      width: 720px;
    }

    .drawer-panel.left.full,
    .drawer-panel.right.full {
      width: 100%;
    }

    /* Size variants for top/bottom */
    .drawer-panel.top.sm,
    .drawer-panel.bottom.sm {
      height: 200px;
    }

    .drawer-panel.top.md,
    .drawer-panel.bottom.md {
      height: 300px;
    }

    .drawer-panel.top.lg,
    .drawer-panel.bottom.lg {
      height: 400px;
    }

    .drawer-panel.top.xl,
    .drawer-panel.bottom.xl {
      height: 50vh;
    }

    .drawer-panel.top.full,
    .drawer-panel.bottom.full {
      height: 100%;
    }

    .drawer-header {
      background: var(--crt-bg, #111);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #333;
      position: relative;
      z-index: 5;
      flex-shrink: 0;
    }

    .drawer-label {
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 0.75rem;
      color: var(--atmos-primary, #a6c8e1);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      text-shadow: 0 0 4px rgba(166, 200, 225, 0.5);
    }

    .drawer-close {
      width: 32px;
      height: 32px;
      background: transparent;
      border: 1px solid var(--atmos-secondary, #707e91);
      color: var(--atmos-secondary, #707e91);
      font-family: var(--font-mono, 'Courier New', monospace);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
      padding: 0;
    }

    .drawer-close:hover {
      border-color: var(--atmos-primary, #a6c8e1);
      color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 10px rgba(166, 200, 225, 0.4);
    }

    .drawer-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
      position: relative;
      z-index: 5;
    }

    .drawer-footer {
      padding: 16px 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      position: relative;
      z-index: 5;
      flex-shrink: 0;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { type: String },
    size: { type: String },
    headerLabel: { type: String, attribute: 'header-label' },
    noHeader: { type: Boolean, attribute: 'no-header' },
    noFooter: { type: Boolean, attribute: 'no-footer' },
    noOverlay: { type: Boolean, attribute: 'no-overlay' },
  };

  constructor() {
    super();
    /** @type {boolean} */
    this.open = false;
    /** @type {'left'|'right'|'top'|'bottom'} */
    this.placement = 'right';
    /** @type {'sm'|'md'|'lg'|'xl'|'full'} */
    this.size = 'md';
    /** @type {string} */
    this.headerLabel = 'TERMINAL-1138';
    /** @type {boolean} */
    this.noHeader = false;
    /** @type {boolean} */
    this.noFooter = false;
    /** @type {boolean} */
    this.noOverlay = false;
  }

  /**
   * Opens the drawer
   * @returns {void}
   */
  show() {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: true } })
    );
  }

  /**
   * Closes the drawer
   * @returns {void}
   */
  hide() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: false } })
    );
  }

  /**
   * Toggles drawer visibility
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
   * Handles click on overlay
   * @param {MouseEvent} e - Click event
   * @returns {void}
   */
  _handleOverlayClick(e) {
    if (e.target === e.currentTarget && !this.noOverlay) {
      this.hide();
    }
  }

  /**
   * Handles keyboard events
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
        class="drawer-overlay ${this.open ? 'open' : ''}"
        @click=${this._handleOverlayClick}
        @keydown=${this._handleKeydown}
        style="${this.noOverlay ? 'pointer-events: none; background: transparent;' : ''}"
      >
        <div
          class="drawer-panel ${this.placement} ${this.size}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          style="${this.noOverlay ? 'pointer-events: auto;' : ''}"
        >
          ${!this.noHeader
            ? html`
                <div class="drawer-header">
                  <span class="drawer-label" id="drawer-title">${this.headerLabel}</span>
                  <button
                    class="drawer-close"
                    @click=${this.hide}
                    aria-label="Close drawer"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              `
            : ''}
          <div class="drawer-body">
            <slot></slot>
          </div>
          ${!this.noFooter
            ? html`
                <div class="drawer-footer">
                  <slot name="footer"></slot>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('thx-drawer', ThxDrawer);
