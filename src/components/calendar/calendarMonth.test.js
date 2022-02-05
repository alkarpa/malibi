import React from 'react'
import { render } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import CalendarMonth from './calendarMonth'

describe('Calendar', () => {

    describe('Date ranges', () => {

        test('August 2021 calendar has 1st and 31st of August 2021', () => {

            const today = new Date(Date.UTC(2021, 7, 3, 12))

            render(<CalendarMonth activeMonthDate={today} today={today} />)

            const firstDayDiv = screen.getByTestId('cal2021-8-1')
            const lastDayDiv = screen.getByTestId('cal2021-8-31')

            expect(firstDayDiv).toBeInTheDocument()
            expect(lastDayDiv).toBeInTheDocument()
        })

        test('October 2021 calendar has 1st and 31st of October 2021', () => {

            const today = new Date(Date.UTC(2021, 9, 3, 12))

            render(<CalendarMonth activeMonthDate={today}  today={today} />)

            const firstDayDiv = screen.getByTestId('cal2021-10-1')
            const lastDayDiv = screen.getByTestId('cal2021-10-31')

            expect(firstDayDiv).toBeInTheDocument()
            expect(lastDayDiv).toBeInTheDocument()
        })
    })



})