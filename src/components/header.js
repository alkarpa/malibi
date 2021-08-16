import React from 'react'
import TimerContainer from './timer/timerContainer'

const Header = () => {


    return (
        <header
            style={{
                display: 'grid',
                gridTemplateColumns: 'min-content min-content auto'
            }}
        >
            <div className='logo'>
                <span>M'alibi</span>
            </div>
            <div className='speechbubble'>
                <TimerContainer />
            </div>

        </header>
    )

}

export default Header