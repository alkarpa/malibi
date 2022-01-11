import { twoDigit } from "./timeDisplay"


/**
 * 
 * @param {*} stateIntervals 
 * @param {*} clickInterval 
 * @returns 
 */
const concatAddedClick = ( stateIntervals, clickInterval ) => {
    return stateIntervals.find( si => clickInterval.id === si.id )
        ? stateIntervals.map( si => clickInterval.id === si.id ? clickInterval : si )
        : stateIntervals.concat( clickInterval )
}

/**
 * 
 * @param {*} stateIntervals 
 * @param {*} breakpointIntervals 
 * @returns 
 */
const concatBreakpoint = ( stateIntervals, breakpointIntervals ) => {
    if ( stateIntervals.length === 0 || stateIntervals.slice(-1)[0].end) return stateIntervals
    if ( breakpointIntervals.length < 2 ) return stateIntervals 
    return stateIntervals
        .map( si => breakpointIntervals[0].id === si.id ? breakpointIntervals[0] : si )
        .concat( breakpointIntervals[1] )
}

/**
 * 
 * @param {*} stateIntervals 
 * @param {*} updatedInterval 
 * @returns 
 */
const updateIntoIntervalState = ( stateIntervals, updatedInterval ) => {
    
    if ( updatedInterval.start > updatedInterval.end ) return stateIntervals

    // validity check
    const validCheck = (i,u) => {
        return ( i.id !== u.id && ((u.start < i.start && i.start < u.end) || (u.start < i.end && i.end < u.end )) )
    }
    const conflict = stateIntervals.find( iv => validCheck(iv, updatedInterval) )
    if ( conflict ) {
        //console.log('CONFLICTING INTERVAL -> ', conflict)
        return stateIntervals
    } else {
        //console.log('No update conflict')
    }

    const original = stateIntervals.find( iv => iv.id === updatedInterval.id )
    const replacement = { ...original, ...updatedInterval }
    return stateIntervals.map( interval => (
        updatedInterval.id === interval.id
            ? replacement
            : interval
    ) )
}

export const intervalsDateMapper = ( intervals ) => {
    if (!intervals) return {}

    const iso = (date) => `${date.getFullYear()}-${twoDigit(date.getMonth()+1)}-${twoDigit(date.getDate())}`

    const breakIntervalAtMidnight = (iv) => {
        const array = []
        let iterator = new Date(iv.start)
        let dayEnd = new Date( iterator.getFullYear(), iterator.getMonth(), iterator.getDate(), 23, 59, 59, 999 )
        while ( iv.end > dayEnd.getTime() ) {
            array.push( { ...iv, start: iterator.getTime(), end: dayEnd.getTime() } )
            
            iterator = new Date( dayEnd.getTime() + 1 )
            dayEnd.setDate( dayEnd.getDate() + 1 )
        }
        array.push( { ...iv, start: iterator.getTime() } )
        return array
    } 
    const brokenIntervals = intervals.reduce( (arr,iv) => arr.concat(breakIntervalAtMidnight(iv)), [] )

    return brokenIntervals.reduce( (map, interval) => {
        const date = iso(new Date(interval.start))
        map[date] = map[date] 
            ? map[date].concat(interval) 
            : [interval]
        return map
    }, { } )
}

const intervalsService = {
    concatAddedClick,
    concatBreakpoint,
    updateIntoIntervalState
}

export default intervalsService