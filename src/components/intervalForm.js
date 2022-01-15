import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInterval } from '../reducers/trackingReducer'
import { twoDigit } from '../services/timeDisplay'
import IntervalProject from './intervalProject'
import TimeDisplay, { DateTimeDisplay } from './timeDisplay'

const TimeInput = ({ time = 0, updateFunction, min, max, labelPrefix }) => {

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

    const handleChange = (d, c) => {
        const cT = changedTime(d ? d : date, c ? c : clock)
        if (min && cT < min) { limitError('End time cannot be before the start time'); return }
        if (max && cT > max) { limitError('Start time cannot be after the end time'); return }
        d && setDate(d)
        c && setClock(c)
        updateTime(cT)
    }

    const updateTime = (millis) => {
        updateFunction(millis)
    }

    return (
        <div onClick={() => setErrMsg()}>
            <label style={{ display: 'inline-block', fontSize: 'small' }}>
                {`${labelPrefix}Date`}<br />
                <input type='date' onChange={(event) => handleChange(event.target.value, undefined)} value={date} />
            </label>
            <label style={{ display: 'inline-block', fontSize: 'small' }}>
                {`${labelPrefix}Time`}<br />
                <input type='time' onChange={(event) => handleChange(undefined, event.target.value)} value={clock} />
            </label>
            {errMsg && <div style={{ fontSize: 'small', color: 'red' }}>{errMsg}</div>}
        </div>
    )

}

const FormSection = ({ children, title, showIf = true }) => {
    if (!showIf) {
        return (<></>)
    }

    return (
        <div className='alibiformsection'>
            <div className='title'>{title}</div>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}

const IntervalForm = ({ intervalId }) => {
    const dispatch = useDispatch()

    const intervals = useSelector(state => state.intervals)
    const interval = intervals.find(iv => iv.id === intervalId)

    const [uStartMillis, setUStartMillis] = useState(interval?.start)
    const [uEndMillis, setUEndMillis] = useState(interval?.end)

    if (!interval) return (<div>error</div>)

    const handleIntervalUpdate = () => {
        const uInterval = {
            ...interval,
            start: uStartMillis,
            end: uEndMillis
        }
        dispatch(updateInterval(uInterval))
    }

    return (
        <>
            <div className='alibiformsections'>
                {/*<FormSection title='ID'>
                <span style={{ color: 'gray' }}>{interval.id}</span>
            </FormSection>*/}

                <FormSection title="Start">
                    <DateTimeDisplay isTime={true} time={interval.start} />
                    <TimeInput
                        time={uStartMillis}
                        updateFunction={setUStartMillis}
                        max={uEndMillis}
                        labelPrefix='Start '
                    />
                </FormSection>

                <FormSection title="End" showIf={interval.end ? true : false}>
                    <DateTimeDisplay isTime={true} time={interval.end} />
                    <TimeInput
                        time={uEndMillis}
                        updateFunction={setUEndMillis}
                        min={uStartMillis}
                        labelPrefix='End '
                    />
                </FormSection>

                <FormSection title="Project (immediate update)">
                    <IntervalProject interval={interval} />
                </FormSection>

                <FormSection title="Total" showIf={interval.end ? true : false}>
                    total: <TimeDisplay time={uEndMillis - uStartMillis} />
                </FormSection>
            </div>

            <div style={{ fontSize: 'small' }}>Users are not informed of update errors at this time. Detected alibi overlaps will cause a no-update</div>
            <button className='updatebutton' onClick={handleIntervalUpdate}>Update</button>
        </>

    )

}

export default IntervalForm