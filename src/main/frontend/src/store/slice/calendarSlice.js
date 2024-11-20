import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {clearSuccess, fetchStatusError, fetchStatusLoading, fetchStatusSuccess} from "./statusSlice";

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        day: [],
        dayPost: [],
        availability: true,
        loading: false,
        error: null,
    },
    reducers: {
        fetchCalendarStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        fetchCalendarSuccess: (state, action) => {
            state.loading = false;
            state.day = action.payload;
        },
        fetchCalendarFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCalendarDaySuccess: (state, action) => {
            state.loading = false;
            state.dayPost = action.payload;
            state.availability = action.payload[0].availability;
        },
        fetchCalendarDayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCalendarSuccess: (state, action) => {
            state.calendar = action.payload;

        },
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
            params: {login}
        });
        dispatch(fetchCalendarSuccess(response.data));
    } catch (error) {
        dispatch(fetchCalendarFail(error.message));
    }
};
export const fetchCalendarDay = (login, idPost) => async (dispatch) => {
    dispatch(fetchCalendarStart());
    try {
        const response = await axios.get(`/calendar/get-day/${idPost}`, {
            params: {login},
        });
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
                'Content-Type': 'application/json',
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
            comment: comment.comment,
            id: comment.id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        dispatch(createCommentFail(error.message));
    }
};
export const fetchStatus = (item) => {
    console.log(item)

    return async (dispatch) => {
        dispatch(fetchStatusLoading());
        try {
            await axios.post('/calendar/change-of-status-active', item, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(item)
            dispatch(fetchStatusSuccess());

            setTimeout(() => {
                dispatch(clearSuccess());
            }, 2000);
        } catch (error) {
            dispatch(fetchStatusError(error.message));
        }
    };
};


export default calendarSlice.reducer;