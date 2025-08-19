import {expect} from "@playwright/test";
import {AppPage} from "../abstractClasses";
import {step} from "../../misc/reporters/step";
import {Header} from "../component/header.component";

export class Home extends AppPage {
    public pagePath = '/casino';
    public header = new Header(this.page);

    private headerCenterMenu = this.page.getByTestId('header-center-menu')
    private youTubeButton = this.page.locator('a[href=\'https://www.youtube.com/@favbetua\']')

    @step()
    async expectLoaded(message = 'Expected Home page to be opened') {
        await expect(this.headerCenterMenu, message).toBeVisible();
    }

    async pressOnYouTubeIcon() {
        await this.youTubeButton.scrollIntoViewIfNeeded();
        await this.youTubeButton.click();
    }
}
