// @ts-check

/**
 * @fileoverview THX 1138 styled menu container component
 * @module thx-menu
 */

import { LitElement, html, css } from 'lit';

/**
 * Menu container for navigation lists
 * THX 1138 style: clinical, border-separated, monospace labels
 * @element thx-menu
 */
export class ThxMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--neutral-100, #fafafa);
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
      min-width: 200px;
    }

    .menu-header {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--neutral-600, #666);
      background: rgba(0, 0, 0, 0.02);
    }

    .menu-header::before {
      content: '// ';
    }

    .menu-header::after {
      content: ' //';
    }

    .menu-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ::slotted(thx-menu-label) {
      display: block;
    }

    ::slotted(thx-menu-item) {
      display: block;
    }

    /* CRT display variant */
    :host([variant='crt']) {
      background: var(--crt-bg, #111);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    :host([variant='crt']) .menu-header {
      background: transparent;
      color: var(--atmos-secondary, #707e91);
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    :host([variant='crt'])::before {
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

    :host([variant='crt']) .crt-label {
      position: absolute;
      top: 4px;
      right: 8px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      z-index: 15;
    }

    /* Compact variant */
    :host([variant='compact']) {
      border: none;
      box-shadow: none;
      background: transparent;
    }

    :host([variant='compact']) .menu-header {
      background: transparent;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    label: { type: String },
    variant: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Header label text */
    this.label = '';
    /** @type {string} Variant: default, crt, compact */
    this.variant = 'default';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      ${this.variant === 'crt' ? html`<span class="crt-label">MENU-01</span>` : ''}
      ${this.label ? html`<div class="menu-header">${this.label}</div>` : ''}
      <ul class="menu-list" role="menu">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('thx-menu', ThxMenu);
