import React from 'react'
import timeDisplay from '../services/timeDisplay'

const TimeDisplay = ({ isTime, time }) => {
    if (!time) {
        return (<div></div>)
    }
    const clock = isTime? timeDisplay.getTimeClockObject( time ) : timeDisplay.getIntervalClockObject( time )
    return (
        <div className='mono large'>
            <span className='hours'>{clock.hour}</span>
        :
            <span className='minutes'>{clock.minute}</span>
        :
            <span className='seconds'>{clock.second}</span>
        </div>
    )
}

export default TimeDisplay