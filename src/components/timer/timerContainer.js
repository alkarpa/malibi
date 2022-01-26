import React from 'react'
import { useSelector } from 'react-redux'
import TimerControls from './timerControls'
import Timer from './timer'
import IntervalCard from './intervalCard'
import IntervalProject from '../intervalProject'
import './timer.css'

const TimerContainer = () => {
    const intervals = useSelector(state => state.intervals)

    const lastInterval = [undefined, ...intervals].slice(-1)[0]
    const running = lastInterval && !lastInterval.end

    const getTodayCompleted = () => {
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        const todayStart = now.getTime()
        return intervals
            .filter(v => v.start > todayStart && v.end)
            .reduce((acc, cur) => {
                return acc + (cur.end - cur.start)
            }, 0)
    }

    return (
        <div className='timercontainer'>
            <div style={{width: '100%', overflowX: 'hidden'}}>

                <div style={{display: 'grid', gridTemplateColumns: 'min-content 1fr'}}>
                    <label>Project:</label>
                    <IntervalProject interval={lastInterval} />
                </div>
                <div className='timer'>
                    <IntervalCard interval={lastInterval}
                        title={running ? 'Active' : 'Latest'}
                    />
                    <Timer running={running} lastInterval={lastInterval} todayCompleted={getTodayCompleted()} />

                </div>
            </div>
            <TimerControls running={running} />
        </div>
    )
}

export default TimerContainer