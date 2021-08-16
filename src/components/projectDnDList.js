import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startDrag, endDrag } from '../reducers/dragndropReducer'

const ProjectDnDList = () => {
    const dispatch = useDispatch()

    const projects = useSelector(state => state.projects)

    const handleDragStart = (event) => {
        const project = {
            color: event.target.style.backgroundColor,
            id: event.target.attributes.projectid.value,
            title: event.target.innerText
        }
        event.dataTransfer.setData('id', project.id)
        dispatch(startDrag('project'))
    }

    const handleDragEnd = () => {
        dispatch(endDrag())
    }

    return (
        <div>
            <ul>
                {projects?.map(proj => (
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
    )

}

export default ProjectDnDList