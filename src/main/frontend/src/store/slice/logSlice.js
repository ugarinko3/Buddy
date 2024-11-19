// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async ({ login, password }) => {
  const response = await axios.post('http://localhost:8080/login', {
    login,
    password,
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
});


const userSlice = createSlice({
  name: 'log',
  initialState: {
    accessToken: null,
    errorMessage: '',
  },
  reducers: {
    clearError: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.errorMessage = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = 'Login and password failed';
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
