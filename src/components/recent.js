import React from 'react'
import Completed from './completed'
import ProjectDnDList from './projectDnDList'

const Recent = ({ setDragging }) => {

  return (
    <div>
      <ProjectDnDList setDragging={setDragging} />
      <Completed />
    </div>
  )

}

export default Recent