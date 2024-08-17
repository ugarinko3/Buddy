import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFail } = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const response = await axios.get('/post');
        dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostsFail(error.message));
    }
};

export default postSlice.reducer;
