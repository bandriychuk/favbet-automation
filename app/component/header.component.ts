import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "../../misc/reporters/step";

export class Header extends Component {
    private liveButton = this.page.getByTestId('nav-item /live/all/')
    private casinoButton = this.page.getByTestId('nav-item /casino/')

    @step()
    async expectLoaded(message = 'Expected Header to be loaded'): Promise<void> {
        await expect(this.liveButton, message).toBeVisible();
        await expect(this.casinoButton, message).toBeVisible();
    }

    @step()
    async openLive() {
        await this.liveButton.click();
    }

    @step()
    async openCasino() {
        await this.casinoButton.click()
    }
}
