import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import trackingReducer from '../reducers/trackingReducer'
import projectsReducer from '../reducers/projectsReducer'

function render(
    ui,
    {
        preloadedState,
        store = configureStore({ 
            reducer: { 
                intervals: trackingReducer,
                projects: projectsReducer}, 
            preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'

export { render }