import React from 'react'
import Completed from './completed'
import ProjectDnDList from './projectDnDList'

const Recent = ({ setDragging }) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'min-content min-content'
          }}>
                <div className='floatLeft'>
                  <Completed />
                </div>
                <div className='floatLeft'>
                  <ProjectDnDList
                    setDragging={setDragging}
                  />
                </div>
              </div>
    )

}

export default Recent