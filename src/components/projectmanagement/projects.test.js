import React from 'react'
import { render, screen } from '../../util/component_test_util'
import { prettyDOM } from '@testing-library/jest-dom'
import Projects, {NEWPROJECT} from './projects'

describe('Projects component', () => {

    test('New project selected by default', () => {
        render(<Projects />)
        screen.getByRole('heading', {name: NEWPROJECT.title})
    })
})