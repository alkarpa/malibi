import dragndropReducer, {startDrag, endDrag} from "./dragndropReducer";

test('Default state is ""', () => {
    const state = dragndropReducer(undefined, 'TEST_ACTION')
    expect(state).toEqual('')
})

test('START_DRAG project returns project', () => {
    const state = dragndropReducer('', startDrag('project'))
    expect(state).toEqual('project')
})

test('END_DRAG returns ""', () => {
    const state = dragndropReducer('project', endDrag())
    expect(state).toEqual('')
})