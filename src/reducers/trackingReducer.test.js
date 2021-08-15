import trackingReducer, { togglePlay, createBreakpoint, updateInterval } from './trackingReducer'
import deepFreeze from 'deep-freeze'

describe('trackingReducer', () => {

    const intervals = [
        {
            id: 'MI',
            start: new Date(2021, 8, 1, 14, 25, 15).getTime(),
            end: new Date(2021, 8, 1, 14, 30, 15).getTime(),
            project: undefined
        },
        {
            id: 'MI2',
            start: new Date(2021, 8, 1, 14, 35, 15).getTime(),
            end: new Date(2021, 8, 1, 15, 30, 15).getTime(),
            project: undefined
        }
    ]
    const closedState = intervals
    const openState = intervals.concat(
        {
            id: 'MI3',
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
            expect( newState.length ).toBe( state.length + 1 )
            expect( newState[state.length].end ).toBeFalsy()
        })

        test('Last unfinished -> end the last one', () => {
            const state = openState
            deepFreeze(state)
            const newState = trackingReducer(state, action)
            expect(newState.length).toBe(state.length)
            expect(newState[state.length-1].end).toBeTruthy()
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
            expect(newState[state.length-1].end).toBeTruthy()
            expect(newState.length).toBe(state.length+1)
            expect(newState[state.length].end).toBeFalsy()
        })
    })

    describe('UPDATE', () => {
        const state = closedState
        deepFreeze(state)

        const MI = state.find(iv => iv.id === 'MI')
        const MI2 = state.find(iv => iv.id === 'MI2')

        test('Update M1 project to "testproject"', () => {
            
            const updated = { ...MI, project:'testproject' }
            const action = updateInterval( updated )
            const newState = trackingReducer( state, action )
            const compareState = state.map( 
                iv => iv.id === MI.id ? updated : iv
            )
            expect( newState ).toEqual( compareState )
        })

        describe('Conflicting times', () => {

            test('MI start>end no-update', () => {
            
                const updated = {
                    ...MI,
                    start: MI.end + 5
                }
                const action = updateInterval( updated )
                const newState = trackingReducer( state, action )
    
                expect( newState ).toEqual( state )
            })

            test('MI2 start inside MI is no-update', () => {
            
            const updated = { 
                ...MI2,
                start: MI.start + 5
            }
            const action = updateInterval( updated )
            const newState = trackingReducer( state, action )

            expect( newState ).toEqual( state )
            })

            test('MI2 start before MI is no-update', () => {

                const updated = { 
                    ...MI2,
                    start: MI.start - 5
                }
                const action = updateInterval( updated )
                const newState = trackingReducer( state, action )
    
                expect( newState ).toEqual( state )
            })

            test('MI end inside MI2 is no-update', () => {
                const updated = { 
                    ...MI,
                    end: MI2.end - 5
                }
                const action = updateInterval( updated )
                const newState = trackingReducer( state, action )
    
                expect( newState ).toEqual( state )
            })

            test('MI end after MI2 is no-update', () => {
                const updated = { 
                    ...MI,
                    end: MI2.end + 5
                }
                const action = updateInterval( updated )
                const newState = trackingReducer( state, action )
    
                expect( newState ).toEqual( state )
            })

        })


    })

})