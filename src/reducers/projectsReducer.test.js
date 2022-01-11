import { createProject, updateProject } from "./projectsReducer";
import initialize from '../services/initializeData'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { testState } from "../util/test_state_local";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async action creators', () => {

    test('initialize', () => {
        const store = mockStore({ projects: [], intervals: [] })

        return store.dispatch(initialize ).then( () => {
            expect(store.getActions()[0].projects).toEqual(testState.project)
        } )
    }) 

    test('createProject', () => {
        const store = mockStore({ projects: [] })
        const testStateProjectsLength = testState.project.length + 1
        return store.dispatch(createProject('test', 'yellow')).then( () => {
            expect(store.getActions()[0].projects.length).toBe(testStateProjectsLength)
        } )
    })

    test('updateProject', () => {
        const store = mockStore({ projects: [] })
        const testStateProjectsLength = testState.project.length
        const updated = { ...testState.project[1], title: 'Updated' }
        return store.dispatch(updateProject(updated)).then( () => {
            expect(store.getActions()[0].projects.length).toBe(testStateProjectsLength)
            expect(store.getActions()[0].projects[1].title).toEqual( updated.title )
        } )
    })

})