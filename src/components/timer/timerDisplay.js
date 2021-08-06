import React from 'react'
import { getIntervalClockObject } from '../../services/timeDisplay'

const TimerDisplay = ({elapsed}) => {

    const clockValues = getIntervalClockObject(elapsed)

    return (
        <table className="mono rightalign veryLarge">
                <thead>
                    <tr>
                        <th>hh</th>
                        <th>mm</th>
                        <th>ss</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{clockValues.hour}</td>
                        <td>{clockValues.minute}</td>
                        <td>{clockValues.second}</td>
                    </tr>
                </tbody>
            </table>
    )

}

export default TimerDisplay