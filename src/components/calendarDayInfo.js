import React from 'react'
import TimesTable from './timesTable'

const CalendarDayHeader = ({ activeDate, setActiveDate }) => {

    const handleDateAddition = (add) => {
        let newDate = new Date(activeDate)
        newDate.setDate( newDate.getDate() + add )
        setActiveDate( newDate )
    }

    return (
        <div className="monthHeader"> 
            <button id='calPrevMonthButton'
                onClick={() => handleDateAddition(-1)}>
                Previous day
            </button>
            <h2>{""+activeDate}</h2>
            <button id='calNextMonthButton'
                onClick={() => handleDateAddition(1)}
            >Next day
            </button>
        </div>
    )
}

const ClockInterval= ({clockStart, clockEnd, intervalStart, intervalEnd, color = 'blue'}) => {

    const startToEnd = clockEnd - clockStart
    const intervalStartPercent = (intervalStart - clockStart ) / startToEnd
    const intervalEndPercent = (intervalEnd - clockStart) / startToEnd
    
    const startDeg = Math.max( 0, Math.floor( 360 * intervalStartPercent ) )
    const endDeg = Math.min( 360, Math.floor( 360 * intervalEndPercent ))

    console.log('This is a messing around clock display and should probably be replaced.')
    
    return (
        <div style={{
            position: 'absolute',
            display: 'inline-block',
            height: '100%',
            width: '100%',
            background: `conic-gradient(
                transparent 0deg, transparent ${startDeg}deg, ${color} ${startDeg}deg, ${color} ${endDeg}deg,
                transparent ${endDeg}deg, transparent 360deg
                )`,
            top: '0px',
            left: '0px',
            borderRadius: '100px',
            }}>

        </div>
    )
}

const ClockFace = ({startTime, endTime, intervals = [], projectsMap = {}}) => {

    console.log('clockFace', intervals)
    const filtered = intervals.filter( a => a.end && a.start < endTime ).map( a => a.end > endTime ? {...a, end: endTime} : a )

    return (
        <div style={{
            display: 'inline-block',
            height: '200px',
            width: '200px',
            backgroundColor: 'white',
            position: 'relative',
            borderRadius: '100px',
        }}>
            {
                filtered.map( a => (
                    <ClockInterval clockStart={startTime} clockEnd={endTime} intervalStart={a.start} intervalEnd={a.end} color={projectsMap[a.project]?.color} key={'cici'+a.start} />
                ) )
            }
        </div>
    )
}

const CalendarDayInfo = ({activeDate, setActiveDate, intervals, projectsMap}) => {

    let dateStart = new Date(activeDate)
    dateStart.setHours(0,0,0,0)
    let midday = new Date(dateStart)
    midday.setHours(12)
    let dateEnd = new Date(midday)
    dateEnd.setHours(23,59,59,999)

    console.log('calendardayinfo', intervals)

    return (
        <div className='dayInfo'>
            <CalendarDayHeader activeDate={activeDate} setActiveDate={setActiveDate} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'min-content min-content',
                backgroundColor: 'gold'
            }}>
                <div style={{
                    textAlign: 'center'
                }}>
                    <ClockFace startTime={dateStart.getTime()} endTime={midday.getTime()} intervals={intervals} projectsMap={projectsMap}/>
                </div>
                <div style={{
                    textAlign: 'center'
                }}>
                    <ClockFace startTime={midday.getTime()} endTime={dateEnd.getTime()} intervals={intervals} projectsMap={projectsMap}/>
                </div>
                
                
            </div>

            <TimesTable day={intervals || []} />

        </div>
    )
}

export default CalendarDayInfo