import {test} from '@playwright/test';
import {Application} from "../app";

export const baseFixture = test.extend<{ app: Application }>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});

export type DefaultUserOption = {
    defaultUser: {
        email: string;
        password: string;
    };
};

export const loggedUserFixture = baseFixture.extend<
    DefaultUserOption & { app: Application }
>({
    defaultUser: [
        {
            email: 'testbbc.borys@gmail.com',
            password: 'Qwer1234'
        },
        {
            option: true,
        },
    ],
    app: async ({ app, defaultUser }, use) => {
        await app.signIn.open();
        await app.signIn.signIn(defaultUser);
        await app.home.expectLoaded();
        await use(app);
    },
});
