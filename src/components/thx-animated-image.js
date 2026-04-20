// @ts-check

/**
 * @fileoverview THX 1138 styled animated image component with CRT effects.
 * @module thx-animated-image
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} AnimatedImageConfig
 * @property {string} src - Image source URL
 * @property {string} alt - Alt text for accessibility
 * @property {string} variant - Visual variant: 'default' | 'crt' | 'scope'
 * @property {boolean} scanlines - Whether to show scanline overlay
 * @property {boolean} vignette - Whether to show vignette effect
 * @property {boolean} monochrome - Whether to apply monochrome filter
 * @property {string} aspectRatio - Aspect ratio: 'auto' | '1:1' | '4:3' | '16:9'
 */

/**
 * Animated image component with CRT monitor effects.
 * Styled with THX 1138 surveillance-state aesthetic.
 *
 * @extends {LitElement}
 */
export class ThxAnimatedImage extends LitElement {
  /** @type {import('lit').CSSResult} */
  static styles = css`
    :host {
      display: block;
    }

    .image-container {
      position: relative;
      overflow: hidden;
      background: var(--neutral-200, #e0e0e0);
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition:
        transform 0.3s ease,
        filter 0.3s ease;
    }

    /* Aspect ratios */
    .image-container--1-1 {
      aspect-ratio: 1;
    }

    .image-container--4-3 {
      aspect-ratio: 4 / 3;
    }

    .image-container--16-9 {
      aspect-ratio: 16 / 9;
    }

    /* Monochrome filter */
    .image-container--monochrome img {
      filter: grayscale(100%) contrast(1.1);
    }

    /* CRT variant */
    .image-container--crt {
      background: var(--crt-bg, #111);
      border: 8px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .image-container--crt img {
      filter: grayscale(30%) contrast(1.2) brightness(0.9);
    }

    /* Scope/Oscilloscope variant */
    .image-container--scope {
      background: var(--crt-bg-dark, #0a0a0a);
      border: 12px solid var(--crt-border, #2a2a2a);
      border-radius: 4px;
      box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.8);
    }

    .image-container--scope::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(166, 200, 225, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(166, 200, 225, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      pointer-events: none;
      z-index: 5;
    }

    .image-container--scope img {
      filter: grayscale(50%) sepia(20%) contrast(1.3);
      opacity: 0.9;
    }

    /* Scanlines overlay */
    .image-container--scanlines::after {
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

    /* Vignette overlay */
    .image-container--vignette::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
      pointer-events: none;
      z-index: 11;
    }

    /* CRT label */
    .image-label {
      position: absolute;
      top: 4px;
      right: 8px;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 0.625rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      z-index: 15;
      pointer-events: none;
    }

    .image-container--crt .image-label,
    .image-container--scope .image-label {
      color: var(--atmos-secondary, #707e91);
    }

    /* Loading state */
    .image-container--loading {
      background: linear-gradient(
        90deg,
        var(--neutral-200, #e0e0e0) 0%,
        var(--neutral-100, #fafafa) 50%,
        var(--neutral-200, #e0e0e0) 100%
      );
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    /* Hover effect */
    .image-container--interactive {
      cursor: pointer;
    }

    .image-container--interactive:hover img {
      transform: scale(1.02);
    }

    .image-container--crt.image-container--interactive:hover,
    .image-container--scope.image-container--interactive:hover {
      box-shadow:
        inset 0 0 20px rgba(0, 0, 0, 0.5),
        0 0 15px rgba(166, 200, 225, 0.3);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** Image source URL */
      src: { type: String },
      /** Alt text for accessibility */
      alt: { type: String },
      /** Visual variant: 'default' | 'crt' | 'scope' */
      variant: { type: String, reflect: true },
      /** Whether to show scanline overlay */
      scanlines: { type: Boolean, reflect: true },
      /** Whether to show vignette effect */
      vignette: { type: Boolean, reflect: true },
      /** Whether to apply monochrome filter */
      monochrome: { type: Boolean, reflect: true },
      /** Aspect ratio: 'auto' | '1:1' | '4:3' | '16:9' */
      aspectRatio: { type: String, reflect: true, attribute: 'aspect-ratio' },
      /** Label text to display */
      label: { type: String },
      /** Whether image is clickable */
      interactive: { type: Boolean, reflect: true },
      /** Loading state */
      loading: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    /** @type {string} */
    this.src = '';
    /** @type {string} */
    this.alt = '';
    /** @type {string} */
    this.variant = 'default';
    /** @type {boolean} */
    this.scanlines = false;
    /** @type {boolean} */
    this.vignette = false;
    /** @type {boolean} */
    this.monochrome = false;
    /** @type {string} */
    this.aspectRatio = 'auto';
    /** @type {string} */
    this.label = '';
    /** @type {boolean} */
    this.interactive = false;
    /** @type {boolean} */
    this.loading = false;
  }

  /**
   * Get CSS class for aspect ratio.
   * @returns {string} CSS class suffix
   * @private
   */
  _getAspectRatioClass() {
    /** @type {Record<string, string>} */
    const ratioMap = {
      '1:1': '1-1',
      '4:3': '4-3',
      '16:9': '16-9',
    };
    return ratioMap[this.aspectRatio] || '';
  }

  /**
   * Handle image click.
   * @returns {void}
   * @private
   */
  _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent('click', {
          bubbles: true,
          composed: true,
          detail: { src: this.src, alt: this.alt },
        })
      );
    }
  }

  /**
   * Handle image load.
   * @returns {void}
   * @private
   */
  _handleLoad() {
    this.loading = false;
    this.dispatchEvent(
      new CustomEvent('load', {
        bubbles: true,
        composed: true,
        detail: { src: this.src },
      })
    );
  }

  /**
   * Handle image error.
   * @returns {void}
   * @private
   */
  _handleError() {
    this.loading = false;
    this.dispatchEvent(
      new CustomEvent('error', {
        bubbles: true,
        composed: true,
        detail: { src: this.src },
      })
    );
  }

  /**
   * Render the animated image component.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const classes = {
      'image-container': true,
      [`image-container--${this.variant}`]: true,
      [`image-container--${this._getAspectRatioClass()}`]: this.aspectRatio !== 'auto',
      'image-container--scanlines':
        this.scanlines || this.variant === 'crt' || this.variant === 'scope',
      'image-container--vignette': this.vignette || this.variant === 'crt',
      'image-container--monochrome': this.monochrome,
      'image-container--interactive': this.interactive,
      'image-container--loading': this.loading || !this.src,
    };

    const classString = Object.entries(classes)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');

    const displayLabel = this.label || (this.variant === 'crt' ? 'IMG-01' : '');

    return html`
      <div
        class="${classString}"
        @click=${this._handleClick}
        role=${this.interactive ? 'button' : 'img'}
        aria-label=${this.alt || 'Image'}
        tabindex=${this.interactive ? '0' : '-1'}
      >
        ${displayLabel ? html`<span class="image-label">${displayLabel}</span>` : null}
        ${this.src
          ? html`
              <img
                src="${this.src}"
                alt="${this.alt}"
                @load=${this._handleLoad}
                @error=${this._handleError}
              />
            `
          : null}
      </div>
    `;
  }
}

customElements.define('thx-animated-image', ThxAnimatedImage);
