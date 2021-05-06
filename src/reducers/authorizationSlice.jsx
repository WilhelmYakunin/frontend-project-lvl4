import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    isFetching: false,
    isAuthenticated: false,
    loginError: 'none',
    logoutError: 'none',
  },
  reducers: {
    requestLogin: (state) => ({
      ...state,
      isFetching: true,
      isAuthenticated: false,
    }),
    receiveLogin: (state) => ({
      ...state,
      isFetching: false,
      isAuthenticated: true,
      loginError: 'none',
    }),
    loginError: (state, action) => ({
      ...state,
      isFetching: false,
      isAuthenticated: false,
      loginError: action.payload,
    }),
    requestLogout: (state) => ({
      ...state,
      isFetching: true,
      isAuthenticated: false,
    }),
    receiveLogout: (state) => ({
      ...state,
      isFetching: false,
      isAuthenticated: false,
      logoutError: 'none',
    }),
    logoutError: (state, action) => ({
      ...state,
      isFetching: false,
      isAuthenticated: false,
      logoutError: action.payload,
    }),
  },
});

export const {
  requestLogin, receiveLogin, loginError, requestLogout, receiveLogout, logoutError,
} = authSlice.actions;

export default authSlice.reducer;
