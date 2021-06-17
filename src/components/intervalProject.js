import React from 'react'

const IntervalProject = ({ interval, project, setProject }) => {

    //const project = interval.project
    const title = project ? project.title : '--No project--'
    const color = project ? project.color : 'gray'

    const handleDrop = (event) => {
        event.preventDefault()
        const project = {
            color: event.dataTransfer.getData('color'),
            id: event.dataTransfer.getData('id'),
            title: event.dataTransfer.getData('title')
        }
        setProject(interval.id, project)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        //console.log('handleDragOver')
    }

    return (
        <div style={{ backgroundColor: color }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            title={title}
        >
            <div className='projectDraggable'>
                {title}
            </div>
        </div>
    )

}

export default IntervalProject