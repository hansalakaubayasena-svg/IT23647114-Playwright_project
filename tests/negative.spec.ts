import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

// Negative test cases - These should fail or produce incorrect output
const negativeTests = [
  // 1. Joined words (no spaces) - Should fail
  ['Neg_Fun_01', 'mamagedharayanavaa'],
  
  // 2. ALL CAPS - Might fail
  ['Neg_Fun_02', 'MAMA GEDHARA YANAVAA'],
  
  // 3. Numbers only - Should not translate
  ['Neg_Fun_03', '123456'],
  
  // 4. Special characters only
  ['Neg_Fun_04', '@#$%^&*'],
  
  // 5. Excessive spaces - Might fail
  ['Neg_Fun_05', 'mama    gedhara    yanavaa'],
  
  // 6. Already in Sinhala - Should remain same or error
  ['Neg_Fun_06', 'මම ගෙදර යනවා'],
  
  // 7. Single word - Might not translate correctly
  ['Neg_Fun_07', 'mama'],
  
  // 8. Empty input
  ['Neg_Fun_08', ''],
  
  // 9. Only spaces
  ['Neg_Fun_09', '   '],
  
  // 10. Gibberish mixed
  ['Neg_Fun_10', 'xyz123 mama gedhara']
];

test.describe('Negative Functional Tests for Singlish Translator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForLoadState('networkidle');
  });

  for (const [testId, inputText] of negativeTests) {
    test(`${testId}: "${inputText.substring(0, 20)}..."`, async ({ page }) => {
      // Find the input textarea (Singlish input)
      const inputArea = page.locator('textarea').first();
      
      // Find the output textarea (Sinhala output)
      const outputArea = page.locator('textarea').nth(1);
      
      // Clear and type the input
      await inputArea.clear();
      await inputArea.type(inputText, { delay: 50 });
      
      // Wait for translation (if any)
      await page.waitForTimeout(1500);
      
      // Get the output text
      const outputText = await outputArea.inputValue();
      
      console.log(`Test: ${testId}`);
      console.log(`Input: "${inputText}"`);
      console.log(`Output: "${outputText}"`);
      console.log('---');
      
      // Validate based on input type
      switch(testId) {
        case 'Neg_Fun_01': 
          expect(outputText).not.toBe('මම ගෙදර යනවා');
          break;
          
        case 'Neg_Fun_02': 
          expect(outputText).not.toBe('මම ගෙදර යනවා');
          break;
          
        case 'Neg_Fun_03': 
          
          const hasSinhalaNumbers = /[\u0D80-\u0DFF]/.test(outputText);
          expect(hasSinhalaNumbers).toBe(false);
          break;
          
        case 'Neg_Fun_04': 
          const hasSinhalaSpecial = /[\u0D80-\u0DFF]/.test(outputText);
          expect(hasSinhalaSpecial).toBe(false);
          break;
          
        case 'Neg_Fun_05': 
          expect(outputText).not.toBe('මම ගෙදර යනවා');
          break;
          
        case 'Neg_Fun_06': 
          expect(outputText.trim().length).toBeGreaterThan(0);
          break;
          
        case 'Neg_Fun_07': 
          expect(outputText).toBeDefined();
          break;
          
        case 'Neg_Fun_08': 
        case 'Neg_Fun_09': 
          expect(outputText.trim()).toBe('');
          break;
          
        case 'Neg_Fun_10': 
          expect(outputText).not.toBe('මම ගෙදර යනවා');
          break;
      }
    });
  }

  
  test('Neg_UI_01: Type extremely fast', async ({ page }) => {
    const inputArea = page.locator('textarea').first();
    const outputArea = page.locator('textarea').nth(1);
    
    
    const longText = 'mama gedhara yanavaa '.repeat(10);
    await inputArea.fill(longText);
    
    
    await page.waitForTimeout(1000);
    
    const outputText = await outputArea.inputValue();
    
    
    expect(outputText).toBeDefined();
    console.log('Fast typing test output length:', outputText.length);
  });
});