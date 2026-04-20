// @ts-check

/**
 * @fileoverview THX 1138 styled split panel component
 * @module thx-split-panel
 */

import { LitElement, html, css } from 'lit';

/**
 * @typedef {Object} SplitPanelConfig
 * @property {'horizontal'|'vertical'} orientation - Split direction
 * @property {number} [position=50] - Initial split position (0-100)
 * @property {string} [primary='start'] - Which panel is primary
 * @property {boolean} [resizable=true] - Whether the split is resizable
 */

/**
 * THX 1138 styled split panel component.
 * A resizable two-pane layout with clinical, dystopian aesthetics.
 *
 * @extends {LitElement}
 */
export class ThxSplitPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .split-container {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    :host([orientation='vertical']) .split-container {
      flex-direction: column;
    }

    /* Panel styling */
    .panel {
      overflow: auto;
      min-width: 0;
      min-height: 0;
    }

    .panel-start {
      background: var(--neutral-100, #fafafa);
    }

    .panel-end {
      background: var(--neutral-100, #fafafa);
    }

    :host([variant='crt']) .panel-start {
      background: var(--crt-bg, #111);
      color: var(--atmos-primary, #a6c8e1);
    }

    :host([variant='crt']) .panel-end {
      background: var(--crt-bg-dark, #0a0a0a);
      color: var(--atmos-primary, #a6c8e1);
    }

    /* Divider styling - THX 1138 clinical */
    .divider {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--neutral-200, #e0e0e0);
      flex-shrink: 0;
      user-select: none;
    }

    :host([orientation='horizontal']) .divider {
      width: 20px;
      cursor: col-resize;
    }

    :host([orientation='vertical']) .divider {
      height: 20px;
      cursor: row-resize;
    }

    :host([resizable='false']) .divider {
      cursor: default;
    }

    /* Divider track */
    .divider::before {
      content: '';
      position: absolute;
      background: var(--atmos-secondary, #707e91);
    }

    :host([orientation='horizontal']) .divider::before {
      width: 2px;
      height: 100%;
    }

    :host([orientation='vertical']) .divider::before {
      width: 100%;
      height: 2px;
    }

    /* Divider handle */
    .divider-handle {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--neutral-100, #fafafa);
      border: 2px solid var(--atmos-secondary, #707e91);
      box-shadow: 0 0 0 3px var(--neutral-200, #e0e0e0);
    }

    :host([orientation='horizontal']) .divider-handle {
      width: 16px;
      height: 60px;
    }

    :host([orientation='vertical']) .divider-handle {
      width: 60px;
      height: 16px;
    }

    :host([variant='crt']) .divider {
      background: #222;
    }

    :host([variant='crt']) .divider-handle {
      background: #111;
      border-color: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 8px rgba(166, 200, 225, 0.3);
    }

    /* Grip lines on handle */
    .divider-handle::after {
      content: '';
      background: var(--atmos-secondary, #707e91);
    }

    :host([orientation='horizontal']) .divider-handle::after {
      width: 3px;
      height: 36px;
      background: repeating-linear-gradient(
        0deg,
        var(--atmos-secondary, #707e91),
        var(--atmos-secondary, #707e91) 3px,
        transparent 3px,
        transparent 6px
      );
    }

    :host([orientation='vertical']) .divider-handle::after {
      width: 36px;
      height: 3px;
      background: repeating-linear-gradient(
        90deg,
        var(--atmos-secondary, #707e91),
        var(--atmos-secondary, #707e91) 3px,
        transparent 3px,
        transparent 6px
      );
    }

    /* Panel labels */
    .panel-label {
      position: absolute;
      font-size: 0.5625rem;
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      pointer-events: none;
    }

    :host([orientation='horizontal']) .panel-label {
      top: 4px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    :host([orientation='vertical']) .panel-label {
      left: 4px;
    }

    :host([variant='crt']) .panel-label {
      color: var(--atmos-secondary, #707e91);
    }

    /* Panel header/footer bars */
    .panel-bar {
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      font-size: 0.6875rem;
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    :host([variant='crt']) .panel-bar {
      background: rgba(166, 200, 225, 0.05);
      border-bottom-color: rgba(166, 200, 225, 0.1);
      color: var(--atmos-secondary, #707e91);
    }

    .panel-indicator {
      width: 6px;
      height: 6px;
      background: var(--atmos-secondary, #707e91);
    }

    :host([variant='crt']) .panel-indicator {
      background: var(--atmos-primary, #a6c8e1);
      box-shadow: 0 0 4px rgba(166, 200, 225, 0.5);
    }

    /* Panel content area */
    .panel-content {
      padding: 16px;
    }

    /* Size display */
    .size-display {
      margin-left: auto;
      font-size: 0.5625rem;
      color: var(--neutral-600, #666);
    }

    :host([variant='crt']) .size-display {
      color: var(--atmos-secondary, #707e91);
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      /** Split orientation */
      orientation: { type: String },
      /** Split position (0-100) */
      position: { type: Number },
      /** Whether the split is resizable */
      resizable: { type: Boolean },
      /** Variant style */
      variant: { type: String },
      /** Panel label for start panel */
      startLabel: { type: String, attribute: 'start-label' },
      /** Panel label for end panel */
      endLabel: { type: String, attribute: 'end-label' },
      /** Whether user is currently dragging */
      _dragging: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    /** @type {'horizontal'|'vertical'} */
    this.orientation = 'horizontal';
    /** @type {number} */
    this.position = 50;
    /** @type {boolean} */
    this.resizable = true;
    /** @type {string} */
    this.variant = 'default';
    /** @type {string} */
    this.startLabel = 'PANEL-A';
    /** @type {string} */
    this.endLabel = 'PANEL-B';
    /** @type {boolean} */
    this._dragging = false;
  }

  /**
   * Handles divider drag start.
   * @param {PointerEvent} event
   * @returns {void}
   */
  _handleDragStart(event) {
    if (!this.resizable) return;

    this._dragging = true;
    this.setPointerCapture(event.pointerId);

    this.addEventListener('pointermove', this._handleDragMove);
    this.addEventListener('pointerup', this._handleDragEnd);
    this.addEventListener('pointercancel', this._handleDragEnd);
  }

  /**
   * Handles divider drag move.
   * @param {PointerEvent} event
   * @returns {void}
   */
  _handleDragMove = event => {
    if (!this._dragging) return;

    const rect = this.getBoundingClientRect();

    if (this.orientation === 'horizontal') {
      const x = event.clientX - rect.left;
      this.position = Math.max(10, Math.min(90, (x / rect.width) * 100));
    } else {
      const y = event.clientY - rect.top;
      this.position = Math.max(10, Math.min(90, (y / rect.height) * 100));
    }

    this.requestUpdate();
  };

  /**
   * Handles divider drag end.
   * @param {PointerEvent} event
   * @returns {void}
   */
  _handleDragEnd = event => {
    this._dragging = false;
    this.releasePointerCapture(event.pointerId);

    this.removeEventListener('pointermove', this._handleDragMove);
    this.removeEventListener('pointerup', this._handleDragEnd);
    this.removeEventListener('pointercancel', this._handleDragEnd);

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { position: this.position },
        bubbles: true,
        composed: true,
      })
    );
  };

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const startSize = `${this.position}%`;
    const endSize = `${100 - this.position}%`;

    return html`
      <div
        class="split-container"
        part="base"
        style="${this.orientation === 'horizontal'
          ? 'flex-direction: row;'
          : 'flex-direction: column;'}"
      >
        <div
          class="panel panel-start"
          part="panel-start"
          style="${this.orientation === 'horizontal'
            ? `width: ${startSize}; flex: 0 0 auto;`
            : `height: ${startSize}; flex: 0 0 auto;`}"
        >
          <div class="panel-bar">
            <div class="panel-indicator"></div>
            <span>${this.startLabel}</span>
            <span class="size-display">${Math.round(this.position)}%</span>
          </div>
          <div class="panel-content">
            <slot name="start"></slot>
          </div>
        </div>

        <div class="divider" part="divider" @pointerdown=${this._handleDragStart}>
          <div class="divider-handle" part="divider-handle"></div>
        </div>

        <div
          class="panel panel-end"
          part="panel-end"
          style="${this.orientation === 'horizontal'
            ? `width: ${endSize}; flex: 0 0 auto;`
            : `height: ${endSize}; flex: 0 0 auto;`}"
        >
          <div class="panel-bar">
            <div class="panel-indicator"></div>
            <span>${this.endLabel}</span>
            <span class="size-display">${Math.round(100 - this.position)}%</span>
          </div>
          <div class="panel-content">
            <slot name="end"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('thx-split-panel', ThxSplitPanel);
