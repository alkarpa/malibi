import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startDrag, endDrag } from '../reducers/dragndropReducer'

const ProjectDnDMenu = () => {
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

    const filteredProjects = projects.filter( p => !p.inactive )

    return (
        <div className='dndmenu'>
            <label>Drag and Drop projects to alibis</label>
            <ul style={{ paddingLeft: '0px' }}>
                {filteredProjects?.map(proj => (
                    <li key={proj.id}
                        style={{ backgroundColor: proj.color }}
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

const ProjectDnDList = () => {

    const [menuOpen, setMenuOpen] = useState(false)


    const toggleMenu = () => {
        if (menuOpen) {
            closeMenu()
        } else {
            openMenu()
        }
    }
    const openMenu = () => {
        setMenuOpen(true)
    }
    const closeMenu = () => {
        setMenuOpen(false)
    }

    const style = menuOpen ? { backgroundColor: 'gray' } : {}

    return (
        <div className='dndlist'>
            <button onClick={toggleMenu} style={style}>&#9995;</button>
            {
                menuOpen
                    ? <ProjectDnDMenu />
                    : <></>
            }

        </div>

    )

}

export default ProjectDnDList