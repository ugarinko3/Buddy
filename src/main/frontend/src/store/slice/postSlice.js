import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
        showMyPosts: false,
    },
    reducers: {
        // Начало загрузки постов
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Успешная загрузка постов
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        // Ошибка загрузки постов
        fetchPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Успешное удаление поста
        deletePostSuccess: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        // Ошибка удаления поста
        deletePostFail: (state, action) => {
            state.error = action.payload;
        },
        // Новый экшен для обновления состояния поста
        updatePostState: (state, action) => {
            const updatedPost = action.payload;
            const index = state.posts.findIndex(post => post.post.id === updatedPost.post.id);
            if (index !== -1) {
                state.posts[index] = updatedPost;
            }
        },

        // Успешное добавление лайка
        likePostSuccess: (state, action) => {
            const { postId, updatedLikes } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = updatedLikes; // Обновляем количество лайков из ответа
                post.liked = true; // Отмечаем, что пост лайкнут
            }
        },
        // Успешное удаление лайка
        unlikePostSuccess: (state, action) => {
            const { postId, updatedLikes } = action.payload;
            const post = state.posts.find(post => post.id === postId);
            if (post) {
                post.likes = updatedLikes; // Обновляем количество лайков из ответа
                post.liked = false; // Отмечаем, что пост разлайкан
            }
        },
        // Ошибка при лайке
        likePostFail: (state, action) => {
            state.error = action.payload;
        },
        // Ошибка при анлайке
        unlikePostFail: (state, action) => {
            state.error = action.payload;
        },
        toggleMyPosts: (state) => {
            state.showMyPosts = !state.showMyPosts;
        }
    },
});

// Экшены
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

// Функция для получения постов
export const fetchPosts = (login) => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const response = await axios.get('/post/get', {
            params: { login }
        });
        dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostsFail(error.message));
    }
};

// Функция для удаления поста
export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/post/${postId}`);
        dispatch(deletePostSuccess(postId));
    } catch (error) {
        dispatch(deletePostFail(error.message));
    }
};

// Функция для добавления лайка
export const likePost = (postId, login) => async (dispatch) => {
    try {
        const response = await axios.post(`/post/like/${postId}`, null, {
            params: { login }
        });
        // Если сервер возвращает количество лайков, обновляем их
        const updatedLikes = response.data.likes;
        dispatch(likePostSuccess({ postId, updatedLikes }));
    } catch (error) {
        dispatch(likePostFail(error.message));
    }
};

// Функция для удаления лайка
export const unlikePost = (postId, login) => async (dispatch) => {
    try {
        const response = await axios.post(`/post/unlike/${postId}`, null, {
            params: { login }
        });
        // Если сервер возвращает количество лайков, обновляем их
        const updatedLikes = response.data.likes;
        dispatch(unlikePostSuccess({ postId, updatedLikes }));
    } catch (error) {
        dispatch(unlikePostFail(error.message));
    }
};

export default postSlice.reducer;
