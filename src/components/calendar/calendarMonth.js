import React from 'react'
import CalendarMonthDay from './calendarMonthDay'

const CalendarMonthHeader = ({ activeMonthDate, handleMonthAddition, handleMonthPick }) => {

    const ISO_yearmonth = activeMonthDate.toISOString().substring(0, 7)

    return (
        <div className="monthHeader"> 
            <button id='calPrevMonthButton'
                onClick={() => handleMonthAddition(-1)}>
                Previous month
            </button>
            <input id='calMonthPicker'
                className="title" 
                onChange={(e) => handleMonthPick(e)} 
                type="month" 
                value={ISO_yearmonth} 
            />
            <button id='calNextMonthButton'
                onClick={() => handleMonthAddition(1)}
            >Next month
            </button>
        </div>
    )
}

const CalendarMonth = ({ 
        activeMonthDate, 
        setActiveMonthDate = console.log, 
        setActiveView = console.log, 
        projectsMap = {}, 
        today, 
        dateMap = {}
    }) => {

    const year = activeMonthDate.getFullYear()
    const month = activeMonthDate.getMonth()

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

    const getDateIntervals = (date) => {
        return dateMap[date.toISOString().substring(0, 10)]
    }

    const getWeekNumber = (date) => {
        // Source: https://weeknumber.com/how-to/javascript
        var helperDate = new Date(date)
        // Thursday in current week decides the year.
        helperDate.setDate(helperDate.getDate() + 3 - (helperDate.getDay() + 6) % 7)
        // January 4 is always in week 1.
        var week1 = new Date(helperDate.getFullYear(), 0, 4)
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((helperDate.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    let calendarWeeks = []
    for (let w = 0; w < calendarDays.length; w += 7) {
        calendarWeeks.push(getWeekNumber(calendarDays[w]))
    }

    return (
        <div>
            <CalendarMonthHeader
                activeMonthDate={activeMonthDate}
                handleMonthAddition={handleMonthAddition}
                handleMonthPick={handleMonthPick}
            />

            <div className="calendargrid">
                <div className="weekday">week</div>

                {WEEKDAYS_MONDAY_FIRST.map(d => <div className="weekday" key={"calweekday" + d}>{d}</div>)}

                {calendarWeeks.map((w, i) => (
                    <div key={`week${w}`} className='weeknumber'
                        style={{
                            gridColumn: 1,
                            gridRow: i + 2
                        }}
                    >
                        {w}
                    </div>
                ))}

                {calendarDays.map(d => (
                    <CalendarMonthDay key={'calday' + d.getTime()}
                        date={d}
                        active={d.getMonth() === month}
                        intervals={getDateIntervals(d)}
                        today={d.toLocaleDateString() === today.toLocaleDateString()}
                        projectsMap={projectsMap}
                        setActiveMonthDate={setActiveMonthDate}
                        setActiveView={setActiveView}
                    />
                ))}

            </div>
        </div>
    )

}

export default CalendarMonth