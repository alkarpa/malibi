
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

const newInterval = ( startClick ) => {
    return {
        id: generateId(),
        start: startClick,
        end: undefined,
        project: undefined,
    }
}

const concatAddedClick = ( intervals, click = Date.now() ) => {
    const lastInterval = [undefined, ...intervals].slice(-1)[0]
    if ( !lastInterval || lastInterval.end ) {
        return intervals.concat( newInterval(click) )
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

    if ( updatedInterval.start > updatedInterval.end ) return intervals

    // validity check
    const validCheck = (i,u) => {
        return ( i.id !== u.id && ((u.start < i.start && i.start < u.end) || (u.start < i.end && i.end < u.end )) )
    }
    const conflict = intervals.find( iv => validCheck(iv, updatedInterval) )
    if ( conflict ) {
        //console.log('CONFLICTING INTERVAL -> ', conflict)
        return intervals
    } else {
        //console.log('No update conflict')
    }

    return intervals.map( interval => (
        updatedInterval.id === interval.id
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