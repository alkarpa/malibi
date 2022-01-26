import intervalsService from '../services/intervals'
import storageService from '../services/storage'

const defaultState = /*process.env.NODE_ENV === 'test' ? storageService.load('alibi') :*/ []

export const togglePlay = () => async (dispatch, getState) => {
    const response = await storageService.click()
    const state = getState().intervals
    const intervals = intervalsService.concatAddedClick( state, response )
    dispatch ({
        type: 'PLAY_TOGGLE',
        intervals: intervals
    })
}

export const createBreakpoint = () => async (dispatch, getState) => {
    const response = await storageService.breakpoint()
    const state = getState().intervals
    const intervals = intervalsService.concatBreakpoint( state, response )
    dispatch ({
        type: 'BREAKPOINT',
        intervals: intervals
    })
}

export const updateInterval = ( interval ) => async (dispatch, getState) => {
    await storageService.update('alibi', interval)
    const state  = getState().intervals
    const intervals = intervalsService.updateIntoIntervalState( state, interval )
    dispatch ({
        type: 'UPDATE',
        intervals: intervals
    })
}

const trackingReducer = ( state = defaultState, action ) => {
    switch( action.type ) {
        case 'INITIALIZE':
            return action.intervals
        case 'PLAY_TOGGLE': 
            return action.intervals
        case 'BREAKPOINT': 
            return action.intervals
        case 'UPDATE':
            return action.intervals
        default:
            return state
    }
}

export default trackingReducer