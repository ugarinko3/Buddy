import {createSlice} from '@reduxjs/toolkit';

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

export const {fetchStatusLoading, fetchStatusSuccess, fetchStatusError} = statusSlice.actions;
export const clearSuccess = () => (dispatch) => {
    dispatch(fetchStatusSuccess(false));
};
export default statusSlice.reducer;
