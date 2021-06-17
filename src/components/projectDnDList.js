import React, { useState } from 'react'
import storageService from '../services/storage'

const ProjectDnDList = ({ projects, setProjects, setDragging }) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#efefef')

    const handleDragStart = (event) => {
        const project = {
            color: event.target.style.backgroundColor,
            id: event.target.attributes.projectid.value,
            title: event.target.innerText
        }
        event.dataTransfer.setData('title', project.title)
        event.dataTransfer.setData('color', project.color)
        event.dataTransfer.setData('id', project.id)
        console.log('handleDragStart', event)
        setDragging('project')
    }

    const handleDragEnd = () => {
        console.log('handleDragEnd')
        setDragging(undefined)
    }

    const addProject = () => {
        const id = projects.list.reduce((max, cur) => Math.max(max, cur.id), 0) + 1
        const newProjects = projects.list.concat({
            id: id,
            color: color,
            title: name,
        })
        setName('')
        setColor('#efefef')
        setProjects({ ...projects, list: newProjects })
        storageService.save('projects', { ...projects, list: newProjects })
    }

    return (
        <div>

            <h1>Projects</h1>
            <div>
                <h2>Drag and Drop Projects List</h2>
                <ul>
                    {projects.list.map(proj => (
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
            <div>
                <h2>New projects area</h2>
                <input name='projectname' type='text' value={name} onChange={(ev) => setName(ev.target.value)} />
                <input name='projectcolor' type='color' value={color} onChange={(ev) => setColor(ev.target.value)} />
                <button type='button' onClick={addProject}>Add project</button>
            </div>
        </div>
    )

}

export default ProjectDnDList