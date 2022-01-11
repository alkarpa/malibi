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

    describe('Day view transition', () => {
        test('Clicking 15(th day) opens Day', () => {
            const component = render(
                <Calendar />
            )

            const fifteenth = component.getByText(/15/)
            fireEvent.click(fifteenth)

            const prevday = component.getByText(/Previous day/)

            expect(prevday).toBeInTheDocument()
        })
        test('Clicking DAY opens Day', () => {
            const component = render(
                <Calendar />
            )

            const dayTab = component.getByText(/DAY/)
            fireEvent.click(dayTab)

            const prevday = component.getByText(/Previous day/)

            expect(prevday).toBeInTheDocument()
        })
        test('Clicking DAY, prev, next works', () => {
            const component = render(
                <Calendar />
            )
            const dayTab = component.getByText(/DAY/)
            fireEvent.click(dayTab)
            const prevday = component.getByText(/Previous day/)
            fireEvent.click(prevday)
            const nextday = component.getByText(/Next day/)
            fireEvent.click(nextday)

            expect(prevday).toBeInTheDocument()
        })
    })


    describe('Tracking data', () => {

        it('async initial state is something to figure out', done => {
            done.fail('TODO: tests')
        })
        /*
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

            expect( tc ).toHaveTextContent(/7:56:00/)
        })

        test('3 hour interval on 15th', () => {
            const ftth = component.getByText(/15/)
                .parentElement
                .parentElement
                
            const textContent = ftth.textContent
            expect( textContent ).toContain('3:16:00')
        })

        test('by projects has textproject 3:56', () => {
            const project = component.getByText(/Project Test/)
            expect( project.parentElement ).toHaveTextContent('3:56')
        })
        */
    })

})