import React from 'react'
import { render, screen, fireEvent } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import ProjectDetails, { TEXT } from './projectDetails'

describe('projectDetails', () => {

    test("No id -> New project", () => {
        const testProject = {
            title: 'Test Project None',
            color: '#abcdef'
        }
        render(<ProjectDetails project={testProject} />)
        screen.getByRole('button', { name: TEXT.button_new })
        screen.getByRole('button', { name: TEXT.button_tracked })
    })

    test("Test project renders", () => {
        const testProject = {
            id: 'test',
            title: 'Test Project F',
            color: '#abcdef'
        }
        render(<ProjectDetails project={testProject} />)
        screen.getByRole('heading', { name: testProject.title })
        screen.getByRole('button', { name: TEXT.button_edit })
        screen.getByRole('button', { name: TEXT.button_tracked })
    })

})