import { test, expect } from '@playwright/test';

test('Pos_UI_0001 – Clearing input clears output', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  
  const input = page.locator('textarea').first();

  await input.fill('mama gedhara yanavaa');
    await page.waitForTimeout(2000);
  await expect(page.locator('body')).toContainText('ගෙදර');

  await input.fill('');
    await page.waitForTimeout(2000);
  // After clearing, translated text should be gone
  await expect(page.locator('body')).not.toContainText('ගෙදර');
});
