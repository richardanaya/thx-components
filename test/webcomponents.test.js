import '../webcomponents.js';
import * as packageEntry from 'thx-components';

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

async function waitForUpdates(root = document.body) {
  await nextFrame();
  const updates = Array.from(root.querySelectorAll('*'))
    .map(element => element.updateComplete)
    .filter(Boolean);
  await Promise.all(updates);
  await nextFrame();
}

afterEach(() => {
  document.body.replaceChildren();
});

const tags = [
  'thx-alert',
  'thx-animated-image',
  'thx-animation',
  'thx-avatar',
  'thx-badge',
  'thx-breadcrumb-item',
  'thx-breadcrumb',
  'thx-button-group',
  'thx-button',
  'thx-card',
  'thx-carousel-item',
  'thx-carousel',
  'thx-chart-bar',
  'thx-chart-gauge',
  'thx-chart-line',
  'thx-chart-monitors',
  'thx-checkbox',
  'thx-color-picker',
  'thx-copy-button',
  'thx-crt-display',
  'thx-details',
  'thx-dialog',
  'thx-divider',
  'thx-drawer',
  'thx-dropdown',
  'thx-format-bytes',
  'thx-format-date',
  'thx-format-number',
  'thx-icon-button',
  'thx-icon',
  'thx-image-comparer',
  'thx-include',
  'thx-input',
  'thx-menu-item',
  'thx-menu',
  'thx-menu-label',
  'thx-multi-select',
  'thx-mutation-observer',
  'thx-option',
  'thx-popup',
  'thx-progress-bar',
  'thx-progress-ring',
  'thx-radio-button',
  'thx-radio-group',
  'thx-radio',
  'thx-range',
  'thx-rating',
  'thx-relative-time',
  'thx-resize-observer',
  'thx-select',
  'thx-skeleton',
  'thx-spinner',
  'thx-split-panel',
  'thx-status-leds',
  'thx-switch',
  'thx-tab-group',
  'thx-tab',
  'thx-tab-panel',
  'thx-tag',
  'thx-textarea',
  'thx-tooltip',
  'thx-tree-item',
  'thx-tree',
  'thx-visually-hidden',
];

const exports = [
  'ThxAlert',
  'ThxAnimatedImage',
  'ThxAnimation',
  'ThxAvatar',
  'ThxBadge',
  'ThxBreadcrumbItem',
  'ThxBreadcrumb',
  'ThxButtonGroup',
  'ThxButton',
  'ThxCard',
  'ThxCarouselItem',
  'ThxCarousel',
  'ThxChartBar',
  'ThxChartGauge',
  'ThxChartLine',
  'ThxChartMonitors',
  'ThxCheckbox',
  'ThxColorPicker',
  'ThxCopyButton',
  'ThxCrtDisplay',
  'ThxDetails',
  'ThxDialog',
  'ThxDivider',
  'ThxDrawer',
  'ThxDropdown',
  'ThxFormatBytes',
  'ThxFormatDate',
  'ThxFormatNumber',
  'ThxIconButton',
  'ThxIcon',
  'ThxImageComparer',
  'ThxInclude',
  'ThxInput',
  'ThxMenuItem',
  'ThxMenu',
  'ThxMenuLabel',
  'ThxMultiSelect',
  'ThxMutationObserver',
  'ThxOption',
  'ThxPopup',
  'ThxProgressBar',
  'ThxProgressRing',
  'ThxRadioButton',
  'ThxRadioGroup',
  'ThxRadio',
  'ThxRange',
  'ThxRating',
  'ThxRelativeTime',
  'ThxResizeObserver',
  'ThxSelect',
  'ThxSkeleton',
  'ThxSpinner',
  'ThxSplitPanel',
  'ThxStatusLeds',
  'ThxSwitch',
  'ThxTabGroup',
  'ThxTab',
  'ThxTabPanel',
  'ThxTag',
  'ThxTextarea',
  'ThxTooltip',
  'ThxTreeItem',
  'ThxTree',
  'ThxVisuallyHidden',
];

describe('webcomponents.js', () => {
  it('registers all 64 custom elements', () => {
    if (tags.length !== 64) {
      throw new Error(`Expected 64 tags in smoke test, got ${tags.length}`);
    }

    const missing = tags.filter(tag => !customElements.get(tag));

    if (missing.length > 0) {
      throw new Error(`Missing custom element registrations: ${missing.join(', ')}`);
    }
  });
});

describe('package entry', () => {
  it('exports all component classes', () => {
    const missing = exports.filter(name => typeof packageEntry[name] !== 'function');

    if (missing.length > 0) {
      throw new Error(`Missing package entry exports: ${missing.join(', ')}`);
    }
  });
});

describe('component behavior', () => {
  it('does not duplicate thx-button click events', async () => {
    const button = document.createElement('thx-button');
    button.textContent = 'CONFIRM';
    document.body.append(button);
    await waitForUpdates();

    let clicks = 0;
    button.addEventListener('click', () => clicks++);
    button.shadowRoot.querySelector('button').click();

    if (clicks !== 1) {
      throw new Error(`Expected one click event, got ${clicks}`);
    }
  });

  it('discovers select options on initial render and supports keyboard selection', async () => {
    const select = document.createElement('thx-select');
    select.innerHTML = `
      <thx-option value="alpha">ALPHA</thx-option>
      <thx-option value="beta">BETA</thx-option>
    `;
    document.body.append(select);
    await waitForUpdates();

    if (select.options.length !== 2) {
      throw new Error(`Expected 2 options, got ${select.options.length}`);
    }

    const trigger = select.shadowRoot.querySelector('.select-trigger');
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await waitForUpdates();

    if (select.value !== 'beta') {
      throw new Error(`Expected keyboard selection to choose beta, got ${select.value}`);
    }
  });

  it('submits form-associated select values', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <thx-select name="mode" value="manual">
        <thx-option value="manual">MANUAL</thx-option>
        <thx-option value="auto">AUTO</thx-option>
      </thx-select>
    `;
    document.body.append(form);
    await waitForUpdates(form);

    const data = new FormData(form);
    if (data.get('mode') !== 'manual') {
      throw new Error(`Expected form value manual, got ${data.get('mode')}`);
    }
  });

  it('renders include text content as escaped text', async () => {
    const include = document.createElement('thx-include');
    include.mode = 'text';
    include._content = '<strong>SAFE TEXT</strong>';
    document.body.append(include);
    await waitForUpdates();

    const content = include.shadowRoot.querySelector('.include-content');
    if (!content.textContent.includes('<strong>SAFE TEXT</strong>')) {
      throw new Error(`Expected raw text content, got ${content.textContent}`);
    }
    if (content.innerHTML.includes('[object Object]')) {
      throw new Error('Text include rendered a TemplateResult object');
    }
  });
});
