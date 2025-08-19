import {expect} from "@playwright/test";
import {AppPage} from "../../abstractClasses";
import {step} from "../../../misc/reporters/step";
import {AccountSettingsComponent} from "../../component/accountSettings.component";

export class AccountDetails extends AppPage {
    public pagePath = '/personal-office/profile/data'

    private heading = this.page.getByTestId('account_pageTitle_text')
    private accountSettingsTab = this.page.getByTestId('personal-office-menu-item-settings')

    public accountSettings = new AccountSettingsComponent(this.page);

    @step()
    async expectLoaded() {
        await expect(this.heading).toBeVisible();
        await expect(this.accountSettingsTab).toBeVisible();
    }

    async openAccountSettingsTab() {
        await this.accountSettingsTab.click();
    }
}
