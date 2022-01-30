/**
 * @jest-environment jsdom
 */

import React from 'react'
import {create} from 'react-test-renderer'
import LoginPage from '../pages/login/index'

it('renders login page unchanged', () => {
    const tree = create(<LoginPage />).toJSON()
    expect(tree).toMatchSnapshot()
})