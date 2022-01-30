/**
 * @jest-environment jsdom
 */

import React from "react";
import {create, act, ReactTestRenderer} from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import Settings from "../pages/settings";
import {mockSessionProvider} from "../mocks/data";

it ('Renders settings page unchanged', async () => {
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/' }));
    let tree: ReactTestRenderer;

    await act(async () => {
        tree = create(
            <SessionProvider session={mockSessionProvider}>
                <Settings />
            </SessionProvider>
        );
    })

    expect(tree!.toJSON()).toMatchSnapshot();
})