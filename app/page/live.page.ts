import {expect, Locator} from "@playwright/test";
import {AppPage} from "../abstractClasses";
import {step} from "../../misc/reporters/step";

export class LivePage extends AppPage {
    public pagePath = '/uk/live/all/';

    private favoritesTab = this.page.locator('a[href="/uk/live/favorites/"]');
    private footballTab = this.page.locator('a[href="/uk/live/soccer/"]');
    private selectEventById = (eventId: string) => this.page.getByTestId(`${eventId}`).getByTestId('event-favorite-star');
    private listFavoritesEvent = (eventId: string) => this.page.locator(`(//*[contains(@data-role, "event-id-")])[${eventId}]`);

    async selectFootballTab() {
        await this.footballTab.click();
    }

    async getEventsIdByNumber(eventNumber: number): Promise<Locator> {
        return this.listFavoritesEvent(String(eventNumber));
    }

    async selectFavoritesEvent(eventIds: string[]): Promise<void> {
        for (const id of eventIds) {
            await this.selectEventById(id).click();
        }
    }

    async selectFavoritesTab() {
        await this.favoritesTab.click();
    }


    @step()
    async expectLoaded(message = 'Expected Live page to be opened') {
        await expect(this.footballTab, message).toBeVisible();
        await expect(this.favoritesTab, message).toBeVisible();
    }
}
