import React from 'react'
import timeCalc from '../services/timeCalculation'
import IntervalProject from './intervalProject'

const TimeDisplay = ({ time }) => {
    if (!time) {
        return (<div></div>)
    }
    const clock = time.clock
    return (
        <div className='mono large'>
            <span className='hours'>{clock.hour}</span>
        :
            <span className='minutes'>{clock.minute}</span>
        :
            <span className='seconds'>{clock.second}</span>
        </div>
    )
}

const TotalRow = ({ total }) => (
    <tfoot className='rightalign'>
        <tr>
            <td className='tinfo'>total:</td>
            <td colSpan='3' className='total'>
                <TimeDisplay time={total} />
            </td>
        </tr>
    </tfoot>
)

const DateCaption = ({intervals}) => {
    let caption = 'Active session'
    if ( intervals.length > 0 ) {
        const firstInterval = intervals[0]
        const lastInterval = intervals[ intervals.length - 1 ]
        caption = firstInterval.start.date
        if ( lastInterval.end && ( lastInterval.end.date !== firstInterval.start.date ) ) {
            caption += ` - ${lastInterval.end.date}`
        }
    }
    return (
        <span>
            {caption}
        </span>
    )
}

const TimesTable = ({ intervalsInfo, sinceClick = undefined, projects = {}, setProject, showTotal = true }) => {


    const sinceClickClock = () => {
        if (sinceClick) {
            return { clock: timeCalc.getClockObject(sinceClick) }
        }
        return undefined
    }

    const intervals = intervalsInfo.intervals.map(interval => {
        if (!interval.end) {
            return {
                ...interval,
                difference: sinceClickClock()
            }
        }
        return interval
    })

    return (
        <table className='timesTable'>
            <caption><DateCaption intervals={intervals} /></caption>
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Time</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody className='rightalign'>
                {intervals.map(t => (
                    <tr key={t.start.millis}>
                        <td><TimeDisplay time={t.start} /></td>
                        <td><TimeDisplay time={t.end} /></td>
                        <td className='total'>
                            <TimeDisplay time={t.difference} />
                            </td>
                        <td className='projectCell'>
                            <IntervalProject interval={t} 
                                             project={projects[t.project]} 
                                             setProject={setProject} />
                            </td>
                    </tr>
                ))}
            </tbody>
            {showTotal
                ? <TotalRow total={intervalsInfo.total} />
                : <></>
            }
        </table>
    )

}

export default TimesTable