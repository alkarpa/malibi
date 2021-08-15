const { testState } = process.env.NODE_ENV === 'test' ? require("../util/test_state_local") : {}

const storeInLocalStorageAsJSON = (key, obj) => {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(obj))
    }
}

const loadFromLocalStorageAsObject = (key) => {
    let parsed
    if (localStorage && localStorage.getItem(key)) {
        parsed = JSON.parse( localStorage.getItem(key) )
    }
    console.log('parsed: ' + parsed)
    return parsed
}

const save = ( key, obj ) => {
    storeInLocalStorageAsJSON(key, obj)
}
const load = (key) => {
    if (process.env.NODE_ENV === 'test') {
        return testState[key]
    }
    return loadFromLocalStorageAsObject(key)
}

const loadIntervals = () => {
    const intervals = load('datetracking')

    return intervals
}


module.exports = {
    save,
    load,
    loadIntervals
}