import React from 'react'
import { getIntervalClockObject } from '../../services/timeDisplay'

const TimerDisplay = ({ elapsed }) => {

    const clockValues = getIntervalClockObject(elapsed)

    return (

        <div className='timerdisplay mono'>
            <span>{clockValues.hour}:{clockValues.minute}</span>
            <span style={{ color: 'gray' }}>:{clockValues.second}</span>
        </div>
    )

}

export default TimerDisplay