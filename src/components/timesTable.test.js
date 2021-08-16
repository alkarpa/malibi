import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import TimesTable from './timesTable'

describe('TimesTable', () => {

    const intervals = [{
        id: 'mo',
        start: new Date(Date.UTC(2021, 7, 15, 12)).getTime(),
        end: new Date(Date.UTC(2021, 7, 15, 15)).getTime(),
        project: '15'
    }]

    test('Click on edit, find date input', () => {
        const component = render(
            <TimesTable day={intervals} />
        )
        const dts = component.getByRole('button', { name: 'Edit' })
        fireEvent.click(dts)
        const intervalStartDateInput = dts.parentElement.querySelector('input')
        expect(intervalStartDateInput.value).toEqual('2021-08-15')
    })
})