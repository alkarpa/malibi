import React from 'react'
import { render, screen, fireEvent } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import IntervalForm from './intervalForm'
import { testState } from '../../util/test_state_local'

describe('IntervalForm', () => {

    const id = testState.alibi[0].id

    test('No interval found', () => {
        render(<IntervalForm intervalId='no_id' />)
        screen.getByText("error")
    })

    test('first interval from test data', () => {
        render(<IntervalForm intervalId='mo' />)
        // TODO
    })


})