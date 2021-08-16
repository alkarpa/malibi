import React from 'react'
import { render, fireEvent } from '../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Projects from './projects'
import { testState } from '../util/test_state_local'

describe('Projects component', () => {

    const testProjects = testState.projects

    test('-no project- selectable', () => {
        const component = render(
            <Projects />
        )
        const noProject = component.getByText(/no project/)
        fireEvent.click(noProject)

        expect(component.container).toHaveTextContent('New project')
    })

    test('Select an existing project', () => {
        const component = render(
            <Projects />
        )
        const project = component.getByText( testProjects[1].title )
        fireEvent.click(project)
        const table = component.getByRole('table', {name: '2021-08-15'})

        expect( table ).toHaveTextContent( testProjects[1].title )
    })


})