import {AppPage} from "../abstractClasses";
import {step} from "../../misc/reporters/step";
import {expect} from "@playwright/test";

export class SignIn extends AppPage {
    public pagePath = '/login'

    private signInButton = this.page.getByTestId('login-page-submit-btn')
    private emailInput = this.page.getByTestId('login-page-login-input')
    private passwordInput = this.page.getByTestId('login-page-password-input')

    @step()
    async expectLoaded() {
        await expect(this.signInButton).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }

    @step()
    async signIn(user: { email: string, password: string }) {
        await this.expectLoaded();
        await this.emailInput.fill(user.email)
        await this.passwordInput.fill(user.password)
        await this.signInButton.click()
    }
}
