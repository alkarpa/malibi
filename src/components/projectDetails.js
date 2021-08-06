import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProject, createProject } from '../reducers/projectsReducer'
import TimesTable from './timesTable'
import { intervalsDateMapper } from '../services/intervals'

const ProjectIntervalsList = ({ projectid }) => {
    const allIntervals = useSelector(state => state.intervals)
    const projectIntervals = allIntervals.filter(
        interval => interval.project === "" + projectid
                    || (!projectid && !interval.project) 
    )

    const dateMap = intervalsDateMapper(projectIntervals)
    const dates = Object.keys( dateMap )

    return (
        <div>
            {
                dates.map( d => (
                    <TimesTable 
                        title={d}
                        key={'ttproject'+d}
                        day={dateMap[d]} />
                ) )
            }
            
        </div>
    )

}

const ProjectDetails = ({ project }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(project.title)
    const [color, setColor] = useState(project.color)
    const [undoable, setUndoable] = useState(false)

    const undo = { ...project }

    useEffect(() => {
        setTitle(project.title)
        setColor(project.color)
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

    const handleUpdate = (prop, value) => {
        if (project.id) {
            dispatch(
                updateProject({
                    ...project, [prop]: value
                })
            )
        }
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

    const handleSubmit = () => {
        dispatch(
            createProject(title, color)
        )
    }

    return (
        <div style={{
            margin: '2em',
            boxShadow: '1em 0.5em 1em 0.5em black'
        }}>
            <div style={{ backgroundColor: project.color }}>
                <h2>{title}</h2>
            </div>
            <div>
                <h3>{ project.id ? 'Edit' : 'New project' }</h3>
                <div>
                    <label>
                        Title
                        <input
                            onChange={(event) => handleTitleChange(event.target.value)}
                            value={title}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Color
                        <input
                            type='color'
                            onChange={(event) => handleColorChange(event.target.value)}
                            value={color} />
                    </label>
                </div>
                <div>
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



            </div>
            <div>
                <h3>Tracked</h3>
                <ProjectIntervalsList projectid={project.id} />
            </div>
        </div>
    )

}

export default ProjectDetails