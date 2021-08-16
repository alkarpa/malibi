import React from 'react'
import Completed from './completed'
import ProjectDnDList from './projectDnDList'

const Recent = ({ setDragging }) => {

    return (
        <div className='halfscreengrid'>
                <div>
                  <Completed />
                </div>
                <div>
                  <ProjectDnDList
                    setDragging={setDragging}
                  />
                </div>
              </div>
    )

}

export default Recent