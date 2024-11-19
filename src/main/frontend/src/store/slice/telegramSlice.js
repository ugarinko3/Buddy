import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const telegramSlice = createSlice({
    name: 'telegram',
    initialState: {
        result: null,
        error: null,
    },
    reducers: {
        fetchSuccess: (state, action) => {
            state.error = null;
            state.result = action.payload;
        },
        fetchFail: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const {
    fetchFail,
    fetchSuccess,
} = telegramSlice.actions;


export const createTelegram = (formData) => async (dispatch) => {
    try {
        const response = await axios.post(`/users/telegram`, formData, {
            headers: {
                'Content-Type': 'application/json', // или 'application/x-www-form-urlencoded'
            },
        });
        dispatch(fetchSuccess(response.data));
    } catch (error) {
        dispatch(fetchFail(error.message));
    }
}
export default telegramSlice.reducer;
