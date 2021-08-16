import React from 'react'
import { render } from './util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
    test('Doesn\'t crash immediately', ()=> {
        const component = render(
            <App />
        )
        expect(component.container).toHaveTextContent(/alkarpa/)
    })
})