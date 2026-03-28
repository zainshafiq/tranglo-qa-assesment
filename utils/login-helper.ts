import { expect, Page } from '@playwright/test';
import { user, url } from './test-data';

export async function login(page: Page) {
    await page.goto(url);

    //Assertion login page
    await expect(page.locator('[data-test="username"]')).toBeVisible(); // Login component is visible

    // Fill in credentials and login
    await page.fill('[data-test="username"]', user.username);
    await page.fill('[data-test="password"]', user.password);
    await page.click('[data-test="login-button"]');

    // Assertions after login - product page should be visible [basic validation]
    await expect(page).toHaveURL(/inventory/);
}