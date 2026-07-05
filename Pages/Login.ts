import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.ts';
import { config } from '../config/config.ts';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
    readonly signupLoginSelector = 'a[href="/login"]';
    readonly emailSelector = '(//*[@name="email"])[1]';
    readonly passwordSelector = '(//*[@name="password"])';
    readonly loginButtonSelector = '//button[contains(text(),"Login")]';
    readonly loginlinkSelector = 'a[href="/logout"]';
    readonly errormessagetext = '//*[contains(text(),"Your email or password is incorrect!")]';

    readonly signupLoginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginlink: Locator;
    readonly errormessage : Locator;

    constructor(page: Page) {
        super(page);

        this.signupLoginLink = page.locator(this.signupLoginSelector);
        this.emailInput = page.locator(this.emailSelector);
        this.passwordInput = page.locator(this.passwordSelector);
        this.loginButton = page.locator(this.loginButtonSelector);
        this.loginlink = page.locator(this.loginlinkSelector);
        this.errormessage = page.locator(this.errormessagetext);
    }

    async launchhomepage() {
        await this.navigateTo(config.baseUrl);
        const title = await this.page.title();
        console.log('Title of the page is: ' + title);
    }

    async clickOnLoginLink() {
        await this.signupLoginLink.click();
        await this.page.waitForLoadState('load');
    }

    // Expose BasePage login helper directly on LoginPage for editor symbol lookup.
    async loginWithValidCredentials() {
        await super.loginWithValidCredentials(this.emailInput, this.passwordInput, this.loginButton);
        if(await this.loginlink.isVisible()){
            await this.loginlink.click();
        }else{
            await expect(this.errormessage).toBeVisible();
            console.log('Error message is displayed: ' + await this.errormessage.textContent());
            await this.page.screenshot({path: `screenshots/login_error_${Date.now()}.png`, fullPage: true});
        }
    }
}

