import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProject, createProject } from '../../reducers/projectsReducer'
import SwitchInput from '../switchinput'

export const TEXT = {
    create: 'Create',
    update: 'Update',
}

const ProjectFormInputField = ({ children, label, visible = true, description }) => {
    if (!visible) return (<></>)

    return (
        <>
            <label className='projectformeditlabel'>
                {label}
            </label>
            {children}
            {
                description &&
                <div className='projectformdescription'>{description}</div>
            }
        </>
    )
}

const ProjectFormButtons = ({ project, undoable, handleSubmit, handleUndo }) => {

    const buttons = [
        {
            id: 'projformsubmit',
            text: project.id ? TEXT.update : TEXT.create,
            handler: handleSubmit,
            disabled: project.title === '' || !undoable,
        },
        {
            id: 'projformundo',
            text: 'Undo changes',
            type: 'button',
            handler: handleUndo,
            disabled: !undoable,
            off: !project.id,
        }
    ]

    return (
        <div className='buttons'>
            {
                buttons.filter(b => !b.off).map(b => (
                    <button key={b.id}
                        type={b.type}
                        onClick={b.handler}
                        disabled={b.disabled}
                    >
                        {b.text}
                    </button>
                ))
            }
        </div>
    )
}

const ProjectForm = ({ project }) => {
    const dispatch = useDispatch()

    const title = project.id ? project.title : ''
    const fp_template = { ...project, title, inactive: project.inactive || false }

    const [formProject, setFormProject] = useState(fp_template)
    const [undoable, setUndoable] = useState(false)

    useEffect(() => {
        const title = project.id ? project.title : ''
        const fp = { ...project, title, inactive: project.inactive || false }
        setFormProject(fp)
        setUndoable(false)
    }, [project])

    const handleInputChange = (name, value) => {
        const fp = { ...formProject, [name]: value }
        setFormProject(fp)
        checkUndoable(fp)
    }

    const checkUndoable = (fp) => {
        let undoable = false;
        Object.keys(fp).forEach(key => {
            if (fp[key] !== project[key]) {
                undoable = true
            }
        })
        setUndoable(undoable)
    }

    const handleUndo = () => {
        setFormProject({ ...project })
        setUndoable(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (project.id) {
            dispatch(
                updateProject(formProject)
            )
        } else {
            dispatch(
                createProject(formProject.title, formProject.color)
            )
        }

    }

    return (
        <form className='projectform'>
            <div className='fields'>
                <h3>Properties</h3>
                <ProjectFormInputField label='Title'>
                    <input
                        name='title'
                        onChange={(event) => handleInputChange('title', event.target.value)}
                        value={formProject.title}
                        placeholder='Enter a name for the project'
                    />
                </ProjectFormInputField>
                <ProjectFormInputField label='Color'>
                    <label style={{ display: 'flex' }}>
                        <input style={{ flexGrow: '1' }}
                            name='color'
                            type='color'
                            onChange={(event) => handleInputChange('color', event.target.value)}
                            value={formProject.color} />
                        <span>{formProject.color}</span>
                    </label>
                </ProjectFormInputField>

                {
                    project.id && // Hide the section if the only part is invisible quick-hack
                    <>
                        <h3>Management</h3>
                        <ProjectFormInputField label='Listing' visible={project.id ? true : false}
                            description='Determines whether this project can be chosen for an alibi. Inactive projects are not listed in the selection menus.'
                        >
                            <SwitchInput onlabel='Inactive' offlabel='Active'
                                onChange={(event) => handleInputChange('inactive', event.target.checked)}
                                checked={formProject.inactive} />
                        </ProjectFormInputField>
                    </>
                }

            </div>
            <ProjectFormButtons project={formProject} handleSubmit={handleSubmit} handleUndo={handleUndo} undoable={undoable} />

        </form>
    )
}

export default ProjectForm