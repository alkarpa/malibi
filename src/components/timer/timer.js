import React, { useEffect } from 'react'
import TimerDisplay from './timerDisplay'
import { tick, reset } from '../../reducers/timerReducer'
import { useDispatch, useSelector } from 'react-redux'


const Timer = ({ running, lastInterval }) => {

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
        <TimerDisplay elapsed={elapsed} title='Timer' />
    )

}

export default Timer