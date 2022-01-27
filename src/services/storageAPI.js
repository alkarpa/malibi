/**
 * TODO
 * 
 * Assembly required. Not like assembly assembly but like this isn't functional yet.
 * 
 */



const API_URL = process.env.API_URL || 'http://localhost:8080/'

const CORS_NO_CACHE = {
    mode: 'cors',
    cache: 'no-cache'
}
const POST_CORS = {
    method: 'POST',
    ...CORS_NO_CACHE
}
const HEADERS_JSON = { 'Content-Type': 'application/json' }

const click = async () => {
    const response = await fetch( API_URL+'alibi/click', POST_CORS)
    const ret = response.json()
    console.log('CLICK', ret )
    return ret
}

const breakpoint = async () => {
    const response = await fetch( API_URL+'alibi/breakpoint', POST_CORS )
    const ret = response.json()
    console.log('BREAKPOINT', ret)
    return ret
}

const update = async (key, object) => {
    console.log('update')
    const response = await fetch( API_URL+key+'/'+object.id,
        {
            method: 'PUT',
            ...CORS_NO_CACHE,
            headers: HEADERS_JSON,
            body: JSON.stringify(object)
        }
    )
    const ret = response.json()
    console.log('PUT', ret)
    return ret
}

const add = async (key, object) => {
    const response = await fetch( API_URL+key,
        {
            ...POST_CORS,
            headers: HEADERS_JSON,
            body: JSON.stringify(object)
        }
    )
    const ret = response.json()
    console.log( 'POST', ret )
    return ret
}

const load = async (key) => {
    const response = await fetch( API_URL+key,
        {
            method: 'GET',
            ...CORS_NO_CACHE
        }
    )
    const ret = response.json()
    console.log( 'GET', ret )
    return ret || []
}

const storageAPI = {
    click, breakpoint, update,
    load, add
}

export default storageAPI