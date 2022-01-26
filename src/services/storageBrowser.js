
 const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

 const newInterval = ( startClick ) => {
     return {
         id: generateId(),
         start: startClick,
         end: undefined,
         project: undefined,
     }
 }
 

const save = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj))
}

const click = () => {
    let intervals = load('alibi') || []
    const last = [ undefined, ...intervals ].slice(-1)[0]
    if ( last && !last.end ) {
        last.end = Date.now()
        const updatedIntervals = intervals.map( iv => last.id === iv.id ? last : iv )
        save( 'alibi', updatedIntervals )
        return last
    } else {
        const added = newInterval( Date.now() )
        save( 'alibi', intervals.concat( added ) )
        return added
    }
}

const breakpoint = () => {
    let intervals = load('alibi')
    const last = [ undefined, ...intervals ].slice(-1)[0]
    if ( last ) {
        last.end = Date.now()
        const added = newInterval( Date.now()+1 )
        const updatedIntervals = intervals
            .map( iv => last.id === iv.id ? last : iv )
            .concat(added)

        save( 'alibi', updatedIntervals )
        return [ last, added ]
    }
}

const update = (key, object) => {
    let parsed = JSON.parse(localStorage.getItem(key))
    const updated = parsed.map( obj => object.id === obj.id ? { ...obj, ...object } : obj )
    save(key, updated)
    return object
}

const load = (key) => {
    let parsed = JSON.parse(localStorage.getItem(key))
    return parsed || []
}
const add = (key, object) => {
    object = { ...object, id: generateId() }
    let parsed = load(key)
    save(key, parsed.concat(object))
    return object
}

const storageBrowser = {
    click, breakpoint, update, 
    load, add
}
export default storageBrowser