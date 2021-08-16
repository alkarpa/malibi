import intervalsService, { intervalsDateMapper } from './intervals'
import deepFreeze from 'deep-freeze'

describe('intervalsService', () => {

    test('empty array clicked returns an array with an interval', () => {
        const array = []
        deepFreeze(array)
        const intervals = intervalsService.concatAddedClick(array)
        expect(Array.isArray(intervals)).toBeTruthy()
        expect(intervals.length).toBe(1)
    })

    test('empty array breakpoint does nothing', () => {
        const array = []
        deepFreeze(array)
        const intervals = intervalsService.concatBreakpoint(array)
        expect(intervals).toEqual(array)
    })

    test('empty array double clicked returns a complete interval', () => {
        const array = []
        deepFreeze(array)
        const intervals = intervalsService.concatAddedClick(
            intervalsService.concatAddedClick(array)
        )
        expect(intervals.length).toBe(1)
        expect(intervals[0].start).toBeTruthy()
        expect(intervals[0].end).toBeTruthy()
    })

    test('breakpoint works on a half complete interval', () => {
        const array = []
        deepFreeze(array)
        const intervals = intervalsService.concatAddedClick(array)
        deepFreeze(intervals)
        const breakpoint = intervalsService.concatBreakpoint(intervals)
        expect(breakpoint.length).toBe(2)
        expect(breakpoint[0].end).toBeTruthy()
        expect(breakpoint[1].end).toBeFalsy()
        expect(breakpoint[1].start).toBeTruthy()
    })

    test('update changes project', () => {
        const array = []
        deepFreeze(array)
        const intervals = intervalsService.concatAddedClick(array)
        deepFreeze(intervals)
        const updatedInterval = { id: intervals[0].id, project: 7 }
        const updatedState = intervalsService.mapUpdated(intervals, updatedInterval)
        expect(updatedState[0].project).toBe(7)
    })


    describe('intervalsDateMapper', () => {

        test('no interval array returns an empty map', () => {
            const map = intervalsDateMapper()
            expect(map).toEqual({})
        })

        test('hour long interval returns a map with 1 day', () => {
            const interval = {
                start: new Date(2021,7,14,12),
                end: new Date(2021,7,14,13)
            }
            const map = intervalsDateMapper([interval])
            const keys = Object.keys( map )
            expect( keys.length ).toBe(1)
        })

        test('3 day long interval returns a map with 3 days', () => {
            const interval = {
                start: new Date(2021,7,14,12),
                end: new Date(2021,7,16,12)
            }
            const map = intervalsDateMapper([interval])
            const keys = Object.keys( map )
            expect( keys.length ).toBe(3)
        })
    })

})