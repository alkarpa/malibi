import React from 'react'
import { render, fireEvent } from '../util/test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Calendar from './calendar'

describe('Calendar', () => {

    test('August 2021 calendar has 1st and 31st of August 2021', () => {

        const today = new Date( Date.UTC(2021,7,3,12) )

        const component = render(
            <Calendar today={today} />
        )

        const firstDayDiv = component.container.querySelector('#cal2021-8-1')
        const lastDayDiv = component.container.querySelector('#cal2021-8-31')

        expect( firstDayDiv ).toBeInTheDocument()
        expect( lastDayDiv ).toBeInTheDocument()
    })

    test('August 2021 Previous Month has 1st of July 2021', () => {
        const today = new Date( Date.UTC(2021,7,3,12) )

        const component = render(
            <Calendar today={today} />
        )

        const prevMonthButton = component.container.querySelector('#calPrevMonthButton')
        fireEvent.click(prevMonthButton)

        const julyFirst = component.container.querySelector('#cal2021-7-1')

        expect( julyFirst ).toBeInTheDocument()
    })

    test('August 2021 Next Month has 30th of September 2021', () => {
        const today = new Date( Date.UTC(2021,7,3,12) )

        const component = render(
            <Calendar today={today} />
        )

        const nextMonthButton = component.container.querySelector('#calNextMonthButton')
        fireEvent.click(nextMonthButton)

        const septemberLast = component.container.querySelector('#cal2021-9-30')

        expect( septemberLast ).toBeInTheDocument()
    })

    test('October 2021 calendar has 1st and 31st of October 2021', () => {

        const today = new Date( Date.UTC(2021,9,3,12) )

        const component = render(
            <Calendar today={today} />
        )

        const firstDayDiv = component.container.querySelector('#cal2021-10-1')
        const lastDayDiv = component.container.querySelector('#cal2021-10-31')

        expect( firstDayDiv ).toBeInTheDocument()
        expect( lastDayDiv ).toBeInTheDocument()
    })

})