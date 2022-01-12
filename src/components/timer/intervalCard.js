import React from 'react'
import TimeDisplay from '../timeDisplay'

const IntervalCard = ({ interval}) => {
    return (
        <div className='intervalcard labelvaluegrid valuebubbled'>
            <label>Start:</label>
            <TimeDisplay isTime={true} time={interval?.start} />
            <label>End:</label>
            <TimeDisplay isTime={true} time={interval?.end} />
        </div>
    )
}

export default IntervalCard