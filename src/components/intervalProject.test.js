import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import { testState } from '../util/test_state_local'
import IntervalProject from './intervalProject'

describe('IntervalProject', () => {

    const interval = testState.alibi[0]

    test('All fail because the initial state is async', done => {
        done.fail('Figure out how to inject the state')
    })
    /*
    test.only('Change project with the dropdown', () => {
        const component = render(
            <IntervalProject interval={interval} />
        )
        fireEvent.click( component.getByText('Test Project') )
        const select = component.getByRole('combobox')

        // Change doesn't change the value, 
        // click doesn't cover code
        fireEvent.change(select, {target: {value: 'testproject'}})
        fireEvent.click(select, {target: {value: 'testproject'}})
        expect(select.value).toEqual('testproject')
    })
    */
})