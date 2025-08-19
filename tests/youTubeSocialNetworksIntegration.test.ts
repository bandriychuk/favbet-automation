import {loggedUserFixture} from "../fixtures";
import {YoutubePage} from "../app/social/youtube.page";

loggedUserFixture('YouTube Social Network Integration', async ({app, page}) => {
    await app.home.open();
    await app.home.pressOnYouTubeIcon();

    const [youTubePage] = await Promise.all([
        await page.waitForEvent('popup')
    ])

    const youTube = new YoutubePage(youTubePage);

    const videoName = 'FAVBET | Support Those Who Support Us: ENGLAND | 2022 FIFA World Cup';

    await youTube.acceptAllCookies();
    await youTube.searchForVideo(videoName);

    await youTube.videoIsPresent(youTubePage, videoName);

});

