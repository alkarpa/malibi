import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import IntervalForm from './intervalForm'
import { testState } from '../util/test_state_local'

describe('IntervalForm', () => {

    const id = testState.datetracking[0].id

    let component
    let updateButton

    test('No interval found', () => {
        component = render(
            <IntervalForm intervalId='no_id' />
        )
        expect( component.container ).toHaveTextContent('error')
    })

    describe('first interval from test data', () => {
        beforeEach( () => {
            component = render(
                <IntervalForm intervalId={id} />
            )
            updateButton = component.getByRole('button',{name: 'Update'})
        } )
    
        test('change start date', () => {
            const input = component.getByLabelText('Start Date')
            fireEvent.change(input, {target: {value: '2021-08-10'}})
            fireEvent.click(updateButton)
            expect( component.container ).toHaveTextContent('2021-08-10')
        })
        test('change start time', () => {
            const input = component.getByLabelText('Start Time')
            fireEvent.change(input, {target: {value: '15:13'}})
            fireEvent.click(updateButton)
            expect( component.container ).toHaveTextContent('15:13')
        })

        test('start time after end time fails', () => {
            const input = component.getByLabelText('Start Time')
            fireEvent.change(input, {target: {value: '21:13'}})
            fireEvent.click(updateButton)
            expect( component.container ).not.toHaveTextContent('21:13')
            expect( component.container ).toHaveTextContent(/Start time cannot/)
        })

        test('end date before start date fails', () => {
            const input = component.getByLabelText('End Date')
            fireEvent.change(input, {target: {value: '2020-05-05'}})
            fireEvent.click(updateButton)
            expect( component.container ).not.toHaveTextContent('2020-05-05')
            expect( component.container ).toHaveTextContent(/End time cannot/)
        })
        test('clicking the input removes the error message', () => {
            const input = component.getByLabelText('End Date')
            fireEvent.change(input, {target: {value: '2020-05-05'}})
            fireEvent.click(updateButton)
            fireEvent.click(input)
            expect( component.container ).not.toHaveTextContent(/End time cannot/)

        })
    })


})