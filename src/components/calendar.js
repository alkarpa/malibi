import React, { useState } from 'react'
import './calendar.css'
import timeDisplay from '../services/timeDisplay'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../services/intervals'
import TimeDisplay from './timeDisplay'

const Stats = ({ intervals = [] }) => {

    const projects = useSelector(state => state.projects?.list)

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
            project: projects.find(pr => pr.id === parseInt(key)) || {},
            absolute: absolute,
            relative: (absolute / totalMillis * 100).toFixed(2)
        }
    })

    activeProjects.sort((a, b) => b.absolute - a.absolute)

    console.log(projects)

    activeProjects.forEach((p) => {
        console.log(p, projects[p.id])
    })

    const panelStyle = {
        margin: '2em',
        boxShadow: '1em 0.5em 1em 0.5em black'
    }

    return (
        <div>
            <h2>Stats</h2>
            <div style={panelStyle}>
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
                                <div key={'calbpbar'+p.id} style={{
                                    display: 'inline-block',
                                    height: '100%',
                                    width: `${(p.absolute/totalMillis*100)}%`,
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

const Day = ({ date, active, clock, today }) => {

    const activeClass = active ? "active" : "inactive"
    const clockClass = clock ? "tracked" : ""

    const trackedTime = clock
        ? (<div>{clock.hour}:{clock.minute}:{clock.second}</div>)
        : ""

    return (
        <div
            id={`cal${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
            className={`day ${activeClass} ${clockClass}`}>
            <h1>{date.getDate()} {today ? "Today" : ""}</h1>
            {trackedTime}
        </div>
    )
}

const Calendar = ({ today = new Date() }) => {
    const intervals = useSelector(state => state.intervals) || []

    const dateMap = intervalsDateMapper(intervals)


    //const today = new Date()
    today.setUTCHours(12, 0, 0)
    const [activeMonthDate, setActiveMonthDate] = useState(today)

    const year = activeMonthDate.getFullYear()
    const month = activeMonthDate.getMonth()
    const ISO_yearmonth = activeMonthDate.toISOString().substring(0, 7)

    const monthFirstDay = new Date(Date.UTC(year, month, 1, 12))
    //console.log('monthFirstDay', monthFirstDay)
    const monthLastDay = new Date(Date.UTC(year, month + 1, 0, 12))
    // console.log('monthLastDate', monthLastDay)

    const firstWeekMonday = new Date(
        Date.UTC(year, month, 1 - monthFirstDay.getDay() + 1 - 7, 12)
    )
    const lastWeekSunday = new Date(
        Date.UTC(year, month + 1, 7 - monthLastDay.getDay(), 12)
    )

    //console.log('firstWeekMonday', firstWeekMonday)
    //console.log('lastWeekSunday', lastWeekSunday)

    let calendarDays = []
    for (let d = new Date(firstWeekMonday); d <= lastWeekSunday; d.setUTCDate(d.getUTCDate() + 1)) {
        calendarDays.push(new Date(d))
    }

    const WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const WEEKDAYS_MONDAY_FIRST = WEEKDAYS.concat(WEEKDAYS[0]).slice(1)

    const handleMonthAddition = (add) => {
        let newDate = new Date(activeMonthDate)
        newDate.setMonth(newDate.getMonth() + add)
        setActiveMonthDate(newDate)
    }
    const handleMonthPick = (event) => {
        const newISO = event.target.value
        const newYear = parseInt(newISO.substring(0, 4))
        const newMonth = parseInt(newISO.substring(5))
        const newActive = new Date(activeMonthDate)
        newActive.setFullYear(newYear)
        newActive.setMonth(newMonth - 1)
        setActiveMonthDate(newActive)
    }

    const getClock = (date) => {
        const dt = dateMap[date.toISOString().substring(0, 10)]
        if (dt) {
            return timeDisplay.getIntervalClockObject(
                dt.reduce((arr, cur) => (
                    cur.end ? arr + (cur.end - cur.start) : arr
                ), 0)
            )
        }
        return undefined
    }

    const millisIsMonth = (millis, monthDate) => {
        const millisDate = new Date(millis)
        return millisDate.getMonth() === monthDate.getMonth() && millisDate.getFullYear() === monthDate.getFullYear()
    }

    return (
        <div>
            <h1>Calendar</h1>
            <div className="monthHeader">
                <button id='calPrevMonthButton'
                    onClick={() => handleMonthAddition(-1)}>
                    Previous month
                </button>
                <input className="title" onChange={(e) => handleMonthPick(e)} type="month" value={ISO_yearmonth} />
                <button id='calNextMonthButton'
                    onClick={() => handleMonthAddition(1)}
                >Next month
                </button>
            </div>
            <div className="calendargrid">
                {WEEKDAYS_MONDAY_FIRST.map(d => <div className="weekday" key={"cal" + d}>{d}</div>)}
                {calendarDays.map(d => (
                    <Day key={'cal' + d.getTime()}
                        date={d}
                        active={d.getMonth() === month}
                        clock={getClock(d)}
                        today={d.toLocaleDateString() === today.toLocaleDateString()}
                    />
                ))}
            </div>

            <div>
                <Stats intervals={intervals.filter(iv => millisIsMonth(iv.start, activeMonthDate))} />
            </div>

        </div>
    )
}

export default Calendar