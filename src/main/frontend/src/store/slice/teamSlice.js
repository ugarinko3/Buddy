import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        listTeam: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTeamStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        fetchTeamSuccess: (state, action) => {
            state.loading = false;
            state.listTeam = action.payload;
        },
        fetchTeamFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchTeamStart,
    fetchTeamSuccess,
    fetchTeamFail,
} = teamSlice.actions;

export const fetchGetTeam = () => async (dispatch) => {
    dispatch(fetchTeamStart());
    try {
        const response = await axios.get("/admin/admin-getTeam");
        dispatch(fetchTeamSuccess(response.data));
    } catch (error) {
        dispatch(fetchTeamFail(error.message));
    }
};

export default teamSlice.reducer;