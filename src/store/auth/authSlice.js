import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: {},
    errorMessage: null,
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = null;
    },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
  },
});

export const { checking, login, logout } = authSlice.actions;
