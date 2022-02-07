import React from 'react'
import { render, screen, fireEvent } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Calendar from './calendar'

describe('Calendar', () => {

    describe('Month changes', () => {

        const today = new Date(Date.UTC(2021, 7, 3, 12))

        beforeEach(() => {
            render( <Calendar today={today} /> )
        })

        test('August 2021 Previous Month is July 2021', () => {
            const prevMonthButton = screen.getByRole('button', {name:/Previous/})
            fireEvent.click(prevMonthButton)
            const monthHeading = screen.getByRole('heading', {name:'2021-07'})
            expect(monthHeading).toBeInTheDocument()
        })

        test('August 2021 Next Month is September 2021', () => {
            const nextMonthButton = screen.getByRole('button', {name:/Next/})
            fireEvent.click(nextMonthButton)
            const monthHeading = screen.getByRole('heading', {name:'2021-09'})
            expect(monthHeading).toBeInTheDocument()
        })
        test('Clicking 15(th day) opens Day', () => {
            const fifteenth = screen.getByText(/15/)
            fireEvent.click(fifteenth)
            let date = new Date(today)
            date.setDate(15)
            const localDate = date.toLocaleDateString()
            const datetitle = screen.getByText(localDate)
            expect(datetitle).toBeInTheDocument()
        })
    })

    describe('Day view transition', () => {
        
        test('Clicking DAY opens Day', () => {
            render(
                <Calendar />
            )

            const dayTab = screen.getByText(/DAY/)
            fireEvent.click(dayTab)

            let date = new Date()
            const localDate = date.toLocaleDateString()
            const datetitle = screen.getByText(localDate)

            expect(datetitle).toBeInTheDocument()
        })
        test('Clicking DAY, prev, next works', () => {
            render(
                <Calendar />
            )
            const dayTab = screen.getByText(/DAY/)
            fireEvent.click(dayTab)
            const prevday = screen.getByText(/Previous/)
            fireEvent.click(prevday)
            const nextday = screen.getByText(/Next/)
            fireEvent.click(nextday)

            expect(prevday).toBeInTheDocument()
        })
    })
})