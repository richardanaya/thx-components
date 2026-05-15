// @ts-check

/**
 * @fileoverview THX 1138 styled CRT monitor display wrapper
 * @module thx-crt-display
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { crtMonitorStyles } from '../styles/crt-effects.js';

/**
 * THX 1138 styled CRT monitor display wrapper
 * Provides scanlines, vignette, and monitor frame styling (uses centralized crt-effects.js)
 * @extends {LitElement}
 */
export class ThxCrtDisplay extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    ${crtMonitorStyles}

    .crt-content {
      padding: var(--size-4);
    }

    .crt-label {
      top: var(--size-1);
      right: var(--size-2);
      color: var(--neutral-600, #666);
    }

    /* Scope variant specific padding override (shared handles grid + frame) */
    .crt-display.scope .crt-content {
      padding: var(--size-5);
    }

    /* Small variant */
    .crt-display.small {
      border-width: var(--size-2);
    }

    .crt-display.small .crt-content {
      padding: calc(var(--size-2) + var(--size-1));
    }

    /* Large variant */
    .crt-display.large {
      border-width: var(--size-3);
    }

    .crt-display.large .crt-content {
      padding: var(--size-7);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      label: { type: String },
      variant: { type: String },
      size: { type: String },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.variant = 'crt';
    this.size = 'medium';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <div class="crt-display ${this.variant} ${this.size}">
        ${this.label ? html`<span class="crt-label">${this.label}</span>` : ''}
        <div class="crt-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('thx-crt-display', ThxCrtDisplay);
