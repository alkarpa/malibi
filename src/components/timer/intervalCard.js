import React from 'react'
import TimeDisplay from '../timeDisplay'

const IntervalCard = ({ interval }) => {
    return (
        <div className='times'>
            <div className='labelvaluegrid valuebubbled'>
                <label>Start:</label>
                <TimeDisplay isTime={true} time={interval?.start} />
            </div>
            <div className='labelvaluegrid valuebubbled'>
                <label>End:</label>
                <TimeDisplay isTime={true} time={interval?.end} />
            </div>


        </div>
    )
}

export default IntervalCard