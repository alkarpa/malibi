import storageService from '../services/storage'

const initialProjects = /*process.env.NODE_ENV === 'test' ? storageService.load('project') :*/ []

export const createProject = (title, color) => async (dispatch, getState) => {
    await storageService.add('project', {title: title, color: color})
    const projects = await storageService.load('project')
    //const projects = getState().projects.concat(project)

    dispatch({
        type: 'ADD_PROJECT',
        projects: projects
    })
}

export const updateProject = (project) => async (dispatch, getState) => {
    await storageService.update('project', project)
    const projects = await storageService.load('project')
    /*const state = getState().projects
    const projects = state.map(p =>
        p.id === project.id
            ? { ...project }
            : p
    )*/
    dispatch({
        type: 'UPDATE_PROJECT',
        projects: projects
    })
}


const projectsReducer = (state = initialProjects, action) => {
    switch (action.type) {
        case 'INITIALIZE': return action.projects
        case 'ADD_PROJECT': return action.projects
        case 'UPDATE_PROJECT': return action.projects
        default: return state
    }
}

export default projectsReducer