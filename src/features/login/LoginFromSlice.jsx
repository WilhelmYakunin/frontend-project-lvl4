/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const LoginFromSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    authError: 'none',
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    loginError(state, action) {
      state.loginError = action.payload;
    },
  },
});

export const {
  login, loginError,
} = LoginFromSlice.actions;

export default LoginFromSlice.reducer;
