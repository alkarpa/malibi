import React from 'react'
import { getBGArcString, getTwentyfourHourIndicators, prepareIntervals } from '../../services/pretzelClock'

const PretzelClockBG = ({ startX, startY, BGWEIGHT = 20 }) => {

    const twentyfourHourIndicators = getTwentyfourHourIndicators(startX, startY, BGWEIGHT)

    const arcString = getBGArcString()

    return (
        <>
            <path
                d={`M${startX},${startY} ${arcString}`}
                stroke='white'
                fill='none'
                strokeWidth={BGWEIGHT}
            />

            {
                twentyfourHourIndicators.map((d, i) => (
                    <g key={'pretzelticksvg' + i}>
                        <line
                            x1={d.x1} x2={d.x2}
                            y1={d.y1} y2={d.y2}
                            style={{ stroke: 'gray', strokeWidth: '2' }}
                        />
                        <text x={d.xT} y={d.yT}
                            textAnchor='middle' dominantBaseline='middle'
                            style={{ fill: 'gray', textAlign: 'center' }}
                        >{i}</text>
                    </g>
                )
                )
            }
        </>
    )
}

const PretzelInterval = ({ startX, startY, fillWeight, preparedInterval, project }) => (
    <path 
        d={`M${startX},${startY} ${preparedInterval.arc}`}
        stroke={project?.color || 'gray'}
        fill='none'
        strokeWidth={fillWeight}
        style={{ opacity: 0.8 }}
    />
)


const PretzelClock = ({ intervals, size = 250, startX = 185, startY = 140, FILLWEIGHT = 15, projectsMap = {} }) => {

    const preparedIntervals = prepareIntervals(intervals)

    return (
        <svg width={2 * size} height={size}>
            <PretzelClockBG startX={startX} startY={startY} />

            {
                preparedIntervals.map(pi => (
                    <PretzelInterval
                        key={`intervalppath${pi.start}`}
                        startX={startX}
                        startY={startY}
                        fillWeight={FILLWEIGHT}
                        preparedInterval={pi}
                        project={ projectsMap[ pi.project ] }
                    />
                ))
            }
        </svg>
    )


}

export default PretzelClock