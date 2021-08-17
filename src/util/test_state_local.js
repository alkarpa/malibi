
/**
 * Testing is pretty tied to these being static.
 * Add new intervals to different months if need be.
 */
export const testState = {
    datetracking: [
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
    projects: [
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

const load = (key) => testState[key]
const save = (key, object) => testState[key] = object

const storageTestData = {
    load, save
}

export default storageTestData