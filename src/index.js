import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import trackingReducer from './reducers/trackingReducer';
import './index.css';
import App from './App';
import timerReducer from './reducers/timerReducer';
import projectsReducer from './reducers/projectsReducer';
import dragndropReducer from './reducers/dragndropReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        intervals: trackingReducer,
        elapsed: timerReducer,
        projects: projectsReducer,
        dragndrop: dragndropReducer
    }
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
    ;
