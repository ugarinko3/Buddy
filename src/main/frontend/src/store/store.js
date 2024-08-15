import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'

import postReducer from './slice/postSlice'

// Combine your reducers
export default configureStore({
    reducer: {
    post: postReducer,
    },
    middleware: () =>  [thunk],
});
