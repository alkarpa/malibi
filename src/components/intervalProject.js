import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInterval } from '../reducers/trackingReducer'
import ProjectDropdown from './projectDropdown'

const IntervalProject = ({ interval }) => {
    const dispatch = useDispatch()

    const projects = useSelector( state => state.projects.list )

    const project = projects.find( p => ""+p.id === interval.project )

    const title = project ? project.title : '--No project--'
    const color = project ? project.color : 'gray'

    const handleDrop = (event) => {
        event.preventDefault()
        const project = {
            id: event.dataTransfer.getData('id'),
        }
        const newInterval = {...interval, project: project.id}
        dispatch( updateInterval(newInterval) )
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleUpdate = ( interval, projectid ) => {
        dispatch(
            updateInterval( { ...interval, project: projectid } )
        )
    }

    return (
        <div style={{ backgroundColor: color }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            title={title}
            className='projectDraggable'
        >
            <div>
                <ProjectDropdown 
                    interval={interval} 
                    options={projects} 
                    value={project} 
                    handleChange={handleUpdate}
                />
            </div>
        </div>
    )

}

export default IntervalProject