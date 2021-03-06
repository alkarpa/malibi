import React from 'react'
import TimerContainer from './timer/timerContainer'
import './header.css'
import HeaderClock from './timer/headerClock'
import HelpWindow from './helpWindow'

const Header = () => {

    const drawHeaderClock = true

    return (
        <header>
            <div style={{position: 'relative'}}>
                <div className='logo'>
                    <svg viewBox="0 0 55 20">
                        <text x="5" y="15">M&apos;alibi</text>
                    </svg>
                </div>
                <HelpWindow />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'min-content min-content'}}>
                <div className='speechbubble'>
                    <TimerContainer />
                </div>
                {
                    drawHeaderClock && <HeaderClock />
                }
            </div>

        </header>
    )

}

export default Header