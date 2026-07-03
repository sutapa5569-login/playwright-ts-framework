import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Login.ts';
import { BrowserSetupPage } from '../Pages/BrowserSetup.ts';

// This TC can be called first in every file or suite.
test('TC1: Browser cleanup before launch', async ({ page }) => {
    const browserSetup = new BrowserSetupPage(page);
    await browserSetup.clearBrowserState();

    const noCookies = await browserSetup.verifyNoCookies();
    await expect(noCookies).toBe(true);
});

test('TC2: Verify page launch', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchhomepage();
    await expect(page).toHaveTitle('Automation Exercise');
});

test('TC3: Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchhomepage();
    await loginPage.clickOnLoginLink();
    await loginPage.loginWithValidCredentials();
});
  