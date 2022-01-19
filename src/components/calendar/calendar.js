import React, { useState } from 'react'
import './calendar.css'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../../services/intervals'
import Stats from './stats'
import CalendarMonth from './calendarMonth'
import CalendarDayInfo from './calendarDayInfo'
import Sidebar from '../sidebar'
import DetailsSection from '../detailsSection'
import CalendarHeader from './calendarHeader'

const CalendarNavigation = ({ activeDate, setActiveDate, activeView, tabs, handleTabChange, toggleSidebar = () => (undefined) }) => {

    const handleClick = (tab) => {
        toggleSidebar()
        handleTabChange(tab)
    }

    const handleChange = (event) => {
        const newDate = new Date(event.target.value)
        setActiveDate(newDate)
    }

    return (
        <div className='calendarnavigation'>
            <div>
                <label><h2>Active&nbsp;date</h2>
                    <input type="date" onChange={handleChange} value={activeDate.toISOString().substring(0,10)} />
                </label>
            </div>
            <h2>Select&nbsp;view</h2>
            <ul>
            {tabs.map(t => (
                <li key={t}
                    onClick={() => handleClick(t)}
                    className={activeView === t ? "active" : ""}
                >
                    {t}
                </li>

            ))}
            </ul>
        </div>
    )
}


const Calendar = ({ today = new Date() }) => {
    const intervals = useSelector(state => state.intervals)
    const projects = useSelector(state => state.projects)

    const [activeView, setActiveView] = useState('MONTH')

    const projectsMap = projects.reduce((map, cur) => (
        { ...map, [cur.id]: cur }
    ), {})

    const dateMap = intervalsDateMapper(intervals)

    //const today = new Date()
    today.setUTCHours(12, 0, 0)
    const [activeDate, setActiveDate] = useState(today)

    const millisIsMonth = (millis, activeDate, andDate) => {
        const millisDate = new Date(millis)
        return millisDate.getMonth() === activeDate.getMonth()
            && millisDate.getFullYear() === activeDate.getFullYear()
            && (!andDate || millisDate.getDate() === activeDate.getDate())
    }

    const TABS = [
        'MONTH', //default
        'DAY'
    ]

    let content
    switch (activeView) {
        case "DAY":
            content = (<CalendarDayInfo
                activeDate={activeDate}
                setActiveDate={setActiveDate}
                intervals={dateMap[activeDate.toISOString().substring(0, 10)]}
                projectsMap={projectsMap}
            />)
            break;
        default: // MONTH
            content = (<CalendarMonth
                activeMonthDate={activeDate}
                setActiveMonthDate={setActiveDate}
                setActiveView={setActiveView}
                projectsMap={projectsMap}
                today={today}
                dateMap={dateMap}
            />)
    }

    const handleTabChange = (tab) => {
        setActiveView(tab)
    }

    return (
        <div className='page'>
            <Sidebar>
                <CalendarNavigation activeDate={activeDate} setActiveDate={setActiveDate} 
                    activeView={activeView} tabs={TABS} handleTabChange={handleTabChange} 
                />
            </Sidebar>
            <div className='content calview'>
                <CalendarHeader activeDate={activeDate} setActiveDate={setActiveDate}  tab={activeView}/>
                <DetailsSection>
                    <div buttontitle='Calendar' className='calendar'>
                        {content}
                    </div>
                    <Stats buttontitle="Statistics"
                        intervals={intervals.filter(iv => millisIsMonth(iv.start, activeDate, activeView === 'DAY'))}
                        activeView={activeView}
                    />
                </DetailsSection>
            </div>

        </div>
    )
}

export default Calendar