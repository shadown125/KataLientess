/**
 * @jest-environment jsdom
 */

import React from "react";
import {create, act} from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import SettingsName from "../pages/settings/name";
import {mockSessionProvider} from "../mocks/data";

it ('Renders settings name page unchanged', async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/'}));
    let tree;

    await act(async () => {
        tree = create(
            <SessionProvider session={mockSessionProvider}>
                <SettingsName />
            </SessionProvider>
        );
    })

    expect(tree.toJSON()).toMatchSnapshot();
});