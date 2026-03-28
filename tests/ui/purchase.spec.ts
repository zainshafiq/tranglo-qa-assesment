import { test, expect, Page } from '@playwright/test';
import { login } from '../../utils/login-helper';

test('user can complete a purchase successfully', async ({ page }) => {  
  // Login using the helper function
  await userLogin(page);

  // Add to cart using the helper function
  await addToCart(page);

  // Checkout using the helper function
  await checkout(page);

  // Validate order confirmation using the helper function
  await validateOrderConfirmation(page);
});

async function userLogin(page: Page) {
  await login(page);

  // Additional assertions after login - [detailed validation]
  await expect(page.locator('.title')).toHaveText('Products');
}

async function addToCart(page: Page) {
  // Validate that the shopping cart is empty after login
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();

  // Add product to the shopping cart and validate the cart badge
  await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Validate that the correct product is added to the cart
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  
  const cartItems = page.locator('.cart_item');
  await expect(cartItems.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
}

async function checkout(page: Page) {
  // Proceed to checkout and validate the checkout page
  await page.click('[data-test="checkout"]');
  await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  
  // Fill in checkout information and continue
  await page.fill('[data-test="firstName"]', 'Mohammad');
  await page.fill('[data-test="lastName"]', 'Salah');
  await page.fill('[data-test="postalCode"]', 'YNWA 11');
  await page.click('[data-test="continue"]');

  // Validate the overview page and complete the purchase
  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  await page.click('[data-test="finish"]');
}

async function validateOrderConfirmation(page: Page) {
  // Validate the order confirmation page
  await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  // Back home and validate the product page is displayed again
  await page.click('[data-test="back-to-products"]');
  await expect(page.locator('.title')).toHaveText('Products');
}

/*
  Miscellaneous code snippets for reference :D -->

  For debug - await page.waitForTimeout(2000); UI Debug

  /* 
  Test Data - moved to utils/test-data.ts
  const user = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  const url = 'https://www.saucedemo.com/';

  npx playwright codegen
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
*/