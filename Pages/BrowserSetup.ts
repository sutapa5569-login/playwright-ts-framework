import type { Page } from '@playwright/test';

export class BrowserSetupPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clearBrowserState() {
        await this.page.context().clearCookies();

        await this.page.addInitScript(() => {
            try {
                localStorage.clear();
            } catch (e) {
                // ignore if storage is not available
            }
            try {
                sessionStorage.clear();
            } catch (e) {
                // ignore if storage is not available
            }
        });
    }

    async verifyNoCookies() {
        const cookies = await this.page.context().cookies();
        return cookies.length === 0;
    }
}
