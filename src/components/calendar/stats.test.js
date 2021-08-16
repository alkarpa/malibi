import React from 'react'
import { render } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Stats from './stats'

describe('Stats', () => {

    test('no intervals given', () => {
        const component = render(
            <Stats />
        )
        expect( component.container ).toHaveTextContent('Statistics')
    })
    test('open interval given', () => {
        const component = render(
            <Stats intervals={[{start:500}]} />
        )
        expect( component.container ).toHaveTextContent('Statistics')
    })

})