import React from 'react'
import timeCalc from '../../services/timeCalculation'

const TimerDisplay = ({elapsed}) => {

    const clockValues = timeCalc.getClockObject(elapsed)

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