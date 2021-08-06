import React from 'react'
import { render, fireEvent } from '../../util/test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import TimerControls from './timerControls'

describe('TimerControls', () => {

    test('Renders buttons', () => {
        const component = render(<TimerControls running={false} />)
        
        expect(component.container).toHaveTextContent('Start')
        expect(component.container).toHaveTextContent('Breakpoint')
    })

    test('Clicking Start toggles between Start/Pause', () => {
        const component = render(<TimerControls running={false} />)

        const button = component.getByText('Start')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('Pause')
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

})