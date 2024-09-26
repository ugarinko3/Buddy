import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        day: [],
        dayPost: [],
        availability:false,
        loading: false,
        error: null,
        // calendar: false,
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
            state.day = action.payload;
        },
        // Ошибка загрузки постов
        fetchCalendarFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCalendarDaySuccess: (state, action) => {
            state.loading = false;
            state.dayPost = action.payload;
            state.availability = action.payload[0].availability;
        },
        // Ошибка загрузки постов
        fetchCalendarDayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCalendarSuccess: (state, action) => {
            state.calendar = action.payload;

        },
        // Ошибка удаления поста
        createCalendarFail: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    fetchCalendarStart,
    fetchCalendarFail,
    fetchCalendarSuccess,
    fetchCalendarDayFail,
    fetchCalendarDaySuccess,
    createCalendarSuccess,
    createCalendarFail,
    createCommentFail,
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
export const fetchCalendarDay = (login, idPost) => async (dispatch) => {
    dispatch(fetchCalendarStart());
    try {
        const response = await axios.get(`/calendar/get-day/${idPost}`,{
            params: { login },
        });
        console.log(response.data);
        dispatch(fetchCalendarDaySuccess(response.data));
    } catch (error) {
        dispatch(fetchCalendarDayFail(error.message));
    }
};

export const fetchCreateCalendar = (startDate, endDate) => async (dispatch) => {
    try {
        const response = await axios.post('/calendar/create', {
            startDate,
            endDate
        }, {
            headers: {
                'Content-Type': 'application/json',  // Обязательно укажите заголовок JSON
            },
        });
        dispatch(createCalendarSuccess(response.data));
    } catch (error) {
        dispatch(createCalendarFail(error.message));
    }
};
export const fetchCreateComment = (comment) => async (dispatch) => {
    try {
        await axios.post('/calendar/create-comment', {
            comment: comment.comment, // Отправляем только поле comment
            id: comment.id // Если id тоже нужно, отправьте его
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        dispatch(createCommentFail(error.message));
    }
};


export default calendarSlice.reducer;