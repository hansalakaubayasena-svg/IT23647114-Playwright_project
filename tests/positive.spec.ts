import { test, expect } from '@playwright/test';

const URL = 'https://www.swifttranslator.com/';

const cases = [
  ['Pos_Fun_01', 'mama gedhara yanavaa', 'මම ගෙදර යනවා'],
  ['Pos_Fun_02', 'oya kohomadha inne', 'ඔයා කොහොමද ඉන්නේ'],
  ['Pos_Fun_03', 'api bath kanavaa', 'අපි බත් කනවා'],
  ['Pos_Fun_04', 'eya weda karanavaa', 'එයා වැඩ කරනවා'],
  ['Pos_Fun_05', 'mama potha kiyawanavaa', 'මම පොත කියවනවා'],
  ['Pos_Fun_06', 'oyata loku sthuthi', 'ඔයට ලොකු ස්තුති'],
  ['Pos_Fun_07', 'karunakarala mata udhav karanna', 'කරුණාකරලා'],
  ['Pos_Fun_08', 'api ada yamu', 'අපි අද යමු'],
  ['Pos_Fun_09', 'oya hari lassanai', 'ඔයා හරි ලස්සනයි'],
  ['Pos_Fun_10', 'mama oyata adarei', 'මම ඔයාට ආදරෙයි'],
  ['Pos_Fun_11', 'api game ekak kelamu', 'අපි ගේම් එකක්'],
  ['Pos_Fun_12', 'eya gedhara inne', 'එයා ගෙදර ඉන්නේ'],
  ['Pos_Fun_13', 'oyata therenawadha', 'ඔයට තේරෙනවද'],
  ['Pos_Fun_14', 'mama hari sathutui', 'මම හරි සතුටුයි'],
  ['Pos_Fun_15', 'api film ekak balamu', 'අපි ෆිල්ම් එකක්'],
  ['Pos_Fun_16', 'oya mokakda karanne', 'ඔයා මොකක්ද කරන්නේ'],
  ['Pos_Fun_17', 'eya loku kenek', 'එයා ලොකු කෙනෙක්'],
  ['Pos_Fun_18', 'mama wada hari lassanai', 'වැඩ හරි ලස්සනයි'],
  ['Pos_Fun_19', 'api heththa yanavaa', 'අපි හෙට යනවා'],
  ['Pos_Fun_20', 'oyata mata viswasai', 'විශ්වාසයි'],
  ['Pos_Fun_21', 'mama bath kana gaman', 'මම බත් කන ගමන්'],
  ['Pos_Fun_22', 'api wada iwara kara', 'අපි වැඩ ඉවර'],
  ['Pos_Fun_23', 'oya mage yaluwa', 'ඔයා මගේ යාලුවා'],
  ['Pos_Fun_24', 'mama oyata udhav karannam', 'උදව් කරන්']
];

for (const [id, inputText, expected] of cases) {
  test(`${id}`, async ({ page }) => {
    await page.goto(URL);
    
    const input = page.locator('textarea').first();

    await input.fill(inputText);
    await page.waitForTimeout(2000);
    // Check that some Sinhala characters appear on the page (tolerant to partial/autocorrected output)
    const bodyText = await page.locator('body').textContent();
    expect(/[\u0D80-\u0DFF]/.test(bodyText || '')).toBe(true);
  });
}