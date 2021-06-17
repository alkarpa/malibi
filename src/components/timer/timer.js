import React, { useEffect, useState } from 'react'
import intervalService from '../../services/intervals'
import storageService from '../../services/storage'
import TimesTable from '../timesTable'
import TimerControls from './timerControls'
import TimerDisplay from './timerDisplay'
import TimerSessionControls from './timerSessionControls'



const Timer = ({ completed, setCompleted, projects }) => {

    const emptyIntervalInfo = intervalService.DEFAULT_INTERVAL_INFO

    const [elapsed, setElapsed] = useState(0)
    const [sinceClick, setSinceClick] = useState(0)
    const [intervalInfo, setIntervalInfo] = useState(emptyIntervalInfo)

    const running = intervalService.isRunning(intervalInfo)

    useEffect(() => {
        const stored = storageService.load('intervals')
        if (stored) {
            const rebuilt = intervalService.buildIntervalInfoFromStorage( stored )
            setIntervalInfo( rebuilt )
        }
    }, [])

    useEffect(() => {
        if (running) {
            const sinceLastClick = () => (Date.now() - intervalService.getLastStartClick(intervalInfo))
            const intervalsAndThen = () => (intervalInfo.total.millis + sinceLastClick())
            const timer = setInterval(() => {
                setElapsed(intervalsAndThen)
                setSinceClick(sinceLastClick)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [intervalInfo, running])


    const setIntervalProject = (interval_id, project) => {
        const newIntervals = intervalService.setIntervalProject(intervalInfo, interval_id, project)
        setIntervalInfo(newIntervals)
        storageService.save('intervals', intervalService.prepareIntervalsForStorage(newIntervals))
    }

    const handleCompletion = () => {
        const completedIntervalInfo = running
            ? intervalService.buildIntervalInfo(intervalInfo, [Date.now()])
            : intervalInfo

        const newCompletedIntervalInfos = [...completed, completedIntervalInfo]


        setCompleted(newCompletedIntervalInfos)
        setElapsed(0)
        setSinceClick(0)
        storageService.save('intervals', [])
        setIntervalInfo(emptyIntervalInfo)

        // get all the intervals into an array
        const allIntervals = newCompletedIntervalInfos.reduce( (array, cur) => array.concat(cur.intervals) , [] )
        const newCompletedForStorage = intervalService.prepareIntervalsForStorage( {intervals: allIntervals} )
        storageService.save('completed', newCompletedForStorage)
    }


    return (
        <div className='timerContainer floatContainer'>
            <div className='floatLeft logo'>
                <span>M'alibi</span>
            </div>
            <div className='floatLeft'>
                <div>
                    <TimerDisplay elapsed={elapsed} />
                </div>
                <div>
                    <TimerControls running={running}
                        intervals={intervalInfo}
                        setIntervals={setIntervalInfo}
                    />
                </div>
            </div>

            <div className='floatLeft'>
                <div className='fiveRowScrollable floatLeft'>
                    <TimesTable intervalsInfo={intervalInfo}
                        sinceClick={sinceClick}
                        projects={projects}
                        setProject={setIntervalProject}
                        showTotal={false} />
                </div>

                <div className='floatLeft'>
                    <TimerSessionControls intervals={intervalInfo} handleCompletion={handleCompletion} />
                </div>
            </div>

        </div>
    )

}

export default Timer