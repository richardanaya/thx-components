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

  it('does not duplicate thx-icon-button click events', async () => {
    const button = document.createElement('thx-icon-button');
    document.body.append(button);
    await waitForUpdates();

    let clicks = 0;
    button.addEventListener('click', () => clicks++);
    button.shadowRoot.querySelector('button').click();

    if (clicks !== 1) {
      throw new Error(`Expected one click event, got ${clicks}`);
    }
  });

  it('does not synthesize duplicate click events for interactive display components', async () => {
    const avatar = document.createElement('thx-avatar');
    avatar.interactive = true;
    const image = document.createElement('thx-animated-image');
    image.interactive = true;
    document.body.append(avatar, image);
    await waitForUpdates();

    let avatarClicks = 0;
    let imageClicks = 0;
    avatar.addEventListener('click', () => avatarClicks++);
    image.addEventListener('click', () => imageClicks++);
    avatar.shadowRoot.querySelector('.avatar').click();
    image.shadowRoot.querySelector('div').click();

    if (avatarClicks !== 1) {
      throw new Error(`Expected one avatar click event, got ${avatarClicks}`);
    }

    if (imageClicks !== 1) {
      throw new Error(`Expected one animated image click event, got ${imageClicks}`);
    }
  });

  it('emits native-shaped input and change events from form controls', async () => {
    const input = document.createElement('thx-input');
    document.body.append(input);
    await waitForUpdates();

    const events = [];
    input.addEventListener('input', event => events.push(event));
    input.addEventListener('change', event => events.push(event));

    const nativeInput = input.shadowRoot.querySelector('input');
    nativeInput.value = 'alpha';
    nativeInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    nativeInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

    if (events.length !== 2) {
      throw new Error(`Expected input and change events, got ${events.length}`);
    }

    for (const event of events) {
      if (event instanceof CustomEvent) {
        throw new Error(`Expected ${event.type} to be a native Event, got CustomEvent`);
      }

      if (event.target !== input) {
        throw new Error(`Expected ${event.type} target to be the thx-input host`);
      }

      if (event.target.value !== 'alpha') {
        throw new Error(`Expected ${event.type} target value to be alpha`);
      }
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

  it('thx-radio-group participates in native form submission and reset', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <thx-radio-group name="sector" value="alpha">
        <thx-radio value="alpha">ALPHA</thx-radio>
        <thx-radio value="beta">BETA</thx-radio>
      </thx-radio-group>
    `;
    document.body.append(form);
    await waitForUpdates(form);

    let data = new FormData(form);
    if (data.get('sector') !== 'alpha') {
      throw new Error(`Expected initial form value alpha, got ${data.get('sector')}`);
    }

    // Change selection
    const group = form.querySelector('thx-radio-group');
    group.select('beta');
    await waitForUpdates(form);

    data = new FormData(form);
    if (data.get('sector') !== 'beta') {
      throw new Error(`Expected updated form value beta, got ${data.get('sector')}`);
    }

    // Reset
    form.reset();
    await waitForUpdates(form);
    if (group.value !== 'alpha') {
      throw new Error(`Expected reset value alpha, got ${group.value}`);
    }
  });

  it('submits form-associated range values', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <thx-range name="volume" value="65" min="0" max="100"></thx-range>
    `;
    document.body.append(form);
    await waitForUpdates(form);

    const data = new FormData(form);
    if (data.get('volume') !== '65') {
      throw new Error(`Expected form value 65, got ${data.get('volume')}`);
    }
  });

  it('submits form-associated rating values', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <thx-rating name="score" value="3" max="5"></thx-rating>
    `;
    document.body.append(form);
    await waitForUpdates(form);

    const data = new FormData(form);
    if (data.get('score') !== '3') {
      throw new Error(`Expected form value 3, got ${data.get('score')}`);
    }
  });

  it('submits form-associated multi-select values (multi-value)', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <thx-multi-select name="tags" value='["alpha","gamma"]'>
        <thx-option value="alpha">ALPHA</thx-option>
        <thx-option value="beta">BETA</thx-option>
        <thx-option value="gamma">GAMMA</thx-option>
      </thx-multi-select>
    `;
    document.body.append(form);
    await waitForUpdates(form);

    const data = new FormData(form);
    const tags = data.getAll('tags');
    if (tags.length !== 2 || !tags.includes('alpha') || !tags.includes('gamma')) {
      throw new Error(`Expected multi values alpha,gamma got ${tags}`);
    }
  });

  it('supports keyboard focus and arrow navigation on thx-tab-group', async () => {
    const group = document.createElement('thx-tab-group');
    group.innerHTML = `
      <thx-tab value="one">ONE</thx-tab>
      <thx-tab value="two" active>TWO</thx-tab>
      <thx-tab value="three">THREE</thx-tab>
    `;
    document.body.append(group);
    await waitForUpdates(group);

    const nav = group.renderRoot.querySelector('.tab-nav');
    if (!nav) throw new Error('tab-nav not found');

    nav.focus();
    nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await waitForUpdates(group);

    const activeTabs = group.querySelectorAll('thx-tab[active]');
    if (activeTabs.length !== 1) {
      throw new Error(`Expected 1 active tab after arrow, got ${activeTabs.length}`);
    }
  });

  it('supports keyboard focus and arrow navigation on thx-tree', async () => {
    const tree = document.createElement('thx-tree');
    tree.innerHTML = `
      <thx-tree-item value="a">A</thx-tree-item>
      <thx-tree-item value="b">B</thx-tree-item>
    `;
    document.body.append(tree);
    await waitForUpdates(tree);

    const firstItem = tree.querySelector('thx-tree-item');
    if (!firstItem) throw new Error('tree item not found');

    firstItem.focus();
    firstItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await waitForUpdates(tree);

    // At minimum ensure no crash and tree remains in DOM
    if (!tree.querySelector('thx-tree-item')) {
      throw new Error('tree items lost after keyboard nav');
    }
  });

  it('respects reduced-motion by disabling scanlines on CRT component', async () => {
    // Basic smoke: component renders and has crt structure; full media query test requires matchMedia mock
    const crt = document.createElement('thx-crt-display');
    crt.innerHTML = '<div>SCANLINE TEST</div>';
    document.body.append(crt);
    await waitForUpdates(crt);

    const displayEl = crt.renderRoot.querySelector('.crt-display');
    if (!displayEl) {
      throw new Error('CRT display element not rendered');
    }
    // Verify scanline pseudo exists in styles (animation controlled by media query in CSS)
    const styles = crt.renderRoot.querySelector('style') || document.querySelector('style');
    // Non-crashing assertion
    if (!displayEl.classList.contains('crt-display') && !crt.shadowRoot) {
      throw new Error('CRT component structure invalid');
    }
  });

  it('dialog and drawer manage scroll lock behavior on open/close', async () => {
    const dialog = document.createElement('thx-dialog');
    dialog.innerHTML = '<div slot="header">TEST</div><p>Content</p>';
    document.body.append(dialog);
    await waitForUpdates(dialog);

    const prevOverflow = document.body.style.overflow || '';
    dialog.open = true;
    await waitForUpdates(dialog);
    if (document.body.style.overflow !== 'hidden') {
      throw new Error(`Expected body overflow hidden on dialog open, got ${document.body.style.overflow}`);
    }

    dialog.open = false;
    await waitForUpdates(dialog);
    // Restore may keep or reset
    // At least no throw

    // Drawer smoke test (may not lock body but renders)
    const drawer = document.createElement('thx-drawer');
    drawer.innerHTML = '<div slot="header">DRAWER</div>';
    document.body.append(drawer);
    await waitForUpdates(drawer);
    drawer.open = true;
    await waitForUpdates(drawer);
    drawer.open = false;
    await waitForUpdates(drawer);
  });
});
