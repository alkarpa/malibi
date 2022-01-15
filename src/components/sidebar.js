import React, { useState } from 'react'
import './sidebar.css'


const Sidebar = ({ children }) => {
    const [sidebar, setSidebar] = useState(true)

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    const childrenWithToggle = React.Children.map(children, (c => {
        if (React.isValidElement(c)) {
            return React.cloneElement(c, { toggleSidebar })
        }
        return c
    }))


    return (
        <div className={`sidebar ${sidebar ? '' : 'closed'}`}>
            <div className='sidebarcontent'>
                {childrenWithToggle}
            </div>
            <div className='sidebaropener' onClick={toggleSidebar}>

                    <svg viewBox="0 0 100 200" width="150%" style={{position: 'absolute'}}>
                        <polygon className="arrow" points="0,0 100,100, 0,200" />
                        <g fill="white">
                            <rect x="5" y="75" width="50"  height="10"/>
                            <rect x="5" y="95" width="50"  height="10"/>
                            <rect x="5" y="115" width="50"  height="10"/>
                        </g>
                    </svg>
            </div>
        </div>
    )
}

export default Sidebar