// @ts-check

/**
 * @fileoverview THX 1138 styled card component for content containers.
 * @module thx-card
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} CardConfig
 * @property {string} label - Card label/header
 * @property {boolean} crt - Whether to use CRT display styling
 * @property {boolean} hoverable - Whether card has hover effects
 */

/**
 * Card component for content containers.
 * Styled with THX 1138 monochrome aesthetic.
 *
 * @extends {LitElement}
 */
export class ThxCard extends LitElement {
  /** @type {import('lit').CSSResult} */
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--neutral-100, #fafafa);
      padding: 32px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
      position: relative;
    }

    .card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .card__label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--neutral-600, #666);
    }

    .card__actions {
      display: flex;
      gap: 8px;
    }

    .card__content {
      position: relative;
    }

    .card--hoverable {
      transition: box-shadow 0.2s;
      cursor: pointer;
    }

    .card--hoverable:hover {
      box-shadow:
        inset 0 0 0 1px rgba(0, 0, 0, 0.12),
        0 0 15px rgba(166, 200, 225, 0.3);
    }

    /* CRT Display Variant */
    .card--crt {
      background: var(--crt-bg, #111);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      padding: 20px;
      color: var(--atmos-primary, #a6c8e1);
      overflow: hidden;
    }

    .card--crt .card__header {
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    .card--crt .card__label {
      color: var(--atmos-secondary, #707e91);
    }

    .card--crt::before {
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

    .card--crt::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
      pointer-events: none;
      z-index: 11;
    }

    .card--crt .card__content {
      position: relative;
      z-index: 5;
    }

    /* Inner border decoration */
    .card__inner-border {
      position: absolute;
      inset: 4px;
      border: 1px solid rgba(0, 0, 0, 0.04);
      pointer-events: none;
    }

    .card--crt .card__inner-border {
      border-color: rgba(166, 200, 225, 0.1);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** Card label/header text */
      label: { type: String },
      /** Whether to use CRT display styling */
      crt: { type: Boolean, reflect: true },
      /** Whether card has hover effects */
      hoverable: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    /** @type {string} */
    this.label = '';
    /** @type {boolean} */
    this.crt = false;
    /** @type {boolean} */
    this.hoverable = false;
  }

  /**
   * Render the card component.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const cardClasses = {
      card: true,
      'card--crt': this.crt,
      'card--hoverable': this.hoverable,
    };

    const classString = Object.entries(cardClasses)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');

    return html`
      <div class="${classString}">
        <div class="card__inner-border"></div>
        ${this.label
          ? html`
              <div class="card__header">
                <span class="card__label">${this.label}</span>
                <div class="card__actions">
                  <slot name="actions"></slot>
                </div>
              </div>
            `
          : null}
        <div class="card__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('thx-card', ThxCard);
