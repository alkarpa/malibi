import React, { useState } from 'react'
import TimesTable from './timesTable'
import { useSelector } from 'react-redux'
import { intervalsDateMapper } from '../services/intervals'
import EmptyAlibis from './emptyalibis'
import calendarService from '../services/calendar'

const Completed = () => {

    const intervals = useSelector(state => state.intervals)

    const [daysToShow, setDaysToShow] = useState(3)

    /*
    const handleDaysToShowSelection = (event) => {
        setDaysToShow(event.target.value)
    }
    */

    const handleLoadMoreDays = () => {
        setDaysToShow(daysToShow + 5)
    }

    const dateMap = intervalsDateMapper(intervals)

    const array = Object.keys(dateMap).sort().slice(-daysToShow).reverse()

    const moreToLoad = Object.keys(dateMap).length > daysToShow

    if (intervals.length === 0) {
        return (
            <EmptyAlibis />
        )
    }

    const buildTitle = (day) => {
        return day + ' - ' + calendarService.getWeekdayStringFromDate(day) + ' - ' + calendarService.getDaysSinceFromISODate(day)
    }

    return (
        <div>
            {/*
            <div className='settings'>
                &#9881;
                <label>
                    Days to show
                    <select onChange={handleDaysToShowSelection} value={daysToShow}>
                        {Array.from({ length: 7 }, (v, i) => i + 1).map(v => (
                            <option key={`daysToShow${v}`} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            */}
            {array.map(day => (
                <div className='completedCard' key={'c' + dateMap[day][0].start}>
                    <TimesTable title={buildTitle(day)} keyprefix='ctt' day={dateMap[day]} />
                </div>
            ))}
            {
                moreToLoad && (
                    <div className='moretoload'>
                        <button onClick={handleLoadMoreDays}>Load more alibis</button>
                    </div>
                )
            }
        </div>
    )

}

export default Completed