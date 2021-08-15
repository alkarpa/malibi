import React, { useState } from 'react'
import './calendar.css'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../../services/intervals'
import Stats from './stats'
import CalendarMonth from './calendarMonth'
import CalendarDayInfo from './calendarDayInfo'


const Calendar = ({ today = new Date() }) => {
    const intervals = useSelector(state => state.intervals) || []
    const projects = useSelector(state => state.projects) || []

    const [activeView, setActiveView] = useState('MONTH')

    const projectsMap = projects.reduce((map, cur) => (
        { ...map, [cur.id]: cur }
    ), {})

    const dateMap = intervalsDateMapper(intervals)


    //const today = new Date()
    today.setUTCHours(12, 0, 0)
    const [activeDate, setActiveDate] = useState(today)

    const millisIsMonth = (millis, activeDate, andDate = false) => {
        const millisDate = new Date(millis)
        return millisDate.getMonth() === activeDate.getMonth()
            && millisDate.getFullYear() === activeDate.getFullYear()
            && (!andDate || millisDate.getDate() === activeDate.getDate())
    }

    const TABS = [
        'MONTH',
        'DAY'
    ]

    let content
    switch (activeView) {
        case "MONTH":
            content = (<CalendarMonth
                activeMonthDate={activeDate}
                setActiveMonthDate={setActiveDate}
                setActiveView={setActiveView}
                projectsMap={projectsMap}
                today={today}
                dateMap={dateMap}
            />)
            break;
        case "DAY":
            content = (<CalendarDayInfo
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                intervals={dateMap[activeDate.toISOString().substring(0, 10)]}
                projectsMap={projectsMap}
            />)
            break;
        default:
    }

    const handleTabChange = (tab) => {
        setActiveView(tab)
    }

    return (
        <div style={{marginTop: '0.5em'}}>
            <div className="tabButtons">
                {TABS.map(t => (
                    <button key={t}
                        onClick={() => handleTabChange(t)}
                        className={activeView === t ? "active" : ""}
                    >
                        {t}
                    </button>
                ))}
            </div>
            {content}


            <div>
                <Stats intervals={intervals.filter(iv => millisIsMonth(iv.start, activeDate, activeView === 'DAY'))} />
            </div>

        </div>
    )
}

export default Calendar