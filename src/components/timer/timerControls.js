import React from 'react'
import intervalService from '../../services/intervals'
import storageService from '../../services/storage'

const TimerControls = ({running, intervals, setIntervals}) => {

    const addClicks = (toAdd) => {
        if (!toAdd) { 
            return
        }
        const newIntervals = intervalService.buildIntervalInfo(intervals, toAdd)

        setIntervals(newIntervals)
        storageService.save('intervals', intervalService.prepareIntervalsForStorage(newIntervals))
    }

    const handlePause = () => {
        addClicks([Date.now()])
    }

    const handleBreakpoint = () => {
        addClicks([Date.now(), Date.now() + 1])
    }

    return (
        <div className="buttonGrid">
            <button onClick={handlePause}>{running ? "Pause" : "Start"}</button>
            <button disabled={!running} onClick={handleBreakpoint}>Breakpoint</button>
        </div>
    )
}

export default TimerControls