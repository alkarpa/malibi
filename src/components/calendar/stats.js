import React from 'react'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../../services/intervals'
import TimeDisplay from '../timeDisplay'

const Stats = ({ intervals = [], activeView }) => {

    const projects = useSelector(state => state.projects)

    const projectsGrouped = intervals.reduce((map, interval) => {
        const project = "" + interval.project
        map[project] = map[project] || []
        map[project].push(interval)
        return map
    }, {})

    const totalMillis = intervals.reduce((acc, cur) => {
        return acc + (cur.end ? cur.end - cur.start : 0)
    }, 0)


    const statistics = [
        { title: 'Total completed', value: totalMillis }
    ]

    if (activeView === 'MONTH') {
        const dateMap = intervalsDateMapper(intervals)
        const daysTracked = Object.keys(dateMap).length
        //statistics.push({ title: 'Days tracked', value: daysTracked })
        statistics.push({ title: 'Average per day', value: totalMillis / daysTracked })
    }

    const activeProjects = Object.keys(projectsGrouped).map(key => {
        const absolute = projectsGrouped[key]?.reduce((acc, cur) => cur.end ? acc + (cur.end - cur.start) : acc, 0)
        return {
            id: key,
            project: projects?.find(pr => ""+pr.id === ""+key) || {},
            absolute: absolute,
            relative: (absolute / totalMillis * 100).toFixed(2)
        }
    })

    activeProjects.sort((a, b) => b.absolute - a.absolute)

    return (
        <div>
            <div className='stats halfscreengrid'>
                <div>
                    <h3>Statistics</h3>
                    <table className='mono large'>
                        <tbody>
                            {
                                statistics.map(stat => (
                                    <tr key={'stat' + stat.title}>
                                        <td>
                                            {stat.title} :
                                        </td>
                                        <td style={{backgroundColor: 'white'}}>
                                            <TimeDisplay time={stat.value ? stat.value : 1 /* show zero hack */} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>By project</h3>
                    <div style={{ maxWidth: '500px' }}>
                        {
                            activeProjects.map(p => (
                                <div key={'calbp' + p.id + p.absolute} style={{
                                    backgroundColor: p.project.color ? p.project.color : 'gray',
                                    margin: '5px',
                                    display: 'grid',
                                    gridTemplateColumns: '5fr 1fr 1fr',
                                    gap: '2px'
                                }}>
                                    <div>{p.project?.title}</div>
                                    <div style={{ backgroundColor: 'white', margin: '2px' }}><TimeDisplay time={p.absolute} /></div>
                                    <div style={{ backgroundColor: 'white', margin: '2px', textAlign: 'right' }}>{p.relative} %</div>
                                </div>
                            ))
                        }
                        <div style={{ height: '1em', width: '490px', margin: '5px', border: '1px black solid' }}>
                            {
                                activeProjects.map(p => (
                                    <div key={'calbpbar' + p.id + p.absolute} style={{
                                        display: 'inline-block',
                                        height: '100%',
                                        width: `${(p.absolute / totalMillis * 100)}%`,
                                        backgroundColor: p.project.color
                                    }} />
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Stats