
export const tick = ( openInterval ) => {
    return {
        type: 'TICK',
        openIntervalStart: openInterval?.start
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}

const timerReducer = ( state = 0, action ) => {
    switch( action.type ) {
        case 'TICK':
            return Date.now() - action.openIntervalStart
        case 'RESET': return 0
        default: return state
    }
}

export default timerReducer