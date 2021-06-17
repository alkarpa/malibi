const intervals = require('../services/intervals')


describe('Pairs', () => {
    describe('buildClickPairs', () => {
        test('Empty array returns an empty array', () => {
            const pairs = intervals.buildClickPairs([])
            expect( pairs.length ).toBe(0)
        })
    
        test('Array of length 1 returns an array with a single object with defined start, undefined end', () => {
            const single = [50]
            const pairs = intervals.buildClickPairs(single)
            expect( pairs.length ).toBe(1)
            expect( pairs[0].start ).toBeDefined()
            expect( pairs[0].end ).toBeFalsy()
        })
    
        test('Array of length 2 returns an array with a single object with defined start and end', () => {
            const duo = [50, 55]
            const pairs = intervals.buildClickPairs(duo)
            expect( pairs.length ).toBe(1)
            expect( pairs[0].start ).toBeDefined()
            expect( pairs[0].end ).toBeDefined()
        })
    
        test('Array of length 3 returns an array with two objects, second one has start but no end', () => {
            const trio = [50, 55, 60]
            const pairs = intervals.buildClickPairs(trio)
            expect( pairs.length ).toBe(2)
            expect( pairs[1].start ).toBeDefined()
            expect( pairs[1].end ).toBeFalsy()
        })
    })
})

describe('Building intervals', () => {
    let pairInterval
    let trio
    const pair = [5, 5010]
    const thirdMillis = pair[1] + 5005
    const fourthMillis = thirdMillis + 5005

    describe('Pair', () => {

        beforeAll( () => {
            pairInterval = intervals.buildIntervalInfo( { intervals: [], total: { millis:0 } } , pair )
            //console.log('pairInterval', pairInterval)
        } )
    
        test('total.millis is 5005', () => {
            expect( pairInterval.total.millis ).toBe(5005)
        })
        test('total.clock values are 0:00:05', () => {
            const clock = pairInterval.total.clock
            expect( clock ).toEqual( { hour: 0, minute: '00', second: '05' } )
        })
        test('intervals[0].difference.millis equals total.millis', () => {
            expect( pairInterval.intervals[0].difference.millis ).toEqual( pairInterval.total.millis )
        })
        test('intervals[0].difference.clock equals total.clock', () => {
            expect( pairInterval.intervals[0].difference.clock ).toEqual( pairInterval.total.clock )
        })
    })

    describe('Trio', () => {

        beforeAll( () => {
            const threeMillis = [ ...pair, thirdMillis]
            trio = intervals.buildIntervalInfo( { intervals: [], total: { millis:0 } } , threeMillis )
            //console.log('trio', trio)
        } )
    
        test('total.millis is 5005', () => {
            expect( trio.total.millis ).toBe(5005)
        })
        test('total.clock values are 0:00:05', () => {
            const clock = trio.total.clock
            expect( clock ).toEqual( { hour: 0, minute: '00', second: '05' } )
        })
        test('intervals[0].difference.millis equals total.millis', () => {
            expect( trio.intervals[0].difference.millis ).toEqual( trio.total.millis )
        })
        test('intervals[0].difference.clock equals total.clock', () => {
            expect( trio.intervals[0].difference.clock ).toEqual( trio.total.clock )
        })
        test('intervals[1].start is defined', () => {
            expect( trio.intervals[1].start ).toBeDefined()
        })
        test('intervals[1].end is undefined', () => {
            expect( trio.intervals[1].end ).toBe( undefined )
        })
        /**
         * Test from even to odd
         */
        test('Equal trio can be built from pair with the third click', () => {
            const fromPairTrio = intervals.buildIntervalInfo( pairInterval, [thirdMillis] )
            expect( fromPairTrio ).toEqual( trio )
        })
    })

    describe('Quad', () => {
        let quad

        beforeAll( () => {
            const fourMillis = [ ...pair, thirdMillis, fourthMillis]
            quad = intervals.buildIntervalInfo( { intervals: [], total: { millis:0 } } , fourMillis )
            //console.log('quad', quad)
        } )
    
        test('total.millis is 10010', () => {
            expect( quad.total.millis ).toBe(10010)
        })
        test('total.clock values are 0:00:10', () => {
            const clock = quad.total.clock
            expect( clock ).toEqual( { hour: 0, minute: '00', second: '10' } )
        })
        test('intervals[0].difference.millis not equal to total.millis', () => {
            expect( quad.intervals[0].difference.millis ).not.toEqual( quad.total.millis )
        })
        test('intervals[0].difference.clock not equal to total.clock', () => {
            expect( quad.intervals[0].difference.clock ).not.toEqual( quad.total.clock )
        })
        test('intervals[1].start is defined', () => {
            expect( quad.intervals[1].start ).toBeDefined()
        })
        test('intervals[1].end is defined', () => {
            expect( quad.intervals[1].end ).toBeDefined()
        })
        /**
         * Test from even to even
         */
        test('Equal quad can be built from pair with the third and fourth clicks', () => {
            const fromPairQuad = intervals.buildIntervalInfo( pairInterval, [thirdMillis, fourthMillis] )
            expect( fromPairQuad ).toEqual( quad )
        })
        /**
         * Test from odd to even
         */
        test('Equal quad can be built from trio with the fourth click', () => {
            const fromTrioQuad = intervals.buildIntervalInfo( trio, [fourthMillis] )
            expect( fromTrioQuad ).toEqual( quad )
        })
    })

    describe('Quint', () => {
        let quint
        const fifthMillis = fourthMillis + 123456
        beforeAll( () => {
            const fiveMillis = [ ...pair, thirdMillis, fourthMillis, fifthMillis ]
            quint = intervals.buildIntervalInfo( { intervals: [], total: { millis:0 } } , fiveMillis )
        } )
        /**
         * Test from odd to odd
         */
        test('Equal quint can be built from trio with the fourth and fifth clicks', () => {
            const fromTrioQuint = intervals.buildIntervalInfo( trio, [fourthMillis, fifthMillis] )
            expect( fromTrioQuint ).toEqual( quint )
        })
    })


})