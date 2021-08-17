const save = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj))
}

const load = (key) => {
    let parsed = JSON.parse(localStorage.getItem(key))
    return parsed
}

const storageBrowser = {
    load, save
}
export default storageBrowser