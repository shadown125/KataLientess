/**
 * @jest-environment jsdom
 */

import React from 'react';
import {create, act} from 'react-test-renderer';
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import DoneTodos from '../pages/done-todos/index';
import {mockSessionProvider} from "../mocks/data";

it('renders Done Todos page unchanged', async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/', pathname: '/' }));
    let tree;

    await act( async () => {
        tree = create(
            <SessionProvider session={mockSessionProvider}>
                <DoneTodos />
            </SessionProvider>
        );
    })

    expect(tree.toJSON()).toMatchSnapshot()
})