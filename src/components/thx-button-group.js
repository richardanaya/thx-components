// @ts-check

/**
 * @fileoverview THX 1138 styled button group component
 * @module thx-button-group
 */

import { LitElement, html, css } from 'lit';

/**
 * Button group for grouping related actions together
 * THX 1138 style: stark borders, clinical precision
 * @element thx-button-group
 */
export class ThxButtonGroup extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      border: 1px solid var(--atmos-secondary, #707e91);
      background: var(--neutral-100, #fafafa);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
    }

    ::slotted(button) {
      margin: 0 !important;
      border-radius: 0 !important;
      border: none !important;
      border-right: 1px solid var(--atmos-secondary, #707e91) !important;
      background: transparent !important;
      color: var(--atmos-secondary, #707e91) !important;
      font-family: var(--font-mono, 'Courier New', Courier, monospace) !important;
      font-size: 0.6875rem !important;
      text-transform: uppercase !important;
      letter-spacing: 0.12em !important;
      padding: 8px 16px !important;
      height: 36px !important;
      cursor: pointer !important;
      transition: all 0.15s !important;
    }

    ::slotted(thx-button) {
      margin: 0 !important;
      --thx-button-grouped: true;
    }

    ::slotted(thx-button[grouped]) {
      margin: 0 !important;
    }

    ::slotted(button:last-child) {
      border-right: none !important;
    }

    ::slotted(button:hover) {
      background: rgba(166, 200, 225, 0.1) !important;
      color: var(--atmos-primary, #a6c8e1) !important;
    }

    ::slotted(button[active]),
    ::slotted(button.active) {
      background: var(--atmos-primary, #a6c8e1) !important;
      color: var(--neutral-800, #333) !important;
      box-shadow: inset 0 0 10px rgba(166, 200, 225, 0.3) !important;
    }

    ::slotted(button:disabled) {
      opacity: 0.4 !important;
      cursor: not-allowed !important;
      background: transparent !important;
    }

    /* Size variants */
    :host([size='sm']) ::slotted(button),
    :host([size='sm']) ::slotted(thx-button) {
      padding: 6px 12px !important;
      font-size: 0.5625rem !important;
      height: 28px !important;
    }

    :host([size='lg']) ::slotted(button),
    :host([size='lg']) ::slotted(thx-button) {
      padding: 12px 24px !important;
      font-size: 0.75rem !important;
      height: 44px !important;
    }
  `;

  /**
   * @type {import('lit').PropertyDeclarations}
   */
  static properties = {
    size: { type: String, reflect: true },
  };

  constructor() {
    super();
    /** @type {string} Size variant: sm, md, lg */
    this.size = 'md';
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('thx-button-group', ThxButtonGroup);
