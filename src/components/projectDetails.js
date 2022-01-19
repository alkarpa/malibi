import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProject, createProject } from '../reducers/projectsReducer'
import TimesTable from './timesTable'
import { intervalsDateMapper } from '../services/intervals'
import TimeDisplay from './timeDisplay'
import SwitchInput from './switchinput'
import DetailsSection from './detailsSection'

const ProjectIntervalsList = ({ projectid }) => {
    const allIntervals = useSelector(state => state.intervals)
    const projectIntervals = allIntervals.filter(
        interval => interval.project === "" + projectid
            || (!projectid && !interval.project)
    )

    const total = projectIntervals.reduce((total, cur) => (
        total + (cur.end ? cur.end - cur.start : 0)
    ), 0)

    if (total === 0) {
        const projectDescriptor = projectid ? 'this project' : 'no project'
        return (<div style={{textAlign: 'center', margin: '2em'}}>
            No alibis with {projectDescriptor}
        </div>)
    }

    const dateMap = intervalsDateMapper(projectIntervals)
    const dates = Object.keys(dateMap)

    return (
        <div className='projecttracked'>
            <div className='projecttrackedtotal'>
                Total: <TimeDisplay time={total} />
            </div>
            {
                dates.map(d => (
                    <div key={'ttproject' + d} className='completedCard'>
                        <TimesTable
                            title={d}
                            day={dateMap[d]} />
                    </div>
                ))
            }

        </div>
    )
}

const ProjectFormInputField = ({ children, label, visible = true }) => {
    if (!visible) return (<></>)

    return (
        <>
            <label className='projectformeditlabel'>
                {label}
            </label>
            {children}
        </>
    )
}

const ProjectForm = ({ project }) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState(project.title)
    const [color, setColor] = useState(project.color)
    const [inactive, setInactive] = useState(false)
    const [undoable, setUndoable] = useState(false)

    const undo = { ...project }

    useEffect(() => {
        setTitle(project.title)
        setColor(project.color)
        setInactive(project.inactive ? true : false)
    }, [project])

    const handleTitleChange = (value) => {
        setTitle(value)
        setUndoable(true)
        handleUpdate('title', value)
    }
    const handleColorChange = (value) => {
        setColor(value)
        setUndoable(true)
        handleUpdate('color', value)
    }
    const handleInactiveChange = (value) => {
        setInactive(value)
        handleUpdate('inactive', value)
    }

    const handleUndo = () => {
        setUndoable(false)
        setTitle(undo.title)
        setColor(undo.color)
        dispatch(
            updateProject({
                ...undo
            })
        )
    }

    const handleUpdate = (prop, value) => {
        if (project.id) {
            dispatch(
                updateProject({
                    ...project, [prop]: value
                })
            )
        }
    }
    const handleSubmit = () => {
        dispatch(
            createProject(title, color)
        )
    }

    return (
        <form className='projectform'>
            <div className='fields'>
                <h3>Properties</h3>
                <ProjectFormInputField label='Title'>
                    <input
                        onChange={(event) => handleTitleChange(event.target.value)}
                        value={title}
                    />
                </ProjectFormInputField>
                <ProjectFormInputField label='Color'>
                    <label style={{display: 'flex'}}>
                     <input style={{flexGrow:'1'}}
                        type='color'
                        onChange={(event) => handleColorChange(event.target.value)}
                        value={color} />
                        <span>{color}</span>
                    </label>
                </ProjectFormInputField>

                <h3>Management</h3>
                <ProjectFormInputField label='Activeness' visible={project.id ? true : false}>
                    <SwitchInput onlabel='Inactive' offlabel='Active'
                        onChange={(event) => handleInactiveChange(event.target.checked)}
                        checked={inactive} />
                </ProjectFormInputField>
            </div>
            <div className='buttons'>
                {
                    project.id
                        ? (
                            <button
                                type='button'
                                onClick={handleUndo}
                                disabled={!undoable}
                            >Undo Changes</button>
                        )
                        : (
                            <button
                                type='button'
                                onClick={handleSubmit}
                            >Create</button>
                        )
                }
            </div>
        </form>
    )
}



const ProjectDetails = ({ project }) => {


    return (
        <div className='projectdetails'>
            <div className='projecttitle' style={{ backgroundColor: project.color }}>
                <h2>{project.title}</h2>
            </div>
            <div>
                <DetailsSection >
                    <ProjectForm buttontitle={ project.id ? 'Edit' : 'New project' } project={project} />
                    <ProjectIntervalsList buttontitle='Tracked' projectid={project.id} />
                </DetailsSection>
            </div>

        </div>
    )

}

export default ProjectDetails