import React from 'react'
import { useSelector } from 'react-redux'
import TimeDisplay from '../timeDisplay'

const Stats = ({ intervals = [] }) => {

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

    const activeProjects = Object.keys(projectsGrouped).map(key => {
        const absolute = (projectsGrouped[key] || []).reduce((acc, cur) => cur.end ? acc + (cur.end - cur.start) : acc, 0)
        return {
            id: parseInt(key),
            project: projects?.find(pr => pr.id === parseInt(key)) || {},
            absolute: absolute,
            relative: (absolute / totalMillis * 100).toFixed(2)
        }
    })

    activeProjects.sort((a, b) => b.absolute - a.absolute)

    //console.log(projects)
    /*
    activeProjects.forEach((p) => {
        console.log(p, projects[p.id])
    })
    */

    const panelStyle = {
        margin: '2em',
        boxShadow: '1em 0.5em 1em 0.5em black',
        backgroundColor: '#efffff',
    }

    return (
        <div>
            <div style={panelStyle}>
                <h2>Stats</h2>
                <div>
                    <h3>Total completed</h3> <TimeDisplay time={totalMillis ? totalMillis : 1 /* show zero hack */} />
                </div>
                <h3>By project</h3>
                <div style={{ maxWidth: '500px' }}>
                    {
                        activeProjects.map(p => (
                            <div key={'calbp' + p.id} style={{
                                backgroundColor: p.project.color ? p.project.color : 'gray',
                                margin: '5px',
                                display: 'grid',
                                gridTemplateColumns: '5fr 1fr 1fr',
                                gap: '2px'
                            }}>
                                <div>{(p.project || { title: 'no project ' + p.id }).title}</div>
                                <div style={{ backgroundColor: 'white', margin: '2px' }}><TimeDisplay time={p.absolute} /></div>
                                <div style={{ backgroundColor: 'white', margin: '2px', textAlign: 'right' }}>{p.relative} %</div>
                            </div>
                        ))
                    }
                    <div style={{ height: '1em', width: '490px', margin: '5px', border: '1px black solid' }}>
                        {
                            activeProjects.map(p => (
                                <div key={'calbpbar' + p.id} style={{
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
    )

}

export default Stats