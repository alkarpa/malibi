import React from 'react'
import { render, screen } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Stats from './stats'
import { TEXT } from '../emptyalibis'

describe('Stats', () => {

    test('no intervals given', () => {
        render( <Stats /> )
        screen.getByText(TEXT.nocontent)
    })
    test('open interval given', () => {
        render(<Stats intervals={[{start:500}]} />)
        screen.getByRole('heading', {name: 'Statistics'})
    })

    test('check stat calculations', () => {
        const activeView = 'MONTH'
        const alibis = [
            {
                start: new Date('2022-02-04T15:00:00').getTime(),
                end: new Date('2022-02-04T15:30:00').getTime(),
                project: 'test1',
            },
            {
                start: new Date('2022-02-05T15:00:00').getTime(),
                end: new Date('2022-02-05T16:00:00').getTime(),
                project: 'test1'
            },
            {
                start: new Date('2022-02-05T17:00:00').getTime(),
                end: new Date('2022-02-05T20:00:00').getTime(),
                project: 'test2'
            }
        ]
        render(<Stats activeView={activeView} intervals={alibis} />)
        screen.getByText(/4:30/) // total
        screen.getByText(/0:30/) // shortest
        screen.getByText(/4:00/) // longest
        screen.getByText(/2:15/) // average
    })

})