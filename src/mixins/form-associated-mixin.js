// @ts-check

/**
 * @fileoverview FormAssociatedMixin for THX 1138 components
 * @module mixins/form-associated-mixin
 *
 * Provides native form participation (ElementInternals) for Lit-based custom elements.
 * Eliminates ~15-20 lines of duplicated boilerplate across form controls.
 *
 * Usage:
 *   import { FormAssociatedMixin } from '../mixins/form-associated-mixin.js';
 *   export class ThxMyControl extends FormAssociatedMixin(LitElement) { ... }
 *
 * Subclasses must:
 *   - Declare their own `value`, `checked`, `name`, `disabled`, `required`, `errorMessage` etc. in static properties
 *   - Initialize `_defaultValue` / `_defaultChecked` in constructor + firstUpdated
 *   - Optionally implement `_computeFormValue()` for complex cases (multi-select FormData, etc.)
 *   - Call `this._syncFormValue()` (or keep their existing `_updateFormValue` and delegate)
 *
 * The mixin is intentionally minimal and non-breaking. Existing method names are preserved.
 */

import { LitElement } from '../../vendor/lit.js';

/**
 * @typedef {Object} FormValue
 * @property {string|FormData|null} value - The value to submit
 */

/**
 * Mixin that adds native form association via ElementInternals.
 * @template {typeof LitElement} T
 * @param {T} superclass
 * @returns {T & { formAssociated: true }}
 */
export const FormAssociatedMixin = (superclass) =>
  class extends superclass {
    static formAssociated = true;

    /**
     * @param {...any} args
     */
    constructor(...args) {
      super(...args);
      /** @type {ElementInternals|null} */
      this._internals = this.attachInternals?.() ?? null;
    }

    /**
     * Centralized form value sync. Subclasses should call this (or override _computeFormValue).
     * @returns {void}
     * @protected
     */
    _syncFormValue() {
      if (!this._internals) return;

      // Allow subclass to provide exact FormData / value computation (e.g. multi-select)
      const custom = this._computeFormValue?.();
      if (custom !== undefined) {
        this._internals.setFormValue(custom);
        return;
      }

      // Default heuristics (covers most string/checked cases)
      let formValue = null;

      if (this.disabled) {
        formValue = null;
      } else if (this.checked != null) {
        // checkbox, switch, radio-button style
        formValue = this.checked ? (this.value ?? 'on') : null;
      } else if (this.value != null) {
        formValue = typeof this.value === 'number' ? String(this.value) : this.value;
      }

      // For array values (multi-select) the subclass _computeFormValue should handle it
      if (Array.isArray(formValue)) {
        // Fallback: join or let subclass override
        formValue = formValue.length ? formValue.join(',') : null;
      }

      this._internals.setFormValue(formValue);
    }

    /**
     * Optional hook for complex form values (e.g. FormData with multiple entries).
     * Return undefined to use the default heuristic in _syncFormValue.
     * @returns {string|FormData|null|undefined}
     * @protected
     */
    _computeFormValue() {
      return undefined;
    }

    /**
     * Lifecycle: sync when value/disabled/checked change.
     * Subclasses should call super.updated(changed) if they override.
     * @param {Map<string|symbol, unknown>} changedProperties
     */
    updated(changedProperties) {
      if (super.updated) {
        super.updated(changedProperties);
      }

      const needsSync =
        changedProperties.has('value') ||
        changedProperties.has('disabled') ||
        changedProperties.has('checked') ||
        changedProperties.has('readonly');

      if (needsSync) {
        this._syncFormValue();
      }
    }

    /**
     * Capture default value on first render and do initial sync.
     * Subclasses must still set `this._defaultValue = this.value;` (or equivalent) before calling super.
     * @param {Map<string|symbol, unknown>} [changedProperties]
     */
    firstUpdated(changedProperties) {
      if (super.firstUpdated) {
        super.firstUpdated(changedProperties);
      }
      // Subclass is responsible for snapshotting _defaultValue / _defaultChecked
      this._syncFormValue();
    }

    /**
     * Native form reset support.
     * Subclasses can override and call super.formResetCallback() after restoring their state.
     */
    formResetCallback() {
      if (Array.isArray(this._defaultValue)) {
        this.value = [...this._defaultValue];
      } else if (this._defaultChecked !== undefined) {
        this.checked = this._defaultChecked;
        if (this.indeterminate !== undefined) this.indeterminate = false;
      } else if (this._defaultValue !== undefined) {
        this.value = this._defaultValue;
      }

      // Let subclass do additional work (e.g. _updateActiveIndex, clear error)
      if (typeof this._onFormReset === 'function') {
        this._onFormReset();
      }

      this._syncFormValue?.();
      this.requestUpdate();
    }

    /**
     * Optional hook subclasses can implement for extra reset behavior.
     * @protected
     */
    _onFormReset() {}

    /**
     * Convenience getter for the owning form (if any).
     * @returns {HTMLFormElement|null}
     */
    get form() {
      return this._internals?.form ?? null;
    }

    /**
     * Expose basic validity API (will be enhanced with setValidity in later work).
     * @returns {ValidityState|null}
     */
    get validity() {
      return this._internals?.validity ?? null;
    }

    /**
     * @returns {boolean}
     */
    checkValidity() {
      return this._internals?.checkValidity?.() ?? true;
    }

    /**
     * @returns {boolean}
     */
    reportValidity() {
      return this._internals?.reportValidity?.() ?? true;
    }

    /**
     * Set validity state (basic implementation; full constraint validation can be layered on top).
     * @param {ValidityStateFlags} [flags]
     * @param {string} [message]
     * @param {HTMLElement} [anchor]
     */
    setValidity(flags = {}, message = '', anchor) {
      this._internals?.setValidity?.(flags, message, anchor);
      if (message) {
        // Subclass should react to errorMessage if they want visual display
        this.errorMessage = message;
      }
    }
  };

export default FormAssociatedMixin;