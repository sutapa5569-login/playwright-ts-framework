import type { Locator, Page } from '@playwright/test';
import { loginTestData } from '../testdata.ts/logintestData.ts';

export class BasePage {
    readonly page: Page;
    readonly validEmail = loginTestData.validUser.email;
    readonly validPassword = loginTestData.validUser.password;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    async fillLoginForm(emailInput: Locator, passwordInput: Locator, email: string, password: string) {
        await emailInput.fill(email);
        await passwordInput.fill(password);
    }

    async submitLogin(loginButton: Locator) {
        await loginButton.click();
    }

    async loginWithValidCredentials(emailInput: Locator, passwordInput: Locator, loginButton: Locator) {
        await this.fillLoginForm(emailInput, passwordInput, this.validEmail, this.validPassword);
        await this.submitLogin(loginButton);
    }
}
