import storageService from "./storage";

const initialize = async (dispatch, getState) => {

    const initialProjects = await storageService.load('project')
    const initialAlibis = await storageService.load('alibi')
    
    dispatch( {
        type: 'INITIALIZE',
        projects: initialProjects,
        intervals: initialAlibis,
    } )
}

export default initialize