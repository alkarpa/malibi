import React from 'react'
import TimerContainer from './timer/timerContainer'

const Header = () => {


    return (
        <div className='header'
            style={{
                display: 'grid',
                gridTemplateColumns: 'min-content auto auto'
            }}
        >
            <div className='logo'>
                <span>M'alibi</span>
            </div>
            <div className='speechbubble'>
                <TimerContainer />
            </div>

        </div>
    )

}

export default Header