import React from "react";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import SettingsName from "../pages/settings/name";

it ('Renders settings name page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/'}));

    const tree = renderer.create(
        <SessionProvider>
            <SettingsName />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});