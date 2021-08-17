const storage = process.env.NODE_ENV === 'test' 
    ? require("../util/test_state_local").default
    : require("./storageBrowser").default

const save = ( key, obj ) => {
    storage.save(key, obj)
}
const load = (key) => {
    return storage.load(key)
}

const storageService = {
    save, load
}

export default storageService