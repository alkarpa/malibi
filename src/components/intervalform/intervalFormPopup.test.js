import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import IntervalFormPopup from './intervalFormPopup'
import { testState } from '../util/test_state_local'

describe('IntervalFormPopup', () => {

    const interval = testState.alibi[0]

    describe('Open form', () => {

        let component

        beforeEach( () => {
            component = render(
                <IntervalFormPopup interval={interval} />
            )
            fireEvent.click(component.getByText('Edit'))
        })

        test('Close form', () => {
            fireEvent.click(component.getByText('X'))
            expect(component.queryByRole('input')).toBeNull()
        })

    })

})