import React from 'react'
import calendarService from '../../services/calendar'

const DayHeader = ({ activeDate, setActiveDate }) => {
    const iso = activeDate.toISOString().substring(0, 10)
    return (
        <div style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {"" + activeDate.toLocaleDateString() + ' - ' 
            + calendarService.getWeekdayStringFromDate( iso ) + ' - '
            + calendarService.getDaysSinceFromISODate( iso )}
        </div>
    )
}

const MonthHeader = ({ activeDate, setActiveDate }) => {

    const ISO_yearmonth = activeDate.toISOString().substring(0, 7)

    const handleChange = (event) => {
        handleMonthPick(event)
    }

    const handleMonthPick = (event) => {
        const newISO = event.target.value
        const newYear = parseInt(newISO.substring(0, 4))
        const newMonth = parseInt(newISO.substring(5))
        const newActive = new Date(activeDate)
        newActive.setFullYear(newYear)
        newActive.setMonth(newMonth - 1)
        setActiveDate(newActive)
    }

    return (
        <div className='datepickercontainer'>
            <input id='calMonthPicker'
                onChange={handleChange}
                type="month"
                value={ISO_yearmonth}
            />
        </div>
    )
}

const CalendarHeader = ({ activeDate, setActiveDate, tab }) => {

    const handleDateAddition = (add) => {
        let newDate = new Date(activeDate)
        newDate.setDate(newDate.getDate() + add)
        setActiveDate(newDate)
    }
    const handleMonthAddition = (add) => {
        let newDate = new Date(activeDate)
        newDate.setMonth(newDate.getMonth() + add)
        setActiveDate(newDate)
    }
    const handleAddition = (tab === 'MONTH' ? handleMonthAddition : handleDateAddition)

    return (
        <div className="monthHeader">
            <button id='calPrevMonthButton' onClick={() => handleAddition(-1)}>
                <svg className='left' viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon className="arrow" points="100,0 0,50, 100,100" />
                </svg>
                <div>
                    Previous
                </div>
            </button>
            <div className='datepickercontainer'>
                {
                    tab === 'MONTH'
                    ? <MonthHeader activeDate={activeDate} setActiveDate={setActiveDate} />
                    : <DayHeader activeDate={activeDate} setActiveDate={setActiveDate} />
                }
            </div>
            <button id='calNextMonthButton' onClick={() => handleAddition(1)}>
                <div>
                    Next
                </div>
                <svg className='right' viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon className="arrow" points="0,0 100,50, 0,100" />
                </svg>
            </button>
        </div>
    )
}

export default CalendarHeader