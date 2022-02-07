import React from 'react'
import { render, screen } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import ProjectForm, {TEXT} from './projectForm'
import { NEWPROJECT } from './projects'

describe('ProjectForm component', () => {

    test('New project has create', () => {
        render(<ProjectForm project={NEWPROJECT} />)
        screen.getByRole('button', {name: TEXT.create})
    })

    test('Test Project has update', () => {
        const test = {
            id: 'test',
            title: 'Happy Tests',
            color: '#abcdef'
        }

        render(<ProjectForm project={test} />)
        screen.getByRole('button', {name: TEXT.update})
    })
})