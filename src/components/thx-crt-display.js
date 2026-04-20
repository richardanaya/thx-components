// @ts-check

/**
 * @fileoverview THX 1138 styled CRT monitor display wrapper
 * @module thx-crt-display
 */

import { LitElement, html, css } from 'lit';

/**
 * THX 1138 styled CRT monitor display wrapper
 * Provides scanlines, vignette, and monitor frame styling
 * @extends {LitElement}
 */
export class ThxCrtDisplay extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .crt-display {
      background: var(--crt-bg, #111);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .crt-display::before {
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
      animation: scanlines 8s linear infinite;
    }

    @keyframes scanlines {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(4px);
      }
    }

    .crt-display::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
      pointer-events: none;
      z-index: 11;
    }

    .crt-content {
      position: relative;
      z-index: 5;
      padding: 20px;
    }

    .crt-label {
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

    /* Tektronix scope variant */
    .crt-display.scope {
      background: var(--crt-bg-dark, #0a0a0a);
      border-color: var(--crt-border, #2a2a2a);
    }

    .crt-display.scope::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(166, 200, 225, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(166, 200, 225, 0.2) 1px, transparent 1px);
      background-size: 20px 20px;
      pointer-events: none;
      animation: none;
    }

    .crt-display.scope .crt-content {
      padding: 24px;
    }

    /* Small variant */
    .crt-display.small {
      border-width: 8px;
    }

    .crt-display.small .crt-content {
      padding: 12px;
    }

    /* Large variant */
    .crt-display.large {
      border-width: 16px;
    }

    .crt-display.large .crt-content {
      padding: 32px;
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
