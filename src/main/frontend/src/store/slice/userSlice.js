import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        error: null,
    },
    reducers: {
        fetchUsersStart: (state) => {
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
        },
        fetchUsersFail: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFail } = userSlice.actions;

export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersStart());
    try {
        const response = await axios.get('/users-status-role');
        dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
        dispatch(fetchUsersFail(error.message));
    }
};

export default userSlice.reducer;
