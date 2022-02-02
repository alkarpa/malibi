import React, { useState } from 'react'
import PretzelClock from './pretzelClock'
import TimesTable from '../timesTable'
import TraditionalClock from './traditionalClock'
import EmptyAlibis from '../emptyalibis'



const ClockArea = ({ dateStart, midday, dateEnd, intervals, projectsMap, }) => {
    const [showClocks, setShowClocks] = useState(false)
    const [showPretzel, setShowPretzel] = useState(false)

    const toggleClocks = () => {
        setShowClocks(!showClocks)
    }
    const togglePretzel = () => {
        setShowPretzel(!showPretzel)
    }


    return (
        <div style={{ maxWidth: '95vw' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <label>
                    <input type='checkbox' checked={showClocks}
                        onChange={toggleClocks}
                    /> Show 12 hour clocks
                </label>
                <label>
                    <input type='checkbox' checked={showPretzel}
                        onChange={togglePretzel}
                    />Show 24 hour clock
                </label>

            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {
                    showClocks &&
                    <fieldset className='clockarea'
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                        <legend>12 hour clocks</legend>
                        <TraditionalClock
                            startTime={dateStart.getTime()}
                            endTime={midday.getTime()}
                            intervals={intervals}
                            projectsMap={projectsMap}
                        />
                        <TraditionalClock
                            startTime={midday.getTime()}
                            endTime={dateEnd.getTime()}
                            intervals={intervals}
                            projectsMap={projectsMap}
                            startDigit={12}
                        />
                    </fieldset>
                }

                {
                    showPretzel &&
                    <fieldset className='clockarea'>
                        <legend>24 hour clock</legend>
                        <PretzelClock intervals={intervals} projectsMap={projectsMap} />
                    </fieldset>
                }
            </div>



        </div>
    )
}

const DayInfo = ({ activeDate, intervals, projectsMap }) => {

    let dateStart = new Date(activeDate)
    dateStart.setHours(0, 0, 0, 0)
    let midday = new Date(dateStart)
    midday.setHours(12)
    let dateEnd = new Date(midday)
    dateEnd.setHours(23, 59, 59, 999)

    return (
        <div>
            <ClockArea dateStart={dateStart} midday={midday} dateEnd={dateEnd} intervals={intervals} projectsMap={projectsMap} />
            <div className='completedCardContainer'>
                <div className='completedCard'>
                    <TimesTable day={intervals} />
                </div>

            </div>
        </div>
    )
}


const CalendarDayInfo = ({ activeDate, setActiveDate, intervals = [], projectsMap }) => {

    return (
        <>
            {
                intervals.length > 0
                    ? <DayInfo activeDate={activeDate} intervals={intervals} projectsMap={projectsMap} />
                    : <EmptyAlibis />
            }


        </>
    )
}

export default CalendarDayInfo