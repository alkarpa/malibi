import { ARCS, getBGArcString, getTwentyfourHourIndicators, prepareIntervals } from "./pretzelClock";

describe('pretzelClock service', () => {

    const FULL_DAY = {
        id: 'FD',
        start: new Date(2021, 7, 1, 0, 0, 0, 0).getTime(),
        end: new Date(2021, 7, 2),
        project: undefined
    }
    const SHORT_INTERVAL = {
        id: 'SHORTY',
        start: new Date(2021, 7, 1, 0, 0, 0, 0).getTime(),
        end: new Date(2021, 7, 1, 0, 10),
        project: undefined
    }

    describe('prepareIntervals', () => {
        
        const arcRegEx = /m\d+,\d+\s+(a\d+,\d+ 0 [01],[01] -?\d+,-?\d+\s+)/
            
        const fullDayInterval = prepareIntervals( [FULL_DAY] )[0]
        const shortInterval = prepareIntervals( [SHORT_INTERVAL] )[0]
        
        test('Over full day returns first and over last segment', () => {
            expect( fullDayInterval.startSegment ).toBe(0)
            expect( fullDayInterval.endSegment ).toBe(ARCS.length)
        })
        test('Over full day a path with all arcs', () => {
            const fullregex = new RegExp( arcRegEx.source + "{"+ARCS.length+"}$" )
            const expected = expect.stringMatching(fullregex)
            expect( fullDayInterval.arc ).toEqual(expected)
        })

        test('Short interval returns first segments', () => {
            expect( shortInterval.startSegment ).toBe(0)
            expect( shortInterval.endSegment ).toBeLessThan(1)
        })
        test('Short interval returns single arc', () => {
            const regex = new RegExp( arcRegEx.source + "{1}$" )
            const expected = expect.stringMatching(regex)
            expect( shortInterval.arc ).toEqual(expected)
        })
    })

    describe('getBGArcString', () => {
        
        test('Returns ARCS length arc path', () => {
            const arcRegEx = /(a\d+,\d+ 0 [01],[01] -?\d+,-?\d+\s*)/
            const regex = new RegExp( arcRegEx.source + "{"+ARCS.length+"}$" )
            const arcString = getBGArcString()
            const expected = expect.stringMatching(regex)
            expect( arcString ).toEqual(expected)
        })
    })

    describe('getTwentyfourHourIndicators', () => {

        test('Returns array', () => {
            const tf = getTwentyfourHourIndicators(0,0,10)
            expect( Array.isArray(tf) ).toBeTruthy()
        })
    }) 

})