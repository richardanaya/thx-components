// @ts-check

/**
 * @fileoverview THX 1138 styled toggle switch component
 * @module thx-switch
 */

import { LitElement, html, css } from '../../vendor/lit.js';
import { FormAssociatedMixin } from '../mixins/form-associated-mixin.js';
import { focusVisibleStyles } from '../mixins/focus-visible.js';

/**
 * @typedef {Object} SwitchProps
 * @property {boolean} checked - Whether the switch is checked/on
 * @property {boolean} disabled - Whether the switch is disabled
 * @property {string} value - The value when checked
 * @property {string} name - The switch name
 * @property {string} size - The switch size (sm, md, lg)
 * @property {string} onLabel - Label for ON state
 * @property {string} offLabel - Label for OFF state
 */

/**
 * THX 1138 styled toggle switch component
 * @extends {LitElement}
 */
export class ThxSwitch extends FormAssociatedMixin(LitElement) {

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--size-1);
    }

    .switch-track {
      position: relative;
      background: var(--neutral-600, #666);
      cursor: pointer;
      transition: all var(--duration-moderate-1);
    }

    .switch-track.checked {
      background: var(--atmos-primary, #a6c8e1);
    }

    /* Sizes */
    .size-sm .switch-track {
      width: 28px;
      height: 16px;
    }

    .size-md .switch-track {
      width: 36px;
      height: 20px;
    }

    .size-lg .switch-track {
      width: 44px;
      height: 24px;
    }

    .switch-thumb {
      position: absolute;
      background: white;
      transition: transform var(--duration-moderate-1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .size-sm .switch-thumb {
      width: 14px;
      height: 14px;
      top: 1px;
      left: 1px;
    }

    .size-md .switch-thumb {
      width: 18px;
      height: 18px;
      top: 1px;
      left: 1px;
    }

    .size-lg .switch-thumb {
      width: 22px;
      height: 22px;
      top: 1px;
      left: 1px;
    }

    .size-sm .switch-track.checked .switch-thumb {
      transform: translateX(12px);
    }

    .size-md .switch-track.checked .switch-thumb {
      transform: translateX(16px);
    }

    .size-lg .switch-track.checked .switch-thumb {
      transform: translateX(20px);
    }

    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-track:focus-within {
      box-shadow: 0 0 0 2px rgba(166, 200, 225, 0.5);
    }

    .switch-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      color: var(--neutral-800, #333);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-2);
      user-select: none;
    }

    .state-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: var(--font-size-0);
      color: var(--neutral-600, #666);
      text-transform: uppercase;
      letter-spacing: var(--font-letterspacing-4);
      min-width: 20px;
      text-align: center;
    }

    .switch-track:focus-visible {
      box-shadow: var(--focus-ring-glow, 0 0 0 2px rgba(166, 200, 225, 0.5));
    }

    ${focusVisibleStyles}
  `;

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    name: { type: String },
    size: { type: String },
    onLabel: { type: String },
    offLabel: { type: String },
  };

  constructor() {
    super();
    /** @type {boolean} */
    this.checked = false;
    this._defaultChecked = this.checked;
    /** @type {boolean} */
    this.disabled = false;
    /** @type {string} */
    this.value = 'on';
    /** @type {string} */
    this.name = '';
    /** @type {string} */
    this.size = 'md';
    /** @type {string} */
    this.onLabel = '';
    /** @type {string} */
    this.offLabel = '';
  }

  /** @param {Map<string, unknown>} changedProperties */
  updated(changedProperties) {
    if (
      changedProperties.has('checked') ||
      changedProperties.has('disabled') ||
      changedProperties.has('value')
    ) {
      this._updateFormValue();
    }
  }

  /** @returns {void} */
  firstUpdated() {
    this._defaultChecked = this.checked;
    this._updateFormValue();
  }

  /** @returns {void} */
  _updateFormValue() {
    this._internals?.setFormValue(this.checked && !this.disabled ? this.value : null);
  }

  /** @returns {void} */
  formResetCallback() {
    this.checked = this._defaultChecked;
  }

  /**
   * @returns {void}
   */
  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this._updateFormValue();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  focus() {
    this.renderRoot?.querySelector('.switch-track')?.focus();
  }

  blur() {
    this.renderRoot?.querySelector('.switch-track')?.blur();
  }

  /**
   * @param {MouseEvent} _event
   * @returns {void}
   */
  handleClick(_event) {
    this.toggle();
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {void}
   */
  handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const stateLabel = this.checked ? this.onLabel : this.offLabel;

    return html`
      <div class="switch-wrapper size-${this.size}">
        <slot name="label"></slot>
        <div
          class="switch-track ${this.checked ? 'checked' : ''}"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
          tabindex=${this.disabled ? '-1' : '0'}
          role="switch"
          aria-checked=${this.checked}
        >
          <input
            class="switch-input"
            type="checkbox"
            .checked=${this.checked}
            ?disabled=${this.disabled}
            .value=${this.value}
            .name=${this.name}
            @change=${(/** @type {Event} */ e) => {
              e.stopPropagation();
              this.toggle();
            }}
          />
          <span class="switch-thumb"></span>
        </div>
        ${stateLabel ? html`<span class="state-label">${stateLabel}</span>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('thx-switch', ThxSwitch);
