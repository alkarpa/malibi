import trackingReducer, { togglePlay, createBreakpoint } from './trackingReducer'
import deepFreeze from 'deep-freeze'

describe('trackingReducer', () => {

    const intervals = [
        {
            start: new Date(2021, 8, 1, 14, 25, 15).getTime(),
            end: new Date(2021, 8, 1, 14, 30, 15).getTime(),
            project: undefined
        }
    ]
    const closedState = intervals
    const openState = intervals.concat(
        {
            start: new Date(2021, 8, 2, 14, 25, 15).getTime(),
        }
    )


    test('returns an array state when called with undefined', () => {
        const action = { type: 'TEST_ACTION' }
        const newState = trackingReducer(undefined, action)
        expect(Array.isArray(newState)).toBeTruthy()
    })

    describe('PLAY_TOGGLE', () => {
        const action = togglePlay()

        test('All finished -> A new open interval', () => {
            const state = closedState
            deepFreeze(state)
            const newState = trackingReducer(state, action)
            expect( newState.length ).toBe(2)
            expect( newState[1].end ).toBeFalsy()
        })

        test('Last unfinished -> end the last one', () => {
            const state = openState
            deepFreeze(state)
            const newState = trackingReducer(state, action)
            expect(newState.length).toBe(2)
            expect(newState[1].end).toBeTruthy()
        })

    })

    describe('BREAKPOINT', () => {
        const action = createBreakpoint()

        test('All finished -> Does nothing', () => {
            const state = closedState
            deepFreeze(state)
            const newState = trackingReducer(state, action)
            expect(newState).toEqual(state)
        })

        test('Last unfinished -> Ends the last one and starts a new one', () => {
            const state = openState
            deepFreeze(state)
            const newState = trackingReducer(state, action)
            expect(newState[1].end).toBeTruthy()
            expect(newState.length).toBe(3)
        })
    })

})