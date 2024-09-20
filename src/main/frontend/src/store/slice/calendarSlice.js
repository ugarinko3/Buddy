import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        day: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Начало загрузки постов
        fetchCalendarStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Успешная загрузка постов
        fetchCalendarSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        // Ошибка загрузки постов
        fetchCalendarFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {
    fetchCalendarStart,
    fetchCalendarFail,
    fetchCalendarSuccess
} = calendarSlice.actions;



export const fetchCalendar = (login) => async (dispatch) => {
    dispatch(fetchCalendarStart());
    try {
        const response = await axios.get('/calendar/get', {
            params: { login }
        });
        dispatch(fetchCalendarSuccess(response.data));
    } catch (error) {
        dispatch(fetchCalendarFail(error.message));
    }
};


export default calendarSlice.reducer;