import React, { useEffect } from 'react'
import TimerDisplay from './timerDisplay'
import TotalToday from './totalToday'
import { tick, reset } from '../../reducers/timerReducer'
import { useDispatch, useSelector } from 'react-redux'


const Timer = ({ running, lastInterval, todayCompleted }) => {

    const dispatch = useDispatch()
    const elapsed = useSelector(state => state.elapsed)

    useEffect(() => {
        if (running) {
            const timer = setInterval(() => {
                dispatch(tick(lastInterval))
            }, 1000)
            return () => clearInterval(timer)
        } else {
            dispatch(reset())
        }
    }, [running, lastInterval, dispatch])

    return (
        <div className='times labelvaluegrid valuebubbled'>
            <label>Timer</label>
            <TimerDisplay elapsed={elapsed} title='Timer' />
            <label>Σ Today</label>
            <TotalToday todayCompleted={todayCompleted} />
        </div>

    )

}

export default Timer