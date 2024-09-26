import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        login: '',
        role: '',
        create: false,
        error: null,
    },
    reducers: {
        fetchTokenSuccess: (state, action) => {
            state.create = action.payload.create;
            state.role = action.payload.role;
            state.login = action.payload.login;
        },
        fetchTokenFail: (state, action) => {
            state.error = action.payload;
            console.log(action.payload);
        }
    },
});

export const {
    fetchTokenFail,
    fetchTokenSuccess
} = tokenSlice.actions;



export const fetchToken = (login, token) => async (dispatch) => {
    try {
        const response = await axios.post('/token', {
            token: token,
            login: login
        });
        dispatch(fetchTokenSuccess(response.data));
    } catch (error) {
        dispatch(fetchTokenFail(error.message));
    }
};


export default tokenSlice.reducer;