import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        showMyPosts: false,
        result: null,
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
        deletePostSuccess: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        deletePostFail: (state, action) => {
            state.error = action.payload;
        },
        updatePostState: (state, action) => {
            const updatedPost = action.payload;
            const index = state.posts.findIndex(post => post.id === updatedPost.id);
            if (index !== -1) {
                state.posts[index] = updatedPost;
            }
        },
        likePostSuccess: (state, action) => {
            const {postId, updatedLikes} = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = updatedLikes;
                post.liked = true;
            }
        },
        unlikePostSuccess: (state, action) => {
            const {postId, updatedLikes} = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = updatedLikes;
                post.liked = false;
            }
        },
        likePostFail: (state, action) => {
            state.error = action.payload;
        },
        unlikePostFail: (state, action) => {
            state.error = action.payload;
        },
        toggleMyPosts: (state) => {
            state.showMyPosts = !state.showMyPosts;
        },

        createTelegramResult: (state, action) => {
            state.result = action.payload;
        }
    },
});

export const {
    toggleMyPosts,
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFail,
    deletePostSuccess,
    deletePostFail,
    updatePostState,
    likePostSuccess,
    likePostFail,
    unlikePostSuccess,
    unlikePostFail,
} = postSlice.actions;

export const fetchPosts = (login) => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const response = await axios.get('/post/get', {
            params: {login}
        });
        dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostsFail(error.message));
    }
};


export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/post/${postId}`);
        dispatch(deletePostSuccess(postId));
    } catch (error) {
        dispatch(deletePostFail(error.message));
    }
};

export const likePost = (postId, login) => async (dispatch) => {
    try {
        const response = await axios.post(`/post/like/${postId}`, null, {
            params: {login}
        });
        const updatedLikes = response.data;
        dispatch(likePostSuccess({postId, updatedLikes}));
    } catch (error) {
        dispatch(likePostFail(error.message));
    }
};

export const unlikePost = (postId, login) => async (dispatch) => {
    try {
        const response = await axios.post(`/post/unlike/${postId}`, null, {
            params: {login}
        });
        const updatedLikes = response.data;
        dispatch(unlikePostSuccess({postId, updatedLikes}));
    } catch (error) {
        dispatch(unlikePostFail(error.message));
    }
};

export default postSlice.reducer;
