import React from 'react'
import TimeDisplay from './timeDisplay'
import IntervalProject from './intervalProject'

const IntervalCard = ({ interval, title }) => {
    if (!interval) return (<></>)

    return (
        <div>
            {title && (
                <div style={{
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {title}
                </div>
            )}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'min-content auto'
            }}>

                <div>
                    Start:
                </div>
                <TimeDisplay isTime={true} time={interval.start} />

                <div>
                    End:
                </div>
                <TimeDisplay isTime={true} time={interval.end} />

                <div>
                    Project:
                </div>
                <IntervalProject interval={interval} />
            </div>
        </div>
    )
}

export default IntervalCard