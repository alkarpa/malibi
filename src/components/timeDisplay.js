import React from 'react'
import { useSelector } from 'react-redux'
import timeDisplay from '../services/timeDisplay'

export const ElapsedTimeDisplay = ({ time }) => {
    const elapsed = useSelector(state => state.elapsed)
    return (
        <TimeDisplay time={time+elapsed} />
    )
}

const TimeDisplay = ({ time, isTime, showDate = false, seconds = true}) => {
    const cName = 'mono large timedisplay'+ (seconds ? ' hasseconds' : ' justminutes')
    if (!time) {
        return (<div className={ cName }>&nbsp;</div>)
    }
    const clock = isTime? timeDisplay.getTimeClockObject( time ) : timeDisplay.getIntervalClockObject( time )
    return (
        <div className={ cName }>
            {
                showDate ? <span>{new Date(time).toISOString().substring(0,10)} </span> : <></>
            }
            <span className='hoursminutes'>{clock.hour}:{clock.minute}</span>
            {
                seconds ? <span className='seconds'>:{clock.second}</span> : <></>
            }
            
        </div>
    )
}

export default TimeDisplay