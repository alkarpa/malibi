import React, { useState } from 'react'
import { useSelector} from 'react-redux'
import ProjectDetails from './projectDetails'


const Projects = () => {
    const projects = useSelector(state => state.projects.list)
    const [selectedProject, setSelectedProject] = useState(
        projects.length > 0 ? projects[0] : undefined
    )

    const newProject = {
        title: '--no project--',
        color: '#777777'
    }

    const handleProjectSelection = (id) => {
        const byId = projects.find(p => p.id === id)
        setSelectedProject(
            byId ? byId : newProject
        )
    }


    return (
        <div>
            <h1>Projects</h1>

            <ul>
                {projects.concat(newProject).map(p => (
                    <li
                        key={`projectlist_${p.id}`}
                        className='project'
                        style={{
                            backgroundColor: p.color,
                            cursor: 'pointer',
                            color: p.id ? 'black' : 'white'
                        }}
                        onClick={() => handleProjectSelection(p.id)}
                    >{p.title}</li>
                ))}
            </ul>

            <div>
                {
                    selectedProject
                        ? <ProjectDetails project={selectedProject} />
                        : <></>
                }
            </div>

        </div>
    )
}

export default Projects