// @ts-check

/**
 * @fileoverview THX 1138 styled card component for content containers.
 * @module thx-card
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { crtMonitorStyles } from '../styles/crt-effects.js';

/**
 * @typedef {Object} CardConfig
 * @property {string} label - Card label/header
 * @property {boolean} crt - Whether to use CRT display styling
 * @property {boolean} hoverable - Whether card has hover effects
 */

/**
 * Card component for content containers.
 * Styled with THX 1138 monochrome aesthetic.
 * CRT variant uses centralized crt-effects for scanlines/vignette.
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
      padding: var(--size-7);
      box-shadow: var(--inner-shadow-0);
      position: relative;
    }

    .card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--size-5);
      padding-bottom: calc(var(--size-2) + var(--size-1));
      border-bottom: var(--border-size-1) solid rgba(0, 0, 0, 0.08);
    }

    .card__label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-5);
      color: var(--neutral-600, #666);
    }

    .card__actions {
      display: flex;
      gap: var(--size-2);
    }

    .card__content {
      position: relative;
    }

    .card--hoverable {
      transition: box-shadow var(--duration-moderate-1);
      cursor: pointer;
    }

    .card--hoverable:hover {
      box-shadow:
        var(--inner-shadow-1),
        0 0 15px rgba(166, 200, 225, 0.3);
    }

    ${crtMonitorStyles}

    /* CRT Display Variant (composes with .crt-surface for shared scanlines/vignette) */
    .card--crt {
      padding: var(--size-4);
      color: var(--atmos-primary, #a6c8e1);
      /* base frame, border, bg, ::before/::after, keyframes, reduced-motion provided by crtMonitorStyles via .crt-surface */
    }

    .card--crt .card__header {
      border-bottom-color: rgba(166, 200, 225, 0.2);
    }

    .card--crt .card__label {
      color: var(--atmos-secondary, #707e91);
    }

    .card--crt .card__content {
      position: relative;
      z-index: var(--layer-1);
    }

    /* Inner border decoration */
    .card__inner-border {
      position: absolute;
      inset: var(--size-1);
      border: var(--border-size-1) solid rgba(0, 0, 0, 0.04);
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
      'crt-surface': this.crt, // enables shared crtMonitorStyles scanlines + vignette + reduced-motion
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
