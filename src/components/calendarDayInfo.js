import React from 'react'
import PretzelClock from './pretzelClock'
import TimesTable from './timesTable'
import TraditionalClock from './traditionalClock'

const CalendarDayHeader = ({ activeDate, setActiveDate }) => {

    const handleDateAddition = (add) => {
        let newDate = new Date(activeDate)
        newDate.setDate(newDate.getDate() + add)
        setActiveDate(newDate)
    }

    return (
        <div className="monthHeader">
            <button id='calPrevMonthButton'
                onClick={() => handleDateAddition(-1)}>
                Previous day
            </button>
            <h2>{"" + activeDate}</h2>
            <button id='calNextMonthButton'
                onClick={() => handleDateAddition(1)}
            >Next day
            </button>
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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'min-content auto',
            }}>
                <div style={{ backgroundColor: 'gray', display: 'grid', gridTemplateRows: 'auto auto' }}>
                    <div>12</div>
                    <div>24</div>
                </div>
                <div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'min-content min-content',
                        backgroundColor: 'gold'
                    }}>
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <TraditionalClock startTime={dateStart.getTime()} endTime={midday.getTime()} intervals={intervals} projectsMap={projectsMap} />
                        </div>
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <TraditionalClock startTime={midday.getTime()} endTime={dateEnd.getTime()} intervals={intervals} projectsMap={projectsMap} />
                        </div>
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <PretzelClock intervals={intervals} projectsMap={projectsMap}/>
                        </div>

                    </div>
                </div>
            </div>



            <TimesTable day={intervals || []} />

        </div>
    )
}

export default CalendarDayInfo