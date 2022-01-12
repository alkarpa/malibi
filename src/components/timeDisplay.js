import React from 'react'
import { useSelector } from 'react-redux'
import timeDisplay from '../services/timeDisplay'

export const ElapsedTimeDisplay = ({ time }) => {
    const elapsed = useSelector(state => state.elapsed)
    return (
        <TimeDisplay time={time+elapsed} />
    )
}

const TimeDisplay = ({ time, isTime, showDate = false}) => {
    if (!time) {
        return (<div className='mono large timedisplay'>&nbsp;</div>)
    }
    const clock = isTime? timeDisplay.getTimeClockObject( time ) : timeDisplay.getIntervalClockObject( time )
    return (
        <div className='mono large timedisplay'>
            {
                showDate ? <span>{new Date(time).toISOString().substring(0,10)} </span> : <></>
            }
            <span className='hours'>{clock.hour}</span>
        :
            <span className='minutes'>{clock.minute}</span>
        :
            <span className='seconds'>{clock.second}</span>
        </div>
    )
}

export default TimeDisplay