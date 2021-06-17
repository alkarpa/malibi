const intervalService = require('./intervals')

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
    return parsed
}

const save = ( key, obj ) => {
    storeInLocalStorageAsJSON(key, obj)
}
const load = (key) => {
    return loadFromLocalStorageAsObject(key)
}

/**
 * Move to "Projects Model"?
 * @param {*} setProjects 
 */
const loadProjects = (setProjects) => {
    const stored = load('projects')
    if (stored) {
      setProjects(stored)
    }
}

/**
 * Move to "Completed Model"?
 * @param {*} setCompleted 
 */
const loadCompleted = (setCompleted) => {
    const stored = load('completed')
    if (stored) {
      // group completed by date
      // RETHINK AND REFACTOR
      let last = ''
      const grouped = stored.reduce( (arrays, cur) => {
        const localDate = (new Date( cur.start )).toLocaleDateString()
        if ( last !== localDate ) {
          arrays.push([])
          last = localDate
        }
        (arrays[ arrays.length - 1 ]).push( cur )
        return arrays
      }, [] )

      const rebuilt = grouped.map( g => intervalService.buildIntervalInfoFromStorage( g ) )
      setCompleted(rebuilt)
    }
}

module.exports = {
    save,
    load,
    loadProjects,
    loadCompleted,
}