import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        team: [],
        goals: [],
        user: [],
        days: [],
        role: "",
        loading: false,
        error: null,
    },
    reducers: {
        fetchProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        UserSucces: (state, action) => {
            state.loading = false;
            state.team = action.payload.team;
            state.goals = action.payload.goals;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.days = action.payload.days;
        },
        UserError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSuccesse: (state, action) => {
            state.loading = false;
        },
        fetchCreateGoalFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateGoalStatus: (state, action) => {
            const updatedGoal = action.payload;
            const index = state.goals.findIndex(goal => goal.id === updatedGoal.id);
            if (index !== -1) {
                state.goals[index] = updatedGoal; // Обновляем цель в состоянии
            }
        },
        removeGoal: (state, action) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        },
    },
});

// Экшены
export const {
    UserSucces,
    UserError,
    fetchProfileStart,
    fetchCreateGoalFail,
    updateGoalStatus,
    fetchSuccesse,
    removeGoal,
} = profileSlice.actions;

export const fetchUser = (login) => async (dispatch) => {
    dispatch(fetchProfileStart());
    try {
        const response = await axios.get(`/users/profile/${login}`);
        dispatch(UserSucces(response.data));

    } catch (error) {
        const errorCode = error.response?.status || 500;
        dispatch(UserError(errorCode));
    }
};

export const fetchCreateGoal = (goal) => async (dispatch) => {
    try {
        await axios.post('/users/profile/createGoal', goal);
        dispatch(fetchSuccesse());
    } catch (error) {
        const errorCode = error.response?.status || 500;
        dispatch(fetchCreateGoalFail(errorCode));
    }
};

export const fetchStatusGoal = (goal) => async (dispatch) => {
    try {
        await axios.post("/users/profile/statusGoal", goal);
        dispatch(fetchSuccesse());
    } catch (error) {
        const errorCode = error.response?.status || 500;
        dispatch(UserError(errorCode));
    }
};
export const fetchDeleteGoal = (goal) => async (dispatch) => {
    try {
        await axios.post("/users/profile/deleteGoal", goal);
        dispatch(removeGoal(goal.id)); // Удаляем цель из состояния
    } catch (error) {
        const errorCode = error.response?.status || 500;
        dispatch(UserError(errorCode));
    }
};

export const fetchCreateAvatar = (image, login) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('login', login);
        await axios.post("/users/profile/createAvatar", formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Указываем, что отправляем данные в формате FormData
            }
        });

        // Обработка ответа, если необходимо
        // dispatch(UserSuccesPhoto());
    } catch (error) {
        console.error("Error creating avatar:", error);
        // Обработка ошибок, если необходимо
    }
}

export default profileSlice.reducer;
