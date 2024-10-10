import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Slice для работы с командами
export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        listTeam: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Начало загрузки команд
        fetchTeamStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Успешная загрузка команд
        fetchTeamSuccess: (state, action) => {
            state.loading = false;
            state.listTeam = action.payload;
        },
        // Ошибка загрузки команд
        fetchTeamFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Экспортируем действия
export const {
    fetchTeamStart,
    fetchTeamSuccess,
    fetchTeamFail,
} = teamSlice.actions;

// Асинхронное действие (thunk) для получения данных о командах
export const fetchGetTeam = () => async (dispatch) => {
    dispatch(fetchTeamStart());
    try {
        const response = await axios.get("/admin/admin-getTeam");
        dispatch(fetchTeamSuccess(response.data));
    } catch (error) {
        dispatch(fetchTeamFail(error.message));
    }
};

// Экспортируем reducer
export default teamSlice.reducer;