import timerReducer, { tick, reset } from './timerReducer'

test('Default state is 0', () => {
    const state = timerReducer(undefined, 'TEST_ACTION')
    expect( state ).toBe(0)
})

test('5 second tick returns about 5000 (less than 2 millisecond difference)', () => {
    const state = 0
    const fiveSecondsAgo = Date.now() - 5000
    const action = tick( { start: fiveSecondsAgo } )
    const newState = timerReducer(state, action)
    const diff = Math.abs( newState - 5000 )
    expect( diff ).toBeLessThan( 2 )
})

test('RESET sets the state back to 0', () => {
    const state = timerReducer( 2000, reset() )
    expect(state).toBe(0)
})