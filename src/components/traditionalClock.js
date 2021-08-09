import React from 'react'

const ClockSector = ({ center, radius, clockStart, clockEnd, intervalStart, intervalEnd, color = 'gray' }) => {
    const startToEnd = clockEnd - clockStart
    const intervalStartPercent = (intervalStart - clockStart) / startToEnd
    const intervalEndPercent = (intervalEnd - clockStart) / startToEnd

    const rotation = -Math.PI / 2

    const startRad = Math.max(0, 2 * Math.PI * intervalStartPercent)
    const endRad = Math.min(2 * Math.PI, 2 * Math.PI * intervalEndPercent)

    const largeArc = (endRad - startRad) > Math.PI ? 1 : 0

    const lineX = Math.cos(startRad + rotation) * radius
    const lineY = Math.sin(startRad + rotation) * radius
    const line2X = Math.cos(endRad + rotation) * radius
    const line2Y = Math.sin(endRad + rotation) * radius

    return (
        <path d={`M${center},${center} l${lineX},${lineY} 
                    a${radius},${radius} 0 ${largeArc},1 ${line2X - lineX},${line2Y - lineY}
                    l${-line2X},${-line2Y}
                `} stroke='darkgray' fill={color} style={{ opacity: '0.8' }}

        />
    )

}

const TraditionalClock = ({ startTime, endTime, intervals = [], projectsMap = {} }) => {
    const filtered = intervals.filter(a => a.end && a.start < endTime).map(a => a.end > endTime ? { ...a, end: endTime } : a)

    const SIZE = 200

    const center = SIZE / 2
    const radius = SIZE / 2

    const twelve = new Array(12).fill(1).map((d, i) => ({
        cos: Math.cos(Math.PI / 6 * i),
        sin: Math.sin(Math.PI / 6 * i)
    }))

    return (
        <svg width={SIZE} height={SIZE}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} fill="white" />
            {
                twelve.map((d, i) => (
                    <line key={startTime + 'd' + i}
                        x1={radius * 0.8 * d.cos + center} x2={radius * d.cos + center}
                        y1={radius * 0.8 * d.sin + center} y2={radius * d.sin + center}
                        style={{ stroke: 'lightgray', strokeWidth: '2' }}
                    />
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