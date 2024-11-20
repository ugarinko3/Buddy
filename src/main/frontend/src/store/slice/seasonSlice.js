import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
        fetchSeasonStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSeasonGet: (state, action) => {
            state.registration = action.payload;
            if (state.registration) {
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
        fetchSeasonFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSeasonStart,
    fetchSeasonSuccess,
    fetchSeasonFail,
    fetchSeasonGet,
} = seasonSlice.actions;

export const RegistrationSeason = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        await axios.post("/season/registration", null, {
            params: {login},
        });
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
};
export const Season = (login) => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        const response = await axios.get("/season", {
            params: {login},
        });
        dispatch(fetchSeasonSuccess(response.data));
    } catch (error) {
        dispatch(fetchSeasonFail(error.message));
    }
}

export const getSeason = () => async (dispatch) => {
    dispatch(fetchSeasonStart());
    try {
        const response = await axios.get(`/season/get-season`);
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
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(fetchSeasonFail(error.response.data));
    }
};

export default seasonSlice.reducer;