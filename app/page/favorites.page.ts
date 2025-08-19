import {expect} from "@playwright/test";
import {AppPage} from "../abstractClasses";
import {step} from "../../misc/reporters/step";
import {Header} from "../component/header.component";
import {WaitStates} from "../../misc/WaitStates";

export class Favorites extends AppPage {
    public pagePath = '/uk/live/favorites/';
    public header = new Header(this.page);

    private favorites = this.page.locator('a[href="/uk/live/all/"]');
    private listFavoritesEvent = this.page.locator('//*[contains(@data-role, "event-id-")]');
    private emptyFavoritesEventIcon = this.page.getByTestId('prematch-cybersport-empty-state-wrapper');
    private event = (eventId: string) => this.page.getByTestId(`${eventId}`).getByTestId('event-favorite-star');

    @step()
    async expectLoaded(message = 'Expected Favorites page to be opened') {
        await expect(this.favorites, message).toBeVisible();
    }

    async removeEventFromFavorites(eventId: string) {
        await this.event(eventId).click();
    }

    @step()
    async expectEventPresent(eventId: string) {
        await expect(this.event(eventId)).toBeVisible();
    }

    @step()
    async reloadPageAndCheckThatEventRemoved(eventId: string) {
        await this.page.reload()
        await this.waitForLoadState(WaitStates.DOMCONTENTLOADED)
        await expect(this.event(eventId)).not.toBeVisible();
    }

    /**
     * Removes all events from the favorites list.
     *
     * The method performs the following steps:
     * 1. Iterates through all favorite events returned by `listFavoritesEvent.all()`.
     * 2. For each event, clicks on the favorite star (identified by `data-testid="event-favorite-star"`).
     * 3. After all items are removed, verifies that the empty favorites icon is visible.
     *
     * @throws AssertionError if the empty favorites icon is not visible after removal.
     */
    async removeAllFavorites() {
        for (const event of await this.listFavoritesEvent.all())
            await event.getByTestId('event-favorite-star').click();
        await expect(this.emptyFavoritesEventIcon).toBeVisible();
    }
}
