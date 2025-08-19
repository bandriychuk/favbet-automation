import {loggedUserFixture} from "../fixtures";
import {Language} from "../misc/enums/Language";
import {Themes} from "../misc/enums/Themes";

loggedUserFixture('Settings configuration', async ({app}) => {
        await app.accountDetails.open();
        await app.accountDetails.openAccountSettingsTab();
        await app.accountDetails.accountSettings.selectLanguage(Language.EN);
        await app.accountDetails.accountSettings.isLanguageChangedTo(Language.EN);
        await app.accountDetails.accountSettings.changeThemeSwitcher(Themes.LIGHT);
        await app.accountDetails.accountSettings.isThemeSwitched(Themes.LIGHT);
});

