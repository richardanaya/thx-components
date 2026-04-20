// @ts-check

/**
 * @fileoverview THX 1138 styled visually hidden component
 * @module thx-visually-hidden
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} VisuallyHiddenConfig
 * @property {boolean} [focusable=false] - Whether element should be visible on focus
 * @property {string} [as='span'] - HTML tag to render as (for slot content wrapper)
 */

/**
 * THX 1138 styled visually hidden component.
 * Hides content visually while keeping it accessible to assistive technologies.
 * Essential for accessibility in the sterile, controlled THX 1138 interface.
 *
 * @extends {LitElement}
 */
export class ThxVisuallyHidden extends LitElement {
  static styles = css`
    :host {
      display: inline;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    /*
      Classic visually hidden pattern:
      - Removes element from visual flow
      - Maintains accessibility for screen readers
      - Allows focus if focusable attribute is set
    */
    .visually-hidden {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    /* Make visible on focus if focusable */
    :host([focusable]) .visually-hidden:focus,
    :host([focusable]) .visually-hidden:focus-within {
      position: static !important;
      width: auto !important;
      height: auto !important;
      padding: 8px 12px !important;
      margin: 0 !important;
      overflow: visible !important;
      clip: auto !important;
      white-space: normal !important;
      background: var(--neutral-100, #fafafa);
      border: 1px solid var(--atmos-primary, #a6c8e1) !important;
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.3);
      z-index: 1000;
      font-size: 0.8125rem;
      color: var(--neutral-800, #333);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Debug mode - visually show the hidden element with an indicator */
    :host([debug]) .visually-hidden {
      position: relative !important;
      width: auto !important;
      height: auto !important;
      padding: 4px 8px !important;
      margin: 0 !important;
      overflow: visible !important;
      clip: auto !important;
      white-space: normal !important;
      background: rgba(166, 200, 225, 0.2);
      border: 1px dashed var(--atmos-primary, #a6c8e1) !important;
      color: var(--neutral-800, #333);
      font-size: 0.75rem;
    }

    :host([debug]) .visually-hidden::before {
      content: '[HIDDEN] ';
      font-size: 0.625rem;
      color: var(--atmos-primary, #a6c8e1);
      font-weight: 600;
    }

    /* Status variants */
    :host([status='error']) .visually-hidden:focus,
    :host([status='error']) .visually-hidden:focus-within {
      background: rgba(212, 64, 0, 0.1);
      border-color: var(--accent-error, #d44000) !important;
      box-shadow: 0 0 0 2px rgba(212, 64, 0, 0.3);
    }

    :host([status='warning']) .visually-hidden:focus,
    :host([status='warning']) .visually-hidden:focus-within {
      background: rgba(212, 170, 0, 0.1);
      border-color: var(--accent-warning, #d4aa00) !important;
      box-shadow: 0 0 0 2px rgba(212, 170, 0, 0.3);
    }

    /* Skip link specific styling */
    :host([as='skip-link']) .visually-hidden {
      position: fixed !important;
      top: -100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--neutral-800, #333);
      color: var(--neutral-100, #fafafa);
      padding: 16px 24px;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 10000;
      transition: top 0.2s;
      white-space: nowrap;
    }

    :host([as='skip-link']) .visually-hidden:focus {
      position: fixed !important;
      top: 20px;
      width: auto !important;
      height: auto !important;
      clip: auto !important;
    }

    :host([as='skip-link']) .visually-hidden::after {
      content: ' // PRESS ENTER';
      color: var(--atmos-primary, #a6c8e1);
      font-size: 0.75rem;
    }

    /* Announcement variant */
    :host([as='announce']) .visually-hidden {
      position: fixed !important;
      bottom: 20px;
      right: 20px;
      background: var(--crt-bg, #111);
      border: 2px solid var(--atmos-primary, #a6c8e1) !important;
      color: var(--atmos-primary, #a6c8e1);
      padding: 12px 16px;
      font-size: 0.8125rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      z-index: 10000;
      box-shadow: 0 0 20px rgba(166, 200, 225, 0.3);
    }

    :host([as='announce']) .visually-hidden::before {
      content: '⚠ ';
      color: var(--accent-warning, #d4aa00);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** Whether element becomes visible on focus */
      focusable: { type: Boolean },
      /** Component variant: default, skip-link, announce */
      as: { type: String },
      /** Debug mode - visually show hidden content */
      debug: { type: Boolean },
      /** Status indicator: error, warning, normal */
      status: { type: String },
    };
  }

  constructor() {
    super();
    /** @type {boolean} */
    this.focusable = false;
    /** @type {'default'|'skip-link'|'announce'} */
    this.as = 'default';
    /** @type {boolean} */
    this.debug = false;
    /** @type {string} */
    this.status = 'normal';
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {void}
   */
  _handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.dispatchEvent(
        new CustomEvent('thx-activate', {
          detail: { source: 'keyboard' },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    // Render as anchor for skip link, otherwise span
    if (this.as === 'skip-link') {
      return html`
        <a href="#main" class="visually-hidden" part="base" @keydown=${this._handleKeyDown}>
          <slot>SKIP TO MAIN CONTENT</slot>
        </a>
      `;
    }

    return html`
      <span
        class="visually-hidden"
        part="base"
        role=${this.as === 'announce' ? 'status' : 'none'}
        aria-live=${this.as === 'announce' ? 'polite' : 'off'}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('thx-visually-hidden', ThxVisuallyHidden);
