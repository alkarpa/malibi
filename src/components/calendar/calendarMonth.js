import React from 'react'
import calendarService from '../../services/calendar'
import CalendarMonthDay from './calendarMonthDay'



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

    let mondayModifier = -monthFirstDay.getDay() + 1
    if (mondayModifier > 0) mondayModifier -= 7
    const firstWeekMonday = new Date(
        Date.UTC(year, month, 1 + mondayModifier, 12)
    )
    let sundayModifier = monthLastDay.getDay() === 0 ? 0 : 7 - monthLastDay.getDay()
    const lastWeekSunday = new Date(
        Date.UTC(year, month + 1, sundayModifier, 12)
    )

    //console.log('firstWeekMonday', firstWeekMonday)
    //console.log('lastWeekSunday', lastWeekSunday)

    let calendarDays = []
    for (let d = new Date(firstWeekMonday); d <= lastWeekSunday; d.setUTCDate(d.getUTCDate() + 1)) {
        calendarDays.push(new Date(d))
    }

    


    const WEEKDAYS_MONDAY_FIRST = calendarService.getWeekdaysMondayFirst()

    

    const getDateIntervals = (date) => {
        return dateMap[date.toISOString().substring(0, 10)]
    }

    let calendarWeeks = []
    for (let w = 0; w < calendarDays.length; w += 7) {
        calendarWeeks.push(calendarService.getWeekNumber(calendarDays[w]))
    }

    return (
        <>
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
        </>
    )

}

export default CalendarMonth