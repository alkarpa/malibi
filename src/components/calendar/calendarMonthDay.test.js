import React from 'react'
import { render } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import CalendarMonth from './calendarMonth'
import CalendarMonthDay from './calendarMonthDay'

describe('Calendar Month Date Area', () => {
    test("29 minutes of alibis", () => {
        const date = new Date('2022-02-05')
        const alibis = [
            {
                start: new Date('2022-02-05T13:15:00'),
                end: new Date('2022-02-05T13:44:00')
            }
        ]

        render( <CalendarMonthDay date={date} intervals={alibis} /> )

        const elapsed = screen.getByText(/0:29/)
        expect( elapsed ).toBeInTheDocument()
    })
})