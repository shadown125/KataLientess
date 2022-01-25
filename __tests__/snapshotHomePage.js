/**
 * @jest-environment jsdom
 */

import React from 'react';
import {create, act} from 'react-test-renderer';
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import HomePage from '../pages/index';
import {mockSessionProvider} from "../mocks/data";

it('Renders home page unchanged', async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
    let tree;

    await act(async () => {
        tree = create(
            <SessionProvider session={mockSessionProvider}>
                <HomePage />
            </SessionProvider>
        );
    })

    expect(tree.toJSON()).toMatchSnapshot();
})