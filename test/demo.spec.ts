import { expect, test } from '@playwright/test';

test('terminal renders the control surface', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'THX 1138' })).toBeVisible();
  await expect(page.getByRole('img', { name: /Alpha/ })).toBeVisible();
  await expect(page.locator('thx-format-bytes')).toHaveText('1.50 KB');
  await expect(page.locator('thx-include')).toContainText('SECTOR 7-G');
  await expect(page.locator('thx-scope-line canvas')).toBeVisible();
});

test('confirm button and dismissible alert', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.locator('#action-log')).toHaveText('CONFIRM ACCEPTED');
  const critical = page.locator("thx-alert[data-variant='error']");
  await expect(critical).toBeVisible();
  await critical.getByRole('button', { name: 'Dismiss' }).click();
  await expect(critical).toBeHidden();
});

test('tabs, copy, and the agent bridge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Bay' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Bay 4');

  await page.getByRole('button', { name: 'Copy designation' }).click();
  await expect(page.getByRole('button', { name: 'Copy designation' })).toHaveAttribute(
    'data-copied',
    ''
  );
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe('THX-1138');

  await page.getByRole('button', { name: 'Read surface' }).click();
  await expect(page.locator('#surface-report')).toContainText(/\d+ COMPONENTS/);

  await page.evaluate(async () => {
    await window.__thxAgent.act({
      steps: [{ ref: 'Designation', action: 'setValue', args: ['SEN-5241'] }],
    });
  });
  await expect(page.getByLabel('Designation')).toHaveValue('SEN-5241');
});

test('dialog opens and returns', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open dialog' }).click();
  const dialog = page.getByRole('dialog', { name: 'Project details' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('registered elements include the mapped set', async ({ page }) => {
  await page.goto('/');
  const defined = await page.evaluate(() =>
    [
      'ui-button',
      'ui-dialog',
      'ui-select',
      'ui-tabs',
      'ui-tree',
      'thx-alert',
      'thx-scope-line',
      'thx-crt',
      'thx-copy-button',
      'thx-leds',
    ].map(tag => customElements.get(tag) !== undefined)
  );
  expect(defined.every(Boolean)).toBe(true);
});
