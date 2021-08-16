import React from 'react'
import { useSelector } from 'react-redux'
import TimerControls from './timerControls'
import TotalToday from './totalToday'
import Timer from './timer'
import IntervalCard from '../intervalCard'

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
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'min-content min-content'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, min-content)',
                border: '1px #d1d1d1 solid',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    alignItems: 'end',
                    textAlign: 'right'
                }}>
                    <div>
                        <Timer running={running} lastInterval={lastInterval} />
                    </div>
                    <div style={{fontSize: '14px'}}>
                        Σ Today
                        <TotalToday todayCompleted={getTodayCompleted()} />
                    </div>
                </div>
                <TimerControls running={running} />
            </div>
            <IntervalCard interval={lastInterval}
                title={running ? 'Active' : 'Latest'}
            />
        </div>
    )
}

export default TimerContainer