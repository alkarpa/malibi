const disp = require('./timeDisplay')

const getIntervalClockObject = (millis) => {
    const totalSeconds = parseInt(millis / 1000);
    const totalMinutes = parseInt(totalSeconds / 60)
    const hours = parseInt(totalMinutes / 60)
    const displaySeconds = disp.twoDigit(totalSeconds % 60)
    const displayMinutes = disp.twoDigit(totalMinutes % 60)
    return { hour: hours, minute: displayMinutes, second: displaySeconds }
}

const getIntervalClockString = (millis) => {
    const clockObj = getIntervalClockObject(millis)
    return `${clockObj.hour}:${clockObj.minute}:${clockObj.second}`
}

const getTimeClockObject = (millis) => {
    const helperDate = new Date(millis)
    return {
        string: millisToClockString(millis),
        hour: helperDate.getHours(),
        minute: disp.twoDigit(helperDate.getMinutes()),
        second: disp.twoDigit(helperDate.getSeconds()),
    }
}

const millisToDateString = (millis) => {
    const date = new Date(millis)
    return date.toLocaleDateString()
}
const millisToClockString = (millis) => {
    const date = new Date(millis)
    return date.toLocaleTimeString()
}

const getDateInfo = (dateMillis) => {
    if ( !dateMillis ) return undefined
    return {
        date: millisToDateString(dateMillis),
        clock: getTimeClockObject(dateMillis),
        millis: dateMillis
    }
}

const getIntervalInfo = (startMillis, endMillis) => {
    const millisDiff = endMillis - startMillis
    return {
        start: getDateInfo(startMillis),
        end: getDateInfo(endMillis),
        interval: {
            diff: millisDiff,
            clock: getIntervalClockObject(millisDiff),
            display: getIntervalClockString(millisDiff)
        },
        project: {
            
        }
    }
}

const buildIntervalInfo = (timesMillis) => {
    const intervalInfo = {
        intervals: timesMillis.reduce((obj, cur, i) => {
            if (i % 2 === 1) {
                return obj.concat(getIntervalInfo(timesMillis[i - 1], cur))
            }
            return obj
        }, [])
    }
    const sum = intervalInfo.intervals.reduce((acc, cur) => (acc + cur.interval.diff), 0)
    intervalInfo.total = getIntervalClockObject( sum )
    return intervalInfo
}



const funcs = {
    getClockObject: getIntervalClockObject,
    getClockString: getIntervalClockString,
    getDateInfo,
    buildIntervalInfo,
}

module.exports = funcs