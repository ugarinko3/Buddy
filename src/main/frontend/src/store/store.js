import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

import postReducer from './slice/postSlice'
import logReducer from './slice/logSlice';

// Combine your reducers
export default configureStore({
    reducer: {
    post: postReducer,
    log: logReducer,
    },
    middleware: () =>  [thunk],
});