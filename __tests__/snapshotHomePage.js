import React from 'react';
import renderer from 'react-test-renderer';
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import HomePage from '../pages/index';

it('Renders home page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

    const tree = renderer.create(
        <SessionProvider>
            <HomePage />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
})