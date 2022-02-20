import React from 'react'
import { useSelector } from 'react-redux'
import TimerControls from './timerControls'
import Timer from './timer'
import IntervalProject from '../intervalProject'
import './timer.css'
import TimeDisplay from '../timeDisplay'

const DatePopup = ({ dateMillis }) => {

    const date = new Date(dateMillis)

    return (
        <div style={{
            position: 'absolute', top: '80%', right: '80%', zIndex: '100',
            padding: '0.5ch', borderRadius: '10px 0px 10px 10px',
            border: '1px gray solid',
            backgroundColor: 'peachpuff', fontSize: 'xx-small'
        }}>
            {date.toISOString().substring(0, 10)}
        </div>
    )
}

const TimerContainer = () => {
    const intervals = useSelector(state => state.intervals)

    const lastInterval = [undefined, ...intervals].slice(-1)[0]
    const running = lastInterval && !lastInterval.end

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startedBeforeToday = (lastInterval && lastInterval?.start < today.getTime())

    return (
        <div className='timercontainer'>
            <div style={{ width: '100%' }}>

                <div style={{minWidth: '15ch'}}>
                    <IntervalProject interval={lastInterval} />
                </div>
                <div className='timer' >
                    <div style={{ display: 'flex', position: 'relative' }}>
                        <TimeDisplay isTime={true} time={lastInterval?.start} seconds={false} />
                        {
                            startedBeforeToday && <DatePopup dateMillis={lastInterval.start} />
                        }
                    </div>
                    <div style={{ display: 'flex' }}>
                        &#8594;
                        <TimeDisplay isTime={true} time={lastInterval?.end} seconds={false} />

                    </div>
                    <div style={{ display: 'flex' }}>
                        =
                        <Timer running={running} lastInterval={lastInterval} />
                    </div>
                </div>

            </div>

            <TimerControls running={running} />
        </div>
    )
}

export default TimerContainer