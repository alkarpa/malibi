import React from 'react'
import IntervalProject from './intervalProject'
import { useSelector } from 'react-redux'
import TimeDisplay from './timeDisplay'


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

const TimesTable = (
    {  
        day: intervals,
        title='',
        keyprefix = '',
        showDates = false
    }
    ) => {

    const elapsed = useSelector( state => state.elapsed )

    const dayTotal = intervals.reduce( (sum, interval) => {
        return interval.end 
            ? sum + (interval.end - interval.start)
            : sum + elapsed
    }, 0 )
    

    return (
        <table className='timesTable'>
            <caption>{title}</caption>
            <thead>
                <tr>
                    {showDates ? (<th>Date</th>) : (<></>)}
                    <th>Start</th>
                    <th>End</th>
                    <th>Time</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody className='rightalign'>
                {intervals.map(t => (
                    <tr key={`${keyprefix}${t.start}`}>
                        {showDates ? (<td>{new Date(t).getUTCDate()}</td>) : (<></>)}
                        <td><TimeDisplay isTime={true} time={t.start} /></td>
                        <td><TimeDisplay isTime={true} time={t.end} /></td>
                        <td className='total'>
                            <TimeDisplay isTime={false} time={t.end ? t.end - t.start : elapsed} />
                            </td>
                        <td className='projectCell'>
                            <IntervalProject interval={t} />
                            </td>
                    </tr>
                ))}
            </tbody>
            <TotalRow total={dayTotal} />
        </table>
    )

}

export default TimesTable