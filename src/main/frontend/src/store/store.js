import {configureStore} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import postReducer from './slice/postSlice';
import logReducer from './slice/logSlice';
import profileReducer from './slice/profileSlice';
import calendarReducer from './slice/calendarSlice';
import tokenReducer from './slice/tokenSlice';
import teamReducer from './slice/teamSlice';
import tournamentReducer from "./slice/tournamentSlice";
import seasonReducer from "./slice/seasonSlice";
import adminReducer from "./slice/adminSlice";
import telegramReducer from "./slice/telegramSlice"


const store = configureStore({
    reducer: {
        post: postReducer,
        log: logReducer,
        telegram: telegramReducer,
        profile: profileReducer,
        calendar: calendarReducer,
        token: tokenReducer,
        team: teamReducer,
        season: seasonReducer,
        tournament: tournamentReducer,
        admin: adminReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;