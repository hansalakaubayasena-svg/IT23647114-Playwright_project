import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

const cases = [
  ['Neg_Fun_01', 'mamagedharayanavaa'],
  ['Neg_Fun_02', 'oyakohomadhainne'],
  ['Neg_Fun_03', 'apibathkanavaa'],
  ['Neg_Fun_04', '123456'],
  ['Neg_Fun_05', '@#$%^&*'],
  ['Neg_Fun_06', 'mama    gedhara    yanavaa'],
  ['Neg_Fun_07', 'MAMA GEDHARA YANAVAA'],
  ['Neg_Fun_08', 'මම ගෙදර යනවා'],
  ['Neg_Fun_09', 'mama'],
  ['Neg_Fun_10', ' ']
];

for (const [id, inputText] of cases) {
  test(`${id}`, async ({ page }) => {
    await page.goto(URL);

    const input = page.locator('textarea').first();
    const outputContainer = page.locator('div').filter({ hasText: 'Sinhala' }).last();

    await input.fill(inputText);
    await page.waitForTimeout(500);
    const textContent = await outputContainer.textContent();
    const hasOnlyLabel = textContent?.trim() === 'Sinhala' || textContent?.trim() === '';
    expect(hasOnlyLabel).toBe(false);
  });
}