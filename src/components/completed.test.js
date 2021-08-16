import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Completed from './completed'

describe('Completed', () => {

    test('Change Days to show', () => {
        const component = render(
            <Completed />
        )
        const dts = component.getByLabelText(/Days to show/)
        fireEvent.change(dts, {target: { value: '5'}})
    })
})