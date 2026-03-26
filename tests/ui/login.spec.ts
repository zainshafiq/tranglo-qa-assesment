import { test, expect } from '@playwright/test';
import { url, user } from '../../utils/test-data';

/* Test Data - moved to utils/test-data.ts
const user = {
  username: 'standard_user',
  password: 'secret_sauce'
};

const url = 'https://www.saucedemo.com/';
*/

test('user login with valid credentials', async ({ page }) => {  

  await page.goto(url);
  
  /* npx playwright codegen
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  */

  //Login
  await page.fill('[data-test="username"]', user.username);
  await page.fill('[data-test="password"]', user.password);
  await page.click('[data-test="login-button"]');

  //Assertion
  //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  //Probably redundant with the above assertion, leave it for now
  await expect(page.locator('.title')).toHaveText('Products');
});