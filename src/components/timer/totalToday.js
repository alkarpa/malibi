import React from 'react'
import { useSelector } from 'react-redux'
import TimerDisplay from './timerDisplay'

const TotalToday = ({ todayCompleted }) => {
    const elapsed = useSelector(state => state.elapsed)

    const getTotalToday = () => {
        return todayCompleted + elapsed
    }

    return (
        <TimerDisplay
            elapsed={getTotalToday()}
            fontSize={14}
        />
    )
}

export default TotalToday