import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';


const cases = [
  ['Neg_Fun_01', 'mamagedharayanavaa','මම ගෙදර යනවා'],
  ['Neg_Fun_02', 'oyakohomadhainne','ඔයා කොහොමද ඉන්නේ'],
  ['Neg_Fun_03', 'apibathkanavaa',],
  ['Neg_Fun_04', '123456',''],
  ['Neg_Fun_05', '@#$%^&*',''],
  ['Neg_Fun_06', 'mama    gedhara    yanavaa','මමගෙදරයනවා'],
  ['Neg_Fun_07', 'MAMA GEDHARA YANAVAA','මම ගෙදර යනවා'],
  ['Neg_Fun_08', 'මම ගෙදර යනවා','මම ගෙදර යනවා'],
  ['Neg_Fun_09', 'mama'],
  ['Neg_Fun_10', ' ']
];

for (const [id, inputText] of cases) {
  test(`${id}`, async ({ page }) => {
    await page.goto(URL);

    
    const input = page.locator('textarea').first();
    
    const output = page.locator('#output-text, .translation-output, div[dir="ltr"] >> nth=1');

    
    await input.fill(inputText);

    
    await expect(async () => {
      const text = await output.textContent();
      
      expect(text?.trim()).not.toBe('Sinhala');
      expect(text?.trim()).not.toBe('');
    }).toPass({
      intervals: [500, 1000], 
      timeout: 5000          
    });

    
    const finalResult = await output.textContent();
    console.log(`Input: ${inputText} -> Output: ${finalResult}`);
    
    
    expect(finalResult).toMatch(/[\u0D80-\u0DFF]/);
  });
}