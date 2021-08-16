import React from 'react'
import { useSelector } from 'react-redux'
import TimeDisplay from '../timeDisplay'


const TodayTracked = ({ time }) => {
    const elapsed = useSelector(state => state.elapsed)
    return (
        <TimeDisplay time={time + elapsed} />
    )
}

/**
 * Monthly calendar day
 * @param {} param0 
 * @returns 
 */
const CalendarMonthDay = ({
        date,
        intervals = [],
        active,
        today,
        projectsMap,
        setActiveMonthDate,
        setActiveView
    }) => {

    const clock = intervals?.reduce((arr, cur) => (
        cur.end ? arr + (cur.end - cur.start) : arr
    ), 0)

    const activeClass = active ? "active" : "inactive"
    const clockClass = clock ? "tracked" : ""
    const todayClass = today ? "today" : ""

    // DUPLICATE FROM stat.js
    const projectsGrouped = intervals.reduce((map, interval) => {
        const project = "" + interval.project
        map[project] = map[project] || []
        map[project].push(interval)
        return map
    }, {})
    // END DUPLICATE

    const dateTitle = `${date.getDate()}`

    return (
        <div
            id={`cal${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
            className={`day dayGrid ${activeClass} ${clockClass} ${todayClass}`}>
            <div onClick={() => { setActiveMonthDate(date); setActiveView('DAY') }}>
                <h1>{dateTitle}</h1>
            </div>
            <div className='dayInfoGrid'>
                <div>&#128337;</div>
                <div>
                    {
                        today
                            ? <TodayTracked time={clock} />
                            : <TimeDisplay time={clock} />
                    }
                </div>
                <div>P</div>
                <div>
                    {
                        Object.keys(projectsGrouped).map(p => (
                            <div key={`caldayproj${date}${p}`} style={{
                                display: 'inline-block',
                                height: '100%',
                                width: (100 / Object.keys(projectsGrouped).length) + "%",
                                backgroundColor: projectsMap[p]?.color || 'gray'
                            }} title={projectsMap[p]?.title}></div>
                        ))
                    }
                </div>
            </div>



        </div>
    )
}

export default CalendarMonthDay