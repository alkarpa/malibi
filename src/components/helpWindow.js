import React, { useState, useEffect } from 'react'

const Tour = ({ setShowTour }) => {
    const [tourPhase, setTourPhase] = useState(0)

    const phases = [
        {
            parent: 'timercard',
            text: 'This is the latest time tracked.'
        },
        {
            parent: 'startbutton',
            text: 'Start/Stop button to start and stop tracking time'
        },
        {
            parent: 'breakpointbutton',
            text: 'Breakpoint button to stop the active tracking and immediately start a new one.'
        },
        {
            parent: 'todaytracked',
            text: 'This shows the total time tracked today.'
        },
        {
            parent: 'tab_RECENT',
            text: 'This opens the list of recent Alibis'
        },
        {
            parent: 'tab_CALENDAR',
            text: 'This opens the calendar to get a clearer picture of your Alibis'
        },
        {
            parent: 'tab_PROJECTS',
            text: 'This opens the project management page where you can create and edit your projects.'
        },
    ]

    const removeGlowing = () => {
        const glowings = document.getElementsByClassName('glowing')
        for (let i = 0; i < glowings.length; ++i) {
            glowings[i].classList.remove('glowing')
        }
    }

    useEffect(() => {
        removeGlowing()
        const phase = phases[tourPhase]
        const p = document.getElementById(phase.parent)
        if (p) {
            p.classList.add('glowing')
            let tourwindow = document.getElementById('tourwindow')
            if (!tourwindow) {
                const tw = document.createElement('div')
                tw.setAttribute('id', 'tourwindow')
                tw.classList.add('tourwindow')
                tourwindow = tw
            }
            tourwindow.innerText = phases[tourPhase].text
            p.appendChild(tourwindow)
            tourwindow.style.width = p.offsetWidth + 'px'
            tourwindow.style.marginTop = p.offsetHeight + 'px'
        } else {
            nextPhase()
        }

    }, [tourPhase])

    const stopTour = () => {
        removeGlowing()
        const tourwindow = document.getElementById('tourwindow')
        if (tourwindow) {
            tourwindow.remove()
        }
        setTourPhase(0)
        setShowTour(false)
    }

    const nextPhase = () => {
        if (tourPhase == phases.length - 1) {
            stopTour()
        } else {
            setTourPhase(tourPhase + 1)
        }

    }

    return (
        <div className='helpWindow' style={{
            position: 'fixed', zIndex: '1000',
            left: '50%', transform: 'translateX(-50%) translateY(-50%)', top: '50%'
        }}>
            <h1>Tour</h1>
            <button onClick={nextPhase}>Next phase</button>
            <button onClick={stopTour}>Stop tour</button>
        </div>
    )
}

const HelpWindow = () => {

    const local = localStorage.getItem('help')
    let initialState = local ? false : sessionStorage.getItem('help') ? false : true
    const [showHelp, setShowHelp] = useState(initialState)
    const [showTour, setShowTour] = useState(false)

    if (showTour) {
        return (<Tour setShowTour={setShowTour} />)
    }

    const openHelpWindow = () => {
        setShowHelp(true)
    }

    if (!showHelp) {
        return <div style={{ position: 'absolute', 
            bottom: '0', backgroundColor: 'pink',
            fontSize: 'small', left: '50%', transform: 'translateX(-50%)',
            border: '1px darkred solid', borderRadius: '5px', boxShadow: '1px 1px 1px 1px gray',
            paddingLeft: '1ch', paddingRight: '1ch', cursor: 'pointer',
        }} onClick={openHelpWindow}>Help</div>
    }

    const closeHelpWindow = () => {
        sessionStorage.setItem('help', '1')
        localStorage.setItem('help', '1')
        setShowHelp(false)
    }

    return (
        <div className='helpWindow' style={
            {
                top: '140px'
            }
        }>
            <h1 style={{fontFamily: 'cursive'}}>M&apos;alibi</h1>
            <p>It&apos;s a time tracker that stores all the tracking data in your browser&apos;s local storage.</p>
            <p>If you don&apos;t want it to store anything in your local storage, you probably should not use it.</p>
            <p>It doesn&apos;t send your data anywhere.</p>

            <button type='button' onClick={() => setShowTour(true)}>Give me a tour</button>
            <button type='button' onClick={closeHelpWindow}>Close help</button>
        </div>
    )

}

export default HelpWindow