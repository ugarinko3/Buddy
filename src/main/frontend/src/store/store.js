import { createStore, combineReducers } from 'redux';
import postReducer from './slice/postSlice';

// Combine your reducers
const rootReducer = combineReducers({
    post: postReducer,
    // You can add more reducers here if needed
});

// Create the store with the combined reducer
const store = createStore(rootReducer);

export default store;