import React, { useState, useEffect } from 'react'
import Timer from './components/timer/timer'
import PageContainer from './components/pageContainer'
import storageService from './services/storage'
import './dragndrop.css';

import Todo from './TODO'


function App() {
  const [completed, setCompleted] = useState([])

  const [projects, setProjects] = useState({list:[]})

  const [dragging, setDragging] = useState()

  const appClass = `${dragging === 'project' ? 'dragProject' : ''}`

  const projectIdMap = projects.list.reduce( (map, cur) => ({...map, [cur.id]: cur}), {} )
  console.log('projectIdMap')

  useEffect( () => {
    storageService.loadProjects(setProjects)
    storageService.loadCompleted(setCompleted)
  }, [] )

  return (
    <div className={appClass}>
      <Timer completed={completed} setCompleted={setCompleted} projects={projectIdMap} />

      <PageContainer setDragging={setDragging}
                     completed={completed}
                     setCompleted={setCompleted}
                     projects={projects}
                     setProjects={setProjects}
      >
        

      </PageContainer>
      

      <Todo />

    </div>
  )
}

export default App;
