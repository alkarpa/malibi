import React from 'react'
import IntervalProject from './intervalProject'
import TimeDisplay, { ElapsedTimeDisplay } from './timeDisplay'
import IntervalFormPopup from './intervalFormPopup'


const TotalRow = ({ total, active = false }) => (
    <tfoot className='rightalign'>
        <tr>
            <td className='tinfo'>total:</td>
            <td colSpan='3' className='total'>
                {
                    active
                        ? <TimeDisplay time={total} />
                        : <ElapsedTimeDisplay time={total} />
                }
            </td>
        </tr>
    </tfoot>
)

const TimesTable = (
    {  
        day: intervals,
        title='',
        keyprefix = 'tt',
    }
    ) => {

    const tableTotal = intervals.reduce( (sum, interval) => {
        return interval.end 
            ? sum + (interval.end - interval.start)
            : sum
    }, 0 )


    return (
        <table className='timesTable'>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th style={{minWidth:'1px'}}>Edit</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Time</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody className='rightalign'>
                {intervals.map(t => (
                    <tr key={`${keyprefix}${t.id}`}>
                        <td><IntervalFormPopup interval={t} /></td>
                        <td><TimeDisplay isTime={true} time={t.start} /></td>
                        <td><TimeDisplay isTime={true} time={t.end} /></td>
                        <td className='total'>
                            {
                                t.end
                                    ? <TimeDisplay isTime={false} time={t.end - t.start} />
                                    : <ElapsedTimeDisplay time={0} />
                            }
                        </td>
                        <td className='projectCell'>
                            <IntervalProject interval={t} />
                            </td>
                    </tr>
                ))}
            </tbody>
            <TotalRow total={tableTotal} />
        </table>
    )

}

export default TimesTable