import React from 'react'
import renderer from 'react-test-renderer'
import Register from '../pages/register/index'
import * as nextRouter from "next/router";

it('renders register page unchanged', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

    const tree = renderer.create(<Register />).toJSON();

    expect(tree).toMatchSnapshot();
})