// @ts-check

/**
 * @fileoverview THX 1138 styled icon button component
 * @module thx-icon-button
 * @description A clinical icon button with phosphor glow effects
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} IconButtonConfig
 * @property {string} [icon] - The icon character or content
 * @property {string} [label] - Accessible label for the button
 * @property {'primary'|'secondary'|'ghost'|'warning'|'error'} variant - Button variant
 * @property {'sm'|'md'|'lg'} size - Button size
 * @property {boolean} [disabled] - Whether the button is disabled
 * @property {boolean} [loading] - Whether the button shows loading state
 * @property {boolean} [pulse] - Whether to show a pulsing glow effect
 */

export class ThxIconButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    .icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: all 0.15s;
      position: relative;
      overflow: hidden;
      font-family: var(--font-mono, 'Courier New', monospace);
      padding: 0;
    }

    .icon-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Size variants */
    .icon-button.sm {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
    }

    .icon-button.md {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }

    .icon-button.lg {
      width: 48px;
      height: 48px;
      font-size: 1.25rem;
    }

    /* Variant: primary */
    .icon-button.primary {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    .icon-button.primary:hover:not(:disabled) {
      background: var(--atmos-tertiary, #deffff);
      box-shadow: 0 0 15px rgba(166, 200, 225, 0.5);
    }

    /* Variant: secondary */
    .icon-button.secondary {
      background: var(--atmos-secondary, #707e91);
      color: var(--neutral-100, #fafafa);
    }

    .icon-button.secondary:hover:not(:disabled) {
      background: var(--atmos-primary, #a6c8e1);
      color: var(--neutral-800, #333);
    }

    /* Variant: ghost */
    .icon-button.ghost {
      background: transparent;
      color: var(--neutral-600, #666);
      border: 1px solid transparent;
    }

    .icon-button.ghost:hover:not(:disabled) {
      color: var(--atmos-primary, #a6c8e1);
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 8px rgba(166, 200, 225, 0.3);
    }

    /* Variant: warning */
    .icon-button.warning {
      background: var(--accent-warning, #d4aa00);
      color: var(--neutral-800, #333);
    }

    .icon-button.warning:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(212, 170, 0, 0.5);
    }

    /* Variant: error */
    .icon-button.error {
      background: var(--accent-error, #d44000);
      color: var(--neutral-100, #fafafa);
    }

    .icon-button.error:hover:not(:disabled) {
      box-shadow: 0 0 15px rgba(212, 64, 0, 0.5);
    }

    /* Pulse animation for phosphor glow */
    @keyframes phosphor-pulse {
      0%,
      100% {
        box-shadow: 0 0 8px rgba(166, 200, 225, 0.4);
      }
      50% {
        box-shadow: 0 0 20px rgba(166, 200, 225, 0.8);
      }
    }

    .icon-button.pulse {
      animation: phosphor-pulse 2s infinite;
    }

    .icon-button.pulse.warning {
      animation: amber-pulse 2s infinite;
    }

    @keyframes amber-pulse {
      0%,
      100% {
        box-shadow: 0 0 8px rgba(212, 170, 0, 0.4);
      }
      50% {
        box-shadow: 0 0 20px rgba(212, 170, 0, 0.8);
      }
    }

    /* Loading spinner */
    .icon-button.loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .icon-button.loading .button-content {
      opacity: 0;
    }

    /* Active state */
    .icon-button:active:not(:disabled) {
      transform: translateY(1px);
    }

    /* Square variant for CRT monitor aesthetic */
    .icon-button.square {
      border-radius: 0;
    }

    /* Rounded variant */
    .icon-button.rounded {
      border-radius: 4px;
    }

    /* Circle variant */
    .icon-button.circle {
      border-radius: 50%;
    }

    /* CRT scanline effect overlay */
    .icon-button.scanlines::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(166, 200, 225, 0.1) 1px,
        rgba(166, 200, 225, 0.1) 2px
      );
      pointer-events: none;
    }
  `;

  static properties = {
    icon: { type: String },
    label: { type: String },
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean },
    loading: { type: Boolean },
    pulse: { type: Boolean },
    shape: { type: String },
    scanlines: { type: Boolean },
  };

  constructor() {
    super();
    /** @type {string|undefined} */
    this.icon = undefined;
    /** @type {string|undefined} */
    this.label = undefined;
    /** @type {'primary'|'secondary'|'ghost'|'warning'|'error'} */
    this.variant = 'primary';
    /** @type {'sm'|'md'|'lg'} */
    this.size = 'md';
    /** @type {boolean} */
    this.disabled = false;
    /** @type {boolean} */
    this.loading = false;
    /** @type {boolean} */
    this.pulse = false;
    /** @type {'square'|'rounded'|'circle'} */
    this.shape = 'square';
    /** @type {boolean} */
    this.scanlines = false;
  }

  /**
   * Handles button click
   * @param {MouseEvent} e - Click event
   * @returns {void}
   */
  _handleClick(e) {
    if (!this.disabled && !this.loading) {
      this.dispatchEvent(
        new CustomEvent('click', {
          detail: { originalEvent: e },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Gets the icon content
   * @returns {string}
   */
  _getIconContent() {
    if (this.icon) {
      return this.icon;
    }
    return '◉';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const classes = [
      'icon-button',
      this.variant,
      this.size,
      this.shape,
      this.pulse ? 'pulse' : '',
      this.loading ? 'loading' : '',
      this.scanlines ? 'scanlines' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        class="${classes}"
        ?disabled=${this.disabled || this.loading}
        @click=${this._handleClick}
        aria-label="${this.label || this.icon || 'button'}"
        type="button"
      >
        <span class="button-content">
          <slot>${this._getIconContent()}</slot>
        </span>
      </button>
    `;
  }
}

customElements.define('thx-icon-button', ThxIconButton);
