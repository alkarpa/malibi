import storageBrowser from './storageBrowser'

describe('storageBrowser', () => {

    test('localStorage load is called', () => {
        const spyLoad = jest.spyOn(
            window.localStorage.__proto__,
            'getItem'
        )
        storageBrowser.load('testkey')
        expect( spyLoad ).toBeCalled()

        spyLoad.mockRestore()
    })
    test('localStorage save is called', () => {
        const spySave = jest.spyOn(
            window.localStorage.__proto__, 
            'setItem'
        )
        storageBrowser.save('testkey', 'testdata')
        expect( spySave ).toBeCalled()

        spySave.mockRestore()
    })

})