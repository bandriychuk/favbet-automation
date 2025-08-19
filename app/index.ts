import {PageHolder} from "./abstractClasses";
import {SignIn} from "./page/signin.page";
import {AccountDetails} from "./page/profile/account.page";
import {Home} from "./page/home.page";
import {LivePage} from "./page/live.page";
import {Favorites} from "./page/favorites.page";

export class Application extends PageHolder {
    public signIn = new SignIn(this.page);
    public accountDetails = new AccountDetails(this.page);
    public home = new Home(this.page);
    public livePage = new LivePage(this.page);
    public favorites = new Favorites(this.page);

}
