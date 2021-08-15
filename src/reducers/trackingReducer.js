import intervalsService from '../services/intervals'
import storageService from '../services/storage'

const defaultState = storageService.loadIntervals() || []

export const togglePlay = () => {
    return {
        type: 'PLAY_TOGGLE',
    }
}

export const createBreakpoint = () => {
    return {
        type: 'BREAKPOINT'
    }
}

export const updateInterval = ( interval ) => {
    return {
        type: 'UPDATE',
        interval: interval
    }

}

const store = (state) => {
    storageService.save('datetracking', state)
    return state
}

const trackingReducer = ( state = defaultState, action ) => {
    switch( action.type ) {
        case 'PLAY_TOGGLE': 
            return store( intervalsService.concatAddedClick(state) )
        case 'BREAKPOINT': 
            return store( intervalsService.concatBreakpoint(state) )
        case 'UPDATE':
            return store( intervalsService.mapUpdated(state, action.interval) )
        default:
            return state
    }
}

export default trackingReducer