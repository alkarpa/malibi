import projectsReducer, { createProject, updateProject } from "./projectsReducer";
import { testState } from "../util/test_state_local";
import deepFreeze from "deep-freeze";

describe('projectsReducer', () => {

    test('default state is testState.projects', () => {
        const state = projectsReducer(undefined, 'TEST_ACTION')
        expect( state ).toEqual( testState.projects )
    })

    test('ADD_PROJECT to empty state', () => {
        const state = []
        deepFreeze(state)
        const newState = projectsReducer(state, createProject('test','#123456'))
        expect( newState.length ).toBe(1)
    })

    test('UPDATE_PROJECT updates', () => {
        const state = testState.projects
        deepFreeze(state)
        const updated = { ...testState.projects[1], title: 'Updated' }
        const action = updateProject(updated)
        const newState = projectsReducer(state, action)
        const expected = state.map( p => p.id === updated.id ? updated : p )
        expect( newState ).toEqual( expected )
    })

})