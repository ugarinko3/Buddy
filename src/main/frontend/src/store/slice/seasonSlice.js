import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Slice для работы с командами
export const seasonSlice = createSlice({
    name: 'season',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        // Начало загрузки команд
        fetchSeasonStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSeasonSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        // Ошибка загрузки команд
        fetchSeasonFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Экспортируем действия
export const {
    fetchSeasonStart,
    fetchSeasonSuccess,
    fetchSeasonFail,
} = seasonSlice.actions;

// Асинхронное действие (thunk) для получения данных о командах
export const RegistrationSeason = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        await axios.post("/season/", {
            login: login
        });
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
};
export const Season = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        const response = await axios.get("/season");
        dispatch(fetchSeasonSuccess(response.data));
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
}

// Экспортируем reducer
export default seasonSlice.reducer;