import React from 'react'

const ClockSector = ({ center, radius, clockStart, clockEnd, intervalStart, intervalEnd, color = 'gray' }) => {
    const startToEnd = clockEnd - clockStart
    const intervalStartPercent = (intervalStart - clockStart) / startToEnd
    const intervalEndPercent = (intervalEnd - clockStart) / startToEnd

    const rotation = -Math.PI / 2

    const startRad = Math.max(0, 2 * Math.PI * intervalStartPercent)
    let endRad = Math.min(2 * Math.PI, 2 * Math.PI * intervalEndPercent)
    
    const largeArc = intervalEnd - intervalStart > startToEnd / 2 ? 1 : 0

    const lineX = Math.cos(startRad + rotation) * radius
    const lineY = Math.sin(startRad + rotation) * radius
    const line2X = Math.cos(endRad + rotation) * radius
    const line2Y = Math.sin(endRad + rotation) * radius

    const xDif = Math.abs( line2X - lineX ) < 0.1 ? -0.0001 : line2X - lineX

    return (
        <path d={`M${center},${center} l${lineX},${lineY} 
                    a${radius},${radius} 0 ${largeArc},1 ${xDif},${line2Y - lineY}
                    l${-line2X},${-line2Y}
                `} stroke='darkgray' fill={color} style={{ opacity: '0.8' }}
                className='clocksector'
        />
    )

}

const TraditionalClock = ({ startTime, endTime, intervals = [], projectsMap = {}, startDigit = 0 }) => {


    const filtered = intervals.filter(
            a => a.end && !( (a.start < startTime && a.end < startTime) || (a.start > endTime && a.end > endTime) )
        ).map(
            a => ({ 
                ...a,
                start: a.start < startTime ? startTime : a.start,
                end: a.end > endTime ? endTime: a.end })
        )

    const SIZE = 240

    const center = SIZE / 2
    const radius = (SIZE-40) / 2

    const twelve = new Array(12).fill(1).map((d, i) => ({
        cos: Math.cos(Math.PI / 6 * i - Math.PI/2),
        sin: Math.sin(Math.PI / 6 * i - Math.PI/2)
    }))

    return (
        <svg width={SIZE} height={SIZE}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={radius} fill="white" />
            {
                twelve.map((d, i) => (
                    <g key={startTime + 'd' + i}>
                        <line
                            x1={radius * 0.8 * d.cos + center} x2={radius * d.cos + center}
                            y1={radius * 0.8 * d.sin + center} y2={radius * d.sin + center}
                            style={{ stroke: 'lightgray', strokeWidth: '2' }}
                        />
                        <text 
                            x={(radius + 10) * d.cos + center}
                            y={(radius + 10) * d.sin + center}
                            textAnchor='middle' dominantBaseline='middle'
                            style={{ fill: 'gray', textAlign: 'center' }}
                        >{startDigit+i}</text>
                    </g>
                ))
            }

            {
                filtered.map(f => (
                    <ClockSector key={`${f.start}sector`} center={center} radius={radius}
                        clockStart={startTime} clockEnd={endTime} intervalStart={f.start} intervalEnd={f.end}
                        color={projectsMap[f.project]?.color}
                    />
                ))
            }

        </svg>
    )

}

export default TraditionalClock