import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInterval } from '../reducers/trackingReducer'
import ProjectDropdown from './projectDropdown'

const IntervalProject = ({ interval }) => {
    const dispatch = useDispatch()

    const projects = useSelector( state => state.projects )

    if (!interval) {
        return (
            <div>Start your alibi first</div>
        )
    }

    const project = projects.find( p => ""+p.id === interval.project )

    const title = project ? project.title : '--No project--'
    const color = project ? project.color : 'gray'

    const handleDrop = (event) => {
        event.preventDefault()
        const project = {
            id: event.dataTransfer.getData('id'),
        }
        const updatedInterval = { id: interval.id , project: project.id}
        dispatch( updateInterval(updatedInterval) )
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleUpdate = ( interval, projectid ) => {
        dispatch(
            updateInterval( { ...interval, project: projectid } )
        )
    }

    const filteredProjects = projects.filter( p => p.id === project?.id || !p.inactive )

    return (
        <div className='projectDraggable'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            title={title}
            style={{backgroundColor: color}}
        >
            <div>
                <ProjectDropdown 
                    interval={interval} 
                    options={filteredProjects} 
                    value={project} 
                    handleChange={handleUpdate}
                />
            </div>
        </div>
    )

}

export default IntervalProject