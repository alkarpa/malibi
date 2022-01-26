import React from 'react'
import { useSelector } from 'react-redux'
import TimeDisplay from '../timeDisplay'


const TodayTracked = ({ time }) => {
    const elapsed = useSelector(state => state.elapsed)
    return (
        <TimeDisplay time={time + elapsed} seconds={false} />
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
        <div onClick={() => { setActiveMonthDate(date); setActiveView('DAY') }}
            id={`cal${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
            className={`day dayGrid ${activeClass} ${clockClass} ${todayClass}`}>
            <div >
                {dateTitle}
            </div>
            <div className='dayInfoGrid'>
                <div>
                    {
                        today
                            ? <TodayTracked time={clock} />
                            : <TimeDisplay time={clock} seconds={false} />
                    }
                </div>
                <div className='dateprojectbar'>
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