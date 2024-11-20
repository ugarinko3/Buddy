import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        users: [],
        loading: true,
        error: null,
    },
    reducers: {
        fetchTournamentSuccess: (state, action) => {
            state.users = action.payload;
            state.loading = false;
        },
        fetchTournamentFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const {
    fetchTournamentFail,
    fetchTournamentSuccess
} = tournamentSlice.actions;


export const fetchUserTournament = () => async (dispatch) => {
    try {
        const response = await axios.get('/users/tournament');
        dispatch(fetchTournamentSuccess(response.data));  // Если users - массив
    } catch (error) {
        const errorCode = error.response?.status || 500;
        dispatch(fetchTournamentFail(errorCode));
    }
};


export default tournamentSlice.reducer;