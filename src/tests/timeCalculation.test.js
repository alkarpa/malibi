const timeCalc = require('../services/timeCalculation')


describe('Clock strings', () => {
    test('A second returns 0:00:01', () => {
        const secondsString = timeCalc.getClockString( 1000 )
        expect( secondsString ).toBe('0:00:01')
    })

    test('A minute returns 0:01:00', () => {
        const minuteString = timeCalc.getClockString( 60000 )
        expect( minuteString ).toBe('0:01:00')
    })

    test('An hour returns  1:00:00', () => {
        const hourString = timeCalc.getClockString( 60*60000 )
        expect( hourString ).toBe('1:00:00')
    })

    test('10 hours 15 seconds returns 10:00:15', () => {
        const timeString = timeCalc.getClockString( 10*60*60000+15000 )
        expect( timeString ).toBe('10:00:15')
    })

    test('999 millis doesn\'t round up from 61 seconds', () => {
        const timeString = timeCalc.getClockString( 61999 )
        expect( timeString ).toBe('0:01:01')
    })
})

describe('Intervals', () => {

    let hourInterval
    let dayInterval

    beforeAll( () => {
        const dateStart = 1622292364477 // 2021-05-29
        const date2 = dateStart + 60*60000
        const date3 = dateStart + 24*60*60000
        hourInterval = timeCalc.getIntervalInfo(dateStart, date2)
        dayInterval = timeCalc.getIntervalInfo(dateStart, date3)

    } )

    describe('dates', () => {
        
        test('Local time doesn\'t get confused with the dates', () => {
            const dateStart = new Date(Date.UTC(2021,5,29,20)) // This depends on EEST, is terrible and needs to be changed :<
            const dateEnd = new Date(Date.UTC(2021,5,29,22))
            console.log('dateStart', dateStart)
            console.log('dateEnd', dateEnd)
            const interval = timeCalc.getIntervalInfo(dateStart, dateEnd)
            console.log('interval', interval)
            expect( interval.start.date ).not.toBe( interval.end.date )
        })
    })

    describe('interval.display', () => {

        test('An hour interval display is 1:00:00', () => {
            expect( hourInterval.interval.display ).toBe( '1:00:00' )
        })
        test('A day interval display is 24:00:00', () => {
            expect( dayInterval.interval.display ).toBe( '24:00:00' )
        })


    })


})