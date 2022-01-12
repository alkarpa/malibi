import React from 'react'
import IntervalProject from './intervalProject'
import TimeDisplay, { ElapsedTimeDisplay } from './timeDisplay'
import IntervalFormPopup from './intervalFormPopup'


const TotalRow = ({ total, active = false }) => (
    <div className='daytotal rightalign'>
        <label>Total:</label>
        <span  className='total'>
            {
                active
                    ? <ElapsedTimeDisplay time={total} />
                    : <TimeDisplay time={total} />
            }
        </span>
    </div>
)

const TimesTable = (
    {
        day: intervals,
        title = '',
        keyprefix = 'tt',
    }
) => {

    const tableTotal = intervals.reduce((sum, interval) => {
        return interval.end
            ? sum + (interval.end - interval.start)
            : sum
    }, 0)

    const lastIntervalOpen = [{}, ...intervals].slice(-1)[0].end === undefined

    return (
        <div className='timesTable'>
            <div className='dateTitle'>{title}</div>
            <div className='rightalign'>
                {intervals.map(t => (
                    <div className={'alibi' + (t.end ? '' : ' active')} key={`${keyprefix}${t.id}`}>
                        <div><IntervalFormPopup interval={t} /></div>
                        <div className='clocks'>
                            <div><label>Start</label><TimeDisplay isTime={true} time={t.start} /></div>
                            <div><label>End</label><TimeDisplay isTime={true} time={t.end} /></div>
                        </div>
                        <div className='projectCell'>
                            <label>Project</label>
                            <IntervalProject interval={t} />
                        </div>
                        <div className='total'>
                            <label>Difference</label>
                            {
                                t.end
                                    ? <TimeDisplay isTime={false} time={t.end - t.start} />
                                    : <ElapsedTimeDisplay time={0} />
                            }
                        </div>
                    </div>
                ))}
            </div>
            <TotalRow total={tableTotal} active={lastIntervalOpen} />
        </div>
    )

    /*
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
            <TotalRow total={tableTotal} active={lastIntervalOpen} />
        </table>
    )
    */

}

export default TimesTable