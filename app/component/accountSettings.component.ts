import {expect} from "@playwright/test";
import {Component} from "../abstractClasses";
import {step} from "../../misc/reporters/step";
import {Language} from "../../misc/enums/Language";
import {WaitStates} from "../../misc/WaitStates";
import {Themes} from "../../misc/enums/Themes";

export class AccountSettingsComponent extends Component {

    private languageSwitcherButton = this.page.getByTestId('settings-language-select-trigger')
    private lightSchemeSwitcherButton = this.page.getByTestId('settings-color-scheme-switcher-light')
    private darkSchemeSwitcherButton = this.page.getByTestId('settings-color-scheme-switcher-dark')
    private settingsTitleElement = this.page.getByTestId('account_pageTitle_text')
    private languageSwitcherElement = (language: Language) => this.page.getByTestId(`option-${language}`)

    @step()
    async expectLoaded(message = 'Expected Account Settings to be loaded'): Promise<void> {
        await expect(this.languageSwitcherButton, message).toBeVisible();
        await expect(this.lightSchemeSwitcherButton, message).toBeVisible();
        await expect(this.darkSchemeSwitcherButton, message).toBeVisible();
    }

    @step()
    async selectDarkSchemeSwitcher() {
        await this.darkSchemeSwitcherButton.click();
    }

    @step()
    async selectLightSchemeSwitcherLight() {
        await this.lightSchemeSwitcherButton.click()
    }

    @step()
    async selectLanguage(language: Language) {
        await this.languageSwitcherButton.click();
        if (language === Language.EN) {
            await this.languageSwitcherElement(language).click();
        } else if (language === Language.UK) {
            await this.languageSwitcherElement(language).click();
        }
    }

    /**
     * Verifies that the application language has been successfully changed to the specified language.
     *
     * The method performs the following steps:
     * 1. Retrieves the current `lang` attribute from the `<html>` element.
     * 2. Waits for the translations response corresponding to the requested language
     *    (`/public/translations/{language}`) with a 200 status.
     * 3. Asserts that the `lang` attribute matches the expected language code.
     * 4. Waits for the page to reach the `NETWORKIDLE` state.
     * 5. Validates the `settingsTitleElement` text based on the selected language:
     *    - `"SETTINGS"` for English (`Language.EN`)
     *    - `"НАЛАШТУВАННЯ"` for other languages
     *
     * @param language - The target {@link Language} to verify (e.g., `Language.EN`).
     * @throws AssertionError if the language attribute or settings title does not match expectations.
     */
    async isLanguageChangedTo(language: Language) {
        const lang = await this.page.getAttribute('html', 'lang');

        await this.page.waitForResponse(resp =>
            resp.url().includes(`/public/translations/${language}`) && resp.status() === 200
        );

        expect(lang).toBe(language);

        await this.page.waitForLoadState(WaitStates.NETWORKIDLE)

        const attribute = await this.settingsTitleElement.innerText();

        if (language === Language.EN) {
            expect(attribute).toEqual("SETTINGS");
        } else {
            expect(attribute).toEqual("НАЛАШТУВАННЯ");
        }
    }

    /**
     * Switches the application theme to the specified mode.
     *
     * The method determines which theme switcher button to use based on the provided theme:
     * - If the theme is `Themes.DARK`, the dark mode switcher button is clicked.
     * - Otherwise, the light mode switcher button is clicked.
     *
     * @param theme - The target {@link Themes} to switch to (e.g., `Themes.DARK` or `Themes.LIGHT`).
     * @throws Error if the corresponding button cannot be found or interacted with.
     */
    async changeThemeSwitcher(theme: Themes) {
        const button = theme === Themes.DARK
            ? this.darkSchemeSwitcherButton
            : this.lightSchemeSwitcherButton;

        await button.click();
    }

    /**
     * Verifies that the application theme has been successfully switched to the specified theme.
     *
     * The method retrieves the `colorScheme` style property from the `<html>` element
     * and checks that it matches the expected theme.
     *
     * @param theme - The target {@link Themes} to verify (e.g., `Themes.DARK` or `Themes.LIGHT`).
     * @throws AssertionError if the actual color scheme does not match the expected theme.
     */
    async isThemeSwitched(theme: Themes) {
        const scheme = await this.page.locator('html').evaluate(
            el => el.style.colorScheme
        );

        expect(scheme).toBe(theme);
    }
}
