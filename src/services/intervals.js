
const INTERVAL_BASE = {
    start: undefined,
    end: undefined,
    project: undefined
}

const concatAddedClick = ( intervals, click = Date.now() ) => {
    const lastInterval = [undefined, ...intervals].slice(-1)[0]
    if ( !lastInterval || lastInterval.end ) {
        return intervals.concat( { ...INTERVAL_BASE, start: click } )
    }
    return intervals.map( (interval, index) => (
        index === intervals.length - 1 ? { ...interval, end: click } : interval
    ) )
}

const concatBreakpoint = ( intervals ) => {
    const lastInterval = [undefined, ...intervals].slice(-1)[0]
    if ( lastInterval && !lastInterval.end ) {
        return concatAddedClick(
            concatAddedClick(intervals, Date.now() - 1) 
        )
    }
    return intervals
}

const mapUpdated = ( intervals, updatedInterval ) => {
    return intervals.map( interval => (
        updatedInterval.start === interval.start
            ? updatedInterval
            : interval
    ) )
}

export const intervalsDateMapper = ( intervals ) => {
    if (!intervals) return {}
    return intervals.reduce( (map, interval) => {
        const date = (new Date(interval.start)).toISOString().substring(0, 10)
        map[date] = map[date] 
            ? map[date].concat(interval) 
            : [interval]
        return map
    }, { } )
}

const intervalsService = {
    concatAddedClick,
    concatBreakpoint,
    mapUpdated
}

export default intervalsService