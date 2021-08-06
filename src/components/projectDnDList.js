import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startDrag, endDrag } from '../reducers/dragndropReducer'

const ProjectDnDList = () => {
    const dispatch = useDispatch()

    const projects = useSelector( state => state.projects.list )

    const handleDragStart = (event) => {
        const project = {
            color: event.target.style.backgroundColor,
            id: event.target.attributes.projectid.value,
            title: event.target.innerText
        }
        event.dataTransfer.setData('id', project.id)
        dispatch( startDrag('project') )
    }

    const handleDragEnd = () => {
        dispatch( endDrag() )
    }

    return (
        <div>

            <h1>Projects</h1>
            <div>
                <h2>Drag and Drop Projects List</h2>
                <ul>
                    {projects.map(proj => (
                        <li key={proj.id} style={{ backgroundColor: proj.color }}
                            className='project draggable'
                            projectid={proj.id}
                            draggable={true}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            >
                            {proj.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default ProjectDnDList