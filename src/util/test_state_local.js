
/**
 * Testing is pretty tied to these being static.
 * Add new intervals to different months if need be.
 */
export const testState = {
    alibi: [
        {
            id: 'mo',
            start: new Date(Date.UTC(2021, 7, 15, 12)).getTime(),
            end: new Date(Date.UTC(2021, 7, 15, 15)).getTime(),
            project: '15'
        },
        {
            id: 'mo2',
            start: new Date(Date.UTC(2021, 7, 15, 16, 20)).getTime(),
            end: new Date(Date.UTC(2021, 7, 15, 16, 36)).getTime(),
            project: 'testproject'
        },
        {
            id: 'mo3',
            start: new Date(Date.UTC(2021, 7, 16, 12, 20)).getTime(),
            end: new Date(Date.UTC(2021, 7, 16, 16)).getTime(),
            project: 'testproject'
        },
        {
            id: 'mo4',
            start: new Date(Date.UTC(2021, 7, 17, 12)).getTime(),
            end: new Date(Date.UTC(2021, 7, 17, 13)).getTime(),
            project: undefined
        }
    ],
    project: [
        {
            id: '15',
            title: 'Test Project',
            color: '#abcdef'
        },
        {
            id: 'testproject',
            title: 'Project Test',
            color: '123456'
        }
    ],
}

const click = () => {}
const breakpoint = () => {}
const add = (key, object) => {
    object.id = 'test'+Date.now()
    testState[key] = testState[key].concat(object)
    return object
}
const update = (key, object) => {
    const index = testState[key].findIndex( o => o.id === object.id )
    if (index > -1) {
        testState[key][index] = object
    }
 }
const load = (key) =>  (testState[key])
const save = (key, object) => testState[key] = object

const storageTestData = {
    add, click, breakpoint, update,
    load, save
}

export default storageTestData