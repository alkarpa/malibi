
export const startDrag = ( target ) => {
    return {
        type: 'START_DRAG',
        target: target
    }
}

export const endDrag = () => {
    return {
        type: 'END_DRAG'
    }
}

const dragndropReducer = (state='', action) => {
    switch( action.type ) {
        case 'START_DRAG': return action.target
        case 'END_DRAG': return ''
        default: return state
    }
}

export default dragndropReducer