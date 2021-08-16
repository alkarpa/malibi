import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/jest-dom'
import IntervalCard from './intervalCard'

describe('IntervalCard', () => {
    test('No interval', () => {
        const component = render(
            <IntervalCard />
        )
        expect( component.container ).toBeEmptyDOMElement()
    })
})