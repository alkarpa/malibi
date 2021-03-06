import React from 'react'
import { useDispatch } from 'react-redux';
import { togglePlay, createBreakpoint } from '../../reducers/trackingReducer';

const TimerControls = ({running}) => {
    const dispatch = useDispatch()

    const handlePause = () => {
        dispatch(togglePlay())
    }

    const handleBreakpoint = () => {
        dispatch(createBreakpoint())
    }

    return (
        <div className="buttonGrid">
            <button id='startbutton' onClick={handlePause}>{running ? "Stop" : "Start"}</button>
            <button id='breakpointbutton' disabled={!running} onClick={handleBreakpoint}>Breakpoint</button>
        </div>
    )
}

export default TimerControls