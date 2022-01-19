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
        <div className='times'>
            <div className='labelvaluegrid valuebubbled'>
                <label>&#128337;</label>
                <TimerDisplay elapsed={elapsed} title='Timer' />
            </div>
            <div className='labelvaluegrid valuebubbled'>
                <label>Σ&#128337;</label>
                <TotalToday todayCompleted={todayCompleted} />
            </div>

        </div>

    )

}

export default Timer