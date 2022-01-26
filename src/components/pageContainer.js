import React, {useState} from 'react'
import Recent from './recent'
import Calendar from './calendar/calendar'
import Projects from './projects'

const PageContainer = () => {

    const TABS = [
        "RECENT",
        "CALENDAR",
        "PROJECTS"
    ]

    const [activePage, setActivePage] = useState( TABS[0] )

    const handleTabChange = ( tab ) => {
        setActivePage( tab )
    }

    let content

    switch ( activePage ) {
        case "RECENT": 
                    content = (<Recent />)
                    break;
        case "CALENDAR": 
                    content = (<Calendar />)
                    break;
        case "PROJECTS":
                    content = (<Projects />)
                    break;
        default:
    }

    return (
        <div className='pageContainer'>
            <div className="tabButtons">
                { TABS.map( t => (
                    <button key={t}
                            onClick={() => handleTabChange(t)}
                            className={ activePage === t ? "active" : "" }
                            >
                                {t}
                    </button>
                ) ) }
            </div>
                {content}
        </div>
    )

}

export default PageContainer