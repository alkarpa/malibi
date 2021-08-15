import React from 'react'
import { getIntervalClockObject } from '../../services/timeDisplay'

const TimerDisplay = ({ elapsed, fontSize = 30 }) => {

    const clockValues = getIntervalClockObject(elapsed)

    return (

        <div className='mono'
            style={{
                fontSize: fontSize + 'px',
                display: 'flex',
                alignItems: 'flex-end',
                lineHeight: '100%',
                justifyContent: 'flex-end',
                backgroundColor: '#ffffff',
                margin: '2px',
                minWidth: '9ch'
            }}
        >
            <span>{clockValues.hour}:{clockValues.minute}</span>
            <span style={{ color: 'gray' }}>:{clockValues.second}</span>
        </div>
    )

}

export default TimerDisplay