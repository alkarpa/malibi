import React from 'react'
import TimerContainer from './timer/timerContainer'
import './header.css'

const Header = () => {

    return (
        <header>
            <div>
                <div className='logo'>
                    <svg viewBox="0 0 55 20">
                        <text x="5" y="15">M'alibi</text>
                    </svg>
                </div>
            </div>
            <div className='speechbubble'>
                <TimerContainer />
            </div>
        </header>
    )

}

export default Header