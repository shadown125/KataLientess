import React from "react";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import SettingsImage from "../pages/settings/image";

it ('Renders settings image page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/'}));

    const tree = renderer.create(
        <SessionProvider>
            <SettingsImage />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});