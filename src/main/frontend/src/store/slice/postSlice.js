import { createSlice } from '@reduxjs/toolkit'
import {getPostCourses} from '../../utils/Courses'


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        error: null,
        status: 'idle',
        activeCourse: JSON.parse(localStorage.getItem("active-course"))
    },
    reducers: {
        getPostStart: state => {
            state.status = 'loading'
        },
        getPostSuccess: (state, action) => {
            state.status = 'succeeded'
            state.courses = action.payload
        },
        getPost: (state, action)  => {
            state.status = 'failed'
            state.posts = action.payload
        },
        getPostFail: (state, action) => {
            state.error = action.payload
        },
        setPost: (state, action) => {
            state.activeCourse = state.courses.find(course => course.id === action.payload)
            localStorage.setItem("active-course", JSON.stringify(state.activeCourse))
        }
    }
})

export const {getPostStart, getPostSuccess,getPost, getPostFail, setPost} = postSlice.actions

export const fetchPost = () => async dispatch => {
    try {
        dispatch(getPost())
        getPostCourses()
            .then((res) => {
                dispatch(getPost(res))
            })
    } catch (error) {
        dispatch(getPostFail('Ошибка'))
    }
}
export default postSlice.reducer