import axios from 'axios';
import {createSlice} from "@reduxjs/toolkit";
import {fetchStatusSuccess} from "./statusSlice";
// import {fetchGetTeam} from "./teamSlice";
export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        error: null,
        season: []
    },
    reducers: {
        fetchAddFail: (state, action) => {
            state.error = action.payload;
        },
        fetchAddSeason: (state, action) => {
            state.season = action.payload;
        }
    },
});

export const {
    fetchAddSeason,
    fetchAddFail,
} = adminSlice.actions;

export const fetchCreateCurator = async (login, role) => {
    try {
        await axios.post("/admin/admin-create-role", null, {
            params: { login, role }
        });
    } catch (error) {
        throw new Error(error.code);
    }
};
export const fetchCreateUser = async (login) => {
    try {
        await axios.post("/admin/admin-create-user", null, {
            params: { login }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
export const fetchGetExcel = () => async (dispatch) => {
    try {
        const response = await axios.get("/admin/get-excel", {});
        dispatch(fetchAddSeason(response.data));
    } catch (error) {
        throw new Error(error.message);
    }
};
export const fetchDeleteUser = async (userId) => {
    try {
        await axios.delete(`/admin/delete-user/${userId}`);
    } catch (error) {
        throw new Error(error.message);
    }
};
export const fetchDownload = (fileName) => async (dispatch) => {
    try {
        // Отправляем запрос с правильным форматом параметров
        const response = await axios.get("/admin/download-file", {
            params: { nameFile: fileName },  // Используем nameFile как параметр
        });
        return response.data;  // Возвращаем URL или сообщение от сервера
    } catch (error) {
        console.error("Error during file download:", error);  // Логируем ошибку
        throw new Error(error.response ? error.response.data : error.message);  // Обрабатываем ошибку, выводим сообщение с сервера, если есть
    }
};
export const fetchAddUser = (teamId, loginUser) => async (dispatch) => {
    try {
        const response = await axios.post(`/admin/add-team-and-user`, null, {
            params: {
                teamId: teamId,
                login: loginUser
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            dispatch(fetchAddFail(error.response.data));
            return { success: false, error: error.response.data };
        } else {
            dispatch(fetchAddFail("Произошла ошибка при добавлении пользователя."));
            return { success: false, error: "Произошла ошибка при добавлении пользователя." };
        }
    }
};


export default adminSlice.reducer;






