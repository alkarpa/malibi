

/**
 * Multipliers for drawing coordinate addition, clock sectors [0,3), [3,6), [6,9), [9,12)
 */
export const CLOCK_SECTORS_FOUR = [
    { toEnd: { x: 1, y: 1 }, toCenter: { x: 0, y: 1 } },
    { toEnd: { x: -1, y: 1 }, toCenter: { x: -1, y: 0 } },
    { toEnd: { x: -1, y: -1 }, toCenter: { x: 0, y: -1 } },
    { toEnd: { x: 1, y: -1 }, toCenter: { x: 1, y: 0 } }
]

const cRad = (i, bRadius = 25, radiusIncrement = 10) => (bRadius + radiusIncrement * i)
const topRad = (radiusIncrement = 10) => {
    const bottomSemicircleWidth = cRad(1) + cRad(2)
    const topRadiusIncrement = 2 * radiusIncrement
    return bottomSemicircleWidth + topRadiusIncrement + 20
}

/**
 * Arc radius sizes for the parts of the pretzel, 8 quarter sectors
 */
export const ARCS = [
    { x: cRad(0), y: cRad(0) },
    { x: cRad(1), y: cRad(1) },
    { x: cRad(2), y: cRad(2) },
    { x: topRad(), y: topRad() },
    { x: topRad(), y: topRad() },
    { x: cRad(2), y: cRad(2) },
    { x: cRad(1), y: cRad(1) },
    { x: cRad(0), y: cRad(0) },
]



export const arcToCenterPoint = (index, axis) => CLOCK_SECTORS_FOUR[index % 4].toCenter[axis] * ARCS[index][axis]
export const arcToEndPoint = (index, axis) => CLOCK_SECTORS_FOUR[index % 4].toEnd[axis] * ARCS[index][axis]

export const getArcCenterPosition = (i, startX, startY) => {
    const position = {
        x: startX,
        y: startY
    }
    const difference = (index, axis) => (
        (ARCS[index][axis] - (index > 0 ? ARCS[index - 1][axis] : 0)) * CLOCK_SECTORS_FOUR[index % CLOCK_SECTORS_FOUR.length].toCenter[axis]
    )
    for (let j = 0; j <= i; ++j) {
        position.x += difference(j, 'x')
        position.y += difference(j, 'y')
    }
    return position
}


const calculateArcStartPoint = (index, axis, startPoint) => {
    for (let i = 0; i < index; ++i) startPoint += arcToEndPoint(i, axis)
    return startPoint
}

const partialArcCommand = (i, startPercent, endPercent, move = true) => {
    if (i < 0 || i >= ARCS.length) return ''

    const QUARTER_CIRCLE = Math.PI / 2
    const percentToAngle = (percent) => QUARTER_CIRCLE / 100 * percent

    const adjustAngle = (a) => (i - 1) * QUARTER_CIRCLE + a

    const startAngle = adjustAngle(percentToAngle(startPercent))
    const endAngle = adjustAngle(percentToAngle(endPercent))

    const relativeToCenter = {
        start: {
            x: Math.cos(startAngle) * ARCS[i].x,
            y: Math.sin(startAngle) * ARCS[i].y
        },
        end: {
            x: Math.cos(endAngle) * ARCS[i].x,
            y: Math.sin(endAngle) * ARCS[i].y
        }
    }


    const drawingValues = {
        startPoint: {
            x: Math.round(calculateArcStartPoint(i, 'x', arcToCenterPoint(i, 'x') + relativeToCenter.start.x)),
            y: Math.round(calculateArcStartPoint(i, 'y', arcToCenterPoint(i, 'y') + relativeToCenter.start.y)),
        },
        startToEndDifference: {
            x: Math.round(relativeToCenter.end.x - relativeToCenter.start.x),
            y: Math.round(relativeToCenter.end.y - relativeToCenter.start.y)
        }
    }
    
    const moveToStartPoint = move
        ? `m${drawingValues.startPoint.x},${drawingValues.startPoint.y} `
        : ``
    const arcRadius = `a${ARCS[i].x},${ARCS[i].y}`
    const endPointRelative = `${drawingValues.startToEndDifference.x},${drawingValues.startToEndDifference.y}`

    return `${moveToStartPoint} ${arcRadius} 0 0,1 ${endPointRelative}`
}



export const prepareIntervalArc = (preparedInterval) => {

    const startEighth = parseInt(preparedInterval.sS)
    const endEighth = parseInt(preparedInterval.eS)
    const startPer = parseInt((preparedInterval.sS - startEighth) * 100)
    const endPer = parseInt((preparedInterval.eS - endEighth) * 100)

    let arc = ''
    if (startEighth === endEighth) {
        arc += partialArcCommand(startEighth, startPer, endPer, true) + ' '
    } else {
        arc += partialArcCommand(startEighth, startPer, 100, true) + ' '
        for (let i = startEighth + 1; i < endEighth; ++i) {
            arc += partialArcCommand(i, 0, 100, false) + ' '
        }
        arc += partialArcCommand(endEighth, 0, endPer, false) + ' '
    }

    return arc
}

export const prepareIntervals = (intervals) => {
    const helperDate = new Date(intervals[0]?.start)
    helperDate.setHours(0, 0, 0, 0)
    const day0 = helperDate.getTime()
    helperDate.setHours(23, 59, 59, 999)
    const day24 = helperDate.getTime()
    const daylength = day24 - day0

    const getMillisPercentage = (millis) => (millis - day0) / daylength * 100

    const DAYSTART = 0
    const DAYEND = 100
    const D = DAYEND - DAYSTART
    const EIGHTH = D / 8

    const p = intervals.map(iv => {
        const percentStart = getMillisPercentage(Math.max(day0, iv.start))
        const percentEnd = getMillisPercentage(Math.min(day24, iv.end))
        return {
            ...iv,
            sS: percentStart / EIGHTH,
            eS: percentEnd / EIGHTH,
        }
    })
    const preparedIntervals = p.map(iv => ({ ...iv, arc: prepareIntervalArc(iv) }))
    return preparedIntervals
}

export const getTwentyfourHourIndicators = (startX, startY, BGWEIGHT, textDistance = 10) => new Array(24).fill(1).map((d, i) => {
    const angle = (Math.PI / 6) * i - Math.PI / 2
    const arcIndex = parseInt(i * ARCS.length / 24) % ARCS.length
    const centerPosition = getArcCenterPosition(arcIndex, startX, startY)
    const cosScale = (scale) => scale * Math.cos(angle) + centerPosition.x
    const sinScale = (scale) => scale * Math.sin(angle) + centerPosition.y
    return {
        x1: cosScale(ARCS[arcIndex].x),
        y1: sinScale(ARCS[arcIndex].y),
        x2: cosScale(ARCS[arcIndex].x + BGWEIGHT / 2),
        y2: sinScale(ARCS[arcIndex].y + BGWEIGHT / 2),

        xT: cosScale(ARCS[arcIndex].x + BGWEIGHT / 2 + textDistance),
        yT: sinScale(ARCS[arcIndex].y + BGWEIGHT / 2 + textDistance)
    }
}
)

export const getBGArcString = () => (
    ARCS
        .map((arc, i) => (`a${arc.x},${arc.y} 0 0,1 ${arcToEndPoint(i, 'x')},${arcToEndPoint(i, 'y')}`))
        .join(' ')
)