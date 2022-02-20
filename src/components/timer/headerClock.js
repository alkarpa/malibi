import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PretzelClock from '../calendar/pretzelClock'
import TotalToday from './totalToday'

const HeaderClock = () => {

    const alibis = useSelector(state => state.intervals)
    const projects = useSelector(state => state.projects)
    const [lastTick, setLastTick] = useState(undefined)
    //console.log('HeaderClock rendered')

    useEffect(() => {
        if (alibis.length > 0 && !alibis.slice(-1)[0].end) {
            setLastTick(Date.now())
            const timer = setInterval(() => {
                setLastTick(Date.now())
            }, 60000)
            return () => clearInterval(timer)
        } else {
            setLastTick(undefined)
        }
    }, [alibis])

    const projectsMap = projects.reduce((map, cur) => (
        { ...map, [cur.id]: cur }
    ), {})

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.getTime()
    const intervals = alibis.filter(a => a.start >= todayStart || a.end > todayStart)
        .map(a => (a.start < todayStart ? { ...a, start: todayStart } : { ...a }))
    if (intervals.length > 0 && lastTick) {
        intervals[intervals.length - 1].end = lastTick
    }

    const todayTotal = intervals.reduce((acc, cur) => {
                return acc + (cur.end - cur.start)
            }, 0)

    return (
        <div style={{display: 'grid', gridTemplateRows: 'min-content min-content', justifyContent: 'center', textAlign:'center'}}>
            <PretzelClock intervals={intervals} size={100} projectsMap={projectsMap} />
            <TotalToday todayCompleted={ todayTotal } />
        </div>
    )
}

export default HeaderClock