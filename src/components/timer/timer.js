import React, { useEffect } from 'react'
import TimerControls from './timerControls'
import TimerDisplay from './timerDisplay'
import { tick } from '../../reducers/timerReducer'
import { useDispatch, useSelector } from 'react-redux'
import IntervalProject from '../intervalProject'
import TimeDisplay from '../timeDisplay'


const Timer = () => {

    const dispatch = useDispatch()

    const intervals = useSelector( state => state.intervals )
    const elapsed = useSelector( state => state.elapsed )

    const lastInterval = [undefined, ...intervals].slice(-1)[0]

    //console.log('lastInterval', lastInterval)
    //const today = (new Date()).toISOString().substring(0, 10)

    const running = lastInterval && !lastInterval.end
    //console.log('running', running)

    const getTotalToday = () => {
        let now = new Date()
        now.setHours(0,0,0,0)
        let todayStart = now.getTime()
        const completedToday = intervals
            .filter( v => v.start > todayStart && v.end )
            .reduce( (acc, cur) => {
                return acc + ( cur.end - cur.start )
            }, 0 )
        return completedToday + elapsed
    }

    useEffect(() => {
        if (running) {
            const timer = setInterval(() => {
                dispatch( tick(lastInterval) )
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [running, lastInterval, dispatch])

    return (
        <div className='timerContainer floatContainer'>
            <div className='floatLeft logo'>
                <span>M'alibi</span>
            </div>
            <div className='floatLeft'>
                Total today
                <div>
                    <TimerDisplay elapsed={getTotalToday()} />
                </div>
            </div>
            <div className='floatLeft panel'>
                <div className='floatLeft'>
                    <div>
                        Active
                </div>
                    <div>
                        <TimerDisplay elapsed={elapsed} />
                    </div>
                    <div>
                        <TimerControls running={running}/>
                    </div>
                </div>

                <div className='floatLeft'>
                    <div>Start time:
                        {
                            lastInterval && !lastInterval.end
                                ? <TimeDisplay isTime={true} time={lastInterval.start} />
                                : <></>
                        }
                         </div>
                    <div>Project:
                        {
                            lastInterval && !lastInterval.end
                                ? <IntervalProject interval={lastInterval} />
                                : <></>
                        }
                    </div>
                </div>

            </div>


        </div>
    )

}

export default Timer