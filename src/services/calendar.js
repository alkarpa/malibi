const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const getWeekdayStringFromISODate = ( date ) => {
    return WEEKDAYS[ new Date(date).getDay() ]
}

const getDaysSinceFromISODate = ( date ) => {
    const now = new Date().getTime()
    const then = new Date(date).getTime()
    const between = parseInt( (now - then) / 1000 / 3600 / 24 )
    let ret
    if (then>now) {
        const days = -between + 1 > 1 ? 'days' : 'day'
        return `${-between + 1} ${days} in the future`
    }
    switch(between) {
        case 0: ret = 'Today'; break;
        case 1: ret = 'Yesterday';break;
        default: ret = `${between} days ago`
    }
    return ret
}

const getWeekNumber = (date) => {
    // Source: https://weeknumber.com/how-to/javascript
    var helperDate = new Date(date)
    // Thursday in current week decides the year.
    helperDate.setDate(helperDate.getDate() + 3 - (helperDate.getDay() + 6) % 7)
    // January 4 is always in week 1.
    var week1 = new Date(helperDate.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((helperDate.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

const getWeekdaysMondayFirst = () => {
    return WEEKDAYS.concat(WEEKDAYS[0]).slice(1)
}

const calendarService = {
    getWeekdayStringFromDate: getWeekdayStringFromISODate,
    getWeekNumber,
    getWeekdaysMondayFirst,
    getDaysSinceFromISODate
}

export default calendarService