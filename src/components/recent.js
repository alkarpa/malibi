import React from 'react'
import Completed from './completed'
import ProjectDnDList from './projectDnDList'

const Recent = ({ completed, setCompleted, projectIdMap, projects, setProjects, setDragging }) => {

    return (
        <div className='floatContainer'>
                <div className='floatLeft'>
                  <Completed completed={completed} setCompleted={setCompleted} projects={projectIdMap}/>
                </div>
                <div className='floatLeft'>
                  <ProjectDnDList projects={projects}
                    setProjects={setProjects}
                    setDragging={setDragging}
                  />
                </div>
              </div>
    )

}

export default Recent