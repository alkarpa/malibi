import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectDetails from './projectDetails'
import './projects.css'
import Sidebar from '../sidebar'

/**
 * A project without an id.
 * Used to give a title and color to 'no-projects'
 */
export const NEWPROJECT = {
    title: '--no project / new project--',
    color: '#777777'
}

const ProjectRow = ({ project, handleSelection, selected }) => {

    return (
        <li className={`listedproject ${selected ? 'selectedproject' : ''}`}
            onClick={() => handleSelection(project.id)}
            style={{
                backgroundColor: project?.color,
                opacity: project?.inactive ? 0.2 : 1.0
            }}>
            {project.title}
        </li>
    )
}

const ProjectsList = ({ newProject, selectedProject, setSelection, toggleSidebar = () => (undefined) }) => {
    const projects = useSelector(state => state.projects)

    const handleProjectSelection = (id) => {
        const byId = projects.find(p => p.id === id)
        setSelection(
            byId ? byId : newProject
        )
        toggleSidebar() // affects small screens only
    }

    return (
        <div className='projectslist'>
            <h3>Select a project</h3>
            <ul>
                <ProjectRow project={newProject} handleSelection={handleProjectSelection} />
                {projects.map(p => (
                    <ProjectRow key={`projectlist_${p.id}`}
                        project={p}
                        selected={selectedProject.id === p.id}
                        handleSelection={handleProjectSelection} />
                ))}
            </ul>
        </div>
    )
}

const Projects = () => {

    const [selectedProject, setSelectedProject] = useState(NEWPROJECT)

    return (
        <div className='page'>
            <Sidebar>
                <ProjectsList newProject={NEWPROJECT} selectedProject={selectedProject} setSelection={setSelectedProject} />
            </Sidebar>
            <ProjectDetails project={selectedProject} />

        </div>
    )
}

export default Projects