import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slice/postSlice';
import logReducer from './slice/logSlice';
import userReducer from './slice/userSlice';
import calendarReducer from './slice/calendarSlice'
// import teamReducer from './slice/teamList';

// Configure the Redux store
const store = configureStore({
    reducer: {
        post: postReducer,
        log: logReducer,
        user: userReducer,
        calendar: calendarReducer,
        // team: teamReducer, // Раскомментируйте и добавьте, если нужно
    },
});

export default store;
