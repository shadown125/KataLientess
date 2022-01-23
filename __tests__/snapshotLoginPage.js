import React from 'react'
import renderer from 'react-test-renderer'
import LoginPage from '../pages/login/index'

it('renders login page unchanged', () => {
    const tree = renderer.create(<LoginPage />).toJSON()
    expect(tree).toMatchSnapshot()
})