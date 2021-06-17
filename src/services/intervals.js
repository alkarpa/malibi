const timeCalculation = require('./timeCalculation')

const buildClickPairs = ( clicks ) => {
    let pairs = []
    for ( let i = 0; i < clicks.length; i+=2 ) {
        let pair = {
            start: clicks[i],
            end: (i+1 !== clicks.length) ? clicks[i+1] : undefined
        }
        pairs.push(pair)
    }
    return pairs
}

const calculateIntervalsDifferenceTotal = ( intervals ) => {
    return intervals.reduce( (acc, cur) => ( acc + ( cur.end ? cur.end.millis - cur.start.millis : 0 ) ) ,0 )
}

const buildDifference = ( start, end ) => {
    if ( !end ) {
        return undefined
    }
    const diff = end - start
    return {
        millis: diff,
        clock: timeCalculation.getClockObject(diff),
        display: timeCalculation.getClockString(diff)
    }
}

const buildIntervalsFromPairs = ( pairs, defaultProject = undefined ) => {
    let intervals = pairs.map( pair => ({
        start: timeCalculation.getDateInfo(pair.start),
        end: timeCalculation.getDateInfo(pair.end),
        difference: buildDifference( pair.start, pair.end ),
        project: defaultProject,
        id: `interval_${pair.start}`
    }) )
    return intervals
}

const checkForIncompleteInterval = ( lastIntervals ) => {
    
    let incomplete = false
    if ( lastIntervals.length > 0 ) {
        incomplete = lastIntervals.slice(-1)[0].end === undefined
    }
    return incomplete
}

const rebuildIncompleteInterval = ( interval, endClick ) => {
    const project = interval.project
    const clickPair = {
        start: interval.start.millis,
        end: endClick
    }
    return buildIntervalsFromPairs( [clickPair], project )[0]
}

const compileIntervals = ( lastIntervals, clicks, defaultProject = undefined ) => {
    let baseIntervals = [ ...lastIntervals ]
    let newIntervalClicks = clicks
    if ( checkForIncompleteInterval(baseIntervals) ) {
        baseIntervals = baseIntervals.map( (interval, i) => (
            i === baseIntervals.length - 1
                ? rebuildIncompleteInterval( interval, clicks[0] )
                : interval
        ) )
        newIntervalClicks = clicks.slice(1)
    }
    const pairs = buildClickPairs( newIntervalClicks )
    const newIntervals = buildIntervalsFromPairs( pairs, defaultProject )
    return [ ...baseIntervals, ...newIntervals ]
}

const calculateTotals = ( intervals ) => {
    const millis = calculateIntervalsDifferenceTotal( intervals )
    const clock = timeCalculation.getClockObject( millis )
    return {
        millis: millis,
        clock: clock
    }
}

const DEFAULT_INTERVAL_INFO = {
    intervals: []
}

const defineIntervalInfo = ( intervalInfo ) => {
    return intervalInfo ? { ...intervalInfo } : DEFAULT_INTERVAL_INFO
}

const buildIntervalInfo = ( lastIntervalInfo, clicks, projects ) => {
    
    if ( !clicks || clicks.length === 0) return lastIntervalInfo

    const intervalInfo = defineIntervalInfo( lastIntervalInfo )
    intervalInfo.intervals = compileIntervals( intervalInfo.intervals, clicks )
    intervalInfo.total = calculateTotals( intervalInfo.intervals )
    return intervalInfo
}

const setIntervalProject = ( intervalInfo, id, project ) => {
    return { ...intervalInfo,
        intervals: intervalInfo.intervals.map( interval => (
        interval.id === id
            ? { ...interval, project: project.id }
            : interval
    ) )
    }
}

/**
 * Simplifies the intervalInfo (data used for presentation) for storage
 * @param {*} intervalInfo 
 * @returns 
 */
const prepareIntervalsForStorage = ( intervalInfo ) => {
    return intervalInfo.intervals.map( interval => ({
        start: interval.start.millis,
        end: interval.end ? interval.end.millis : undefined,
        project: interval.project
    }) )
}

/**
 * Rebuilds stored data into intervalInfo (data used for presentation)
 * @param {*} storageIntervals 
 * @returns 
 */
const buildIntervalInfoFromStorage = ( storageIntervals ) => {
    const intervals = storageIntervals.map( interval => (
        buildIntervalsFromPairs( [interval], interval.project )[0]
    ) )
    const intervalInfo = {
        intervals: intervals,
        total: calculateTotals( intervals )
    }
    return intervalInfo
}

/**
 * Checks whether the provided intervalInfo's last interval is still
 * open ( missing end value )
 * @param {*} intervalInfo 
 * @returns 
 */
 const isRunning = ( intervalInfo ) => {
    let running = false
    if ( intervalInfo.intervals.length > 0 ) {
        const last = intervalInfo.intervals[ intervalInfo.intervals.length - 1 ]
        running = last.end ? false : true
    }
    return running
}

const getLastStartClick = ( intervalInfo ) => {
    let click = undefined
    if ( intervalInfo.intervals.length > 0 ) {
        const last = intervalInfo.intervals[ intervalInfo.intervals.length - 1 ]
        click = last.start.millis
    }
    return click
}

module.exports = {
    DEFAULT_INTERVAL_INFO,
    buildClickPairs,
    buildIntervalInfo,
    setIntervalProject,
    isRunning,
    getLastStartClick,
    prepareIntervalsForStorage,
    buildIntervalInfoFromStorage,
}