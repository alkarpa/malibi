import React from 'react'

const TimerSessionControls = ({intervals, handleCompletion}) => {

    return (
        <div>
            <button disabled={intervals.intervals.length === 0} onClick={handleCompletion}>Complete Session</button>
        </div>
    )

}


export default TimerSessionControls