import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProject, createProject } from '../reducers/projectsReducer'
import TimesTable from './timesTable'
import { intervalsDateMapper } from '../services/intervals'
import TimeDisplay from './timeDisplay'

const ProjectIntervalsList = ({ projectid }) => {
    const allIntervals = useSelector(state => state.intervals)
    const projectIntervals = allIntervals.filter(
        interval => interval.project === "" + projectid
            || (!projectid && !interval.project)
    )

    const total = projectIntervals.reduce( (total, cur) => (
        total + (cur.end ? cur.end - cur.start : 0)
    ), 0 )

    const dateMap = intervalsDateMapper(projectIntervals)
    const dates = Object.keys(dateMap)

    return (
        <div>
            Total: <TimeDisplay time={total} />
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
        <div className='completedCard'>
            <div style={{ backgroundColor: project.color }}>
                <h2>{title}</h2>
            </div>
            <div style={{margin: '2em'}}>
                <fieldset>
                    <legend>{project.id ? 'Edit' : 'New project'}</legend>
                    <div>
                        <label>
                            <span style={{display: 'inline-block',width: '6ch'}}>Title</span>
                            <input
                                onChange={(event) => handleTitleChange(event.target.value)}
                                value={title}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                        <span style={{display: 'inline-block',width: '6ch'}}>Color</span>
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
                </fieldset>



            </div>
            <div>
                <h3>Tracked</h3>
                <ProjectIntervalsList projectid={project.id} />
            </div>
        </div>
    )

}

export default ProjectDetails