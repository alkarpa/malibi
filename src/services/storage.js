
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


module.exports = {
    save,
    load,
    loadProjects,
}