import React from 'react';
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import SettingsPassword from "../pages/settings/password";

it ('Renders settings password page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/'}));

    const tree = renderer.create(
        <SessionProvider>
            <SettingsPassword />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});