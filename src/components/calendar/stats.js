import React from 'react'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../../services/intervals'
import EmptyAlibis from '../emptyalibis'
import TimeDisplay from '../timeDisplay'

const StatRow = ({ stat }) => {

    let content
    switch (stat.type) {
        case 'time':
            content = <TimeDisplay time={stat.value ? stat.value : 1 /* show zero hack */} />
            break;
        case 'number':
            content = <span>{stat.value}</span>
            break;
        default:
            content = <></>
    }

    return (
        <tr key={'stat' + stat.title} className='stat'>
            <td>
                {stat.title} :
            </td>
            <td style={{ backgroundColor: 'white' }}>
                {content}
            </td>
        </tr>
    )
}

const ProjectBarChart = ({ activeProjects, totalMillis }) => {
    const mult = 40
    const barh = 20
    const barpaddingh = 1
    const lines = [...Array(10).keys()]
    const w = lines.length * mult
    const h = activeProjects.length * barh
    return (
        <svg className='projectbarchart' viewBox={`0 0 ${w} ${h}`} preserveAspectRatio='none'>
            {
                activeProjects.map((p, i) => (
                    <rect
                        key={'calbpbar2' + p.id + p.absolute}
                        width={(p.absolute / (totalMillis ? totalMillis : 1)) * w}
                        height={barh - 2 * barpaddingh}
                        y={i * barh + barpaddingh}
                        fill={p.project.color}
                        stroke={p.project.color}
                    />
                ))
            }
            {
                lines.map(l =>
                    <line
                        key={'lineline2' + l}
                        y1='0'
                        y2={h}
                        x1={l * mult}
                        x2={l * mult}
                        stroke='black'
                        strokeWidth='1'
                        opacity={0.2}
                    />)
            }
        </svg>
    )
}

const Stats = ({ intervals = [], activeView }) => {

    const projects = useSelector(state => state.projects)

    if (intervals.length === 0) {
        return (<EmptyAlibis />)
    }

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
        { title: 'Total completed', value: totalMillis, type: 'time' }
    ]

    if (activeView === 'MONTH') {
        const dateMap = intervalsDateMapper(intervals)
        const keys = Object.keys(dateMap)
        const daysTracked = keys.length
        statistics.push({ title: 'Days tracked', value: daysTracked, type: 'number' })

        if (daysTracked > 0) {
            statistics.push({ title: 'Average per day', value: totalMillis / daysTracked, type: 'time' })

            const arr = keys.map(key => dateMap[key]).reduce((arr, cur) => {
                const diffs = cur.map(inter => inter.end ? inter.end - inter.start : 0)
                return [...arr, ...diffs]
            }, [])

            let max = arr.reduce((max, cur) => Math.max(max, cur), arr[0])
            statistics.push({ title: 'Longest day', value: max, type: 'time' })
            let min = arr.reduce((min, cur) => Math.min(min, cur), arr[0])
            statistics.push({ title: 'Shortest day (tracked)', value: min, type: 'time' })

        }

    }
    const activeProjects = Object.keys(projectsGrouped).map(key => {
        const absolute = projectsGrouped[key]?.reduce((acc, cur) => cur.end ? acc + (cur.end - cur.start) : acc, 0)
        return {
            id: key,
            project: projects?.find(pr => "" + pr.id === "" + key) || {},
            count: projectsGrouped[key].length,
            absolute: absolute,
            relative: (absolute / totalMillis * 100).toFixed(2)
        }
    })

    activeProjects.sort((a, b) => b.absolute - a.absolute)

    return (
        <div>
            <div className='stats'>
                <div>
                    <h3>Statistics</h3>
                    <table className='mono large'>
                        <tbody>
                            {
                                statistics.map(stat => (
                                    <StatRow key={'stat' + stat.title} stat={stat} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>By project</h3>
                    <div className='byproject'>
                        <div style={{ whiteSpace: 'nowrap' }}>
                            {
                                activeProjects.map(p => (
                                    <div key={'calbp' + p.id + p.absolute} style={{
                                        backgroundColor: p.project.color ? p.project.color : 'gray',
                                        margin: '5px',
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax( 40vw, 1fr) 4ch 8ch 7ch',
                                        gap: '2px'
                                    }}>
                                        <div style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>{p.project?.title}</div>
                                        <div style={{ backgroundColor: 'white', textAlign: 'right', margin: '2px' }}>&times;{p.count}</div>
                                        <div style={{ backgroundColor: 'white', textAlign: 'right', margin: '2px' }}><TimeDisplay time={p.absolute} /></div>
                                        <div style={{ backgroundColor: 'white', margin: '2px', textAlign: 'right' }}>
                                            <span className='mono timedisplay'>{p.relative} %</span>
                                            </div>
                                    </div>
                                ))
                            }

                        </div>
                            <div className='chartcontainer'>
                                <ProjectBarChart activeProjects={activeProjects} totalMillis={totalMillis} />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Stats