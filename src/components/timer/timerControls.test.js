import React from 'react'
import { render, fireEvent } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import TimerControls from './timerControls'

describe('TimerControls', () => {

    test('Renders buttons', () => {
        const component = render(<TimerControls running={false} />)
        
        expect(component.container).toHaveTextContent('Start')
        expect(component.container).toHaveTextContent('Breakpoint')
    })

    test('Pause visible when running', async () => {
        const component = render(<TimerControls running={true} />)

        expect(component.container).toHaveTextContent('Stop')
    })

    test('Breakpoint is disabled when not running', () => {
        const component = render(<TimerControls running={false} />)

        const button = component.getByText('Breakpoint')
        expect(button).toBeDisabled()
    })
    test('Breakpoint is enabled when running', () => {
        const component = render(<TimerControls running={true} />)

        const button = component.getByText('Breakpoint')
        expect(button).not.toBeDisabled()
    })

    describe('store dispatch', () => {

        test('handlePause', () => {
            const component = render(<TimerControls running={false} />)
        
            const button = component.getByText('Start')
            fireEvent.click(button)
        })

    })

})