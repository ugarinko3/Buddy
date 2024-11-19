import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Slice для работы с командами
export const seasonSlice = createSlice({
    name: 'season',
    initialState: {
        dateSeason: "will be known soon",
        buttonStatus: false,
        season: [],
        registration: false,
        loading: false,
        error: null,
    },
    reducers: {
        // Начало загрузки команд
        fetchSeasonStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSeasonGet: (state, action) => {
            state.registration = action.payload;
            if(state.registration) {
                state.dateSeason = action.payload.startDate;
            }
        },
        fetchSeasonSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.season = action.payload;
            if (state.season) {
                state.buttonStatus = true;
            }
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
    fetchSeasonGet,
} = seasonSlice.actions;

// Асинхронное действие (thunk) для получения данных о командах
export const RegistrationSeason = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        await axios.post("/season/registration", null,{
            params: { login },
        });
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
};
export const Season = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        const response = await axios.get("/season", {
            params: { login },
        });
        // console.log(response.data, login)
        dispatch(fetchSeasonSuccess(response.data));
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
}

export const getSeason = () => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        const response = await axios.get(`/season/get-season`);
        console.log(response.data)
        dispatch(fetchSeasonGet(response.data));
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
}
export const fetchCreateSeason = (numberSeason, startDate, endDate) => async (dispatch) => {
    try {
        await axios.post('/season', {
            numberSeason,
            startDate,
            endDate
        }, {
            headers: {
                'Content-Type': 'application/json',  // Обязательно укажите заголовок JSON
            },
        });
    } catch (error) {
        console.log(error.response.data); // Измените на error.response.data для получения сообщения об ошибке
        dispatch(fetchSeasonFail(error.response.data)); // Передаем конкретное сообщение об ошибке
    }
};

// Экспортируем reducer
export default seasonSlice.reducer;