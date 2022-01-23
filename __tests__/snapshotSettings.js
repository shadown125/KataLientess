import React from "react";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import Settings from "../pages/settings";

it ('Renders settings page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({route: '/', pathname: '/' }));

    const tree = renderer.create(
        <SessionProvider>
            <Settings />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
})