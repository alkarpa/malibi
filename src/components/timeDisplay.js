import React from 'react'
import { useSelector } from 'react-redux'
import timeDisplay from '../services/timeDisplay'

export const ElapsedTimeDisplay = ({ time }) => {
    const elapsed = useSelector(state => state.elapsed)
    return (
        <TimeDisplay time={time+elapsed} />
    )
}

export const DateTimeDisplay = ({time}) => {

    return (
        <div>
            <span>{new Date(time).toISOString().substring(0,10)} </span>
            <TimeDisplay time={time} isTime={true}/>
        </div>
    )

}

const TimeDisplay = ({ time, isTime, seconds = true}) => {
    const cName = 'mono large timedisplay'+ (seconds ? ' hasseconds' : ' justminutes')
    if (!time) {
        return (<div className={ cName }>&nbsp;</div>)
    }
    const clock = isTime? timeDisplay.getTimeClockObject( time ) : timeDisplay.getIntervalClockObject( time )
    return (
        <div className={ cName }>
            <span className='hoursminutes'>{clock.hour}:{clock.minute}</span>
            {
                seconds ? <span className='seconds'>:{clock.second}</span> : <></>
            }
            
        </div>
    )
}

export default TimeDisplay