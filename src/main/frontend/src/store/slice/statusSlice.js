import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

// Create a slice for managing status
const statusSlice = createSlice({
    name: 'status',
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        fetchStatusLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        fetchStatusSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        fetchStatusError: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const { fetchStatusLoading, fetchStatusSuccess, fetchStatusError } = statusSlice.actions;

// Async action creator
export const fetchStatus = (item) => {
    return async (dispatch) => {
        dispatch(fetchStatusLoading());
        try {
            await axios.post('/calendar/change-of-status-active', item, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch(fetchStatusSuccess());

            // Очистка успеха через 2 секунды
            setTimeout(() => {
                dispatch(clearSuccess()); // Новый экшен для очистки флага успеха
            }, 2000);
        } catch (error) {
            dispatch(fetchStatusError(error.message));
        }
    };
};

// Новый экшен для очистки состояния успеха
export const clearSuccess = () => (dispatch) => {
    dispatch(fetchStatusSuccess(false));
};

// Export the reducer
export default statusSlice.reducer;
