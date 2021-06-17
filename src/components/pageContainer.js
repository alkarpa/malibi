import React, {useState} from 'react'
import Recent from './recent'
import Calendar from './calendar'

const PageContainer = ({projects, setProjects, completed, setCompleted, setDragging}) => {

    const TABS = [
        "RECENT",
        "CALENDAR"
    ]

    const [activePage, setActivePage] = useState( TABS[0] )

    const handleTabChange = ( tab ) => {
        setActivePage( tab )

    }

    let content

    switch ( activePage ) {
        case "RECENT": 
                    content = (<Recent setDragging={setDragging}
                                        completed={completed}
                                        setCompleted={setCompleted}
                                        projects={projects}
                                        setProjects={setProjects} />)
                    break;
        case "CALENDAR": 
                    content = (<Calendar completed={completed} />)
                    break;
        default:
    }

    return (
        <div>
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
            <div>
                {content}
            </div>

        </div>
    )

}

export default PageContainer