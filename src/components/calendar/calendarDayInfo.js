import React from 'react'
import PretzelClock from './pretzelClock'
import TimesTable from '../timesTable'
import TraditionalClock from './traditionalClock'

const CalendarDayHeader = ({ activeDate, setActiveDate }) => {

    const handleDateAddition = (add) => {
        let newDate = new Date(activeDate)
        newDate.setDate(newDate.getDate() + add)
        setActiveDate(newDate)
    }

    return (
        <div className="monthHeader">
            <button id='calPrevDateButton'
                onClick={() => handleDateAddition(-1)}>
                Previous day
            </button>
            <h2>{"" + activeDate.toLocaleDateString()}</h2>
            <button id='calNextDateButton'
                onClick={() => handleDateAddition(1)}
            >Next day
            </button>
        </div>
    )
}

const ClockArea = ({ dateStart, midday, dateEnd, intervals, projectsMap, }) => {


    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'min-content auto',
            width: 'min-content'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateRows: 'auto auto',
                gridTemplateColumns: 'min-content auto'
            }}>
                <div>12</div>
                <div className='clockarea'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'min-content min-content'
                    }}>
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
                </div>

                <div>24</div>
                <div className='clockarea'>
                    <PretzelClock intervals={intervals} projectsMap={projectsMap} />
                </div>
            </div>

        </div>
    )
}


const CalendarDayInfo = ({ activeDate, setActiveDate, intervals = [], projectsMap }) => {

    let dateStart = new Date(activeDate)
    dateStart.setHours(0, 0, 0, 0)
    let midday = new Date(dateStart)
    midday.setHours(12)
    let dateEnd = new Date(midday)
    dateEnd.setHours(23, 59, 59, 999)

    return (
        <div className='dayInfo'>
            <CalendarDayHeader activeDate={activeDate} setActiveDate={setActiveDate} />

            <div className='halfscreengrid'>
                <ClockArea dateStart={dateStart} midday={midday} dateEnd={dateEnd} intervals={intervals} projectsMap={projectsMap} />
                <div style={{ width: 'min-content' }}>
                    <TimesTable day={intervals || []} />
                </div>
            </div>

        </div>
    )
}

export default CalendarDayInfo