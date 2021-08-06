import storageService from '../services/storage'

const initialProjects = storageService.load('projects') || {}

export const createProject = ( title, color ) => {
    return {
        type: 'ADD_PROJECT',
        project: {
            id: Date.now(),
            title: title,
            color: color
        }
    }
}

export const updateProject = ( project ) => {
    return {
        type: 'UPDATE_PROJECT',
        project: {
            ...project
        }
    }
}

const store = (state) => {
    storageService.save('projects', state)
    return state
}

const projectsReducer = (state = initialProjects, action) => {
    switch( action.type ) {
        case 'ADD_PROJECT': 
            return store(
                { ...state, list: state.list.concat( action.project ) }
            )
        case 'UPDATE_PROJECT':
            return store(
                { ...state, list: state.list.map( p => 
                    p.id === action.project.id
                        ? action.project
                        : p
                    )
                }
            )
        default: return state
    }
}

export default projectsReducer