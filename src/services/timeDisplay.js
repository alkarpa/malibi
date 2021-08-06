
const twoDigit = (i) => {
    return String(i).padStart(2, 0)
}

const getIntervalClockObject = (millis) => {
    const totalSeconds = parseInt(millis / 1000);
    const totalMinutes = parseInt(totalSeconds / 60)
    const hours = parseInt(totalMinutes / 60)
    const displaySeconds = twoDigit(totalSeconds % 60)
    const displayMinutes = twoDigit(totalMinutes % 60)
    return { hour: hours, minute: displayMinutes, second: displaySeconds }
}

const getTimeClockObject = (millis) => {
    const helperDate = new Date(millis)
    return {
        hour: helperDate.getHours(),
        minute: twoDigit(helperDate.getMinutes()),
        second: twoDigit(helperDate.getSeconds()),
    }
}

module.exports = {
    twoDigit,
    getIntervalClockObject,
    getTimeClockObject,
}