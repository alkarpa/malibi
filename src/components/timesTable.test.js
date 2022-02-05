import React from 'react'
import { render, screen, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import TimesTable from './timesTable'
import { testState } from '../util/test_state_local'

describe('TimesTable', () => {

    const intervals = [{
        id: 'mo',
        start: new Date('2021-07-15T12:00:00').getTime(),
        end: new Date('2021-07-15T15:16:00').getTime(),
        project: '15'
    },  {
        id: 'mo2',
        start: new Date('2021-07-15T16:00:00').getTime(),
        end: new Date('2021-07-15T16:05:00').getTime(),
        project: '15'
    },  
    ]

    test("TimesTable shows all interval endpoints and totals", () => {

        render(<TimesTable day={intervals} />)
        screen.getByText(/12:00/)
        screen.getByText(/15:16/)
        screen.getByText(/3:16/)
        screen.getByText(/16:00/)
        screen.getByText(/16:05/)
        screen.getByText(/0:05/)
        screen.getByText(/3:21/)

    })

})