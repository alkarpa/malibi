import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateInterval } from '../reducers/trackingReducer'
import { twoDigit } from '../services/timeDisplay'
import IntervalProject from './intervalProject'
import TimeDisplay from './timeDisplay'

const TimeInput = ({ time, updateFunction = console.log, min, max }) => {

    const d = new Date(time)
    const [date, setDate] = useState(d.toISOString().substring(0, 10))
    const [clock, setClock] = useState(`${twoDigit(d.getHours())}:${twoDigit(d.getMinutes())}`)
    const [errMsg, setErrMsg] = useState()

    const changedTime = (d, c) => {
        return new Date(`${d}T${c}:00`).getTime()
    }

    const limitError = (message) => {
        setErrMsg('Limit Error: ' + message)
    }

    const handleDateChange = (value) => {
        console.log(value)
        const cT = changedTime(value, clock)
        if (min && cT < min) { limitError('End time cannot be before the start time'); return }
        if (max && cT > max) { limitError('Start time cannot be after the end time'); return }
        setDate(value)
        updateTime(cT)
    }
    const handleTimeChange = (value) => {
        console.log(value)
        const cT = changedTime(date, value)
        if (min && cT < min) { limitError('End time cannot be before the start time'); return }
        if (max && cT > max) { limitError('Start time cannot be after the end time'); return }
        setClock(value)
        updateTime(cT)
    }


    const updateTime = (millis) => {
        updateFunction(millis)
    }

    return (
        <div onClick={() => setErrMsg()}>
            <input type='date' onChange={(event) => handleDateChange(event.target.value)} value={date} />
            <input type='time' onChange={(event) => handleTimeChange(event.target.value)} value={clock} />
            {errMsg && <div style={{fontSize: 'small', color: 'red'}}>{errMsg}</div>}
        </div>
    )

}

const IntervalForm = ({ interval }) => {
    const dispatch = useDispatch()

    const [uStartMillis, setUStartMillis] = useState(interval.start)
    const [uEndMillis, setUEndMillis] = useState(interval.end)

    const handleIntervalUpdate = () => {
        const uInterval = {
            ...interval,
            start: uStartMillis,
            end: uEndMillis
        }
        dispatch(updateInterval(uInterval))
    }


    return (
        <div style={{ margin: '2em' }} >
            <div>
                id: <span style={{color: 'gray'}}>{interval.id}</span>
            </div>
            <div>
                start:
                <TimeDisplay isTime={true} time={interval.start} showDate={true} />
                <TimeInput time={uStartMillis} updateFunction={setUStartMillis} max={uEndMillis} />
            </div>
            {
                interval.end && (
                    <div>
                        end:
                        <TimeDisplay isTime={true} time={interval.end} showDate={true} />
                        <TimeInput time={uEndMillis} updateFunction={setUEndMillis} min={uStartMillis} />
                    </div>
                )
            }

            <div>
                total: <TimeDisplay time={uEndMillis - uStartMillis} />
            </div>
            <div>
                project: <IntervalProject interval={interval} />
            </div>
            <button onClick={handleIntervalUpdate}>Update</button>
            <div style={{fontSize: 'small'}}>Users are not informed of update errors at this time. Detected interval overlaps will cause a no-update</div>
        </div>

    )

}

export default IntervalForm