import React, {useState} from 'react'
import './calendar.css'

const Day = ( {date, active, clock, today} ) => {

    const activeClass = active ? "active" : "inactive"
    const clockClass = clock ? "tracked" : ""

    const trackedTime = clock 
    ? (<div>{clock.hour}:{clock.minute}:{clock.second}</div>)
    : "" 

    return (
        <div className={`day ${activeClass} ${clockClass}`}>
            <h1>{date.getDate()} {today ? "Today" : ""}</h1>
            {trackedTime}
        </div>
    )
}

const Calendar = ({completed}) => {

    const today = new Date()
    today.setUTCHours(12,0,0)
    const [activeMonthDate, setActiveMonthDate] = useState( today )

    const dateCompletedMap = completed.reduce( (map, cur) => {
        map[cur.intervals[0].start.date] = cur.total.clock
        return map
    } , {} )

    const year = activeMonthDate.getFullYear()
    const month = activeMonthDate.getMonth()
    const ISO_yearmonth = activeMonthDate.toISOString().substring(0,7)

    const monthFirstDay = new Date( year, month, 1 )
    const monthLastDay = new Date( year, month+1, 0 )

    const firstWeekMonday = new Date( year, month, 1 - monthFirstDay.getDay() + 1 )
    const lastWeekSunday = new Date( year, month+1, 7 - monthLastDay.getDay() )

    let calendarDays = []
    for ( let d = new Date( firstWeekMonday ); d <= lastWeekSunday; d.setDate( d.getDate() + 1 ) ) {
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

    const WEEKDAYS_MONDAY_FIRST =  WEEKDAYS.concat(WEEKDAYS[0]).slice(1)

    const handleMonthAddition = (add) => {
        let newDate = new Date(activeMonthDate)
        newDate.setMonth( newDate.getMonth() + add )
        setActiveMonthDate(newDate)
    }
    const handleMonthPick = ( event ) => {
        const newISO = event.target.value
        const newYear = parseInt( newISO.substring(0,4) )
        const newMonth = parseInt( newISO.substring(5) )
        const newActive = new Date(activeMonthDate)
        newActive.setFullYear(newYear)
        newActive.setMonth(newMonth-1)
        setActiveMonthDate(newActive)
    }

    return (
        <div>
            <h1>Calendar</h1>
            <div className="monthHeader">
                <button onClick={() => handleMonthAddition(-1)}>Previous month</button>
                <input className="title" onChange={(e) => handleMonthPick(e)} type="month" value={ISO_yearmonth} />
                <button onClick={() => handleMonthAddition(1)}>Next month</button>
            </div>
            <div className="calendargrid">
                { WEEKDAYS_MONDAY_FIRST.map( d => <div className="weekday" key={"cal"+d}>{d}</div> ) }
                { calendarDays.map( d => (
                    <Day key={'cal'+d.getTime()} 
                         date={d} 
                         active={d.getMonth() === month}
                         clock={dateCompletedMap[d.toLocaleDateString()]}
                         today={d.toLocaleDateString() === today.toLocaleDateString()}
                    />
                ) ) }
            </div>

        </div>
    )
}

export default Calendar