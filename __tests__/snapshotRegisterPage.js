/**
 * @jest-environment jsdom
 */

import React from 'react'
import {create} from 'react-test-renderer'
import Register from '../pages/register/index'
import * as nextRouter from "next/router";

it('renders register page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

    const tree = create(<Register />).toJSON();

    expect(tree).toMatchSnapshot();
})