import React from 'react'
import { useSelector } from 'react-redux'
import TimesTable from '../timesTable'
import { intervalsDateMapper } from '../../services/intervals'
import TimeDisplay from '../timeDisplay'
import DetailsSection from '../detailsSection'
import ProjectForm from './projectForm'
import ProjectDnDList from '../projectDnDList'

export const TEXT = {
    button_edit : 'Edit',
    button_new : 'New',
    button_tracked: 'Tracked',
}

const ProjectIntervalsList = ({ projectid }) => {
    const allIntervals = useSelector(state => state.intervals)
    const projectIntervals = allIntervals.filter(
        interval => interval.project === "" + projectid
            || (!projectid && !interval.project)
    )

    const total = projectIntervals.reduce((total, cur) => (
        total + (cur.end ? cur.end - cur.start : 0)
    ), 0)

    if (total === 0) {
        const projectDescriptor = projectid ? 'this project' : 'no project'
        return (<div style={{ textAlign: 'center', margin: '2em' }}>
            No alibis with {projectDescriptor}
        </div>)
    }

    const dateMap = intervalsDateMapper(projectIntervals)
    const dates = Object.keys(dateMap)

    return (
        <div className='projecttracked completedCardContainer'>
            <ProjectDnDList />
            <div className='projecttrackedtotal'>
                Total: <TimeDisplay time={total} />
            </div>
            {
                dates.map(d => (
                    <div key={'ttproject' + d} className='completedCard'>
                        <TimesTable
                            title={d}
                            day={dateMap[d]} />
                    </div>
                ))
            }

        </div>
    )
}




const ProjectDetails = ({ project }) => {


    return (
        <div className='projectdetails'>
            <div className='projecttitle' style={{ backgroundColor: project.color }}>
                <h2>{project.title}</h2>
            </div>
            <div>
                <DetailsSection >
                    <ProjectForm buttontitle={project.id ? TEXT.button_edit : TEXT.button_new} project={project} />
                    <ProjectIntervalsList buttontitle={TEXT.button_tracked} projectid={project.id} />
                </DetailsSection>
            </div>

        </div>
    )

}

export default ProjectDetails