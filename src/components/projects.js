import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProjectDetails from './projectDetails'


const Projects = () => {
    const projects = useSelector(state => state.projects)

    const newProject = {
        title: '--no project--',
        color: '#777777'
    }

    const [selectedProject, setSelectedProject] = useState(
        projects.length > 0 ? projects[0] : newProject
    )


    const handleProjectSelection = (id) => {
        const byId = projects.find(p => p.id === id)
        setSelectedProject(
            byId ? byId : newProject
        )
    }


    return (
        <div>
            <div className='halfscreengrid grid600'>
                <div className='completedCard projectslist w600'>
                    <h2>List of all projects</h2>
                    <ul>
                        {[newProject].concat(projects).map(p => (
                            <li
                                key={`projectlist_${p.id}`}
                                className='project'
                                style={{
                                    backgroundColor: p.color,
                                    cursor: 'pointer',
                                    color: p.id ? 'black' : 'white',
                                    marginBottom: p.id ? '4px' : '1.5em'
                                }}
                                onClick={() => handleProjectSelection(p.id)}
                            >{p.title}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ProjectDetails project={selectedProject} />
                </div>
            </div>

        </div>
    )
}

export default Projects