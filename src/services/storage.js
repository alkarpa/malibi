const storage = process.env.NODE_ENV === 'test' 
    ? require("../util/test_state_local").default
    : /*require('./storageAPI').default //*/ require("./storageBrowser").default
/**
 * Adds a click to the end of the last interval or at the beginning of a new one
 * @returns the modified interval object from storage
 */
const click = async () => {
    return await storage.click()
}

/**
 * Ends the last interval and start a new one
 * @returns the 2 modified interval objects in an array
 */
const breakpoint = async () => {
    return await storage.breakpoint()
}

/**
 * Updates the object in the storage
 * @param {*} key 
 * @param {*} object 
 * @returns The updated object (expect same as param object)
 */
const update = async (key, object) => {
    return await storage.update(key, object)
}

/**
 * Loads data from storage
 * @param {*} key 
 * @returns 
 */
const load = async (key) => {
    return await storage.load(key)
}

const add = async (key, object) => {
    return await storage.add(key, object)
}

const storageService = {
    click, breakpoint, update,
    load, add
}

export default storageService