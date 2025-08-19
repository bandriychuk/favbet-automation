import {AppPage} from "../abstractClasses";
import {step} from "../../misc/reporters/step";
import {expect, Page} from "@playwright/test";

export class YoutubePage extends AppPage {

    public pagePath = '/login'

    private acceptAllCookiesButton = this.page.locator('(//button[@aria-label=\'Accept all\'])[1]');
    private searchButton = this.page.locator('#icon-button').getByRole('button', {name: 'Search'});
    private searchInput = this.page.getByRole('textbox', {name: 'Search'});
    private header = this.page.locator('//div[@id="page-header"]');

    @step()
    async expectLoaded() {
        await expect(this.header).toBeVisible();
    }

    async acceptAllCookies() {
        await this.acceptAllCookiesButton.click();
    }

    async searchForVideo(videoName: string) {
        await this.searchButton.click();
        await this.searchInput.fill(videoName);
        await this.searchInput.press('Enter');
    }

    async videoIsPresent(page: Page, videoName: string) {
        await expect(
            page.locator('ytd-item-section-renderer')
                .filter({hasText: videoName}))
            .toBeVisible();
    }

}
