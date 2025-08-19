import {loggedUserFixture} from "../fixtures";

loggedUserFixture('Favorites Management', async ({app}) => {
    await app.livePage.open();
    await app.livePage.selectFootballTab();

    const [firstEvent, secondEvent] = await Promise.all([
        app.livePage.getEventsIdByNumber(1),
        app.livePage.getEventsIdByNumber(2),
    ]);

    const ids = await Promise.all([
        firstEvent.getAttribute('data-role'),
        secondEvent.getAttribute('data-role'),
    ]);

    const eventIds: string[] = ids.filter((id): id is string => id !== null);

    await app.livePage.selectFavoritesEvent(eventIds);

    const firstEventId = eventIds[0];
    const secondEventId = eventIds[1];

    await app.livePage.selectFavoritesTab();

    await app.favorites.expectEventPresent(firstEventId);
    await app.favorites.expectEventPresent(secondEventId);

    await app.favorites.removeEventFromFavorites(firstEventId);

    await app.favorites.reloadPageAndCheckThatEventRemoved(firstEventId);
    await app.favorites.expectEventPresent(secondEventId);
});

loggedUserFixture.afterEach(async ({app}) => {
    await app.favorites.removeAllFavorites();
})

