import React from 'react';
import renderer from 'react-test-renderer';
import * as nextRouter from "next/router";
import {SessionProvider} from "next-auth/react";
import DoneTodos from '../pages/done-todos/index';

it('renders Done Todos page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/', pathname: '/' }));

    const tree = renderer.create(
        <SessionProvider>
            <DoneTodos />
        </SessionProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot()
})