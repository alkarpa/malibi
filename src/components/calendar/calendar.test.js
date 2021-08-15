import React from 'react'
import { render, fireEvent } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Calendar from './calendar'

describe('Calendar', () => {

    describe('Month changes', () => {

        test('August 2021 Previous Month has 1st of July 2021', () => {
            const today = new Date(Date.UTC(2021, 7, 3, 12))

            const component = render(
                <Calendar today={today} />
            )

            const prevMonthButton = component.container.querySelector('#calPrevMonthButton')
            fireEvent.click(prevMonthButton)

            const julyFirst = component.container.querySelector('#cal2021-7-1')

            expect(julyFirst).toBeInTheDocument()
        })

        test('August 2021 Next Month has 30th of September 2021', () => {
            const today = new Date(Date.UTC(2021, 7, 3, 12))

            const component = render(
                <Calendar today={today} />
            )

            const nextMonthButton = component.container.querySelector('#calNextMonthButton')
            fireEvent.click(nextMonthButton)

            const septemberLast = component.container.querySelector('#cal2021-9-30')

            expect(septemberLast).toBeInTheDocument()
        })

        test('Choosing January 2020', () => {
            const today = new Date(Date.UTC(2021, 7, 3, 12))

            const component = render(
                <Calendar today={today} />
            )

            const monthPicker = component.container.querySelector('#calMonthPicker')
            fireEvent.change(monthPicker, {target: {value: '2020-01'} })

            const januaryFirst = component.container.querySelector('#cal2020-1-1')

            expect(januaryFirst).toBeInTheDocument()
        })

    })


    describe('Tracking data', () => {

        let component

        beforeEach( () => {
            const today = new Date(Date.UTC(2021, 7, 10, 12))

            component = render(
                <Calendar today={today} />
            )
        })

        test('3 hour interval total', () => {
            const tc = component.getByText(/Total completed/,)
                .parentElement

            expect( tc ).toHaveTextContent(/6:56:00/)
        })

        test('3 hour interval on 15th', () => {
            const ftth = component.getByText(/15/)
                .parentElement
                .parentElement
                
            const textContent = ftth.textContent
            expect( textContent ).toContain('3:16:00')
        })
    })

})